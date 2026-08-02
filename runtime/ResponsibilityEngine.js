class ResponsibilityEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const responsibilities =
            this.collectResponsibilities();

        return {

            semanticObject:
                this.semanticObject,

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
                        "谁提出了该表达？",
                        "该表达的责任来源是否明确？"
                    ],

            version:
                "3.0"

        };

    }

    collectResponsibilities() {

        return [

            {

                expression:
                    this.semanticObject.originalContent || "",

                provider:
                    this.semanticObject.responsibility || null,

                source:
                    null,

                responsibilityType:
                    "expression",

                verificationStatus:
                    "pending"

            }

        ];

    }

}

export default ResponsibilityEngine;
