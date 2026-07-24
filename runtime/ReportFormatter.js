class ReportFormatter {

    constructor(result) {
        this.result = result;
    }


    run() {

        return {

            title: "莫问 · 诚实检查报告",

            originalText:
                this.result.evidence?.originalText || null,


            questions:
                this.result.generator?.report?.questions || [],


            selfCheck:
                this.result.selfCheck || null,


            status:
                "completed"

        };

    }

}


export default ReportFormatter;
