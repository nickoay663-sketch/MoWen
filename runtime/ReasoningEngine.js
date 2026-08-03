class ReasoningEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const reasonings =
            this.buildReasonings();

        return {

            semanticObject:
                this.semanticObject,

            principle:
                "莫问只检查推理关系，不提前生成判断。",

            reasonings,

            result: {

                reasonings

            },

            trace: [],

            nextRuntimeState:
                "ResponsibilityEngine",

            status:

                reasonings.length > 0
                    ? "reasoning-completed"
                    : "need-reasoning-verification",

            questions:

                reasonings.length > 0
                    ? []
                    : [
                        "当前对应关系是否能够支持表达？"
                    ],

            version:
                "3.5"

        };

    }

    buildReasonings() {

        const correspondences =
            this.semanticObject.correspondences || [];

        return correspondences.map(item => {

            const evidenceCount =
                item.evidences.length;

            return {

                definition:
                    item.definition,

                evidences:
                    item.evidences,

                evidenceCount,

                supported:
                    evidenceCount > 0,

                reasoningType:
                    "definition-supported-by-evidence",

                verificationStatus:
                    "pending"

            };

        });

    }

}

export default ReasoningEngine;