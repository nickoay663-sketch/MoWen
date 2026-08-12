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
import TestimonyBuilder from "./TestimonyBuilder.js";
import TestimonyValidator from "./TestimonyValidator.js";

class HonestRuntime {

    constructor(
        expression,
        options = {}
    ) {

        this.expression =
            expression || "";

        this.options =
            options || {};

    }


    run() {

        const trace = [];

        const runtimeResult =
            new RuntimeResult();

        const runtimeVersion =
            RuntimeContract.identity.runtimeVersion;

        const pipeline = [

            "RecognitionEngine",

            "DefinitionEngine",

            "SearchEngine",

            "EvidenceEngine",

            "CorrespondenceEngine",

            "ReasoningEngine",

            "ResponsibilityEngine",

            "ReconstructionEngine",

            "GeneratorEngine",

            "SelfCheckEngine"

        ];


        const identity =
            new MoWenIdentity().run();


        const testimony =
            new TestimonyBuilder(
                this.expression
            ).run();


        const testimonyValidation =
            new TestimonyValidator(
                testimony
            ).run();


        const language =
            new LanguageDetector(
                this.expression
            ).run();


        const recognition =
            new RecognitionEngine(
                this.expression
            ).execute();


        this.recordTrace(
            trace,
            recognition
        );


        const semanticObject = {

            originalContent:
                this.expression,

            language:
                language.language,

            objects:
                recognition.objects || [],

            concepts:
                recognition.concepts || [],

            testimony,

            testimonyValidation,

            identity,

            contract:
                RuntimeContract,

            evidence:
                Array.isArray(
                    this.options.evidence
                )
                    ? this.options.evidence
                    : []

        };


        const definition =
            new DefinitionEngine(
                semanticObject
            ).execute();


        this.recordTrace(
            trace,
            definition
        );


        const search =
            new SearchEngine(
                semanticObject
            ).execute();


        this.recordTrace(
            trace,
            search
        );


        const evidence =
            new EvidenceEngine({
                ...semanticObject,
                search
            }).execute();


        this.recordTrace(
            trace,
            evidence
        );


        const correspondence =
            new CorrespondenceEngine({

                ...semanticObject,

                definitions:
                    definition.definitions || [],

                evidences:
                    evidence.evidences || []

            }).execute();


        this.recordTrace(
            trace,
            correspondence
        );


        const reasoning =
            new ReasoningEngine({

                ...semanticObject,

                correspondences:
                    correspondence.correspondences || []

            }).execute();


        this.recordTrace(
            trace,
            reasoning
        );


        const responsibility =
            new ResponsibilityEngine({

                ...semanticObject,

                reasonings:
                    reasoning.reasonings || []

            }).execute();


        this.recordTrace(
            trace,
            responsibility
        );


        const reconstruction =
            new ReconstructionEngine({

                semanticObject,

                responsibility,

                contract:
                    RuntimeContract,

                pipeline,

                runtimeTrace:
                    trace

            }).execute();


        this.recordTrace(
            trace,
            reconstruction
        );


        const generator =
            new GeneratorEngine({

                semanticObject,

                responsibility,

                reconstruction,

                contract:
                    RuntimeContract,

                pipeline,

                runtimeTrace:
                    trace

            }).execute();


        this.recordTrace(
            trace,
            generator
        );


        const engineRegistry =
            new EngineRegistry();


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


        for (
            const [name, result]
            of Object.entries(engines)
        ) {

            engineRegistry.register(
                name,
                result
            );

        }


        const registryValidation =
            engineRegistry.validate();


        const registryVersionValidation =
            engineRegistry.validateVersions(
                RuntimeContract.version
            );


        runtimeResult.runtimeVersion =
            runtimeVersion;


        runtimeResult.setMetadata({

            contractVersion:
                RuntimeContract.version,

            runtimeVersion:
                runtimeVersion,

            engineCount:
                engineRegistry.list().length,

            registryValidation,

            registryVersionValidation

        });


        runtimeResult.recognition =
            recognition;

        runtimeResult.definition =
            definition;

        runtimeResult.testimony =
            testimony;

        runtimeResult.testimonyValidation =
            testimonyValidation;

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

        runtimeResult.responsibilityModel =
            responsibility.responsibilities || [];

        runtimeResult.reconstruction =
            reconstruction;

        runtimeResult.generator =
            generator;

        runtimeResult.engineRegistry =
            engineRegistry;


        runtimeResult.testimonyChain = {

            testimony,

            testimonyValidation,

            responsibility

        };


        runtimeResult.verificationBoundary = {

            evidenceBoundary:
                reconstruction
                    .reconstruction
                    ?.boundaries
                    ?.evidence || null,

            sourceBoundary:
                reconstruction
                    .reconstruction
                    ?.boundaries
                    ?.source || null,

            responsibilityBoundary:
                reconstruction
                    .reconstruction
                    ?.boundaries
                    ?.responsibility || null

        };


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


        runtimeResult.semanticObject =
            semanticObject;


        const selfCheck =
            new SelfCheckEngine({

                pipeline,

                contract:
                    RuntimeContract,

                engines,

                engineRegistry,

                semanticObject,

                runtimeResult,

                runtimeTrace:
                    trace

            }).execute();


        this.recordTrace(
            trace,
            selfCheck
        );


        runtimeResult.selfCheck =
            selfCheck;


        runtimeResult.setTrace(
            trace
        );


        return runtimeResult;

    }


    recordTrace(
        trace,
        result
    ) {

        if (!result) {

            return;

        }


        trace.push({

            engine:
                result.engine,

            status:
                result.status,

            version:
                result.version

        });

    }

}


export default HonestRuntime;
