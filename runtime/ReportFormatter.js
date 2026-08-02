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

            evidence,

            correspondence,

            reasoning,

            responsibility,

            reconstruction,

            generator,

            selfCheck

        } = this.runtimeResult;


        return {

            version:

                "3.0",


            principle:

                "莫问只整理运行结果，不增加新的判断。",


            report: {

                identity,

                object:

                    semanticObject,


                recognition,

                definition,


                evidence,


                correspondence,


                reasoning,


                responsibility,


                reconstruction,


                generator,


                selfCheck

            },


            status:

                selfCheck?.passed

                    ? "report-generated"

                    : "report-warning",


            questions:

                selfCheck?.questions || [],


            trace:

                this.buildTrace()

        };

    }


    buildTrace() {

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