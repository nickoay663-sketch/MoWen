import MoWenConfig from "./MoWenConfig.js";
import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const result = {

            testimony: this.testimony,

            principle:
                MoWenConfig.principles.definition,

            concepts: [],

            definitions: [],

            undefinedConcepts: [],

            matched: false,

            question: null

        };

        Object.keys(Definitions).forEach(concept => {

            if (this.containsConcept(concept)) {

                result.concepts.push(concept);

                result.definitions.push({

                    concept,

                    definition: Definitions[concept]

                });

            }

        });

        result.undefinedConcepts =
            this.findUndefinedConcepts(result.concepts);

        if (result.concepts.length > 0) {

            result.matched = true;

        } else {

            result.question =
                "是否存在尚未定义的对象或概念？";

        }

        return result;

    }

    containsConcept(concept) {

        return this.testimony.includes(concept);

    }

    // TODO:
    // 当 RecognitionEngine 返回完整概念列表后，
    // 在这里比较“识别到的概念”与 Definitions，
    // 找出真正尚未定义的概念。
    findUndefinedConcepts(concepts) {

        return concepts.filter(

            concept => !Definitions[concept]

        );

    }

}

export default DefinitionEngine;
