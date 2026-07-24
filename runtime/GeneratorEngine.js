import MoWenConfig from "./MoWenConfig.js";

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

            testimony:
                this.data.evidence?.testimony || null,

            questions,

            summary:
                "莫问没有直接给出结论，而是生成需要继续验证的问题。"

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

            status:
                MoWenConfig.states.generator

        };

    }

}

export default GeneratorEngine;
