class ReasoningEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const reasonings =
            this.analyzeReasoning();

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
                        "当前表达是否能够由已有定义、证据和对应关系推出？"
                    ],

            version:
                "3.0"

        };

    }

    analyzeReasoning() {

        return [

            {

                premises:
                    this.semanticObject.premises || [],

                correspondences:
                    this.semanticObject.correspondences || [],

                conclusion:
                    null,

                verificationStatus:
                    "pending"

            }

        ];

    }

}

export default ReasoningEngine;
