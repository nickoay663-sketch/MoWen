class GeneratorEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const report =
            this.buildReport();

        return {

            semanticObject:
                this.runtimeObject.semanticObject,

            principle:
                "莫问不直接给出结论，只生成基于运行链的表达。",

            reconstruction:
                this.runtimeObject.reconstruction,

            responsibility:
                this.runtimeObject.responsibility,

            report,

            conclusion:
                "莫问没有直接给出结论，而是提出需要验证的问题。",

            result: {

                report

            },

            trace: [],

            nextRuntimeState:
                "SelfCheckEngine",

            status:
                "generator-completed",

            version:
                "3.5"

        };

    }

    buildReport() {

        const reconstruction =
            this.runtimeObject.reconstruction?.reconstruction ??

            this.runtimeObject.reconstruction?.result?.reconstruction ??

            {};

        return {

            expression:
                reconstruction.originalExpression || "",

            reconstruction,

            responsibilities:
                reconstruction.responsibilities || [],

            responsibilityCount:
                reconstruction.responsibilityCount || 0,

            verificationStatus:
                reconstruction.verificationStatus || "pending"

        };

    }

}

export default GeneratorEngine;