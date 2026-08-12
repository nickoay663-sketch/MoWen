import EngineBase from "./EngineBase.js";
import Dictionary from "./Dictionary.js";
import LanguageManager from "./LanguageManager.js";
import UniversalExpression from "./UniversalExpression.js";
import PredicateRegistry from "./PredicateRegistry.js";

class RecognitionEngine extends EngineBase {

    constructor(expression, language) {

        super(
            "RecognitionEngine",
            "17.0",
            "MoWen Recognition recognizes expression structure and maps language-specific forms into Universal Expression Model."
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

        const predicate =
            this.extractPredicate();

        const universalExpression =
            this.buildUniversalExpression(
                objects,
                concepts,
                predicate
            );

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
                        this.dictionary.version || null,

                    predicate:
                        predicate
                            ? predicate.id
                            : null

                }),

            objects,

            concepts,

            predicate,

            universalExpression,

            result: {

                objects,

                concepts,

                predicate,

                universalExpression

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
            this.normalize(
                this.expression
            );

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
            this.normalize(
                this.expression
            );

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


    extractPredicate() {

        if (!this.expression) {

            return null;

        }

        return PredicateRegistry.findByLanguage(

            this.language,

            this.expression,

            (
                text,
                form
            ) =>
                this.containsWord(
                    this.normalize(text),
                    form
                )

        );

    }


    buildUniversalExpression(
        objects,
        concepts,
        predicate
    ) {

        let subject = null;

        let object = null;

        if (objects.length > 0) {

            subject =
                objects[0].id;

        }

        if (
            predicate &&
            predicate.id === "identity"
        ) {

            if (
                !subject &&
                this.isFirstPersonIdentity()
            ) {

                subject =
                    "object.self";

            }

            if (concepts.length > 0) {

                object =
                    concepts[0].id;

            }

        }

        return UniversalExpression.from({

            subject,

            predicate:
                predicate
                    ? predicate.id
                    : null,

            object,

            attributes: [],

            relation: [],

            modality: null,

            quantity: null,

            time: null,

            condition: null,

            originalExpression:
                this.expression,

            sourceLanguage:
                this.language

        });

    }


    isFirstPersonIdentity() {

        const language =
            String(
                this.language || ""
            )
                .trim();

        const text =
            this.normalize(
                this.expression
            );

        const firstPersonForms = {

            "zh-CN": [
                "我"
            ],

            "en-US": [
                "i"
            ],

            "es-ES": [
                "soy"
            ],

            "fr-FR": [
                "je",
                "suis"
            ],

            "de-DE": [
                "ich",
                "bin"
            ],

            "it-IT": [
                "io",
                "sono"
            ],

            "pt-PT": [
                "eu",
                "sou"
            ]

        };

        const forms =
            firstPersonForms[language]
            || [];

        for (
            const form
            of forms
        ) {

            if (
                this.containsWord(
                    text,
                    form
                )
            ) {

                return true;

            }

        }

        return false;

    }


    matchEntry(
        text,
        entry
    ) {

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
                /[.,!?;:()[\]{}"'“”‘’、！？；：，（）【】《》]/g,
                " "
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim();

    }


    containsWord(
        text,
        word
    ) {

        const normalizedWord =
            this.normalize(
                word
            );

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
