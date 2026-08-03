class ReconstructionEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const reconstruction =
            this.buildReconstruction();

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
                        "重构是否保持原始责任？",
                        "重构是否超出已有证据？"
                    ],

            version:
                "3.5"

        };

    }

    buildReconstruction() {

        const responsibilities =
            this.runtimeObject.responsibility?.responsibilities ??

            this.runtimeObject.responsibility?.result?.responsibilities ??

            [];

        return {

            originalExpression:

                this.runtimeObject.semanticObject?.originalContent ||

                "",

            reconstructedExpression:

                this.runtimeObject.semanticObject?.originalContent ||

                "",

            language:

                this.runtimeObject.semanticObject?.language ||

                null,

            responsibilities,

            responsibilityCount:

                responsibilities.length,

            verificationStatus:

                "pending"

        };

    }

}

export default ReconstructionEngine;