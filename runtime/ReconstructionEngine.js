import MoWenConfig from "./MoWenConfig.js";

class ReconstructionEngine {

    constructor(data) {

        this.data = data || {};

    }

    run() {

        const questions = [

            this.getCorrespondenceQuestion(),

            this.getReasoningQuestion(),

            this.getResponsibilityQuestion()

        ].filter(Boolean);


        const report = {

            testimony:
                this.data.evidence?.testimony ||
                this.data.evidence?.originalText ||
                null,

            originalRuntime: {

                recognition:
                    this.data.recognition || null,

                definition:
                    this.data.definition || null,

                evidence:
                    this.data.evidence || null

            },

            questions,

            reconstructed:

                this.reconstructExpression(),

            summary:

                "莫问不直接生成结论，而是根据诚实运行结果重构表达，使表达范围与依据范围保持一致。"

        };


        if (
            this.data.recognition?.matched === false
        ) {

            report.stop = true;

            report.stage = "Recognition";

            report.reason =
                this.data.recognition.question;

        }

        else if (
            this.data.definition?.matched === false
        ) {

            report.stop = true;

            report.stage = "Definition";

            report.reason =
                this.data.definition.question;

        }

        else {

            report.stop = false;

            report.stage = "Completed";

        }


        return {

            report,

            status:
                MoWenConfig.states.reconstruction,

            version: "2.0"

        };

    }


    getCorrespondenceQuestion() {

        return (

            this.data.correspondence
                ?.correspondences
                ?. [0]
                ?.message

        );

    }


    getReasoningQuestion() {

        return (

            this.data.reasoning
                ?.reasonings
                ?. [0]
                ?.message

        );

    }


    getResponsibilityQuestion() {

        return (

            this.data.responsibility
                ?.responsibilities
                ?. [0]
                ?.message

        );

    }


    reconstructExpression() {

        return {

            principle:

                "表达范围不能超过依据范围。",

            status:

                "generated",

            text:

                "该表达需要根据定义、证据、对应关系和责任范围重新确认。"

        };

    }

}

export default ReconstructionEngine;
