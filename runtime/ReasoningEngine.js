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

                "莫问只验证推理链，不制造结论。",


            reasonings,


            result: {

                reasonings

            },


            trace: [],


            nextRuntimeState:

                "ResponsibilityEngine",



            status:

                reasonings.length > 0

                    ? "reasoning-validated"

                    : "need-reasoning",



            questions:

                reasonings.length > 0

                    ? []

                    : [
                        "当前推理是否有足够对应关系？"
                    ],



            version:

                "3.6"


        };

    }




    buildReasonings() {


        const correspondences =

            this.semanticObject.correspondences || [];



        return correspondences.map(item => {



            const evidenceCount =

                item.evidenceCount ??

                item.evidences?.length ??

                0;



            return {



                definition:

                    item.definition,



                evidences:

                    item.evidences || [],



                evidenceCount,



                supported:

                    item.supported === true
                        ||
                    evidenceCount > 0,



                reasoningType:

                    "evidence-supported-definition",



                verificationStatus:

                    item.supported

                        ? "pending"

                        : "insufficient-evidence"


            };


        });


    }


}


export default ReasoningEngine;