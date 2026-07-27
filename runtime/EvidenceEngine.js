class EvidenceEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        return {

            testimony: this.testimony,

            principle:
                "莫问只收集证据，不判断证据。",

            evidences: this.collectEvidence(),

            status: "completed",

            version: "2.1"

        };

    }

    collectEvidence() {

        return [

            {

                statement: this.testimony,

                provided: false,

                source: null,

                type: "unknown"

            }

        ];

    }

}

export default EvidenceEngine;
