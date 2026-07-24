class ReportFormatter {

    constructor(result) {
        this.result = result;
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


        const selfCheck =
            this.result.selfCheck;


        return {

            title:
                "莫问 · 诚实检查报告",


            originalText:
                evidence?.originalText || null,


            evidence:
                evidence?.evidences || [],


            questions: [

                correspondence?.correspondence?.question,

                reasoning?.reasoning?.question,

                responsibility?.responsibility?.question

            ],


            selfCheck,


            status:
                "completed"

        };

    }

}


export default ReportFormatter;
