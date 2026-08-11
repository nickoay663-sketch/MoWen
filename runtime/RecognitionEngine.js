import EngineBase from "./EngineBase.js";
import Dictionary from "./Dictionary.js";
import LanguageManager from "./LanguageManager.js";

class RecognitionEngine extends EngineBase {

    constructor(expression, language) {

        super(
            "RecognitionEngine",
            "15.0",
            "莫问识别表达中的主体、对象与概念，不负责定义、证据与推理。"
        );

        this.expression =
            expression || "";

        this.language =
            language || "zh-CN";

        const resources =
            LanguageManager.getResources(
                this.language
            );

        this.dictionary =
            resources.dictionary || Dictionary;

        this.fallback =
            resources.fallback === true;

    }


    execute() {

        const objects =
            this.extractObjects();

        const concepts =
            this.extractConcepts();

        return this.result({

            status:
                "completed",

            metadata:
                this.metadata({

                    expressionLength:
                        this.expression.length,

                    objectCount:
                        objects.length,

                    conceptCount:
                        concepts.length,

                    language:
                        this.language,

                    fallback:
                        this.fallback,

                    dictionaryVersion:
                        this.dictionary.version || null

                }),

            objects,

            concepts,

            result: {

                objects,

                concepts

            },

            trace: [

                {

                    engine:
                        "RecognitionEngine",

                    action:
                        "recognize",

                    status:
                        "completed"

                }

            ],

            questions: [],

            nextRuntimeState:
                "DefinitionEngine"

        });

    }


    extractObjects() {

        if (!this.expression) {

            return [];

        }

        const text =
            this.normalize(this.expression);

        const objects = [];

        for (
            const object
            of this.dictionary.objects || []
        ) {

            if (
                this.matchEntry(
                    text,
                    object
                )
            ) {

                objects.push({

                    id:
                        object.id,

                    word:
                        object.word,

                    type:
                        object.type

                });

            }

        }

        return objects;

    }


    extractConcepts() {

        if (!this.expression) {

            return [];

        }

        const text =
            this.normalize(this.expression);

        const concepts = [];

        for (
            const concept
            of this.dictionary.concepts || []
        ) {

            if (
                this.matchEntry(
                    text,
                    concept
                )
            ) {

                concepts.push({

                    id:
                        concept.id,

                    word:
                        concept.word,

                    category:
                        concept.category,

                    aliases:
                        Array.isArray(
                            concept.aliases
                        )
                            ? concept.aliases
                            : undefined

                });

            }

        }

        return concepts;

    }


    matchEntry(text, entry) {

        const aliases =
            Array.isArray(entry.aliases)
                ? entry.aliases
                : [entry.word];

        for (
            const alias
            of aliases
        ) {

            if (
                this.containsWord(
                    text,
                    alias
                )
            ) {

                return true;

            }

        }

        return false;

    }


    normalize(text) {

        return String(text || "")
            .toLowerCase()
            .replace(
                /[.,!?;:()[\]{}"'“”‘’。！？；：，（）【】《》]/g,
                " "
            )
            .replace(/\s+/g, " ")
            .trim();

    }


    containsWord(
        text,
        word
    ) {

        const normalizedWord =
            this.normalize(word);

        if (!normalizedWord) {

            return false;

        }

        if (
            /[\u4e00-\u9fff]/.test(
                normalizedWord
            )
        ) {

            return text.includes(
                normalizedWord
            );

        }

        const escaped =
            normalizedWord.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

        return new RegExp(
            `(?:^|\\s)${escaped}(?:\\s|$)`,
            "i"
        ).test(text);

    }

}

export default RecognitionEngine;