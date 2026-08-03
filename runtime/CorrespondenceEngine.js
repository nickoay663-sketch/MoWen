class CorrespondenceEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const correspondences =
            this.buildCorrespondences();



        return {


            semanticObject:
                this.semanticObject,


            principle:
                "莫问只建立对应关系，不把对应关系等同于证明。",


            correspondences,


            result: {

                correspondences

            },


            trace: [],


            nextRuntimeState:
                "ReasoningEngine",


            status:

                correspondences.length > 0

                    ? "correspondence-validated"

                    : "need-correspondence",


            questions:

                correspondences.length > 0

                    ? []

                    : [
                        "当前定义是否获得对应证据？"
                    ],


            version:

                "3.6"


        };

    }



    buildCorrespondences() {


        const definitions =

            this.semanticObject.definitions || [];



        const evidences =

            this.semanticObject.evidences || [];



        return definitions.map(definition => {



            const matchedEvidence =

                evidences.filter(evidence =>

                    evidence.id === definition.id

                );



            return {


                definition,


                evidences:

                    matchedEvidence,


                evidenceCount:

                    matchedEvidence.length,


                supported:

                    matchedEvidence.length > 0,


                correspondenceType:

                    "definition-evidence",


                verificationStatus:

                    matchedEvidence.length > 0

                        ? "pending"

                        : "missing-evidence"


            };


        });


    }


}


export default CorrespondenceEngine;