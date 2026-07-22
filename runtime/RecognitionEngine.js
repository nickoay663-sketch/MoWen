class RecognitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        const result = {
            originalText: this.text,
            objects: [],
            concepts: [],
            definitions: [],
            evidences: []
        };

        if(this.text.includes("我")){
            result.objects.push("我");
        }

        if(this.text.includes("老师")){
            result.concepts.push("老师");
        }

        return result;

    }

}

export default RecognitionEngine;
