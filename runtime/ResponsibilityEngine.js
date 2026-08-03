class ResponsibilityEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const responsibilities =

            this.buildResponsibilities();



        return {


            semanticObject:

                this.semanticObject,


            principle:

                "莫问只记录责任关系，不提前裁决责任归属。",



            responsibilities,



            result: {

                responsibilities

            },



            trace: [],



            nextRuntimeState:

                "ReconstructionEngine",



            status:

                responsibilities.length > 0

                    ? "responsibility-validated"

                    : "need-responsibility",



            questions:

                responsibilities.length > 0

                    ? []

                    : [
                        "当前表达由谁承担验证责任？"
                    ],



            version:

                "3.6"


        };

    }





    buildResponsibilities() {


        const reasonings =

            this.semanticObject.reasonings || [];



        return reasonings.map(reasoning => {



            return {



                expression:

                    this.semanticObject.originalContent || "",



                definition:

                    reasoning.definition,



                supported:

                    reasoning.supported,



                evidenceCount:

                    reasoning.evidenceCount,



                reasoningType:

                    reasoning.reasoningType,



                provider:

                    null,



                source:

                    null,



                responsibilityType:

                    "verification",



                verificationStatus:

                    reasoning.supported

                        ? "pending"

                        : "insufficient-evidence"


            };


        });


    }


}


export default ResponsibilityEngine;