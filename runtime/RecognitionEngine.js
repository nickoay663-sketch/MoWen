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

            evidences: []

        };

    }

}

export default RecognitionEngine;
