class EvidenceEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const evidences =
            this.collectEvidence();

        return {

            semanticObject:
                this.runtimeObject,

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
                "3.1"

        };

    }

    collectEvidence() {

        return [

            {

                content:
                    this.runtimeObject.originalContent || "",

                language:
                    this.runtimeObject.language || null,

                objects:
                    this.runtimeObject.objects || [],

                concepts:
                    this.runtimeObject.concepts || [],

                search:
                    this.runtimeObject.search || null,

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