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
                "莫问只建立对应，不创造证据，不裁决结论。",

            correspondences,

            result: {

                correspondences

            },

            trace: [],

            nextRuntimeState:
                "ReasoningEngine",

            status:

                correspondences.length > 0
                    ? "correspondence-completed"
                    : "need-correspondence-verification",

            questions:

                correspondences.length > 0
                    ? []
                    : [
                        "定义是否找到对应证据？"
                    ],

            version:
                "3.5"

        };

    }

    buildCorrespondences() {

        const definitions =
            this.semanticObject.definitions || [];

        const evidences =
            this.semanticObject.evidences || [];

        return definitions.map(definition => ({

            definition,

            evidences:

                evidences.filter(evidence =>

                    evidence.id === definition.id

                ),

            correspondenceType:
                "definition-evidence",

            verificationStatus:
                "pending"

        }));

    }

}

export default CorrespondenceEngine;