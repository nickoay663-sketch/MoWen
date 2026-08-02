class SearchEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        const query = this.buildQuery();

        const sources = [];

        const results = [];


        return {


            semanticObject:

                this.semanticObject,


            principle:

                "Search 提供信息支持，不替代定义、证据和判断。",


           query,

           sources,

           results,
                
            result: {

                query,
                
                sources,

                results

            },

            trace: [],

            nextRuntimeState:
                "EvidenceEngine",


            status:

                "need_search_verification",


            version:

                "2.2"

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


}


export default SearchEngine;
