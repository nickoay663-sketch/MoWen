class ReasoningEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        return {

            testimony: this.testimony,

            principle:
                "莫问只记录推理，不提前裁决。",

            reasonings: this.collectReasoning(),

            status: "completed",

            version: "2.1"

        };

    }

    collectReasoning() {

        return [

            {

                testimony: this.testimony,

                premises: [],

                conclusion: null,

                state: "pending"

            }

        ];

    }

}

export default ReasoningEngine;
