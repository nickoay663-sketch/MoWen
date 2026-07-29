import Dictionary from "./Dictionary.js";


class RecognitionEngine {


    constructor(expression) {

        this.expression = expression || "";

    }



    run() {


        const objects =
            this.findObjects();


        const concepts =
            this.findConcepts();



        return {


            originalContent:

                this.expression,



            principle:

                "莫问只识别，不猜测。",



            language:

                this.detectLanguage(),



            objects,



            concepts,



            status:

                objects.length > 0 ||
                concepts.length > 0

                    ? "recognition-completed"

                    : "need-recognition",



            questions:

                objects.length > 0 ||
                concepts.length > 0

                    ? []

                    :

                    [

                        "该表达中是否存在尚未识别的对象或概念？"

                    ],



            version:

                "2.2"


        };


    }



    findObjects() {


        return Dictionary.objects.filter(

            item =>

                this.contains(item.word)

        );


    }



    findConcepts() {


        return Dictionary.concepts.filter(

            item =>

                this.contains(item.word)

        );


    }



    contains(word) {


        return this.expression.includes(word);


    }



    detectLanguage() {


        if (/[\u4e00-\u9fa5]/.test(this.expression))

            return "Chinese";


        if (/[a-zA-Z]/.test(this.expression))

            return "English";


        return "Unknown";


    }


}


export default RecognitionEngine;
