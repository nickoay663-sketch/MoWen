class EvidenceEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        const evidences = this.collectEvidence();


        return {


            semanticObject:

                this.semanticObject,


            principle:

                "莫问只收集和记录证据，不判断证据。",

               evidences,

            result: {

                evidences

            },

            trace: [],

            nextRuntimeState:
                "CorrespondenceEngine",



            status:

                "need-evidence-verification",



            version:

                "2.2"

        };


    }



    collectEvidence() {


        return [

            {


                statement:

                    this.semanticObject.originalContent || "",



                object:

                    this.semanticObject.objects || [],



                language:

                    this.semanticObject.language || null,



                source:

                    null,



                time:

                    null,



                location:

                    null,



                type:

                    "unknown",



                verifiable:

                    false



            }

        ];


    }


}


export default EvidenceEngine;
