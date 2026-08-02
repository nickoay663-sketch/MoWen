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
                "SelfCheckEngine",

            status:

                reconstruction
                    ? "reconstruction-completed"
                    : "need-reconstruction-verification",

            questions:

                reconstruction
                    ? []
                    : [
                        "重构后的表达是否保留原始责任？",
                        "重构后的表达是否超过已有依据？"
                    ],

            version:
                "3.0"

        };

    }

    reconstruct() {

        return {

            originalExpression:
                this.runtimeObject.originalContent || "",

            reconstructedExpression:
                this.runtimeObject.originalContent || "",

            languageEnvironment:
                this.runtimeObject.languageEnvironment || null,

            responsibility:
                this.runtimeObject.responsibility || null,

            verificationStatus:
                "pending"

        };

    }

}

export default ReconstructionEngine;
