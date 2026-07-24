import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        // 莫问原则：
        // 没有定义，就没有推理。

        const result = {

            testimony: this.testimony,

            principle: "没有定义，就没有推理。",

            concepts: [],

            definitions: [],

            matched: false,

            question: null

        };

        Object.keys(Definitions).forEach(concept => {

            if (this.containsConcept(this.testimony, concept)) {

                result.concepts.push(concept);

                result.definitions.push(Definitions[concept]);

            }

        });

        if (result.concepts.length > 0) {

            result.matched = true;

        } else {

            result.question =
                "是否存在尚未定义的对象或概念？";

        }

        return result;

    }

    containsConcept(testimony, concept) {

        return testimony.includes(concept);

    }

}

export default DefinitionEngine;
