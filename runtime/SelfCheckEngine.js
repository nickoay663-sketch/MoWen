class SelfCheckEngine {

    constructor({ evidence, correspondence, reasoning }) {

        this.evidence = evidence;
        this.correspondence = correspondence;
        this.reasoning = reasoning;

    }

    run() {

        const checks = {

            evidence: !!this.evidence,

            correspondence: !!this.correspondence,

            reasoning: !!this.reasoning

        };

        const passed =
            checks.evidence &&
            checks.correspondence &&
            checks.reasoning;

        return {

            version: "2.0",

            checks,

            status: passed
                ? "self-check-passed"
                : "self-check-warning",

            summary: passed
                ? "Self Check Passed."
                : "Self Check Warning."

        };

    }

}

export default SelfCheckEngine;
