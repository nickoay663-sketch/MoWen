import RuntimeContract from "./RuntimeContract.js";

class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            RuntimeContract.identity?.runtimeVersion ||
            RuntimeContract.version ||
            "10.4";

        this.generatedAt =
            new Date().toISOString();

        this.metadata = {

            contractVersion:
                RuntimeContract.identity?.contractVersion ||
                RuntimeContract.version ||
                "10.4",

            runtimeVersion:
                this.runtimeVersion,

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

        this.epistemicState =
            this.getContractState("unknown", "UNKNOWN");

        this.epistemicBoundary = {

            discovered: 0,
            unverified: 0,
            verified: 0,
            verifiedButNotLinked: 0,
            supported: 0,
            unknown: 0,
            contradicted: 0,
            partial: 0,
            unresolved: 0,
            outOfDomain: 0,
            evidenceCount: 0,
            reasoningEvaluated: 0

        };

    }


    getContractStates() {

        return (
            RuntimeContract.epistemicStates ||
            {}
        );

    }


    getContractState(key, fallback = null) {

        const states =
            this.getContractStates();

        return (
            states[key] ||
            fallback
        );

    }


    isDeclaredEpistemicState(state) {

        if (
            typeof state !== "string"
        ) {

            return false;

        }

        return Object
            .values(
                this.getContractStates()
            )
            .includes(state);

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

        this.epistemicState =
            this.isDeclaredEpistemicState(state)
                ? state
                : this.getContractState(
                    "unknown",
                    "UNKNOWN"
                );

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

        const evidenceResult =
            this.evidence || {};

        const correspondenceResult =
            this.correspondence || {};

        const reasoningResult =
            this.reasoning || {};


        const correspondences =
            Array.isArray(
                correspondenceResult.correspondences
            )
                ? correspondenceResult.correspondences
                : [];


        const reasoningItems =
            Array.isArray(
                reasoningResult.reasonings
            )
                ? reasoningResult.reasonings
                : [];


        /*
         * ---------------------------------------------------------
         * Evidence Boundary
         *
         * EvidenceEngine 是发现 / 验证状态的直接来源。
         *
         * RuntimeResult 不根据搜索数量制造验证状态。
         * ---------------------------------------------------------
         */

        const evidenceMetadata =
            evidenceResult.metadata || {};

        const evidenceCount =
            Number(
                evidenceMetadata.evidenceCount ||
                evidenceResult.evidences?.length ||
                0
            );

        const evidenceUnverifiedCount =
            Number(
                evidenceMetadata.unverifiedCount ||
                0
            );

        const evidenceVerifiedCount =
            Number(
                evidenceMetadata.verifiedCount ||
                0
            );

        const evidenceDiscoveredCount =
            Number(
                evidenceMetadata.discoveredCount ||
                0
            );


        /*
         * ---------------------------------------------------------
         * Correspondence Boundary
         *
         * CorrespondenceEngine 的真实对应关系位于：
         *
         * correspondence.correspondences[]
         *
         * verificationStatus 是对应层状态。
         *
         * 只有 Contract 已声明的状态才允许进入边界统计。
         * ---------------------------------------------------------
         */

        const supportedState =
            this.getContractState(
                "supported",
                "SUPPORTED"
            );

        const unknownState =
            this.getContractState(
                "unknown",
                "UNKNOWN"
            );

        const verifiedButNotLinkedState =
            this.getContractState(
                "verifiedButNotLinked",
                "VERIFIED_BUT_NOT_LINKED"
            );

        const contradictedState =
            this.getContractState(
                "contradicted",
                "CONTRADICTED"
            );

        const partialState =
            this.getContractState(
                "partial",
                "PARTIAL"
            );

        const unresolvedState =
            this.getContractState(
                "unresolved",
                "UNRESOLVED"
            );

        const outOfDomainState =
            this.getContractState(
                "outOfDomain",
                "OUT_OF_DOMAIN"
            );

        const unverifiedState =
            this.getContractState(
                "unverified",
                "UNVERIFIED"
            );


        const supportedCount =
            correspondences.filter(
                item =>
                    item?.supported === true &&
                    item?.verificationStatus ===
                    supportedState
            ).length;


        const unknownCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    unknownState
            ).length;


        const correspondenceUnverifiedCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    unverifiedState
            ).length;


        const verifiedButNotLinkedCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    verifiedButNotLinkedState
            ).length;


        const contradictedCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    contradictedState
            ).length;


        const partialCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    partialState
            ).length;


        const unresolvedCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    unresolvedState
            ).length;


        const outOfDomainCount =
            correspondences.filter(
                item =>
                    item?.verificationStatus ===
                    outOfDomainState
            ).length;


        /*
         * ---------------------------------------------------------
         * Final evidence verification counts
         *
         * EvidenceEngine 是事实来源。
         *
         * Correspondence 只能决定：
         *
         * 是否已经形成支持关系。
         * ---------------------------------------------------------
         */

        const unverifiedCount =
            evidenceUnverifiedCount > 0
                ? evidenceUnverifiedCount
                : correspondenceUnverifiedCount;

        const verifiedCount =
            evidenceVerifiedCount;


        /*
         * ---------------------------------------------------------
         * Discovered
         *
         * DISCOVERED 表示 Runtime 已发现资料。
         *
         * 优先读取 EvidenceEngine 的 discoveredCount，
         * 其次读取 SearchEngine sourceCount。
         *
         * 不把 DISCOVERED 转换为 VERIFIED。
         * ---------------------------------------------------------
         */

        const discoveredCount =
            evidenceDiscoveredCount > 0
                ? evidenceDiscoveredCount
                : Number(
                    this.search?.metadata?.sourceCount ||
                    this.search?.sources?.length ||
                    0
                );


        this.epistemicBoundary = {

            discovered:
                discoveredCount,

            unverified:
                unverifiedCount,

            verified:
                verifiedCount,

            verifiedButNotLinked:
                verifiedButNotLinkedCount,

            supported:
                supportedCount,

            unknown:
                unknownCount,

            contradicted:
                contradictedCount,

            partial:
                partialCount,

            unresolved:
                unresolvedCount,

            outOfDomain:
                outOfDomainCount,

            evidenceCount,

            reasoningEvaluated:
                reasoningItems.length

        };

        return this.epistemicBoundary;

    }


    complete() {

        this.buildEpistemicBoundary();

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
