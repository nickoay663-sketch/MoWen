class ReasoningEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const metadata =
            this.buildMetadata();

        const reasonings =
            this.buildReasonings();

        return {

            engine:
                "ReasoningEngine",

            version:
                "6.3",

            semanticObject:
                this.semanticObject,

            principle:
                "莫问根据证据和来源状态生成推理状态，不直接生成事实结论。",

            metadata,

            reasonings,

            result: {

                metadata,

                reasonings

            },

            trace: [],

            questions:

                reasonings.length > 0

                    ? []

                    : [
                        "当前推理是否具有来源支持？"
                    ],

            nextRuntimeState:
                "ResponsibilityEngine",

            status:

                reasonings.length > 0

                    ? "reasoning-connected"

                    : "need-reasoning"

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



    buildReasonings() {

        const correspondences =
            this.semanticObject.correspondences || [];

        return correspondences.map(item => {

            return {

                                definition:
                    item.definition,

                evidences:
                    item.evidences || [],

                evidenceCount:
                    item.evidenceCount || 0,

                sourceAvailable:
                    item.sourceAvailable || false,

                sourceCount:
                    item.sourceCount || 0,

                supported:
                    item.supported || false,

                reasoningType:
                    "source-supported-chain",

                verificationStatus:

                    item.supported && item.sourceAvailable

                        ? "pending"

                        : "insufficient-source",

                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],

                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };

        });

    }

}

export default ReasoningEngine;