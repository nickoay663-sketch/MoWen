import MoWenConfig from "./MoWenConfig.js";

class ReconstructionEngine {

    constructor(data) {

        this.data = data || {};

    }

    run() {

        return {

            testimony:

                this.data.recognition?.testimony ||

                null,

            principle:

                "表达范围不能超过依据范围。",

            reconstruction:

                this.reconstruct(),

            status:

                MoWenConfig.states.reconstruction,

            version: "2.1"

        };

    }

    reconstruct() {

        return {

            expression:

                "该表达需要根据定义、证据、对应关系、推理及责任重新确认。",

            state:

                "pending"

        };

    }

}

export default ReconstructionEngine;
