import MoWenConfig from "./MoWenConfig.js";

class ReconstructionEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        return {

            semanticObject:

                this.semanticObject,

            principle:

                "表达范围不能超过依据范围。",

            reconstruction:

                this.reconstruct(),

            questions:

                [
                    "重构后的表达是否保留原始责任？",
                    "重构后的表达是否超过已有依据？"
                ],

            status:

                "need_reconstruction_verification",

            version:

                "2.2"

        };

    }


    reconstruct() {

        return {

            originalExpression:

                this.semanticObject.originalContent || "",


            reconstructedExpression:

                "根据已有定义、证据、对应关系和推理结构重新表达。",


            languageEnvironment:

                this.semanticObject.languageEnvironment || null,


            responsibility:

                this.semanticObject.responsibility || null,


            state:

                "pending"

        };

    }

}


export default ReconstructionEngine;
