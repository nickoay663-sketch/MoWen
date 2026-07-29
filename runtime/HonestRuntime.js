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



        const semanticObject = {


            originalContent:

                this.expression,


            language:

                recognition.language || null,


            expressionType:

                recognition.expressionType || null,


            objects:

                recognition.objects || [],


            concepts:

                recognition.concepts || []

        };



        const definition =
            new DefinitionEngine(semanticObject).run();



        const search =
            new SearchEngine(semanticObject).run();



        const evidence =
            new EvidenceEngine(semanticObject).run();



        const correspondence =
            new CorrespondenceEngine({

                ...semanticObject,

                definitions:
                    definition.definitions,

                evidences:
                    evidence.evidences

            }).run();



        const reasoning =
            new ReasoningEngine({

                ...semanticObject,

                correspondence

            }).run();



        const responsibility =
            new ResponsibilityEngine({

                ...semanticObject,

                reasoning

            }).run();



        const reconstruction =
            new ReconstructionEngine({

                semanticObject,

                definition,

                evidence,

                correspondence,

                reasoning,

                responsibility

            }).run();



        const selfCheck =
            new SelfCheckEngine({

                recognition,

                definition,

                search,

                evidence,

                correspondence,

                reasoning,

                responsibility,

                reconstruction

            }).run();



        return {


            runtimeVersion:

                "2.3",


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
