import RecognitionEngine from "./RecognitionEngine.js";
import DefinitionEngine from "./DefinitionEngine.js";
import SearchEngine from "./SearchEngine.js";
import EvidenceEngine from "./EvidenceEngine.js";
import CorrespondenceEngine from "./CorrespondenceEngine.js";
import ReasoningEngine from "./ReasoningEngine.js";
import ResponsibilityEngine from "./ResponsibilityEngine.js";
import GeneratorEngine from "./GeneratorEngine.js";

class HonestRuntime {

    constructor(text) {
        this.text = text;
    }

    run() {

        const recognition = new RecognitionEngine(this.text).run();

        const definition = new DefinitionEngine(this.text).run();

        const search = new SearchEngine(this.text).run();

        const evidence = new EvidenceEngine(this.text).run();

        const correspondence = new CorrespondenceEngine(this.text).run();

        const reasoning = new ReasoningEngine(this.text).run();

        const responsibility = new ResponsibilityEngine(this.text).run();

        const generator = new GeneratorEngine(this.text).run();

        return {

            recognition,

            definition,

            search,

            evidence,

            correspondence,

            reasoning,

            responsibility,

            generator

        };

    }

}

export default HonestRuntime;
