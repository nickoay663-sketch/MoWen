import Dictionary from "./Dictionary.js";

class RecognitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        const result = {

            originalText: this.text,

            objects: [],

            concepts: []

        };

        Dictionary.objects.forEach(word=>{

            if(this.text.includes(word)){

                result.objects.push(word);

            }

        });

        Dictionary.concepts.forEach(word=>{

            if(this.text.includes(word)){

                result.concepts.push(word);

            }

        });

        return result;

    }

}

export default RecognitionEngine;
