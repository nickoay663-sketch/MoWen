class LanguageAdapter {

    constructor(languageSystem = null) {

        this.languageSystem =
            languageSystem !== null &&
                languageSystem !== undefined
                ? languageSystem
                : null;

    }


    connect(expression) {

        const text =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        const connected =
            this.languageSystem !== null;

        return {

            expression:
                text,

            languageSystem:
                this.languageSystem,

            connected,

            externallySupplied:
                connected,

            status:
                connected
                    ? "connected"
                    : "not-supplied"

        };

    }


    adapt(expression) {

        return this.connect(expression);

    }

}


export default LanguageAdapter;
