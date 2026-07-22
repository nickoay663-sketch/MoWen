class DefinitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        const result = {

            originalText: this.text,

            concepts: [],

            definitions: []

        };

        if(this.text.includes("老师")){

            result.concepts.push("老师");

            result.definitions.push("Teacher.md");

        }

        return result;

    }

}

export default DefinitionEngine;
