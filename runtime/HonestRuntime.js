import RecognitionEngine from "./RecognitionEngine.js";
import DefinitionEngine from "./DefinitionEngine.js";
import EvidenceEngine from "./EvidenceEngine.js";
import CorrespondenceEngine from "./CorrespondenceEngine.js";
import ReasoningEngine from "./ReasoningEngine.js";
import ResponsibilityEngine from "./ResponsibilityEngine.js";
import GeneratorEngine from "./GeneratorEngine.js";

class HonestRuntime {

    constructor(text){
        this.text = text;
    }

    run(){

        return{

            recognition: new RecognitionEngine(this.text).run(),

            definition: new DefinitionEngine(this.text).run(),

            evidence: new EvidenceEngine(this.text).run(),

            correspondence: new CorrespondenceEngine(this.text).run(),

            reasoning: new ReasoningEngine(this.text).run(),

            responsibility: new ResponsibilityEngine(this.text).run(),

            generator: new GeneratorEngine(this.text).run()

        };

    }

}

export default HonestRuntime;
