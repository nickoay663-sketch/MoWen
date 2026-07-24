class GeneratorEngine {

    constructor(data) {
        this.data = data;
    }

    run() {

        return {

            report: {

                originalText:
                    this.data.evidence?.originalText || null,

                questions: [

                    this.data.correspondence?.correspondence?.question,

                    this.data.reasoning?.reasoning?.question,

                    this.data.responsibility?.responsibility?.question

                ],

                conclusion:

                    "莫问没有直接给出结论，而是提出需要验证的问题。"

            },

            status: "Generated"

        };

    }

}

export default GeneratorEngine;
