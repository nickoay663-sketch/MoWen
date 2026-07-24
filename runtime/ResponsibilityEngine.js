import MoWenConfig from "./MoWenConfig.js";

class ResponsibilityEngine {

    constructor(reasoning) {
        this.reasoning = reasoning;
    }

    run() {

        return {

            responsibility: {

                subject: null,

                authority: null,

                responsibility: null,

                question:
                    "谁提出这个结论？谁应当为这个结论负责？"

            },

            status:
                MoWenConfig.states.responsibility

        };

    }

}

export default ResponsibilityEngine;
