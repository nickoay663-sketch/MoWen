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

                "莫问建立定义、证据与来源之间的对应，不制造证明。",



            correspondences,



            result: {

                correspondences

            },



            trace: [],



            nextRuntimeState:

                "ReasoningEngine",



            status:

                correspondences.length > 0

                    ? "correspondence-ready"

                    : "need-correspondence",



            questions:

                correspondences.length > 0

                    ? []

                    : [
                        "当前定义是否获得对应证据支持？"
                    ],



            version:

                "3.7"


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

                        item.source

                    ).length,



                supported:

                    matched.length > 0,



                sourceAvailable:

                    matched.some(item =>

                        item.source

                    ),



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