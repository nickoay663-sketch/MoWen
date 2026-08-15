import EngineBase from "./EngineBase.js";
import ExternalSourceConnector from "./ExternalSourceConnector.js";

class SearchEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "SearchEngine",
            "12.0",
            "莫问搜索运行所需的信息来源。搜索可以扩大所见，但不能扩大所证。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const searchResult =
            this.search();


        return this.result({

            status:
                searchResult.sources.length > 0
                    ? "search-completed"
                    : "search-empty",

            metadata:
                this.metadata({

                    sourceCount:
                        searchResult.sources.length,

                    outputState:
                        searchResult.outputState,

                    verificationState:
                        searchResult.verificationState,

                    knowledgeExpanded:
                        searchResult.knowledgeExpanded,

                    evidenceExpanded:
                        searchResult.evidenceExpanded

                }),

            sources:
                searchResult.sources,

            result: {

                sources:
                    searchResult.sources,

                outputState:
                    searchResult.outputState,

                verificationState:
                    searchResult.verificationState,

                knowledgeExpanded:
                    searchResult.knowledgeExpanded,

                evidenceExpanded:
                    searchResult.evidenceExpanded

            },

            trace: [

                {

                    engine:
                        "SearchEngine",

                    action:
                        "search",

                    status:
                        searchResult.sources.length > 0
                            ? "completed"
                            : "empty",

                    outputState:
                        searchResult.outputState,

                    verificationState:
                        searchResult.verificationState

                }

            ],

            questions:
                searchResult.sources.length > 0
                    ? []
                    : [
                        "没有发现新的外部来源。"
                    ],

            nextRuntimeState:
                "EvidenceEngine"

        });

    }


    search() {

        const content =
            this.semanticObject.originalContent || "";


        if (!content) {

            return {

                sources: [],

                outputState:
                    "DISCOVERED",

                verificationState:
                    "UNVERIFIED",

                knowledgeExpanded:
                    false,

                evidenceExpanded:
                    false

            };

        }


        const connector =
            new ExternalSourceConnector({

                keyword:
                    content,

                sources:
                    this.semanticObject.searchResults

            });


        const connectionResult =
            connector.run();


        const suppliedSources =
            Array.isArray(
                connectionResult.sources
            )
                ? connectionResult.sources
                : [];


        const runtimeInput = {

            source:
                "RuntimeInput",

            content,

            type:
                "input",

            state:
                "DISCOVERED",

            verificationStatus:
                "UNVERIFIED",

            independent:
                false

        };


        /*
         * RuntimeInput 不是外部搜索结果。
         *
         * 它只是保存用户原始表达，
         * 因此不能被计入外部来源数量，
         * 也不能被当作独立证据。
         */

        return {

            sources:
                suppliedSources,

            outputState:
                "DISCOVERED",

            verificationState:
                "UNVERIFIED",

            knowledgeExpanded:
                suppliedSources.length > 0,

            evidenceExpanded:
                false,

            runtimeInput

        };

    }

}


export default SearchEngine;
