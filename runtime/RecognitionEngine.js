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

        Dictionary.objects.forEach(item=>{

            if(this.text.includes(item.word)){

                result.objects.push(item);

            }

        });

        Dictionary.concepts.forEach(item=>{

            if(this.text.includes(item.word)){

                result.concepts.push(item);

            }

        });

        return result;

    }

}

export default RecognitionEngine;
