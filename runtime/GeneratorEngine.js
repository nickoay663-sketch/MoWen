class GeneratorEngine {

    constructor(data) {
        this.data = data;
    }

    run() {

        const questions = [

            this.data.correspondence?.correspondence?.question,

            this.data.reasoning?.reasoning?.question,

            this.data.responsibility?.responsibility?.question

        ].filter(Boolean);

        const report = {

            originalText:
                this.data.evidence?.originalText || null,

            questions,

            conclusion:
                "莫问没有直接给出结论，而是提出需要验证的问题。"

        };

        // Honest Stop
        if (this.data.recognition?.matched === false) {

            report.stop = true;
            report.stage = "Recognition";
            report.reason =
                this.data.recognition.question;

        } else if (this.data.definition?.matched === false) {

            report.stop = true;
            report.stage = "Definition";
            report.reason =
                this.data.definition.question;

        } else {

            report.stop = false;

        }

        return {

            report,

            status: "Generated"

        };

    }

}

export default GeneratorEngine;
