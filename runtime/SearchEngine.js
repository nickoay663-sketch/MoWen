class SearchEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        return {

            originalText: this.text,

            keywords: [],

            sources: [],

            results: [],

            status: "completed"

        };

    }

}

export default SearchEngine;
