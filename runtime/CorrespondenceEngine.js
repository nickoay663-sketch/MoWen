class CorrespondenceEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const correspondences =
            this.collectCorrespondence();


        return {

            semanticObject:
                this.runtimeObject,

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
                        "表达、定义和证据之间是否已经建立对应关系？"
                    ],

            version:
                "3.0"

        };

    }

    collectCorrespondence() {

        return [

            {

                objects:
                    this.runtimeObject.objects || [],

                definitions:
                    this.runtimeObject.definitions || [],

                evidences:
                    this.runtimeObject.evidences || [],

                verificationStatus:
                    "pending"

            }

        ];

    }

}

export default CorrespondenceEngine;
