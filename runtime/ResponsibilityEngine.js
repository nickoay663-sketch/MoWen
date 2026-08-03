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

                "莫问区分表达责任、证据责任和来源责任。",



            responsibilities,



            result: {

                responsibilities

            },



            trace: [],



            nextRuntimeState:

                "ReconstructionEngine",



            status:

                responsibilities.length > 0

                    ? "responsibility-ready"

                    : "need-responsibility",



            questions:

                responsibilities.length > 0

                    ? []

                    : [
                        "当前验证责任是否明确？"
                    ],



            version:

                "3.7"


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



                sourceAvailable:

                    reasoning.sourceAvailable,



                expressionResponsibility:

                    "unknown",



                evidenceResponsibility:

                    "unknown",



                sourceResponsibility:

                    "unknown",



                verificationResponsibility:

                    "required",



                responsibilityType:

                    "verification-chain",



                verificationStatus:

                    reasoning.sourceAvailable

                        ? "pending"

                        : "source-required"


            };


        });


    }


}


export default ResponsibilityEngine;