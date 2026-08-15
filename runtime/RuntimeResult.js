class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            "10.4";

        this.generatedAt =
            new Date().toISOString();

        this.metadata = {

            contractVersion:
                "10.4",

            runtimeVersion:
                "10.4",

            engineCount:
                0,

            generatedAt:
                this.generatedAt

        };

        this.recognition = null;
        this.definition = null;
        this.testimony = null;
        this.testimonyValidation = null;
        this.search = null;
        this.evidence = null;
        this.correspondence = null;
        this.reasoning = null;
        this.responsibility = null;
        this.responsibilityModel = null;
        this.reconstruction = null;
        this.generator = null;
        this.selfCheck = null;
        this.engineRegistry = null;
        this.testimonyChain = null;
        this.verificationBoundary = null;
        this.identity = null;
        this.contract = null;
        this.semanticObject = null;
        this.runtimeTrace = [];
        this.pipeline = [];
        this.epistemicState = "UNKNOWN";

        this.epistemicBoundary = {

            discovered: 0,
            unverified: 0,
            verified: 0,
            supported: 0,
            unknown: 0

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
            Array.isArray(model)
                ? model
                : [];

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

        /*
         * RuntimeResult 是最终输出边界。
         *
         * 这里绝不能返回 this 作为 result，
         * 否则会形成：
         *
         * result -> RuntimeResult -> result
         *
         * 同时也不能把运行时 EngineRegistry 实例
         * 原样暴露到最终 JSON。
         */

        const output = {

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
                this.serializeEngineRegistry(),

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
                this.epistemicBoundary

        };

        return output;

    }


    serializeEngineRegistry() {

        const registry =
            this.engineRegistry;

        if (!registry) {

            return [];

        }

        /*
         * EngineRegistry 实例只允许通过
         * describe() 进入 RuntimeResult。
         */

        if (
            typeof registry.describe ===
            "function"
        ) {

            const described =
                registry.describe();

            return this.makeSerializable(
                described
            );

        }

        /*
         * 如果上游已经传入纯数据，
         * 同样允许保留。
         */

        return this.makeSerializable(
            registry
        );

    }


    makeSerializable(value, seen = new WeakSet()) {

        if (
            value === null ||
            value === undefined
        ) {

            return value;

        }

        if (
            typeof value !== "object"
        ) {

            return value;

        }

        if (
            seen.has(value)
        ) {

            return undefined;

        }

        seen.add(value);

        if (Array.isArray(value)) {

            return value
                .map(
                    item =>
                        this.makeSerializable(
                            item,
                            seen
                        )
                )
                .filter(
                    item =>
                        item !== undefined
                );

        }

        const output = {};

        for (
            const [key, item]
            of Object.entries(value)
        ) {

            const serialized =
                this.makeSerializable(
                    item,
                    seen
                );

            if (
                serialized !== undefined
            ) {

                output[key] =
                    serialized;

            }

        }

        return output;

    }

}


export default RuntimeResult;
