class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            "10.3";

        this.generatedAt =
            new Date().toISOString();

        this.metadata = {

            contractVersion:
                "10.3",

            runtimeVersion:
                "10.3",

            engineCount:
                0,

            generatedAt:
                this.generatedAt

        };

        this.recognition =
            null;

        this.definition =
            null;

        this.testimony =
            null;

        this.testimonyValidation =
            null;

        this.search =
            null;

        this.evidence =
            null;

        this.correspondence =
            null;

        this.reasoning =
            null;

        this.responsibility =
            null;

        this.responsibilityModel =
            null;

        this.reconstruction =
            null;

        this.generator =
            null;

        this.selfCheck =
            null;

        this.engineRegistry =
            null;

        this.testimonyChain =
            null;

        this.verificationBoundary =
            null;

        this.identity =
            null;

        this.contract =
            null;

        this.semanticObject =
            null;

        this.runtimeTrace =
            [];

        this.pipeline =
            [];

        this.epistemicState =
            "UNKNOWN";

        this.epistemicBoundary = {

            discovered:
                0,

            unverified:
                0,

            verified:
                0,

            supported:
                0,

            unknown:
                0

        };

    }


    setMetadata(metadata = {}) {

        this.metadata = {

            ...this.metadata,

            ...metadata,

            runtimeVersion:
                metadata.runtimeVersion ||
                this.runtimeVersion,

            contractVersion:
                metadata.contractVersion ||
                this.metadata.contractVersion

        };

        return this;

    }


    setEngine(name, value) {

        if (
            typeof name === "string" &&
            name.length > 0
        ) {

            this[name] =
                value;

        }

        return this;

    }


    setTrace(trace = []) {

        this.runtimeTrace =
            Array.isArray(trace)
                ? trace
                : [];

        return this;

    }


    setPipeline(pipeline = []) {

        this.pipeline =
            Array.isArray(pipeline)
                ? pipeline
                : [];

        return this;

    }


    setResponsibilityModel(model = []) {

        this.responsibilityModel =
            model;

        return this;

    }


    setTestimonyChain(chain = {}) {

        this.testimonyChain =
            chain;

        return this;

    }


    setVerificationBoundary(boundary = {}) {

        this.verificationBoundary =
            boundary;

        return this;

    }


    setEpistemicState(state = "UNKNOWN") {

        const allowedStates = [

            "DISCOVERED",

            "UNVERIFIED",

            "VERIFIED",

            "SUPPORTED",

            "UNKNOWN"

        ];

        this.epistemicState =
            allowedStates.includes(state)
                ? state
                : "UNKNOWN";

        return this;

    }


    setEpistemicBoundary(boundary = {}) {

        this.epistemicBoundary = {

            ...this.epistemicBoundary,

            ...boundary

        };

        return this;

    }


    buildEpistemicBoundary() {

        const correspondence =
            this.correspondence || {};

        const reasoning =
            this.reasoning || {};

        const evidences =
            Array.isArray(
                correspondence.evidences
            )
                ? correspondence.evidences
                : [];

        const verifiedEvidenceCount =
            Number(
                correspondence.verifiedEvidenceCount || 0
            );

        const unverifiedEvidenceCount =
            Number(
                correspondence.unverifiedEvidenceCount || 0
            );

        const evidenceCount =
            Number(
                correspondence.evidenceCount ||
                evidences.length ||
                0
            );

        const supportedCount =
            correspondence.supported === true
                ? 1
                : 0;

        const unknownCount =
            correspondence.verificationStatus ===
            "UNKNOWN"
                ? 1
                : 0;

        this.epistemicBoundary = {

            discovered:
                Number(
                    this.search?.metadata?.sourceCount ||
                    0
                ),

            unverified:
                unverifiedEvidenceCount,

            verified:
                verifiedEvidenceCount,

            supported:
                supportedCount,

            unknown:
                unknownCount,

            evidenceCount,

            reasoningEvaluated:
                Array.isArray(
                    reasoning.reasonings
                )
                    ? reasoning.reasonings.length
                    : 0

        };

        return this.epistemicBoundary;

    }


    complete() {

        this.buildEpistemicBoundary();

        return {

            runtimeVersion:
                this.runtimeVersion,

            generatedAt:
                this.generatedAt,

            metadata:
                this.metadata,

            recognition:
                this.recognition,

            definition:
                this.definition,

            testimony:
                this.testimony,

            testimonyValidation:
                this.testimonyValidation,

            search:
                this.search,

            evidence:
                this.evidence,

            correspondence:
                this.correspondence,

            reasoning:
                this.reasoning,

            responsibility:
                this.responsibility,

            responsibilityModel:
                this.responsibilityModel,

            reconstruction:
                this.reconstruction,

            generator:
                this.generator,

            selfCheck:
                this.selfCheck,

            engineRegistry:
                this.engineRegistry,

            testimonyChain:
                this.testimonyChain,

            verificationBoundary:
                this.verificationBoundary,

            identity:
                this.identity,

            contract:
                this.contract,

            semanticObject:
                this.semanticObject,

            runtimeTrace:
                this.runtimeTrace,

            pipeline:
                this.pipeline,

            epistemicState:
                this.epistemicState,

            epistemicBoundary:
                this.epistemicBoundary,

            result:
                this

        };

    }

}

export default RuntimeResult;
