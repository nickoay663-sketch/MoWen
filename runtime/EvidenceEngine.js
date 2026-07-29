class EvidenceEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {


        return {


            semanticObject:

                this.semanticObject,


            principle:

                "莫问只收集和记录证据，不判断证据。",



            evidences:

                this.collectEvidence(),



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
