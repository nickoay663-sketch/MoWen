import MoWenConfig from "./MoWenConfig.js";
import Definitions from "../definitions/index.js";
import SpanishDefinitions from "../languages/es-ES/Definitions.js";

class DefinitionEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const definitions =
            this.findDefinitions();

        return {

            semanticObject:
                this.semanticObject,

            principle:
                MoWenConfig.principles.definition,

            definitions,

            result: {

                definitions

            },

            status:
                definitions.length > 0
                    ? "definition-available"
                    : "need-definition-verification",

            questions:
                definitions.length > 0
                    ? []
                    : [
                        "该表达中的概念是否已经明确定义？"
                    ],

            version:
                "2.4"

        };

    }

    getDefinitions() {

        return this.semanticObject.language === "es-ES"
            ? SpanishDefinitions
            : Definitions;

    }

    findDefinitions() {

        const library =
            this.getDefinitions();

        const concepts =
            this.semanticObject.concepts || [];

        return concepts

            .filter(concept =>

                library[concept.word || concept]

            )

            .map(concept => ({

                concept:
                    concept.word || concept,

                definition:
                    library[concept.word || concept],

                source:
                    "MoWen Definition Library"

            }));

    }

}

export default DefinitionEngine;
