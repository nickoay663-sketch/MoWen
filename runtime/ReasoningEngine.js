class ReasoningEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        return {

            semanticObject: this.semanticObject,

            principle:
                "莫问只检查推理关系，不提前生成判断。",

            reasonings:
                this.analyzeReasoning(),

            status:
                "need_verification",

            version:
                "2.2"

        };

    }


    analyzeReasoning() {

        return [

            {

                premises:
                    this.semanticObject.premises || [],

                correspondence:
                    this.semanticObject.correspondence || null,

                conclusion:
                    null,

                question:
                    "当前表达是否由已有证据和对应关系推出？",

                state:
                    "pending"

            }

        ];

    }

}


export default ReasoningEngine;
