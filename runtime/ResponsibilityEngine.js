class ResponsibilityEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const responsibilities =
            this.buildResponsibilities();

        return {

            engine:
                "ResponsibilityEngine",

            version:
                "4.2",

            semanticObject:
                this.semanticObject,

            principle:
                "莫问记录表达、证据与来源责任，不替任何来源背书。",

            responsibilities,

            result: {

                responsibilities

            },

            trace: [],

            questions:

                responsibilities.length > 0

                    ? []

                    : [
                        "当前来源责任是否明确？"
                    ],

            nextRuntimeState:
                "ReconstructionEngine",

            status:

                responsibilities.length > 0

                    ? "responsibility-connected"

                    : "need-responsibility"

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

            sourceCount:
                reasoning.sourceCount,

            sourceAvailable:
                reasoning.sourceAvailable,

            sources:
                reasoning.evidences || [],

            expressionResponsibility:
                null,

            evidenceResponsibility:
                null,

            sourceResponsibility:
                null,

            verificationResponsibility:
                "required",

            responsibilityType:
                "external-source-chain",

            verificationStatus:
                reasoning.verificationStatus

        }));

    }

}

export default ResponsibilityEngine;