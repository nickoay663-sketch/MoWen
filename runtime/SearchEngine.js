import ExternalSourceConnector from "./ExternalSourceConnector.js";


class SearchEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const searches =

            this.createSearches();



        const sources =

            searches.flatMap(search => {


                return new ExternalSourceConnector(search).run().sources;


            });



        return {


            semanticObject:

                this.semanticObject,



            principle:

                "莫问搜索只发现验证入口，不把来源直接作为证据。",



            searches,



            sources,



            result: {

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
                    ],



            version:

                "3.8"


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