class ResponsibilityEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const responsibilities =
            this.collectResponsibilities();

        return {

            semanticObject:
                this.runtimeObject,

            principle:
                "莫问只建立责任关系，不提前裁决责任。",

            responsibilities,

            result: {

                responsibilities

            },

            trace: [],

            nextRuntimeState:
                "ReconstructionEngine",

            status:

                responsibilities.length > 0
                    ? "responsibility-completed"
                    : "need-responsibility-verification",

            questions:

                responsibilities.length > 0
                    ? []
                    : [
                        "谁应当对该表达承担责任？"
                    ],

            version:
                "3.1"

        };

    }

    collectResponsibilities() {

        return [

            {

                expression:
                    this.runtimeObject.originalContent || "",

                provider:
                    null,

                source:
                    null,

                reasoning:
                    this.runtimeObject.reasoning || null,

                responsibilityType:
                    "expression",

                verificationStatus:
                    "pending"

            }

        ];

    }

}

export default ResponsibilityEngine;