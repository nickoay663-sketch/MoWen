import LanguageDetector from "./LanguageDetector.js";

class LanguageAdapter {

    constructor(language = "unknown") {

        this.language =
            typeof language === "string" &&
            language.trim()
                ? language.trim()
                : "unknown";

    }


    adapt(expression) {

        const text =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        const detected =
            new LanguageDetector(text).run();

        const language =
            this.language !== "unknown"
                ? this.language
                : detected.language;

        return {

            language,

            languageKnown:
                language !== "unknown",

            detectedLanguage:
                detected.language,

            detectedLanguages:
                detected.languages,

            mixed:
                detected.mixed,

            confidence:
                detected.confidence,

            expression:
                text,

            adapter:
                "LanguageAdapter",

            status:
                "connected"

        };

    }


    connect(expression) {

        return this.adapt(expression);

    }

}


export default LanguageAdapter;
