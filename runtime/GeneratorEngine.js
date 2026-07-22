class GeneratorEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            generatedText: "",

            status: "waiting"

        };

    }

}

export default GeneratorEngine;
