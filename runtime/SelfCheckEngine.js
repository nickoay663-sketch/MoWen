class SelfCheckEngine {

    constructor(runtime) {

        this.runtime = runtime || {};

    }

    run() {

        const checks = {

            recognition:
                !!this.runtime.recognition,

            definition:
                !!this.runtime.definition,

            search:
                !!this.runtime.search,

            evidence:
                !!this.runtime.evidence,

            correspondence:
                !!this.runtime.correspondence,

            reasoning:
                !!this.runtime.reasoning,

            responsibility:
                !!this.runtime.responsibility,

            reconstruction:
                !!this.runtime.reconstruction

        };

        const passed =
            Object.values(checks)
                .every(Boolean);

        return {

            version: "2.1",

            checks,

            passed,

            status:
                passed
                    ? "self-check-passed"
                    : "self-check-warning",

            summary:
                passed
                    ? "Runtime Self Check Passed."
                    : "Runtime Self Check Warning."

        };

    }

}

export default SelfCheckEngine;