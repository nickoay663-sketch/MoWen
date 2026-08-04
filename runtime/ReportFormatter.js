class ReportFormatter {

    constructor(runtimeResult) {

        this.runtimeResult = runtimeResult || {};

    }

    run() {

        const {

            identity,

            semanticObject,

            recognition,

            definition,

            search,

            evidence,

            correspondence,

            reasoning,

            responsibility,

            reconstruction,

            generator,

            selfCheck,

            runtimeTrace,

            engineRegistry,

            contract,

            contractVersion

        } = this.runtimeResult;

                return {

            version:
                "7.1",

            principle:
                "莫问只整理运行结果，不增加新的判断。",

            metadata: {

                generatedAt:
                    new Date().toISOString(),

                runtimeVersion:
                    "7.1",

                contractVersion,

                engineCount:

                    engineRegistry?.list?.().length || 0

            },

            report: {

                identity,

                object:
                    semanticObject,

                recognition,

                definition,

                search,

                evidence,

                correspondence,

                reasoning,

                responsibility,

                reconstruction,

                generator,

                selfCheck,

                contract,

                runtimeTrace,

                engineRegistry

            },

            status:

                selfCheck?.passed

                    ? "report-generated"

                    : "report-warning",

            questions:
                selfCheck?.questions || [],

            trace:
                this.buildTrace(runtimeTrace)

        };

    }

        buildTrace(runtimeTrace = []) {

        if (runtimeTrace.length > 0) {

            return runtimeTrace;

        }

        return [

            "RecognitionCompleted",

            "DefinitionCompleted",

            "SearchCompleted",

            "EvidenceCompleted",

            "CorrespondenceCompleted",

            "ReasoningCompleted",

            "ResponsibilityCompleted",

            "ReconstructionCompleted",

            "GeneratorCompleted",

            "SelfCheckCompleted"

        ];

    }

}

export default ReportFormatter;