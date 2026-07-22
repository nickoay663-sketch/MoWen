import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        const result = {

            originalText:this.text,

            concepts:[],

            definitions:[]

        };

        Object.keys(Definitions).forEach(concept=>{

            if(this.text.includes(concept)){

                result.concepts.push(concept);

                result.definitions.push(Definitions[concept]);

            }

        });

        return result;

    }

}

export default DefinitionEngine;
