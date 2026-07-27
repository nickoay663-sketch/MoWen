class CorrespondenceEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        return {

            testimony: this.testimony,

            principle:
                "莫问只建立对应，不裁决对应。",

            correspondences: this.collectCorrespondence(),

            status: "completed",

            version: "2.1"

        };

    }

    collectCorrespondence() {

        return [

            {

                testimony: this.testimony,

                object: null,

                definition: null,

                evidence: null,

                state: "pending"

            }

        ];

    }

}

export default CorrespondenceEngine;
