import RecognitionEngine from "./RecognitionEngine.js";
import DefinitionEngine from "./DefinitionEngine.js";
import SearchEngine from "./SearchEngine.js";
import EvidenceEngine from "./EvidenceEngine.js";
import CorrespondenceEngine from "./CorrespondenceEngine.js";
import ReasoningEngine from "./ReasoningEngine.js";
import ResponsibilityEngine from "./ResponsibilityEngine.js";
import GeneratorEngine from "./GeneratorEngine.js";
import SelfCheckEngine from "./SelfCheckEngine.js";


class HonestRuntime {

    constructor(text) {
        this.text = text;
    }


    run() {

        const recognition =
            new RecognitionEngine(this.text).run();


        const definition =
            new DefinitionEngine(recognition).run();


        const search =
            new SearchEngine(this.text).run();


        const evidence =
            new EvidenceEngine(this.text).run();


        const correspondence =
            new CorrespondenceEngine(
                evidence.evidences[0]
            ).run();


        const reasoning =
            new ReasoningEngine(
                correspondence
            ).run();


        const responsibility =
            new ResponsibilityEngine(
                reasoning
            ).run();


        const generator =
            new GeneratorEngine(
                {
                    recognition,
                    definition,
                    search,
                    evidence,
                    correspondence,
                    reasoning,
                    responsibility
                }
            ).run();


        const selfCheck =
            new SelfCheckEngine(
                {
                    evidence,
                    correspondence,
                    reasoning
                }
            ).run();


        return {

            recognition,

            definition,

            search,

            evidence,

            correspondence,

            reasoning,

            responsibility,

            generator,

            selfCheck

        };

    }

}


export default HonestRuntime;
