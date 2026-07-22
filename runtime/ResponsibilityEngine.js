class ResponsibilityEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            responsibility: [],

            status: "waiting"

        };

    }

}

export default ResponsibilityEngine;
