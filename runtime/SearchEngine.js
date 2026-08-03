class SearchEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const query =
            this.buildQuery();

        const searches =
            this.buildSearches(query);

        return {

            semanticObject:
                this.semanticObject,

            principle:
                "莫问只检索，不创造知识。",

            query,

            searches,

            result: {

                query,

                searches

            },

            trace: [],

            nextRuntimeState:
                "EvidenceEngine",

            status:

                searches.length > 0
                    ? "search-completed"
                    : "need-search-verification",

            questions:

                searches.length > 0
                    ? []
                    : [
                        "是否已经为所有对象和概念建立检索任务？"
                    ],

            version:
                "3.1"

        };

    }

    buildQuery() {

        return {

            language:
                this.semanticObject.language || null,

            expression:
                this.semanticObject.originalContent || "",

            concepts:
                this.semanticObject.concepts || [],

            objects:
                this.semanticObject.objects || []

        };

    }

    buildSearches(query) {

        const searches = [];

        for (const object of query.objects) {

            searches.push({

                keyword: object.word,

                id: object.id,

                category: object.type,

                status: "pending"

            });

        }

        for (const concept of query.concepts) {

            searches.push({

                keyword: concept.word,

                id: concept.id,

                category: concept.category,

                status: "pending"

            });

        }

        return searches;

    }

}

export default SearchEngine;