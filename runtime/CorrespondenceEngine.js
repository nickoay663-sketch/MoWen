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

            status: "Need Correspondence"

        };

    }

}

export default CorrespondenceEngine;
