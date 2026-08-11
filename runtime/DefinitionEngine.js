import EngineBase from "./EngineBase.js";
import LanguageManager from "./LanguageManager.js";

class DefinitionEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "DefinitionEngine",
            "11.0",
            "莫问定义表达对象的明确含义与边界，不负责证据与推理。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const definitions =
            this.buildDefinitions();


        return this.result({

            status:
                "completed",

            metadata:
                this.metadata({

                    definitionCount:
                        definitions.length,

                    language:
                        this.semanticObject.language || "unknown"

                }),

            definitions,

            result: {

                definitions

            },

            trace: [

                {

                    engine:
                        "DefinitionEngine",

                    action:
                        "define",

                    status:
                        "completed"

                }

            ],

            questions: [],

            nextRuntimeState:
                "SearchEngine"

        });

    }


    buildDefinitions() {

        const content =
            this.semanticObject.originalContent || "";

        if (!content) {

            return [];

        }

        const language =
            this.semanticObject.language || "zh-CN";

        const resources =
            LanguageManager.getResources(language);

        const dictionary =
            resources.dictionary || {};

        const definitions =
            resources.definitions || {};

        const concepts =
            this.semanticObject.concepts || [];

        const results = [];

        for (const concept of concepts) {

            const aliases =
                Array.isArray(concept.aliases)
                    ? concept.aliases
                    : [concept.word];

            let definition = null;

            for (const alias of aliases) {

                const key =
                    this.normalizeKey(alias);

                if (
                    definitions &&
                    Object.prototype.hasOwnProperty.call(
                        definitions,
                        key
                    )
                ) {

                    definition =
                        definitions[key];

                    break;

                }

            }

            if (!definition) {

                const key =
                    this.normalizeKey(concept.word);

                if (
                    definitions &&
                    Object.prototype.hasOwnProperty.call(
                        definitions,
                        key
                    )
                ) {

                    definition =
                        definitions[key];

                }

            }

            if (definition) {

                results.push({

                    expression:
                        content,

                    concept: {
                        id:
                            concept.id,

                        word:
                            concept.word,

                        category:
                            concept.category
                    },

                    definition,

                    language,

                    dictionaryVersion:
                        dictionary.version || null,

                    fallback:
                        resources.fallback === true

                });

            }

        }

        if (results.length === 0) {

            results.push({

                expression:
                    content,

                definition:
                    "Expression entering MoWen Runtime",

                language,

                dictionaryVersion:
                    dictionary.version || null,

                fallback:
                    resources.fallback === true

            });

        }

        return results;

    }


    normalizeKey(value) {

        return String(value || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );

    }

}

export default DefinitionEngine;