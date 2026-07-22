class DefinitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            concepts:[],

            definitions:[]

        };

    }

}

export default DefinitionEngine;
