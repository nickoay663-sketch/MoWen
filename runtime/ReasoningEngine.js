class ReasoningEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            reasoning:[]

        };

    }

}

export default ReasoningEngine;
