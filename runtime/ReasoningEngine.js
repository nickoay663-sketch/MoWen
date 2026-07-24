import MoWenConfig from "./MoWenConfig.js";

class ReasoningEngine {

    constructor(correspondence) {
        this.correspondence = correspondence;
    }

    run() {

        const question =
            this.correspondence.correspondence.question;

        return {

            reasoning: {

                valid: false,

                premise: null,

                conclusion: null,

                question:
                    "这个结论是否由前面的证词推出？"

            },

            referenceQuestion: question,

            status:
                MoWenConfig.states.reasoning

        };

    }

}

export default ReasoningEngine;
