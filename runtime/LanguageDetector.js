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
        "pt-PT": this.scorePortuguese()
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

    const nativeAnchors = [
        ["es-ES", [
            "soy ",
            "el ",
            "la ",
            "mi ",
            "tengo ",
            "gobierno ",
            "libertad",
            "evidencia",
            "responsabilidad",
            "médico",
            "médica"
        ]],
        ["fr-FR", [
            "je ",
            "suis ",
            "le ",
            "la ",
            "gouvernement ",
            "liberté",
            "médecin",
            "preuve"
        ]],
        ["de-DE", [
            "ich ",
            "bin ",
            "der ",
            "die ",
            "das ",
            "regierung ",
            "freiheit",
            "arzt"
        ]],
        ["it-IT", [
            "sono ",
            "il ",
            "lo ",
            "la ",
            "governo ",
            "libertà",
            "medico"
        ]],
        ["pt-PT", [
            "sou ",
            "o ",
            "a ",
            "governo ",
            "liberdade",
            "médico"
        ]]
    ];

    let anchoredLanguage = null;
    let anchorScore = 0;

    for (const [language, anchors] of nativeAnchors) {
        const score = anchors.filter(anchor =>
            lowerText.includes(anchor)
        ).length;

        if (score > anchorScore) {
            anchorScore = score;
            anchoredLanguage = language;
        }
    }

    const hasEnglishConnector =
        lowerText.includes(" and ") ||
        lowerText.includes(" this ") ||
        lowerText.includes(" that ") ||
        lowerText.includes(" evidence ") ||
        lowerText.includes(" teacher ") ||
        lowerText.includes(" doctor ");

    const hasFrenchStructure =
        lowerText.includes("je ") &&
        lowerText.includes("suis ");

    const hasGermanStructure =
        lowerText.includes("ich ") &&
        lowerText.includes("bin ");

    const hasItalianStructure =
        lowerText.includes("sono ") &&
        lowerText.includes("medico");

    const hasPortugueseStructure =
        lowerText.includes("sou ") &&
        lowerText.includes("médico");

    const hasSpanishStructure =
        lowerText.includes("soy ") &&
        lowerText.includes("doctor");

    const foreignLanguages = detected.filter(
        language => language !== "en-US"
    );

    const explicitEnglishMixed =
        foreignLanguages.length > 0 &&
        hasEnglishConnector;

    const scoreMixed =
        secondScore >= 4 &&
        secondScore >= bestScore * 0.45 &&
        bestScore - secondScore <= 2;

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

    if (mixed && anchoredLanguage) {
        finalLanguage = anchoredLanguage;
    }

    if (
        structuralMixed &&
        hasFrenchStructure
    ) {
        finalLanguage = "fr-FR";
    }

    if (
        structuralMixed &&
        hasGermanStructure
    ) {
        finalLanguage = "de-DE";
    }

    if (
        structuralMixed &&
        hasItalianStructure
    ) {
        finalLanguage = "it-IT";
    }

    if (
        structuralMixed &&
        hasPortugueseStructure
    ) {
        finalLanguage = "pt-PT";
    }

    if (
        structuralMixed &&
        hasSpanishStructure &&
        !(
            bestLanguage === "en-US" &&
            lowerText.includes("this ") &&
            lowerText.includes(" evidence")
        )
    ) {
        finalLanguage = "es-ES";
    }

    if (
        bestLanguage === "en-US" &&
        hasSpanishStructure &&
        lowerText.includes("this ") &&
        lowerText.includes(" evidence")
    ) {
        finalLanguage = "en-US";
    }

    const languages = mixed
        ? [
            finalLanguage,
            ...detected.filter(
                language => language !== finalLanguage
            )
        ]
        : [finalLanguage];

    return {
        language: finalLanguage,
        languages,
        mixed,
        confidence: Math.min(1, bestScore / 10)
    };
}

    scoreChinese() {
        const matches = this.text.match(/[\u4e00-\u9fff]/g);
        return matches ? matches.length * 2 : 0;
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
            "tengo"
        ]) + this.scorePattern(/[áéíóúñü¿¡]/gi);
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
            "o",
            "a",
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
            "e",
            "ou",
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

    scoreWords(words) {
        const lower = this.text
            .toLowerCase()
            .normalize("NFC")
            .replace(
                /[.,!?;:()[\]{}"'“”‘’。，！？；：（）【】《》、]/g,
                " "
            );

        const tokens = lower
            .split(/\s+/)
            .filter(Boolean);

        let score = 0;

        for (const word of words) {
            if (tokens.includes(word)) {
                score += 2;
            }
        }

        return score;
    }

    scorePattern(pattern) {
        const matches = this.text.match(pattern);
        return matches ? matches.length : 0;
    }
}
export default LanguageDetector;