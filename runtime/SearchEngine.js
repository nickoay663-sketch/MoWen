import ExternalSourceConnector from "./ExternalSourceConnector.js";

class SearchEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const metadata =
            this.buildMetadata();

        const searches =
            this.createSearches();

        const sources =

            searches.flatMap(search =>

                new ExternalSourceConnector(search).run().sources

            );

        return {

            engine:
                "SearchEngine",

            version:
                "6.6",

            semanticObject:
                this.semanticObject,

            principle:
                "莫问搜索只发现验证入口，不把来源直接作为证据。",

            metadata,

            searches,

            sources,

            result: {

                metadata,

                searches,

                sources

            },

            trace: [],

            nextRuntimeState:
                "EvidenceEngine",

            status:

                searches.length > 0

                    ? "search-connected"

                    : "need-search",

            questions:

                searches.length > 0

                    ? []

                    : [
                        "当前表达是否需要外部来源验证？"
                    ]

        };

    }

        buildMetadata() {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion || "",

            contractVersion:
                this.semanticObject.contract?.version || "",

            engineCount:

                Object.keys(

                    this.semanticObject.engines || {}

                ).length,

            traceCount:

                (this.semanticObject.runtimeTrace || []).length

        };

    }



    createSearches() {

        const concepts =
            this.semanticObject.concepts || [];

        return concepts.map(concept => {

            return {

                                keyword:
                    concept.word,

                conceptId:
                    concept.id,

                category:
                    concept.category,

                searchType:
                    "verification",

                sourceRequired:
                    true,

                status:
                    "pending",

                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],

                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };

        });

    }

}

export default SearchEngine;