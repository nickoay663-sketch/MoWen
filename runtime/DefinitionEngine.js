import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(text) {
        this.text = text || "";
    }

    run() {

        // 莫问原则：
        // 没有定义，就没有推理。

        const result = {

            originalText: this.text,

            principle: "没有定义，就没有推理。",

            concepts: [],

            definitions: [],

            matched: false,

            question: null

        };

        Object.keys(Definitions).forEach(concept => {

            if (this.containsConcept(this.text, concept)) {

                result.concepts.push(concept);

                result.definitions.push(Definitions[concept]);

            }

        });

        if (result.concepts.length > 0) {

            result.matched = true;

        } else {

            result.question =
                "是否存在尚未定义的对象？";

        }

        return result;

    }

    containsConcept(text, concept) {

        return text.includes(concept);

    }

}

export default DefinitionEngine;
