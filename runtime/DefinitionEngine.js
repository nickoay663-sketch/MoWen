import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        // 莫问原则：
        // 没有定义，就没有推理。
        // Definition 是整个 Runtime 的基础。

        const result = {

            originalText: this.text,

            principle: "没有定义，就没有推理。",

            concepts: [],

            definitions: []

        };

        Object.keys(Definitions).forEach(concept => {

            if(this.text.includes(concept)){

                result.concepts.push(concept);

                result.definitions.push(Definitions[concept]);

            }

        });

        return result;

    }

}

export default DefinitionEngine;
