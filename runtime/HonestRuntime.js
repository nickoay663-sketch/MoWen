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
import RuntimeContract from "./RuntimeContract.js";
import EngineRegistry from "./EngineRegistry.js";
import RuntimeResult from "./RuntimeResult.js";


class HonestRuntime {


    constructor(expression) {

        this.expression =
            expression || "";

    }



    run() {

        const trace = [];

        const runtimeResult =
            new RuntimeResult();


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
            new LanguageDetector(
                this.expression
            ).run();


        const recognition =
            new RecognitionEngine(
                this.expression
            ).run();


        trace.push({

            engine:
                "RecognitionEngine",

            status:
                recognition.status,

            version:
                recognition.version

        });

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
            new DefinitionEngine(
                semanticObject
            ).run();


        trace.push({

            engine:
                "DefinitionEngine",

            status:
                definition.status,

            version:
                definition.version

        });


        const search =
            new SearchEngine(
                semanticObject
            ).run();


        trace.push({

            engine:
                "SearchEngine",

            status:
                search.status,

            version:
                search.version

        });


        const evidence =
            new EvidenceEngine({

                ...semanticObject,

                search

            }).run();


        trace.push({

            engine:
                "EvidenceEngine",

            status:
                evidence.status,

            version:
                evidence.version

        });

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


        trace.push({

            engine:
                "CorrespondenceEngine",

            status:
                correspondence.status,

            version:
                correspondence.version

        });


        const reasoning =
            new ReasoningEngine({

                ...semanticObject,

                correspondences:
                    correspondence.result?.correspondences ??
                    correspondence.correspondences ??
                    []

            }).run();


        trace.push({

            engine:
                "ReasoningEngine",

            status:
                reasoning.status,

            version:
                reasoning.version

        });

        const responsibility =
            new ResponsibilityEngine({

                ...semanticObject,

                reasonings:
                    reasoning.result?.reasonings ??
                    reasoning.reasonings ??
                    []

            }).run();


        trace.push({

            engine:
                "ResponsibilityEngine",

            status:
                responsibility.status,

            version:
                responsibility.version

        });



        const reconstruction =
            new ReconstructionEngine({

                semanticObject,

                definition,

                evidence,

                correspondence,

                reasoning,

                responsibility

            }).run();



        trace.push({

            engine:
                "ReconstructionEngine",

            status:
                reconstruction.status,

            version:
                reconstruction.version

        });



        const generator =
            new GeneratorEngine({

                semanticObject,

                reconstruction,

                responsibility

            }).run();



        trace.push({

            engine:
                "GeneratorEngine",

            status:
                generator.status,

            version:
                generator.version

        });

        const engineRegistry =
            new EngineRegistry();


        engineRegistry.register(
            "recognition",
            recognition
        );


        engineRegistry.register(
            "definition",
            definition
        );


        engineRegistry.register(
            "search",
            search
        );


        engineRegistry.register(
            "evidence",
            evidence
        );


        engineRegistry.register(
            "correspondence",
            correspondence
        );


        engineRegistry.register(
            "reasoning",
            reasoning
        );


        engineRegistry.register(
            "responsibility",
            responsibility
        );


        engineRegistry.register(
            "reconstruction",
            reconstruction
        );


        engineRegistry.register(
            "generator",
            generator
        );


        const engines =
            engineRegistry.all();


        const selfCheck =
            new SelfCheckEngine({

                pipeline,

                contract:
                    RuntimeContract,

                engines,

                engineRegistry,

                semanticObject,

                runtimeTrace:
                    trace

            }).run();

        trace.push({

            engine:
                "SelfCheckEngine",

            status:
                selfCheck.status,

            version:
                selfCheck.version

        });

        runtimeResult.runtimeVersion =
            "8.1";

        runtimeResult.setMetadata({

            contractVersion:
                RuntimeContract.version,

            runtimeVersion:
                "8.1",

            engineCount:
                engineRegistry.list().length

        });

        runtimeResult.recognition =
            recognition;

        runtimeResult.definition =
            definition;

        runtimeResult.search =
            search;

        runtimeResult.evidence =
            evidence;

        runtimeResult.correspondence =
            correspondence;

        runtimeResult.reasoning =
            reasoning;

        runtimeResult.responsibility =
            responsibility;

        runtimeResult.reconstruction =
            reconstruction;

        runtimeResult.generator =
            generator;

        runtimeResult.selfCheck =
            selfCheck;

        runtimeResult.engineRegistry =
            engineRegistry;

        runtimeResult.setPipeline(
            pipeline
        );

        runtimeResult.setTrace(
            trace
        );

        runtimeResult.identity =
            identity;

        runtimeResult.contract =
            RuntimeContract;

        runtimeResult.contractVersion =
            RuntimeContract.version;

        runtimeResult.semanticObject =
            semanticObject;

        runtimeResult.language =
            language;

        return runtimeResult;

    }

}


export default HonestRuntime;