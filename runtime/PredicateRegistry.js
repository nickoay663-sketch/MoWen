const PredicateRegistry = {

    version: "1.1",

    predicates: {

        identity: {

            id: "identity",

            type: "relation",

            forms: {

                "zh-CN": [
                    "是"
                ],

                "en-US": [
                    "am",
                    "is",
                    "are"
                ],

                "es-ES": [
                    "soy",
                    "eres",
                    "es",
                    "somos",
                    "son"
                ],

                "fr-FR": [
                    "suis",
                    "es",
                    "est",
                    "sommes",
                    "sont"
                ],

                "de-DE": [
                    "bin",
                    "bist",
                    "ist",
                    "sind",
                    "seid"
                ],

                "it-IT": [
                    "sono",
                    "sei",
                    "è",
                    "siamo",
                    "siete"
                ],

                "pt-PT": [
                    "sou",
                    "é",
                    "somos",
                    "são"
                ]

            }

        }

    },

    get(id) {

        return (
            this.predicates[id]
            || null
        );

    },

    has(id) {

        return Object.prototype.hasOwnProperty.call(
            this.predicates,
            id
        );

    },

    findByLanguage(
        language,
        text,
        matcher
    ) {

        const normalizedLanguage =
            String(language || "")
                .trim();

        for (
            const predicate
            of Object.values(this.predicates)
        ) {

            const forms =
                predicate.forms &&
                Array.isArray(
                    predicate.forms[normalizedLanguage]
                )
                    ? predicate.forms[normalizedLanguage]
                    : [];

            for (
                const form
                of forms
            ) {

                const matched =
                    typeof matcher === "function"
                        ? matcher(text, form)
                        : false;

                if (matched) {

                    return {

                        id:
                            predicate.id,

                        type:
                            predicate.type,

                        expression:
                            form

                    };

                }

            }

        }

        return null;

    }

};

export default PredicateRegistry;
