import LanguageAdapter from "./LanguageAdapter.js";
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
import CoreGovernance from "./CoreGovernance.js";

class HonestRuntime {

    constructor(
        expression,
        options = {}
    ) {

        this.expression =
            typeof expression === "string"
                ? expression.trim()
                : String(expression ?? "").trim();

        this.options =
            options || {};

    }


    run() {

        const governance =
            new CoreGovernance();

        const governanceResult =
            governance.enforce();

        if (
            governanceResult.passed !== true
        ) {

            throw new Error(
                `MoWen Core Governance failed: ${JSON.stringify(
                    governanceResult
                )}`
            );

        }

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

        const languageSystem =
            this.options.languageSystem ??
            this.options.language ??
            null;

        const languageAdapter =
            new LanguageAdapter(
                languageSystem
            );

        const languageConnection =
            languageAdapter.connect(
                this.expression
            );

        const recognitionEngine =
            new RecognitionEngine(
                this.expression,
                languageConnection.languageSystem
            );

        const recognition =
            recognitionEngine.execute();

        this.recordTrace(
            trace,
            recognition
        );

        const semanticObject = {

            originalContent:
                this.expression,

            languageSystem:
                languageConnection.languageSystem,

            languageAdapter:
                languageConnection,

            objects:
                recognition.objects || [],

            concepts:
                recognition.concepts || [],

            testimony,

            testimonyValidation,

            identity,

            contract:
                RuntimeContract

        };

        const definitionEngine =
            new DefinitionEngine(
                semanticObject
            );

        const definition =
            definitionEngine.execute();

        this.recordTrace(
            trace,
            definition
        );

        const searchEngine =
            new SearchEngine(
                semanticObject
            );

        const search =
            searchEngine.execute();

        this.recordTrace(
            trace,
            search
        );

        const evidenceEngine =
            new EvidenceEngine({

                ...semanticObject,

                search

            });

        const evidence =
            evidenceEngine.execute();

        this.recordTrace(
            trace,
            evidence
        );

        const correspondenceEngine =
            new CorrespondenceEngine({

                ...semanticObject,

                definitions:
                    definition.definitions || [],

                evidences:
                    evidence.evidences || []

            });

        const correspondence =
            correspondenceEngine.execute();

        this.recordTrace(
            trace,
            correspondence
        );

        const reasoningEngine =
            new ReasoningEngine({

                ...semanticObject,

                correspondences:
                    correspondence.correspondences || []

            });

        const reasoning =
            reasoningEngine.execute();

        this.recordTrace(
            trace,
            reasoning
        );

        const responsibilityEngine =
            new ResponsibilityEngine({

                ...semanticObject,

                reasonings:
                    reasoning.reasonings || [],

                contract:
                    RuntimeContract

            });

        const responsibility =
            responsibilityEngine.execute();

        this.recordTrace(
            trace,
            responsibility
        );

        const reconstructionEngine =
            new ReconstructionEngine({

                semanticObject,

                responsibility,

                contract:
                    RuntimeContract,

                pipeline,

                runtimeTrace:
                    trace

            });

        const reconstruction =
            reconstructionEngine.execute();

        this.recordTrace(
            trace,
            reconstruction
        );

        const generatorEngine =
            new GeneratorEngine({

                semanticObject,

                responsibility,

                reconstruction,

                contract:
                    RuntimeContract,

                pipeline,

                runtimeTrace:
                    trace

            });

        const generator =
            generatorEngine.execute();

        this.recordTrace(
            trace,
            generator
        );

        const engineRegistry =
            new EngineRegistry();

        const selfCheckEngine =
            new SelfCheckEngine({

                pipeline,

                contract:
                    RuntimeContract,

                engines:
                    null,

                engineRegistry,

                semanticObject,

                runtimeResult,

                runtimeTrace:
                    trace

            });

        const engineInstances = {

            recognition:
                recognitionEngine,

            definition:
                definitionEngine,

            search:
                searchEngine,

            evidence:
                evidenceEngine,

            correspondence:
                correspondenceEngine,

            reasoning:
                reasoningEngine,

            responsibility:
                responsibilityEngine,

            reconstruction:
                reconstructionEngine,

            generator:
                generatorEngine,

            selfCheck:
                selfCheckEngine

        };

        const executionResults = {

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

        /*
         * Register every completed Engine before SelfCheck.
         * SelfCheck must inspect the complete runtime registry.
         */
        for (
            const [name, engine]
            of Object.entries(engineInstances)
        ) {

            if (name === "selfCheck") {
                continue;
            }

            engineRegistry.register(
                name,
                engine,
                executionResults[name] || {}
            );

        }

        /*
         * SelfCheck itself has not executed yet, therefore its final
         * execution result does not exist. A provisional contract-shaped
         * registration makes the runtime registry complete before
         * SelfCheck begins. The provisional record is replaced by the
         * real SelfCheck result immediately after execution.
         */
        const selfCheckRegistration = {

            engine:
                "SelfCheckEngine",

            version:
                selfCheckEngine.version,

            status:
                selfCheckEngine.status,

            principle:
                selfCheckEngine.principle,

            metadata:
                selfCheckEngine.metadata(),

            result:
                {},

            trace:
                trace,

            questions:
                [],

            nextRuntimeState:
                "RuntimeCompleted"

        };

        engineRegistry.register(
            "selfCheck",
            selfCheckEngine,
            selfCheckRegistration
        );

        const engines = {

            recognition,
            definition,
            search,
            evidence,
            correspondence,
            reasoning,
            responsibility,
            reconstruction,
            generator,

            selfCheck:
                selfCheckRegistration

        };

        const registryStateBeforeSelfCheck =
            engineRegistry.list();

        const selfCheckContext =
        {

            pipeline,

            contract:
                RuntimeContract,

            engines,

            engineRegistry,

            semanticObject,

            runtimeResult,

            runtimeTrace:
                trace

        };

        /*
         * SelfCheckEngine reads this.runtimeObject directly.
         * Inject the final complete context immediately before execution.
         */
        selfCheckEngine.runtimeContext =
            selfCheckContext;

        const selfCheck =
            selfCheckEngine.execute();

        this.recordTrace(
            trace,
            selfCheck
        );

        /*
         * Replace the provisional registry result with the real
         * SelfCheck execution result.
         */
        engines.selfCheck =
            selfCheck;

        engineRegistry.register(
            "selfCheck",
            selfCheckEngine,
            selfCheck
        );

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

            runtimeVersion,

            engineCount:
                engineRegistry.list().length,

            registryValidation,

            registryVersionValidation,

            registryStateBeforeSelfCheck,

            registryStateAfterSelfCheck:
                engineRegistry.list(),

            governance:
                governanceResult

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

        runtimeResult.selfCheck =
            selfCheck;

        runtimeResult.engineRegistry =
            engineRegistry;

        runtimeResult.testimonyChain = {

            testimony,
            testimonyValidation,
            responsibility

        };

        runtimeResult.verificationBoundary = {

            evidenceBoundary:
                reconstruction.reconstruction?.boundaries?.evidence || null,

            sourceBoundary:
                reconstruction.reconstruction?.boundaries?.source || null,

            responsibilityBoundary:
                reconstruction.reconstruction?.boundaries?.responsibility || null

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
