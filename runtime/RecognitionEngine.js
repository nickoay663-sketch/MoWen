import EngineBase from "./EngineBase.js";
import Dictionary from "./Dictionary.js";
import LanguageManager from "./LanguageManager.js";
import UniversalExpression from "./UniversalExpression.js";
import PredicateRegistry from "./PredicateRegistry.js";

class RecognitionEngine extends EngineBase {

    constructor(expression, language) {

        super(
            "RecognitionEngine",
            "19.0",
            "MoWen Recognition recognizes language-native expression structures and maps verified structural relations into Universal Expression Model."
        );

        this.expression = expression || "";
        this.language = language || "zh-CN";

        const resources =
            LanguageManager.getResources(this.language);

        this.dictionary =
            resources.dictionary || Dictionary;

        this.fallback =
            resources.fallback === true;
    }


    execute() {

        const objects = this.extractObjects();
        const concepts = this.extractConcepts();
        const predicate = this.extractPredicate();
        const structures = this.extractStructures();

        const universalExpression =
            this.buildUniversalExpression(
                objects,
                concepts,
                predicate,
                structures
            );

        return this.result({

            status: "completed",

            metadata: this.metadata({

                expressionLength:
                    this.expression.length,

                objectCount:
                    objects.length,

                conceptCount:
                    concepts.length,

                structureCount:
                    structures.length,

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
            structures,
            universalExpression,

            result: {
                objects,
                concepts,
                predicate,
                structures,
                universalExpression
            },

            trace: [
                {
                    engine: "RecognitionEngine",
                    action: "recognize",
                    status: "completed"
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
                    id: object.id,
                    word: object.word,
                    type: object.type
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
                    id: concept.id,
                    word: concept.word,
                    category: concept.category,
                    aliases:
                        Array.isArray(concept.aliases)
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
            (text, form) =>
                this.containsWord(
                    this.normalize(text),
                    form
                )
        );
    }


    extractStructures() {

        const text =
            this.normalize(this.expression);

        if (!text) {
            return [];
        }

        const rules =
            this.getStructureRules(
                this.language
            );

        const structures = [];

        for (const rule of rules) {

            const markerFound =
                rule.markers.some(
                    marker =>
                        this.containsWord(
                            text,
                            marker
                        )
                        ||
                        text.includes(
                            this.normalize(marker)
                        )
                );

            if (!markerFound) {
                continue;
            }

            const formFound =
                !rule.forms
                ||
                rule.forms.some(
                    form =>
                        text.includes(
                            this.normalize(form)
                        )
                );

            if (!formFound) {
                continue;
            }

            const matchedMarkers =
                rule.markers.filter(
                    marker =>
                        this.containsWord(
                            text,
                            marker
                        )
                        ||
                        text.includes(
                            this.normalize(marker)
                        )
                );

            structures.push({

                type:
                    rule.type,

                language:
                    this.language,

                markers:
                    matchedMarkers

            });

        }

        return structures;
    }


    getStructureRules(language) {

        const rules = {

            "zh-CN": [

                {
                    type: "purpose",
                    markers: ["为了"]
                },

                {
                    type: "temporal",
                    markers: [
                        "从那时起",
                        "当",
                        "同时",
                        "在...的时候"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "如果",
                        "假如",
                        "要是"
                    ],
                    forms: [
                        "本来",
                        "早知道",
                        "就不会",
                        "就不"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "虽然",
                        "尽管",
                        "即使"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "据说",
                        "人们说",
                        "有人说"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "那些",
                        "凡是"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "明天",
                        "将",
                        "以后"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "让我们",
                        "一起"
                    ]
                }

            ],

            "en-US": [

                {
                    type: "purpose",
                    markers: [
                        "so that",
                        "in order that"
                    ]
                },

                {
                    type: "temporal",
                    markers: [
                        "since",
                        "while",
                        "when",
                        "after",
                        "before"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "if"
                    ],
                    forms: [
                        "had",
                        "would have",
                        "could have",
                        "might have"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "although",
                        "though",
                        "even though"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "it is said",
                        "it is known",
                        "it is believed"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "those who",
                        "who",
                        "which",
                        "that"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "tomorrow",
                        "will",
                        "shall"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "let us",
                        "let's"
                    ]
                }

            ],

            "es-ES": [

                {
                    type: "purpose",
                    markers: [
                        "para que"
                    ]
                },

                {
                    type: "temporal",
                    markers: [
                        "desde que",
                        "mientras",
                        "cuando",
                        "después de",
                        "antes de"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "si"
                    ],
                    forms: [
                        "hubiera",
                        "hubieras",
                        "hubierais",
                        "hubieran",
                        "habría",
                        "habrías",
                        "habríais",
                        "habrían"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "aunque"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "se dice",
                        "se sabe",
                        "se cree"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "quienes",
                        "que"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "mañana",
                        "futuro"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "démoslo",
                        "disfrutémoslo",
                        "vamos a"
                    ]
                }

            ],

            "fr-FR": [

                {
                    type: "purpose",
                    markers: [
                        "pour que",
                        "afin que"
                    ]
                },

                {
                    type: "temporal",
                    markers: [
                        "depuis que",
                        "pendant que",
                        "lorsque"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "si"
                    ],
                    forms: [
                        "avait",
                        "aurait",
                        "serait"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "bien que",
                        "quoique",
                        "même si"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "on dit",
                        "il est dit",
                        "on sait"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "ceux qui",
                        "qui",
                        "que"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "demain",
                        "sera",
                        "ferons"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "allons",
                        "faisons"
                    ]
                }

            ],

            "de-DE": [

                {
                    type: "purpose",
                    markers: [
                        "damit",
                        "um ... zu"
                    ]
                },

                {
                    type: "temporal",
                    markers: [
                        "seit",
                        "während",
                        "wenn",
                        "als"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "wenn"
                    ],
                    forms: [
                        "hätte",
                        "wäre",
                        "würde"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "obwohl",
                        "auch wenn"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "man sagt",
                        "es heißt",
                        "man weiß"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "diejenigen, die",
                        "die",
                        "welche"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "morgen",
                        "werden"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "lasst uns"
                    ]
                }

            ],

            "it-IT": [

                {
                    type: "purpose",
                    markers: [
                        "affinché",
                        "perché"
                    ]
                },

                {
                    type: "temporal",
                    markers: [
                        "da quando",
                        "mentre",
                        "quando"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "se"
                    ],
                    forms: [
                        "avessi",
                        "avesse",
                        "avremmo",
                        "sarebbe"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "sebbene",
                        "benché",
                        "anche se"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "si dice",
                        "si sa",
                        "si crede"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "coloro che",
                        "chi",
                        "che"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "domani",
                        "sarà",
                        "continueremo"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "facciamo",
                        "andiamo"
                    ]
                }

            ],

            "pt-PT": [

                {
                    type: "purpose",
                    markers: [
                        "para que"
                    ]
                },

                {
                    type: "temporal",
                    markers: [
                        "desde que",
                        "enquanto",
                        "quando"
                    ]
                },

                {
                    type: "conditional-counterfactual",
                    markers: [
                        "se"
                    ],
                    forms: [
                        "tivesse",
                        "teria",
                        "seria"
                    ]
                },

                {
                    type: "concessive",
                    markers: [
                        "embora",
                        "mesmo que"
                    ]
                },

                {
                    type: "impersonal",
                    markers: [
                        "diz-se",
                        "sabe-se",
                        "acredita-se"
                    ]
                },

                {
                    type: "relative",
                    markers: [
                        "aqueles que",
                        "quem",
                        "que"
                    ]
                },

                {
                    type: "future",
                    markers: [
                        "amanhã",
                        "será",
                        "continuaremos"
                    ]
                },

                {
                    type: "imperative-inclusive",
                    markers: [
                        "façamos",
                        "vamos"
                    ]
                }

            ]

        };

        return rules[language] || [];
    }


    buildUniversalExpression(
        objects,
        concepts,
        predicate,
        structures
    ) {

        let subject = null;
        let object = null;

        if (objects.length > 0) {
            subject = objects[0].id;
        }

        if (
            predicate &&
            predicate.id === "identity"
        ) {

            if (
                !subject &&
                this.isFirstPersonIdentity()
            ) {

                subject = "object.self";
            }

            if (concepts.length > 0) {
                object = concepts[0].id;
            }

        }

        const condition =
            structures.some(
                structure =>
                    structure.type ===
                    "conditional-counterfactual"
            )
                ? {
                    type: "counterfactual"
                }
                : null;

        return UniversalExpression.from({

            subject,

            predicate:
                predicate
                    ? predicate.id
                    : null,

            object,

            attributes: [],

            relation: structures,

            modality: null,

            quantity: null,

            time:
                structures.some(
                    structure =>
                        structure.type === "temporal"
                        ||
                        structure.type === "future"
                )
                    ? {
                        detected: true
                    }
                    : null,

            condition,

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
            ).trim();

        const text =
            this.normalize(this.expression);

        const firstPersonForms = {

            "zh-CN": [
                "我"
            ],

            "en-US": [
                "i",
                "me",
                "my",
                "mine"
            ],

            "es-ES": [
                "yo",
                "soy",
                "me"
            ],

            "fr-FR": [
                "je",
                "suis",
                "moi"
            ],

            "de-DE": [
                "ich",
                "bin",
                "mir",
                "mich"
            ],

            "it-IT": [
                "io",
                "sono",
                "me"
            ],

            "pt-PT": [
                "eu",
                "sou",
                "me"
            ]

        };

        const forms =
            firstPersonForms[language] || [];

        for (const form of forms) {

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

        for (const alias of aliases) {

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
