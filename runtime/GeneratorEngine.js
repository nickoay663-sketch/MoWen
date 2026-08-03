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
                "莫问输出验证报告，不输出未经验证的事实结论。",

            report,

            result: {
                report
            },

            trace: [],

            nextRuntimeState:
                "SelfCheckEngine",

            status:
                "generator-connected",

            questions: [],

            version:
                "3.8"

        };

    }

    buildReport() {

        const reconstruction =
            this.runtimeObject.reconstruction?.reconstruction || {};

        return {

            expression:
                reconstruction.originalExpression,

            reconstructedExpression:
                reconstruction.reconstructedExpression,

            language:
                reconstruction.language,

            responsibilities:
                reconstruction.responsibilities || [],

            responsibilityCount:
                reconstruction.responsibilityCount || 0,

            sources:
                reconstruction.sources || [],

            sourceCount:
                reconstruction.sourceCount || 0,

            evidenceBoundary:
                reconstruction.evidenceBoundary,

            sourceBoundary:
                reconstruction.sourceBoundary,

            responsibilityBoundary:
                reconstruction.responsibilityBoundary,

            expansion:
                reconstruction.expansion,

            verificationStatus:
                reconstruction.verificationStatus

        };

    }

}

export default GeneratorEngine;