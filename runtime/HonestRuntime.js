import RecognitionEngine from "./RecognitionEngine.js";
import DefinitionEngine from "./DefinitionEngine.js";
import SearchEngine from "./SearchEngine.js";
import EvidenceEngine from "./EvidenceEngine.js";
import CorrespondenceEngine from "./CorrespondenceEngine.js";
import ReasoningEngine from "./ReasoningEngine.js";
import ResponsibilityEngine from "./ResponsibilityEngine.js";
import ReconstructionEngine from "./ReconstructionEngine.js";
import SelfCheckEngine from "./SelfCheckEngine.js";
import MoWenIdentity from "./MoWenIdentity.js";


class HonestRuntime {

    constructor(text) {

        this.text = text || "";

    }


    stop(identity, data) {

        return {

            identity,

            ...data,

            reconstruction:
                new ReconstructionEngine(data).run(),

            selfCheck: null

        };

    }


    run() {

        const identity =
            new MoWenIdentity().run();


        const recognition =
            new RecognitionEngine(this.text).run();


        if (!recognition.matched) {

            return this.stop(identity, {
                recognition
            });

        }


        const definition =
            new DefinitionEngine(this.text).run();


        if (!definition.matched) {

            return this.stop(identity, {
                recognition,
                definition
            });

        }


        const search =
            new SearchEngine(this.text).run();


        const evidence =
            new EvidenceEngine(this.text).run();


        const correspondence =
            new CorrespondenceEngine(
                this.text
            ).run();


        const reasoning =
            new ReasoningEngine(
                this.text
            ).run();


        const responsibility =
            new ResponsibilityEngine(
                this.text
            ).run();


        const reconstruction =
            new ReconstructionEngine({

                recognition,

                definition,

                search,

                evidence,

                correspondence,

                reasoning,

                responsibility

            }).run();


        const selfCheck =
            new SelfCheckEngine({

                evidence,

                correspondence,

                reasoning

            }).run();


        return {

            identity,

            recognition,

            definition,

            search,

            evidence,

            correspondence,

            reasoning,

            responsibility,

            reconstruction,

            selfCheck

        };

    }

}


export default HonestRuntime;
