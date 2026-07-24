import MoWenConfig from "./MoWenConfig.js";

class EvidenceEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const testimony = this.testimony.trim();

        return {

            testimony: this.testimony,

            evidences: [

                {

                    testimony,

                    type: "claim",

                    evidence: false,

                    source: null,

                    status: MoWenConfig.states.evidence

                }

            ]

        };

    }

}

export default EvidenceEngine;
