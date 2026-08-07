import LanguageDetector from "./LanguageDetector.js";
import Dictionary from "./Dictionary.js";
import SpanishDictionary from "../languages/es-ES/Dictionary.js";


class RecognitionEngine {


    constructor(expression) {

        this.expression = expression || "";

    }



    run() {


        const metadata =
            this.buildMetadata();



        const language =
            new LanguageDetector(this.expression)
                .run()
                .language;



        const dictionary =
            language === "es-ES"
                ? SpanishDictionary
                : Dictionary;



        const objects =
            this.findObjects(dictionary);



        const concepts =
            this.findConcepts(dictionary);



        const claimType =
            this.detectClaimType();



        const ambiguity =
            this.detectAmbiguity(
                objects,
                concepts
            );



        const status =

            objects.length > 0 ||
            concepts.length > 0

                ? "recognition-evaluated"

                : "need-recognition";



        return {


            engine:
                "RecognitionEngine",



            version:
                "7.0",



            originalContent:
                this.expression,



            principle:
                "莫问识别表达结构，不替表达者解释责任。",



            metadata,



            language,



            objects,



            concepts,



            claimType,



            ambiguity,



            result: {

                metadata,

                language,

                objects,

                concepts,

                claimType,

                ambiguity,

                status

            },



            trace:
                [],



            nextRuntimeState:
                "DefinitionEngine",



            status,



            questions:

                status === "recognition-evaluated"

                    ? []

                    : [

                        "该表达中是否存在尚未识别的对象或概念？"

                    ]

        };

    }




    buildMetadata() {


        return {


            generatedAt:
                new Date().toISOString(),



            runtimeVersion:
                "7.0",



            detector:
                "LanguageDetector"

        };


    }




    findObjects(dictionary) {


        return dictionary.objects.filter(


            item =>

                this.contains(item.word)


        );


    }




    findConcepts(dictionary) {


        return dictionary.concepts.filter(


            item =>

                this.contains(item.word)


        );


    }




    detectClaimType() {


        const text =
            this.expression;



        if (

            text.includes("是") ||
            text.includes("is") ||
            text.includes("es")

        ) {

            return "assertion";

        }



        if (

            text.includes("?") ||
            text.includes("？")

        ) {

            return "question";

        }



        return "expression";

    }




    detectAmbiguity(objects, concepts) {


        return {


            detected:

                objects.length === 0 &&
                concepts.length === 0,



            reason:

                objects.length === 0 &&
                concepts.length === 0

                    ? "未识别到明确对象或概念。"

                    : ""

        };


    }




    contains(word) {


        return this.expression.includes(word);


    }


}


export default RecognitionEngine;