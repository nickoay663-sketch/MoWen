import Dictionary from "./Dictionary.js";
import SpanishDictionary from "../languages/es-ES/Dictionary.js";

class RecognitionEngine {

    constructor(expression) {

        this.expression = expression || "";

    }

    run() {

        const dictionary =
            this.getDictionary();

        const objects =
            this.findObjects(dictionary);

        const concepts =
            this.findConcepts(dictionary);

        return {

            originalContent:
                this.expression,

            principle:
                "莫问只识别，不猜测。",

            language:
                this.detectLanguage(),

            objects,

            concepts,

            status:
                objects.length > 0 ||
                concepts.length > 0
                    ? "recognition-completed"
                    : "need-recognition",

            questions:
                objects.length > 0 ||
                concepts.length > 0
                    ? []
                    : [
                        "该表达中是否存在尚未识别的对象或概念？"
                    ],

            version:
                "2.4"

        };

    }

    getDictionary() {

        return this.detectLanguage() === "es-ES"
            ? SpanishDictionary
            : Dictionary;

    }

    findObjects(dictionary) {

        return dictionary.objects.filter(

            item => this.contains(item.word)

        );

    }

    findConcepts(dictionary) {

        return dictionary.concepts.filter(

            item => this.contains(item.word)

        );

    }

    contains(word) {

        return this.expression.includes(word);

    }

    detectLanguage() {

        if (/[áéíóúñü¿¡]/i.test(this.expression))

            return "es-ES";

        if (/[\u4e00-\u9fa5]/.test(this.expression))

            return "zh-CN";

        return "unknown";

    }

}

export default RecognitionEngine;
