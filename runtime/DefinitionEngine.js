import MoWenConfig from "./MoWenConfig.js";
import Definitions from "../definitions/index.js";
import SpanishDefinitions from "../languages/es-ES/Definitions.js";

class DefinitionEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const metadata =
            this.buildMetadata();

        const definitions =
            this.findDefinitions();

        return {

            engine:
                "DefinitionEngine",

            version:
                "6.7",

            semanticObject:
                this.semanticObject,

            principle:
                MoWenConfig.principles.definition,

            metadata,

            definitions,

            result: {

                metadata,

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
                    ]

        };

    }

        buildMetadata() {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion || "",

            contractVersion:
                this.semanticObject.contract?.version || "",

            engineCount:

                Object.keys(

                    this.semanticObject.engines || {}

                ).length,

            traceCount:

                (this.semanticObject.runtimeTrace || []).length

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

                    .filter(

                concept =>

                    library[concept.word || concept]

            )

            .map(concept => ({

                concept:
                    concept.word || concept,

                definition:
                    library[concept.word || concept],

                source:
                    "MoWen Definition Library",

                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],

                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            }));

    }

}

export default DefinitionEngine;