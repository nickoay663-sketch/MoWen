class CorrespondenceEngine {


    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }



    run() {

        const correspondences =
            this.collectCorrespondence();


        return {


            semanticObject:

                this.runtimeObject,



            principle:

                "莫问只建立对应，不创造证据，不裁决结论。",

            correspondences,

            result: {

                correspondences

            },

            trace: [],

            nextRuntimeState:
                "ReasoningEngine",



            status:

                "need-correspondence-verification",



            version:

                "2.2"


        };


    }



    collectCorrespondence() {


        return [

            {


                object:

                    this.runtimeObject.objects || [],



                definition:

                    this.runtimeObject.definitions || [],



                evidence:

                    this.runtimeObject.evidences || [],



                reasoning:

                    null,



                state:

                    "pending"



            }

        ];


    }


}



export default CorrespondenceEngine;
