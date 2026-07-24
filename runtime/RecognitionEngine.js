import Dictionary from "./Dictionary.js";

class RecognitionEngine {

    constructor(text) {

        this.text = text || "";

    }

    run() {

        const result = {

            originalText: this.text,

            objects: [],

            concepts: [],

            matched: false,

            question: null

        };

        Dictionary.objects.forEach(item => {

            if (this.contains(item.word)) {

                result.objects.push(item);

            }

        });

        Dictionary.concepts.forEach(item => {

            if (this.contains(item.word)) {

                result.concepts.push(item);

            }

        });

        if (
            result.objects.length > 0 ||
            result.concepts.length > 0
        ) {

            result.matched = true;

        } else {

            result.question =
                "是否存在尚未识别的对象或概念？";

        }

        return result;

    }

    contains(word) {

        return this.text.includes(word);

    }

}

export default RecognitionEngine;
