import LanguageDetector from "./LanguageDetector.js";
import Dictionary from "./Dictionary.js";
import SpanishDictionary from "../languages/es-ES/Dictionary.js";

class RecognitionEngine {

    constructor(expression) {

        this.expression = expression || "";

    }

    run() {

        const language =
            new LanguageDetector(this.expression).run().language;

        const dictionary =
            language === "es-ES"
                ? SpanishDictionary
                : Dictionary;

        const objects =
            this.findObjects(dictionary);

        const concepts =
            this.findConcepts(dictionary);

        return {

            originalContent:
                this.expression,

            principle:
                "莫问只识别，不猜测。",

            language,

            objects,

            concepts,

            result: {

                language,

                objects,

                concepts

            },

            trace: [],

            nextRuntimeState: "DefinitionEngine",

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
                "2.5"

        };

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

}

export default RecognitionEngine;