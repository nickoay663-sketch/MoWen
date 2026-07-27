import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const result = {

            testimony: this.testimony,

            principle: "没有定义，就没有推理。",

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

    findUndefinedConcepts(concepts) {

        return concepts.filter(

            concept => !Definitions[concept]

        );

    }

}

export default DefinitionEngine;
