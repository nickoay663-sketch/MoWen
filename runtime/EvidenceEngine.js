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
                "莫问只收集和记录证据，不判断证据。",

            evidences,

            result: {

                evidences

            },

            trace: [],

            nextRuntimeState:
                "CorrespondenceEngine",

            status:

                evidences.length > 0
                    ? "evidence-collected"
                    : "need-evidence-verification",

            questions:

                evidences.length > 0
                    ? []
                    : [
                        "是否存在可以支持该表达的证据？"
                    ],

            version:
                "3.0"

        };

    }

    collectEvidence() {

        return [

            {

                content:
                    this.semanticObject.originalContent || "",

                objects:
                    this.semanticObject.objects || [],

                language:
                    this.semanticObject.language || null,

                source:
                    null,

                time:
                    null,

                location:
                    null,

                reference:
                    null,

                verificationStatus:
                    "unverified",

                responsibility:
                    null

            }

        ];

    }

}

export default EvidenceEngine;
