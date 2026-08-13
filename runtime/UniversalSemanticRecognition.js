import EngineBase from "./EngineBase.js";

class UniversalSemanticRecognition extends EngineBase {

    constructor(expression, language = "unknown") {

        super(
            "UniversalSemanticRecognition",
            "1.0",
            "Universal semantic recognition separates language identity from structural meaning and preserves semantic relations across unknown languages."
        );

        this.expression =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        this.language =
            typeof language === "string" &&
            language.trim()
                ? language.trim()
                : "unknown";

    }

    execute() {

        const structures =
            this.detectUniversalStructures();

        const semanticSignals =
            this.detectSemanticSignals();

        const universalExpression = {

            sourceLanguage:
                this.language,

            languageKnown:
                this.language !== "unknown",

            expression:
                this.expression,

            structures,

            semanticSignals,

            semanticRecognition:
                structures.length > 0 ||
                semanticSignals.length > 0
        };

        return this.result({

            status:
                "completed",

            metadata:
                this.metadata({

                    language:
                        this.language,

                    structureCount:
                        structures.length,

                    semanticSignalCount:
                        semanticSignals.length,

                    languageIndependent:
                        true

                }),

            universalExpression,

            structures,

            semanticSignals,

            result:
                universalExpression,

            trace: [

                {

                    engine:
                        "UniversalSemanticRecognition",

                    action:
                        "universal-semantic-recognition",

                    status:
                        "completed"

                }

            ],

            questions: [],

            nextRuntimeState:
                "DefinitionEngine"

        });

    }


    detectUniversalStructures() {

        const text =
            this.normalize(this.expression);

        if (!text) {
            return [];
        }

        const structures = [];

        if (
            this.detectConditional(text)
        ) {

            structures.push({
                type:
                    "conditional",
                confidence:
                    "structural"
            });

        }

        if (
            this.detectCounterfactual(text)
        ) {

            structures.push({
                type:
                    "counterfactual",
                confidence:
                    "structural"
            });

        }

        if (
            this.detectTemporal(text)
        ) {

            structures.push({
                type:
                    "temporal",
                confidence:
                    "structural"
            });

        }

        if (
            this.detectConcessive(text)
        ) {

            structures.push({
                type:
                    "concessive",
                confidence:
                    "structural"
            });

        }

        if (
            this.detectFuture(text)
        ) {

            structures.push({
                type:
                    "future",
                confidence:
                    "structural"
            });

        }

        if (
            this.detectRelative(text)
        ) {

            structures.push({
                type:
                    "relative",
                confidence:
                    "structural"
            });

        }

        return structures;

    }


    detectSemanticSignals() {

        const text =
            this.normalize(this.expression);

        const signals = [];

        if (
            this.hasAny([
                "虽然",
                "尽管",
                "although",
                "though",
                "bien que",
                "quoique",
                "obwohl",
                "sebbene",
                "aunque",
                "embora"
            ], text)
        ) {

            signals.push("concession");

        }

        if (
            this.hasAny([
                "如果",
                "假如",
                "要是",
                "if",
                "si",
                "wenn",
                "se"
            ], text)
        ) {

            signals.push("condition");

        }

        if (
            this.hasAny([
                "当",
                "同时",
                "when",
                "while",
                "quand",
                "lorsque",
                "wenn",
                "quando"
            ], text)
        ) {

            signals.push("temporal");

        }

        if (
            this.hasAny([
                "明天",
                "将",
                "以后",
                "tomorrow",
                "will",
                "demain",
                "sera",
                "morgen",
                "werden",
                "domani",
                "sarà"
            ], text)
        ) {

            signals.push("future");

        }

        return [
            ...new Set(signals)
        ];

    }


    detectConditional(text) {

        return this.hasAny([
            "如果",
            "假如",
            "要是",
            "if",
            "si",
            "wenn",
            "se"
        ], text);

    }


    detectCounterfactual(text) {

        return this.hasAny([
            "本来",
            "早知道",
            "如果没有",
            "如果我们没有",
            "had",
            "would have",
            "could have",
            "hubiera",
            "hubieras",
            "habría",
            "aurait",
            "avait",
            "hätte",
            "wäre",
            "würde",
            "avessi",
            "avrebbe",
            "teria",
            "seria"
        ], text);

    }


    detectTemporal(text) {

        return this.hasAny([
            "从那时起",
            "当",
            "同时",
            "去年",
            "以前",
            "when",
            "while",
            "since",
            "after",
            "before",
            "cuando",
            "mientras",
            "desde que",
            "après",
            "avant",
            "depuis",
            "lorsque",
            "seit",
            "während",
            "als",
            "da quando",
            "mentre"
        ], text);

    }


    detectConcessive(text) {

        return this.hasAny([
            "虽然",
            "尽管",
            "即使",
            "although",
            "though",
            "even though",
            "aunque",
            "bien que",
            "quoique",
            "même si",
            "obwohl",
            "auch wenn",
            "sebbene",
            "benché",
            "anche se"
        ], text);

    }


    detectFuture(text) {

        return this.hasAny([
            "明天",
            "将",
            "以后",
            "tomorrow",
            "will",
            "shall",
            "mañana",
            "futuro",
            "demain",
            "sera",
            "morgen",
            "werden",
            "domani",
            "sarà"
        ], text);

    }


    detectRelative(text) {

        return this.hasAny([
            "那些",
            "凡是",
            "those who",
            "who",
            "which",
            "that",
            "quienes",
            "ceux qui",
            "qui",
            "que",
            "diejenigen",
            "welche",
            "coloro che",
            "chi"
        ], text);

    }


    hasAny(words, text) {

        return words.some(
            word =>
                this.contains(
                    text,
                    word
                )
        );

    }


    contains(text, word) {

        const normalized =
            this.normalize(word);

        if (!normalized) {
            return false;
        }

        if (
            /[\u4e00-\u9fff]/.test(
                normalized
            )
        ) {

            return text.includes(
                normalized
            );

        }

        return text.includes(
            normalized
        );

    }


    normalize(text) {

        return String(text || "")
            .toLowerCase()
            .normalize("NFC")
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

}

export default UniversalSemanticRecognition;
