class ExternalSourceConnector {

    constructor(searchRequest) {

        this.searchRequest =
            searchRequest || {};

    }


    run() {

        const sources =
            this.collectSources();


        return {

            engine:
                "ExternalSourceConnector",

            version:
                "5.0",

            principle:
                "莫问连接外部来源，但不把来源内容直接视为证据。没有真实来源时，不制造来源对象。",

            status:
                sources.length > 0
                    ? "source-connected"
                    : "need-source",

            sources,

            result: {

                sources,

                sourceCount:
                    sources.length,

                outputState:
                    "DISCOVERED",

                verificationState:
                    "UNVERIFIED",

                evidenceCreated:
                    false

            },

            trace: [

                {

                    engine:
                        "ExternalSourceConnector",

                    action:
                        "collect-source",

                    status:
                        sources.length > 0
                            ? "completed"
                            : "empty"

                }

            ],

            questions:
                sources.length > 0
                    ? []
                    : [
                        "没有连接到真实外部来源。"
                    ],

            nextRuntimeState:
                "EvidenceEngine"

        };

    }


    collectSources() {

        const suppliedSources =
            this.searchRequest.sources;


        if (
            !Array.isArray(
                suppliedSources
            )
        ) {

            return [];

        }


        return suppliedSources
            .filter(
                source =>
                    this.isRealSource(source)
            )
            .map(
                source =>
                    this.normalizeSource(source)
            );

    }


    isRealSource(source) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return false;

        }


        /*
         * 外部来源至少必须具有：
         *
         * 1. source / url
         * 2. content
         *
         * 两者都不存在时，
         * 不能制造来源。
         */

        const hasSourceIdentity =
            Boolean(
                source.source ||
                source.url
            );


        const hasContent =
            typeof source.content === "string" &&
            source.content.trim().length > 0;


        return (
            hasSourceIdentity &&
            hasContent
        );

    }


    normalizeSource(source) {

        return {

            source:
                source.source ||
                source.url ||
                "ExternalSearchResult",

            url:
                source.url || null,

            title:
                source.title || null,

            publisher:
                source.publisher || null,

            publishedTime:
                source.publishedTime || null,

            content:
                source.content,

            type:
                source.type ||
                "external",

            state:
                "DISCOVERED",

            verificationStatus:
                source.verificationStatus ||
                "UNVERIFIED",

            epistemicState:
                "DISCOVERED",

            verified:
                source.verified === true,

            verificationBasis:
                source.verificationBasis ||
                null,

            verificationSource:
                source.verificationSource ||
                null,

            verifier:
                source.verifier ||
                null,

            supportsClaim:
                source.supportsClaim === true,

            independent:
                source.independent === true

        };

    }

}


export default ExternalSourceConnector;
