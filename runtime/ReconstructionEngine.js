import MoWenConfig from "./MoWenConfig.js";

class ReconstructionEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const reconstruction =
            this.reconstruct();

        return {

            semanticObject:
                this.runtimeObject,

            principle:
                "重构提高表达承担责任的能力，不创造新的依据。",

            reconstruction,

            result: {

                reconstruction

            },

            trace: [],

            nextRuntimeState:
                "GeneratorEngine",

            status:

                reconstruction
                    ? "reconstruction-completed"
                    : "need-reconstruction-verification",

            questions:

                reconstruction
                    ? []
                    : [
                        "重构后的表达是否保留原始责任？",
                        "重构后的表达是否超出已有定义、证据和推理范围？"
                    ],

            version:
                "3.1"

        };

    }

    reconstruct() {

        const semantic =
            this.runtimeObject.semanticObject || {};

        return {

            originalExpression:
                semantic.originalContent || "",

            reconstructedExpression:
                semantic.originalContent || "",

            languageEnvironment:
                semantic.language || null,

            definition:
                this.runtimeObject.definition || null,

            evidence:
                this.runtimeObject.evidence || null,

            correspondence:
                this.runtimeObject.correspondence || null,

            reasoning:
                this.runtimeObject.reasoning || null,

            responsibility:
                this.runtimeObject.responsibility || null,

            verificationStatus:
                "pending"

        };

    }

}

export default ReconstructionEngine;