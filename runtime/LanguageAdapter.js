class LanguageAdapter {

    constructor(languageSystem = null) {

        this.languageSystem =
            typeof languageSystem === "string" &&
            languageSystem.trim()
                ? languageSystem.trim()
                : null;

    }


    connect(expression) {

        const text =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        const detectedLanguage =
            this.languageSystem ||
            this.detectLanguage(text);

        return {

            expression:
                text,

            languageSystem:
                detectedLanguage,

            detected:
                this.languageSystem === null &&
                detectedLanguage !== null,

            externallySupplied:
                this.languageSystem !== null,

            connected:
                detectedLanguage !== null,

            status:
                detectedLanguage !== null
                    ? "connected"
                    : "unknown-language"

        };

    }


    adapt(expression) {

        return this.connect(expression);

    }


    detectLanguage(expression) {

        const text =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        if (!text) {
            return null;
        }


        /*
         * Language identification is an entry-layer operation.
         *
         * It does not create evidence.
         * It does not create conclusions.
         * It does not verify the expression.
         *
         * It only identifies the most probable language system
         * from observable linguistic signals.
         */


        const spanishSignals = [

            /\b(hola|adiós|gracias|por favor|buenos|buenas)\b/i,

            /\b(que|para|desde|aunque|porque|todavía|siempre)\b/i,

            /\b(yo|tú|él|ella|nosotros|vosotros|ellos)\b/i,

            /\b(soy|eres|es|somos|son|estoy|estás|está)\b/i,

            /\b(hablar|hablo|aprendiendo|aprender|creo|puedo|mejorar)\b/i,

            /\b(año|mañana|difícil|increíble|español)\b/i,

            /[¡¿]/,

            /\b(el|la|los|las|un|una|unos|unas)\b/i

        ];


        const englishSignals = [

            /\b(the|and|is|are|was|were|this|that|with|from|have|has)\b/i,

            /\b(i|you|he|she|we|they)\b/i,

            /\b(hello|thanks|please|because|although|always|today|tomorrow)\b/i

        ];


        const frenchSignals = [

            /\b(le|la|les|des|une|un|et|est|sont|avec|pour|dans)\b/i,

            /\b(je|tu|il|elle|nous|vous|ils|elles)\b/i,

            /\b(bonjour|merci|parce|toujours|aujourd'hui|demain)\b/i

        ];


        const germanSignals = [

            /\b(der|die|das|den|dem|des|und|ist|sind|mit|für|von)\b/i,

            /\b(ich|du|er|sie|wir|ihr)\b/i,

            /\b(hallo|danke|bitte|weil|immer|heute|morgen)\b/i

        ];


        const chineseSignals = [

            /[\u4e00-\u9fff]/,

            /[\u3400-\u4dbf]/

        ];


        const scores = {

            Spanish:
                this.countSignals(text, spanishSignals),

            English:
                this.countSignals(text, englishSignals),

            French:
                this.countSignals(text, frenchSignals),

            German:
                this.countSignals(text, germanSignals),

            Chinese:
                this.countSignals(text, chineseSignals)

        };


        const ranked =
            Object.entries(scores)
                .sort(
                    (a, b) =>
                        b[1] - a[1]
                );


        if (
            ranked.length === 0 ||
            ranked[0][1] === 0
        ) {

            return null;

        }


        const best =
            ranked[0];

        const second =
            ranked[1];


        /*
         * Do not manufacture certainty from a weak signal.
         *
         * One isolated shared word is insufficient.
         * A strong language-specific signal may still identify
         * the language when the text is short.
         */

        if (
            best[1] < 2 &&
            !(best[0] === "Chinese" && best[1] >= 1)
        ) {

            return null;

        }


        if (
            second &&
            best[1] === second[1]
        ) {

            return null;

        }


        return best[0];

    }


    countSignals(
        text,
        signals
    ) {

        let score = 0;

        for (
            const signal
            of signals
        ) {

            if (
                signal.test(text)
            ) {

                score += 1;

            }

        }

        return score;

    }

}


export default LanguageAdapter;
