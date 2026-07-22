class GeneratorEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            generatedText: this.text,

            status: "generated"

        };

    }

}

export default GeneratorEngine;
