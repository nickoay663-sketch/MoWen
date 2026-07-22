class RecognitionEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        return {
            concepts: [],
            objects: [],
            definitions: [],
            evidences: []
        };

    }

}

export default RecognitionEngine;
