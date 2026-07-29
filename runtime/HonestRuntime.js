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


    constructor(expression) {

        this.expression = expression || "";

    }



    run() {


        const identity =
            new MoWenIdentity().run();



        const recognition =
            new RecognitionEngine(this.expression).run();



        const definition =
            new DefinitionEngine(recognition).run();



        const semanticObject = {


            originalContent:
                this.expression,


            language:
                recognition.language || null,


            expressionType:
                recognition.type || null,


            recognition,


            definition

        };



        const search =
            new SearchEngine(semanticObject).run();



        const evidence =
            new EvidenceEngine(semanticObject).run();



        semanticObject.evidence =
            evidence;



        const correspondence =
            new CorrespondenceEngine(semanticObject).run();



        semanticObject.correspondence =
            correspondence;



        const reasoning =
            new ReasoningEngine(semanticObject).run();



        semanticObject.reasoning =
            reasoning;



        const responsibility =
            new ResponsibilityEngine(semanticObject).run();



        semanticObject.responsibility =
            responsibility;



        const reconstruction =
            new ReconstructionEngine(semanticObject).run();



        const selfCheck =
            new SelfCheckEngine({

                semanticObject,

                reconstruction

            }).run();



        return {


            runtimeVersion:

                "2.2",


            identity,


            semanticObject,


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
