class ReportFormatter {

    constructor(result) {

        this.result = result || {};

    }


    run() {

        const evidence =
            this.result.evidence;


        const correspondence =
            this.result.correspondence;


        const reasoning =
            this.result.reasoning;


        const responsibility =
            this.result.responsibility;


        const reconstruction =
            this.result.reconstruction;


        const selfCheck =
            this.result.selfCheck;


        return {

            title:

                "莫问 · 诚实检查报告",


            testimony:

                evidence?.testimony ||

                evidence?.originalText ||

                null,


            evidence:

                evidence?.evidences || [],


            correspondence:

                correspondence?.correspondences || [],


            reasoning:

                reasoning?.reasonings || [],


            responsibility:

                responsibility?.responsibilities || [],


            questions: [

                correspondence
                    ?.correspondences
                    ?.[0]
                    ?.message,


                reasoning
                    ?.reasonings
                    ?.[0]
                    ?.message,


                responsibility
                    ?.responsibilities
                    ?.[0]
                    ?.message

            ].filter(Boolean),


            reconstruction,


            selfCheck,


            runtimeStatus:

                selfCheck?.passed

                    ? "self-check-passed"

                    : "self-check-warning",


            status:

                "completed",


            version:

                "2.1"

        };

    }

}


export default ReportFormatter;
