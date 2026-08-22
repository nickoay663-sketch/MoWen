import http from "node:http";

import MoWenRuntime from "../index.js";


const HOST =
    "127.0.0.1";

const PORT =
    Number(
        process.env.MOWEN_API_PORT ||
        8787
    );


function sendJson(
    response,
    statusCode,
    payload
) {

    const body =
        JSON.stringify(
            payload
        );

    response.writeHead(
        statusCode,
        {
            "Content-Type":
                "application/json; charset=utf-8",

            "Content-Length":
                Buffer.byteLength(
                    body,
                    "utf8"
                )
        }
    );

    response.end(
        body
    );

}


async function readJson(
    request
) {

    const chunks = [];

    for await (
        const chunk of request
    ) {

        chunks.push(
            chunk
        );

    }

    const body =
        Buffer
            .concat(chunks)
            .toString("utf8")
            .trim();

    if (!body) {

        return {};

    }

    return JSON.parse(
        body
    );

}


async function handleCheck(
    request,
    response
) {

    let payload;

    try {

        payload =
            await readJson(
                request
            );

    } catch {

        sendJson(
            response,
            400,
            {
                error:
                    "INVALID_JSON"
            }
        );

        return;

    }


    const expression =
        typeof payload.expression === "string"
            ? payload.expression.trim()
            : "";


    if (!expression) {

        sendJson(
            response,
            400,
            {
                error:
                    "MISSING_EXPRESSION"
            }
        );

        return;

    }


    try {

        const runtime =
            new MoWenRuntime(
                expression
            );


        const result =
            await runtime.run();


        /*
         * ---------------------------------------------------------
         * MoWen Publish Boundary
         * ---------------------------------------------------------
         *
         * Runtime 内部对象不得直接暴露给外部 API。
         *
         * 这里只返回 ReportFormatter 产生的 publish projection。
         * ---------------------------------------------------------
         */

        sendJson(
            response,
            200,
            result.report
        );

    } catch (
        error
    ) {

        sendJson(
            response,
            500,
            {
                error:
                    "RUNTIME_ERROR",

                message:
                    error instanceof Error
                        ? error.message
                        : String(error)
            }
        );

    }

}


const server =
    http.createServer(
        async (
            request,
            response
        ) => {

            const method =
                request.method || "";

            const url =
                request.url || "";


            if (
                method === "POST" &&
                url === "/v1/responsibility/check"
            ) {

                await handleCheck(
                    request,
                    response
                );

                return;

            }


            if (
                method === "GET" &&
                url === "/health"
            ) {

                sendJson(
                    response,
                    200,
                    {
                        status:
                            "ok",

                        service:
                            "mowen-responsibility-runtime"
                    }
                );

                return;

            }


            sendJson(
                response,
                404,
                {
                    error:
                        "NOT_FOUND"
                }
            );

        }
    );


server.listen(
    PORT,
    HOST,
    () => {

        console.log(
            `MoWen Responsibility API listening on http://${HOST}:${PORT}`
        );

        console.log(
            "POST /v1/responsibility/check"
        );

        console.log(
            "GET  /health"
        );

    }
);
