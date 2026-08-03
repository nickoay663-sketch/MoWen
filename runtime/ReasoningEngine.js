class ReasoningEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const reasonings =

            this.buildReasonings();



        return {


            semanticObject:

                this.semanticObject,



            principle:

                "莫问检查推理是否有对应依据，不把可能性变成结论。",



            reasonings,



            result: {

                reasonings

            },



            trace: [],



            nextRuntimeState:

                "ResponsibilityEngine",



            status:

                reasonings.length > 0

                    ? "reasoning-ready"

                    : "need-reasoning",



            questions:

                reasonings.length > 0

                    ? []

                    : [
                        "当前推理是否有足够依据？"
                    ],



            version:

                "3.7"


        };

    }





    buildReasonings() {


        const correspondences =

            this.semanticObject.correspondences || [];



        return correspondences.map(item => {



            const sourceAvailable =

                item.sourceAvailable === true;



            const supported =

                item.supported === true;



            return {



                definition:

                    item.definition,



                evidences:

                    item.evidences || [],



                evidenceCount:

                    item.evidenceCount || 0,



                sourceAvailable,



                supported,



                reasoningType:

                    "evidence-source-chain",



                verificationStatus:

                    supported && sourceAvailable

                        ? "pending"

                        : "insufficient-source"


            };


        });


    }


}


export default ReasoningEngine;