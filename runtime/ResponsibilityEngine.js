class ResponsibilityEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        return {

            testimony: this.testimony,

            principle:
                "莫问只建立责任关系，不提前裁决责任。",

            responsibilities: this.collectResponsibilities(),

            status: "completed",

            version: "2.1"

        };

    }

    collectResponsibilities() {

        return [

            {

                testimony: this.testimony,

                subject: null,

                conclusion: null,

                state: "pending"

            }

        ];

    }

}

export default ResponsibilityEngine;
