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

class HonestRuntime {

    constructor(expression) {

        this.expression = expression || "";

    }

    run() {

        const trace = [];

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

        trace.push({

            engine: "RecognitionEngine",
            status: recognition.status,
            version: recognition.version

        });

        const semanticObject = {

            originalContent: this.expression,

            language: language.language,

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

        trace.push({

            engine: "DefinitionEngine",
            status: definition.status,
            version: definition.version

        });

        const search =
            new SearchEngine(semanticObject).run();

        trace.push({

            engine: "SearchEngine",
            status: search.status,
            version: search.version

        });

        const evidence =
            new EvidenceEngine({

                ...semanticObject,

                search

            }).run();

        trace.push({

            engine: "EvidenceEngine",
            status: evidence.status,
            version: evidence.version

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

            engine: "CorrespondenceEngine",
            status: correspondence.status,
            version: correspondence.version

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

            engine: "ReasoningEngine",
            status: reasoning.status,
            version: reasoning.version

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

            engine: "ResponsibilityEngine",
            status: responsibility.status,
            version: responsibility.version

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

            engine: "ReconstructionEngine",
            status: reconstruction.status,
            version: reconstruction.version

        });

        const generator =
            new GeneratorEngine({

                semanticObject,

                reconstruction,

                responsibility

            }).run();

        trace.push({

            engine: "GeneratorEngine",
            status: generator.status,
            version: generator.version

        });

        const engines = {

            recognition,

            definition,

            search,

            evidence,

            correspondence,

            reasoning,

            responsibility,

            reconstruction,

            generator

        };

        const selfCheck =
            new SelfCheckEngine({

                pipeline,

                contract: RuntimeContract,

                engines,

                semanticObject

            }).run();

        trace.push({

            engine: "SelfCheckEngine",
            status: selfCheck.status,
            version: selfCheck.version

        });

        return {

            runtimeVersion: "4.3",

            contract: RuntimeContract,

            contractVersion:
                RuntimeContract.version,

            identity,

            pipeline,

            language,

            semanticObject,

            engines,

            selfCheck,

            runtimeTrace: trace

        };

    }

}

export default HonestRuntime;