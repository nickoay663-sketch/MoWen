class EvidenceEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            evidences:[]

        };

    }

}

export default EvidenceEngine;
