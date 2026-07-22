/*
MoWen Honest Runtime v1.0
*/

class HonestRuntime {

    constructor(text) {

        this.text = text;

        this.result = {

            status: "initialized",

            originalText: this.text,

            concepts: [],

            objects: [],

            definitions: [],

            evidence: [],

            correspondence: [],

            reasoning: [],

            expression: [],

            responsibility: [],

            generatedText: ""

        };

    }

    run() {

        this.result.status = "running";

        this.identify();

        this.define();

        this.collectEvidence();

        this.checkCorrespondence();

        this.reason();

        this.checkResponsibility();

        this.generate();

        this.result.status = "completed";

        return this.result;

    }

    identify() {

        // Recognition Engine

    }

    define() {

        // Definition Engine

    }

    collectEvidence() {

        // Evidence Engine

    }

    checkCorrespondence() {

        // Correspondence Engine

    }

    reason() {

        // Reasoning Engine

    }

    checkResponsibility() {

        // Responsibility Engine

    }

    generate() {

        // Generator Engine

    }

}

export default HonestRuntime;
