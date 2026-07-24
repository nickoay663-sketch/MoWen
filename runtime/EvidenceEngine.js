class EvidenceEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        const statement = this.text.trim();

        return {

            originalText: this.text,

            evidences: [

                {
                    statement,

                    type: "claim",

                    evidence: false,

                    source: null,

                    status: "Need Evidence"

                }

            ]

        };

    }

}

export default EvidenceEngine;
