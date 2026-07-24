import MoWenConfig from "./MoWenConfig.js";

class ReasoningEngine {

    constructor(correspondence) {

        this.correspondence = correspondence;

    }

    run() {

        const testimony =
            this.correspondence.testimony;

        const referenceQuestion =
            this.correspondence.correspondence.question;

        return {

            testimony,

            reasoning: {

                valid: false,

                premises: [],

                conclusion: null,

                question:
                    "该结论是否能够由前面的证词、定义、证据及对应关系推出？"

            },

            referenceQuestion,

            status:
                MoWenConfig.states.reasoning

        };

    }

}

export default ReasoningEngine;
