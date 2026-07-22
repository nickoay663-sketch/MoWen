class CorrespondenceEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            originalText: this.text,

            correspondences:[]

        };

    }

}

export default CorrespondenceEngine;
