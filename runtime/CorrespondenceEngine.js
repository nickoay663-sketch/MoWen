import MoWenConfig from "./MoWenConfig.js";

class CorrespondenceEngine {

    constructor(evidence) {

        this.evidence = evidence;

    }

    run() {

        const testimony =
            this.evidence.testimony;

        return {

            testimony,

            correspondence: {

                matched: false,

                object: null,

                definition: null,

                evidence: null,

                knowledge: null,

                reasoning: null,

                question:
                    "该证词是否与对象、定义、证据及已有知识保持对应？"

            },

            status:
                MoWenConfig.states.correspondence

        };

    }

}

export default CorrespondenceEngine;
