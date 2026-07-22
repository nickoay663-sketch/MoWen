class RecognitionEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        return {

            originalText: this.text,

            concepts: [],

            objects: [],

            definitions: [],

            evidences: [],

            reasoning: [],

            conclusions: []

        };

    }

}

export default RecognitionEngine;
