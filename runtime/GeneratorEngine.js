class GeneratorEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const report =
            this.buildReport();

        return {

            engine:
                "GeneratorEngine",

            version:
                "4.2",

            semanticObject:
                this.runtimeObject.semanticObject,

            principle:
                "莫问输出验证报告，不输出未经验证的事实结论。",

            report,

            result: {

                report

            },

            trace: [],

            questions: [],

            nextRuntimeState:
                "SelfCheckEngine",

            status:
                "generator-connected"

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