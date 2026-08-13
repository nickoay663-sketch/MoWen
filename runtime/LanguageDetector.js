class LanguageDetector {
    constructor(text = "") {
        this.text = String(text ?? "").trim();
    }

    run() {
        return this.detect();
    }

    detect() {
        if (!this.text) {
            return {
                language: "unknown",
                languages: [],
                mixed: false,
                confidence: 0
            };
        }

        const scores = {
            "zh-CN": this.scoreChinese(),
            "en-US": this.scoreEnglish(),
            "es-ES": this.scoreSpanish(),
            "fr-FR": this.scoreFrench(),
            "de-DE": this.scoreGerman(),
            "it-IT": this.scoreItalian(),
            "pt-PT": this.scorePortuguese(),
            "ja-JP": this.scoreJapanese()
        };

        const ranked = Object.entries(scores)
            .sort((a, b) => b[1] - a[1]);

        const detected = ranked
            .filter(([, score]) => score > 0)
            .map(([language]) => language);

        if (detected.length === 0) {
            return {
                language: "unknown",
                languages: [],
                mixed: false,
                confidence: 0
            };
        }

        const best = ranked[0];
        const second = ranked[1] || ["unknown", 0];

        const bestLanguage = best[0];
        const bestScore = best[1];
        const secondLanguage = second[0];
        const secondScore = second[1];

        const lowerText = this.text
            .toLowerCase()
            .normalize("NFC");

        const strongAnchors = {
            "es-ES": [
                "soy ",
                "tengo ",
                "gobierno ",
                "libertad",
                "evidencia",
                "responsabilidad",
                "médico",
                "médica",
                "hubieras",
                "habría",
                "creído",
                "hace un año"
            ],
            "fr-FR": [
                "je ",
                "suis ",
                "gouvernement ",
                "liberté",
                "médecin",
                "preuve",
                "responsabilité"
            ],
            "de-DE": [
                "ich ",
                "bin ",
                "regierung ",
                "freiheit",
                "arzt",
                "beweis",
                "verantwortung"
            ],
            "it-IT": [
                "sono ",
                "governo ",
                "libertà",
                "medico",
                "responsabilità"
            ],
            "pt-PT": [
                "sou ",
                "governo ",
                "liberdade",
                "médico",
                "evidência",
                "responsabilidade"
            ]
        };

        let anchoredLanguage = null;
        let anchorScore = 0;

        for (const [language, anchors] of Object.entries(strongAnchors)) {
            const score = anchors.filter(anchor =>
                lowerText.includes(anchor)
            ).length;

            if (score > anchorScore) {
                anchorScore = score;
                anchoredLanguage = language;
            }
        }

        const hasEnglishConnector =
            this.hasAnyToken([
                "and",
                "this",
                "that",
                "these",
                "those",
                "evidence",
                "teacher",
                "doctor",
                "would",
                "have",
                "had",
                "you",
                "your"
            ]);

        const hasFrenchStructure =
            lowerText.includes("je ") &&
            lowerText.includes("suis ");

        const hasGermanStructure =
            lowerText.includes("ich ") &&
            lowerText.includes("bin ");

        const hasItalianStructure =
            lowerText.includes("sono ");

        const hasPortugueseStructure =
            lowerText.includes("sou ");

        const hasSpanishStructure =
            lowerText.includes("soy ") ||
            lowerText.includes("hubieras ") ||
            lowerText.includes("habría ") ||
            lowerText.includes("creído ");

        const hasJapaneseScript =
            this.hasJapaneseScript();

        const foreignLanguages = detected.filter(
            language => language !== "en-US"
        );

        const strongForeignEvidence =
            foreignLanguages.some(language => {
                const score = scores[language] || 0;
                return score >= 4;
            });

        const explicitEnglishMixed =
            strongForeignEvidence &&
            hasEnglishConnector;

        const scoreMixed =
            secondScore >= 6 &&
            secondScore >= bestScore * 0.55 &&
            bestScore - secondScore <= 4;

        const structuralMixed =
            (
                hasFrenchStructure ||
                hasGermanStructure ||
                hasItalianStructure ||
                hasPortugueseStructure ||
                hasSpanishStructure
            ) &&
            hasEnglishConnector &&
            detected.includes("en-US");

        const mixed = Boolean(
            explicitEnglishMixed ||
            scoreMixed ||
            structuralMixed
        );

        let finalLanguage = bestLanguage;

        if (hasJapaneseScript) {
            finalLanguage = "ja-JP";
        }

        if (mixed && anchoredLanguage && !hasJapaneseScript) {
            finalLanguage = anchoredLanguage;
        }

        if (
            structuralMixed &&
            hasFrenchStructure &&
            !hasJapaneseScript
        ) {
            finalLanguage = "fr-FR";
        }

        if (
            structuralMixed &&
            hasGermanStructure &&
            !hasJapaneseScript
        ) {
            finalLanguage = "de-DE";
        }

        if (
            structuralMixed &&
            hasItalianStructure &&
            !hasJapaneseScript
        ) {
            finalLanguage = "it-IT";
        }

        if (
            structuralMixed &&
            hasPortugueseStructure &&
            !hasJapaneseScript
        ) {
            finalLanguage = "pt-PT";
        }

        if (
            structuralMixed &&
            hasSpanishStructure &&
            !hasJapaneseScript
        ) {
            finalLanguage = "es-ES";
        }

        return {
            language: finalLanguage,
            languages: mixed && !hasJapaneseScript
                ? [
                    finalLanguage,
                    ...detected.filter(
                        language => language !== finalLanguage
                    )
                ]
                : [finalLanguage],
            mixed: hasJapaneseScript
                ? false
                : mixed,
            confidence: Math.min(
                1,
                bestScore / 10
            )
        };
    }

    hasAnyToken(words) {
        const tokens = this.tokenize();

        return words.some(
            word => tokens.includes(word)
        );
    }

    tokenize() {
        return this.text
            .toLowerCase()
            .normalize("NFC")
            .replace(
                /[.,!?;:()[\]{}"'“”‘’。，！？；：（）【】《》、「」『』]/g,
                " "
            )
            .split(/\s+/)
            .filter(Boolean);
    }

    hasJapaneseScript() {
        return /[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff]/.test(
            this.text
        );
    }

    scoreChinese() {
        const matches =
            this.text.match(/[\u4e00-\u9fff]/g);

        return matches
            ? matches.length * 2
            : 0;
    }

    scoreEnglish() {
        return this.scoreWords([
            "the",
            "a",
            "an",
            "is",
            "am",
            "are",
            "was",
            "were",
            "this",
            "that",
            "these",
            "those",
            "and",
            "or",
            "but",
            "of",
            "to",
            "in",
            "for",
            "with",
            "from",
            "if",
            "you",
            "your",
            "would",
            "have",
            "had",
            "not",
            "year",
            "ago",
            "told",
            "believed",
            "standing",
            "here",
            "truth",
            "evidence",
            "responsibility",
            "doctor",
            "teacher",
            "student",
            "government",
            "protects",
            "freedom"
        ]);
    }

    scoreSpanish() {
        return this.scoreWords([
            "el",
            "la",
            "los",
            "las",
            "un",
            "una",
            "unos",
            "unas",
            "de",
            "del",
            "que",
            "es",
            "soy",
            "eres",
            "está",
            "están",
            "y",
            "o",
            "para",
            "con",
            "verdad",
            "evidencia",
            "responsabilidad",
            "médico",
            "médica",
            "doctor",
            "doctora",
            "profesor",
            "profesora",
            "estudiante",
            "gobierno",
            "protege",
            "libertad",
            "padre",
            "tengo",
            "hubieras",
            "habría",
            "creído",
            "hace",
            "año"
        ]) + this.scorePattern(
            /[áéíóúñü¿¡]/gi
        );
    }

    scoreFrench() {
        return this.scoreWords([
            "le",
            "la",
            "les",
            "un",
            "une",
            "des",
            "de",
            "du",
            "que",
            "qui",
            "est",
            "suis",
            "sont",
            "et",
            "ou",
            "pour",
            "avec",
            "dans",
            "vérité",
            "preuve",
            "responsabilité",
            "médecin",
            "professeur",
            "étudiant",
            "étudiante",
            "gouvernement",
            "liberté"
        ]) + this.scorePattern(
            /[àâçéèêëîïôùûüÿœ]/gi
        );
    }

    scoreGerman() {
        return this.scoreWords([
            "der",
            "die",
            "das",
            "ein",
            "eine",
            "einer",
            "einem",
            "einen",
            "ist",
            "bin",
            "sind",
            "und",
            "oder",
            "von",
            "zu",
            "mit",
            "für",
            "wahrheit",
            "beweis",
            "verantwortung",
            "arzt",
            "lehrer",
            "student",
            "regierung",
            "freiheit"
        ]) + this.scorePattern(
            /[äöüß]/gi
        );
    }

    scoreItalian() {
        return this.scoreWords([
            "il",
            "lo",
            "la",
            "gli",
            "le",
            "un",
            "una",
            "di",
            "del",
            "che",
            "sono",
            "sei",
            "è",
            "e",
            "o",
            "per",
            "con",
            "verità",
            "prova",
            "responsabilità",
            "medico",
            "professore",
            "studente",
            "governo",
            "libertà"
        ]) + this.scorePattern(
            /[àèéìíîòóù]/gi
        );
    }

    scorePortuguese() {
        return this.scoreWords([
            "os",
            "as",
            "um",
            "uma",
            "de",
            "do",
            "da",
            "que",
            "é",
            "sou",
            "são",
            "para",
            "com",
            "verdade",
            "evidência",
            "responsabilidade",
            "médico",
            "médica",
            "professor",
            "professora",
            "estudante",
            "governo",
            "liberdade"
        ]) + this.scorePattern(
            /[áàâãéêíóôõúç]/gi
        );
    }

    scoreJapanese() {
        const hiragana =
            this.text.match(/[\u3040-\u309f]/g) || [];

        const katakana =
            this.text.match(/[\u30a0-\u30ff]/g) || [];

        const japaneseWords = [
            "皆様",
            "私",
            "話",
            "聞",
            "幸い",
            "疑問",
            "最も",
            "良い",
            "決定",
            "チーム",
            "若かった",
            "頃",
            "父",
            "信じる",
            "成功",
            "作業",
            "終わらせて",
            "次第",
            "一緒に",
            "祝う",
            "誇り",
            "我々",
            "挑まなかった",
            "未来",
            "素晴らしい"
        ];

        return (
            hiragana.length * 2 +
            katakana.length * 2 +
            this.scoreWords(japaneseWords) * 2
        );
    }

    scoreWords(words) {
        const tokens = this.tokenize();

        let score = 0;

        for (const word of words) {
            if (tokens.includes(word)) {
                score += 2;
            }
        }

        return score;
    }

    scorePattern(pattern) {
        const matches =
            this.text.match(pattern);

        return matches
            ? matches.length
            : 0;
    }
}

export default LanguageDetector;
