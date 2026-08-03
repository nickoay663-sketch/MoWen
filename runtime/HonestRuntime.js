import LanguageDetector from "./LanguageDetector.js";
import RecognitionEngine from "./RecognitionEngine.js";
import DefinitionEngine from "./DefinitionEngine.js";
import SearchEngine from "./SearchEngine.js";
import EvidenceEngine from "./EvidenceEngine.js";
import CorrespondenceEngine from "./CorrespondenceEngine.js";
import ReasoningEngine from "./ReasoningEngine.js";
import ResponsibilityEngine from "./ResponsibilityEngine.js";
import ReconstructionEngine from "./ReconstructionEngine.js";
import GeneratorEngine from "./GeneratorEngine.js";
import SelfCheckEngine from "./SelfCheckEngine.js";
import MoWenIdentity from "./MoWenIdentity.js";


class HonestRuntime {


    constructor(expression) {

        this.expression = expression || "";

    }


    run() {


        const pipeline = [

            "Recognition",

            "Definition",

            "Search",

            "Evidence",

            "Correspondence",

            "Reasoning",

            "Responsibility",

            "Reconstruction",

            "Generator",

            "SelfCheck"

        ];



        const identity =
            new MoWenIdentity().run();



        const language =
            new LanguageDetector(this.expression).run();



        const recognition =
            new RecognitionEngine(this.expression).run();



        const semanticObject = {


            originalContent:

                this.expression,


            language:

                language.language,


            expressionType:

                recognition.expressionType || null,


            objects:

                recognition.result?.objects ??

                recognition.objects ??

                [],


            concepts:

                recognition.result?.concepts ??

                recognition.concepts ??

                []

        };



        const definition =
            new DefinitionEngine(semanticObject).run();



        const search =
            new SearchEngine(semanticObject).run();



        const evidence =
            new EvidenceEngine({

                ...semanticObject,

                search

            }).run();

                    const correspondence =
            new CorrespondenceEngine({

                ...semanticObject,

                definitions:

                    definition.result?.definitions ??

                    definition.definitions ??

                    [],

                evidences:

                    evidence.result?.evidences ??

                    evidence.evidences ??

                    [],

                search

            }).run();



        const reasoning =
            new ReasoningEngine({

                ...semanticObject,

                correspondences:

                    correspondence.result?.correspondences ??

                    correspondence.correspondences ??

                    []

            }).run();



        const responsibility =
            new ResponsibilityEngine({

                ...semanticObject,

                reasonings:

                    reasoning.result?.reasonings ??

                    reasoning.reasonings ??

                    []

            }).run();

                    const reconstruction =
            new ReconstructionEngine({

                semanticObject,

                definition,

                search,

                evidence,

                correspondence,

                reasoning,

                responsibility

            }).run();



        const generator =
            new GeneratorEngine({

                semanticObject,

                reconstruction,

                responsibility

            }).run();



        const selfCheck =
            new SelfCheckEngine({

                pipeline,

                semanticObject,

                recognition,

                definition,

                search,

                evidence,

                correspondence,

                reasoning,

                responsibility,

                reconstruction,

                generator

            }).run();



        return {

            runtimeVersion:

                "3.5",


            pipeline,


            identity,


            language,


            semanticObject,


            recognition,


            definition,


            search,


            evidence,


            correspondence,


            reasoning,


            responsibility,


            reconstruction,


            generator,


            selfCheck

        };


    }


}


export default HonestRuntime;