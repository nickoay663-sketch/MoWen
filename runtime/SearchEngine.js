class SearchEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const searches =

            this.createSearches();



        return {


            semanticObject:

                this.semanticObject,



            principle:

                "莫问搜索只提出验证方向，不把搜索结果当作证据。",



            searches,



            result: {

                searches

            },



            trace: [],



            nextRuntimeState:

                "EvidenceEngine",



            status:

                searches.length > 0

                    ? "search-ready"

                    : "need-search",



            questions:

                searches.length > 0

                    ? []

                    : [
                        "当前表达是否需要外部验证来源？"
                    ],



            version:

                "3.7"


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

                    "pending"


            };


        });


    }


}


export default SearchEngine;