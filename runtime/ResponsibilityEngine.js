class ResponsibilityEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const responsibilities =
            this.buildResponsibilities();

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
                        "谁应当对当前表达承担责任？"
                    ],

            version:
                "3.5"

        };

    }

    buildResponsibilities() {

        const reasonings =
            this.semanticObject.reasonings || [];

        return reasonings.map(reasoning => ({

            expression:
                this.semanticObject.originalContent || "",

            definition:
                reasoning.definition,

            supported:
                reasoning.supported,

            evidenceCount:
                reasoning.evidenceCount,

            responsibilityType:
                "expression",

            provider:
                null,

            source:
                null,

            verificationStatus:
                "pending"

        }));

    }

}

export default ResponsibilityEngine;