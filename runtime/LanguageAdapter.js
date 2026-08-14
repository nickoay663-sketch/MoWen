class LanguageAdapter {

    constructor(languageSystem = null) {

        this.languageSystem =
            languageSystem || null;

    }

    connect(expression) {

        const text =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        return {

            expression:
                text,

            languageSystem:
                this.languageSystem,

            connected:
                this.languageSystem !== null,

            status:
                "connected"

        };

    }

    adapt(expression) {

        return this.connect(expression);

    }

}

export default LanguageAdapter;
