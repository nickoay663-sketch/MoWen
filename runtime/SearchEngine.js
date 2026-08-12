import EngineBase from "./EngineBase.js";

class SearchEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "SearchEngine",
            "11.0",
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
                        "completed",

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
                        "没有发现新的搜索来源。"
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


        const suppliedSources =
            this.getSuppliedSources();


        const runtimeInput =
            {

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


        const sources = [

            runtimeInput,

            ...suppliedSources

        ];


        return {

            sources,

            outputState:
                "DISCOVERED",

            verificationState:
                "UNVERIFIED",

            knowledgeExpanded:
                sources.length > 1,

            evidenceExpanded:
                false

        };

    }


    getSuppliedSources() {

        const supplied =
            this.semanticObject.searchResults;


        if (!Array.isArray(supplied)) {

            return [];

        }


        return supplied
            .filter(item => {

                return (

                    item &&

                    typeof item === "object" &&

                    (

                        item.source ||

                        item.url ||

                        item.content

                    )

                );

            })
            .map(item => {

                return {

                    source:
                        item.source ||
                        item.url ||
                        "ExternalSearchResult",

                    url:
                        item.url || null,

                    title:
                        item.title || null,

                    content:
                        item.content || "",

                    type:
                        item.type || "external",

                    state:
                        "DISCOVERED",

                    verificationStatus:
                        "UNVERIFIED",

                    independent:
                        item.independent === true

                };

            });

    }

}


export default SearchEngine;