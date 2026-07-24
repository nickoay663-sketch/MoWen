import MoWenConfig from "./MoWenConfig.js";

class CorrespondenceEngine {

    constructor(evidence) {
        this.evidence = evidence;
    }

    run() {

        const statement = this.evidence.statement;

        return {

            statement,

            correspondence: {

                matched: false,

                object: null,

                definition: null,

                question:
                    "该证词中的对象是否被明确定义？"

            },

            status:
                MoWenConfig.states.correspondence

        };

    }

}

export default CorrespondenceEngine;
