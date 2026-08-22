import http from "node:http";

const server =
    http.createServer(
        (request, response) => {
            response.end("ok");
        }
    );

server.listen(
    8787,
    "127.0.0.1",
    () => {
        console.log("TEST_FILE_SERVER_LISTENING");
        console.log(
            "listening=",
            server.listening
        );
    }
);
