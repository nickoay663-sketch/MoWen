class ReconstructionEngine {


    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }



    run() {


        const reconstruction =

            this.buildReconstruction();



        return {


            semanticObject:

                this.runtimeObject,



            principle:

                "莫问重构表达，但不增加原表达没有的依据。",



            reconstruction,



            result: {

                reconstruction

            },



            trace: [],



            nextRuntimeState:

                "GeneratorEngine",



            status:

                reconstruction

                    ? "reconstruction-validated"

                    : "need-reconstruction",



            questions:

                reconstruction

                    ? []

                    : [
                        "重构是否保持原始证据边界？"
                    ],



            version:

                "3.6"


        };

    }





    buildReconstruction() {


        const responsibilities =

            this.runtimeObject.responsibility?.responsibilities ||

            [];



        return {



            originalExpression:

                this.runtimeObject.semanticObject?.originalContent ||

                "",



            reconstructedExpression:

                this.runtimeObject.semanticObject?.originalContent ||

                "",



            language:

                this.runtimeObject.semanticObject?.language ||

                null,



            responsibilities,



            responsibilityCount:

                responsibilities.length,



            supportedCount:

                responsibilities.filter(item =>

                    item.supported === true

                ).length,



            evidenceBoundary:

                "preserved",



            verificationStatus:

                "pending"


        };


    }


}


export default ReconstructionEngine;