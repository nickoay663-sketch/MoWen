class EvidenceEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const evidences =

            this.collectEvidence();



        return {


            semanticObject:

                this.semanticObject,



            principle:

                "莫问记录证据来源与状态，不替代验证过程。",



            evidences,



            result: {

                evidences

            },



            trace: [],



            nextRuntimeState:

                "CorrespondenceEngine",



            status:

                evidences.length > 0

                    ? "evidence-ready"

                    : "need-evidence",



            questions:

                evidences.length > 0

                    ? []

                    : [
                        "当前表达是否存在可追溯证据？"
                    ],



            version:

                "3.7"


        };

    }





    collectEvidence() {


        const searches =

            this.semanticObject.search?.searches || [];



        return searches.map(search => {



            return {


                keyword:

                    search.keyword,



                conceptId:

                    search.conceptId,



                category:

                    search.category,



                content:

                    this.semanticObject.originalContent || "",



                source:

                    null,



                sourceType:

                    "unknown",



                reference:

                    null,



                citation:

                    null,



                verificationStatus:

                    "pending",



                evidenceType:

                    "verification-source",



                responsibility:

                    null


            };


        });


    }


}


export default EvidenceEngine;