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

                "莫问建立定义、证据和来源入口之间的对应关系。",



            correspondences,



            result: {

                correspondences

            },



            trace: [],



            nextRuntimeState:

                "ReasoningEngine",



            status:

                correspondences.length > 0

                    ? "correspondence-connected"

                    : "need-correspondence",



            questions:

                correspondences.length > 0

                    ? []

                    : [
                        "当前定义是否获得来源支持？"
                    ],



            version:

                "3.8"


        };

    }





    buildCorrespondences() {


        const definitions =

            this.semanticObject.definitions || [];



        const evidences =

            this.semanticObject.evidences || [];



        return definitions.map(definition => {



            const matched =

                evidences.filter(evidence =>

                    evidence.conceptId === definition.id

                );



            return {



                definition,



                evidences:

                    matched,



                evidenceCount:

                    matched.length,



                sourceCount:

                    matched.filter(item =>

                        item.sourceAvailable === true

                    ).length,



                sourceAvailable:

                    matched.some(item =>

                        item.sourceAvailable === true

                    ),



                supported:

                    matched.length > 0,



                correspondenceType:

                    "definition-evidence-source",



                verificationStatus:

                    matched.length > 0

                        ? "pending"

                        : "missing-evidence"


            };


        });


    }


}


export default CorrespondenceEngine;