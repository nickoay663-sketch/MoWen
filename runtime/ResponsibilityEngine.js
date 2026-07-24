import MoWenConfig from "./MoWenConfig.js";

class ResponsibilityEngine {

    constructor(reasoning) {

        this.reasoning = reasoning;

    }

    run() {

        const testimony =
            this.reasoning.testimony;

        return {

            testimony,

            responsibility: {

                provider: null,

                subject: null,

                authority: null,

                responsibility: null,

                question:
                    "谁提供了这份证词？谁应当为这份证词及其结论承担责任？"

            },

            status:
                MoWenConfig.states.responsibility

        };

    }

}

export default ResponsibilityEngine;
