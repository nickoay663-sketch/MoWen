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
                "莫问只记录证据状态，不替证据提供真实性保证。",


            evidences,


            result: {

                evidences

            },


            trace: [],


            nextRuntimeState:
                "CorrespondenceEngine",


            status:

                evidences.length > 0

                    ? "evidence-validated"

                    : "need-evidence",


            questions:

                evidences.length > 0

                    ? []

                    : [
                        "当前表达是否存在可验证证据？"
                    ],


            version:

                "3.6"


        };

    }



    collectEvidence() {


        const searches =

            this.semanticObject.search?.searches || [];



        return searches.map(search => {


            return {


                keyword:

                    search.keyword,


                id:

                    search.id,


                category:

                    search.category,


                content:

                    this.semanticObject.originalContent || "",



                source:

                    null,


                reference:

                    null,


                verificationStatus:

                    this.validate(search),


                evidenceType:

                    "concept",


                responsibility:

                    null


            };


        });


    }



    validate(search) {


        if (!search) {

            return "invalid";

        }


        if (!search.id) {

            return "unverified";

        }


        return "pending";


    }


}


export default EvidenceEngine;