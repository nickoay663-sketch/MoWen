import Dictionary from "./Dictionary.js";
import Definitions from "../definitions/index.js";

import SpanishDictionary from "../languages/es-ES/Dictionary.js";
import SpanishDefinitions from "../languages/es-ES/Definitions.js";

class LanguageManager {

    static getResources(language) {

        const normalizedLanguage =
            String(language || "")
                .trim()
                .toLowerCase();

        switch (normalizedLanguage) {

            case "es-es":

                return {

                    language:
                        "es-ES",

                    dictionary:
                        SpanishDictionary,

                    definitions:
                        SpanishDefinitions,

                    fallback:
                        false

                };

            case "zh-cn":

                return {

                    language:
                        "zh-CN",

                    dictionary:
                        Dictionary,

                    definitions:
                        Definitions,

                    fallback:
                        false

                };

            case "en-us":
            case "fr-fr":
            case "de-de":
            case "it-it":
            case "pt-pt":

                return {

                    language:
                        normalizedLanguage
                            .replace(
                                /^([a-z]{2})-([a-z]{2})$/,
                                (_, languageCode, countryCode) =>
                                    `${languageCode}-${countryCode.toUpperCase()}`
                            ),

                    dictionary:
                        Dictionary,

                    definitions:
                        Definitions,

                    fallback:
                        true

                };

            default:

                return {

                    language:
                        "zh-CN",

                    dictionary:
                        Dictionary,

                    definitions:
                        Definitions,

                    fallback:
                        true

                };

        }

    }

}

export default LanguageManager;