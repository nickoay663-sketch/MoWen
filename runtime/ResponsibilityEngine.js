class ResponsibilityEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const metadata =
            this.buildMetadata();

        const responsibilities =
            this.buildResponsibilities();

        return {

            engine:
                "ResponsibilityEngine",

            version:
                "6.2",

            semanticObject:
                this.semanticObject,

            principle:
                "莫问记录表达、证据与来源责任，不替任何来源背书。",

            metadata,

            responsibilities,

            result: {

                metadata,

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

        buildMetadata() {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion || "",

            contractVersion:
                this.semanticObject.contract?.version || "",

            engineCount:

                Object.keys(

                    this.semanticObject.engines || {}

                ).length,

            traceCount:

                (this.semanticObject.runtimeTrace || []).length

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
                reasoning.verificationStatus,

            runtimeTrace:
                this.semanticObject.runtimeTrace || [],

            engineRegistry:

                this.semanticObject.engineRegistry?.describe?.() || []

        }));

    }

}

export default ResponsibilityEngine;