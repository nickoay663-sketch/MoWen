import EngineBase from "./EngineBase.js";

class ResponsibilityEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "ResponsibilityEngine",
            "10.5",
            "莫问判断表达所要求承担的责任是否超过当前可直接核验的已验证证据能够承担的责任。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const metadata =
            this.buildMetadata();

        const responsibilities =
            this.buildResponsibilities();

        const status =
            responsibilities.length > 0
                ? "responsibility-evaluated"
                : "need-responsibility";

        const passed =
            responsibilities.length > 0 &&
            responsibilities.every(
                item =>
                    item.responsibilityBoundary.status !==
                    "exceeded"
            );

        return this.result({

            semanticObject:
                this.semanticObject,

            principle:
                this.principle,

            metadata,

            responsibilities,

            result: {

                metadata,

                responsibilities,

                passed,

                status

            },

            trace:
                this.semanticObject.runtimeTrace || [],

            questions:
                passed
                    ? []
                    : [
                        "responsibility boundary verification required"
                    ],

            nextRuntimeState:
                "ReconstructionEngine",

            status

        });

    }


    buildMetadata() {

        const reasonings =
            Array.isArray(
                this.semanticObject.reasonings
            )
                ? this.semanticObject.reasonings
                : [];

        const supportedCount =
            reasonings.filter(
                reasoning =>
                    this.hasActualVerifiedSupport(
                        reasoning
                    )
            ).length;

        const unverifiedCount =
            reasonings.filter(
                reasoning =>
                    (
                        reasoning.verificationStatus ||
                        reasoning.epistemicState
                    ) === "UNVERIFIED"
            ).length;

        const unknownCount =
            reasonings.filter(
                reasoning =>
                    (
                        reasoning.verificationStatus ||
                        reasoning.epistemicState
                    ) === "UNKNOWN"
            ).length;

        return this.metadata({

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.semanticObject.contract
                    ?.identity
                    ?.runtimeVersion ||
                "10.4",

            contractVersion:
                this.semanticObject.contract
                    ?.version ||
                "10.4",

            engineCount:
                Object.keys(
                    this.semanticObject.engines || {}
                ).length,

            traceCount:
                (
                    this.semanticObject.runtimeTrace || []
                ).length,

            supportedCount,

            unverifiedCount,

            unknownCount

        });

    }


    buildResponsibilities() {

        const reasonings =
            Array.isArray(
                this.semanticObject.reasonings
            )
                ? this.semanticObject.reasonings
                : [];

        const testimony =
            this.semanticObject.testimony || null;

        return reasonings.map(
            reasoning => {

                /*
                 * 责任层不接受上游声明的：
                 *
                 * verificationStatus
                 * supported
                 * verifiedEvidenceCount
                 * sourceAvailable
                 *
                 * 作为事实。
                 *
                 * ResponsibilityEngine 必须从当前
                 * reasoning 中实际携带的证据数组
                 * 重新建立责任能力。
                 */

                const verifiedEvidences =
                    this.extractActualVerifiedEvidence(
                        reasoning
                    );

                const evidences =
                    Array.isArray(reasoning.evidences)
                        ? reasoning.evidences
                        : [];

                const evidenceCount =
                    evidences.length;

                const verifiedEvidenceCount =
                    verifiedEvidences.length;

                const sourceCount =
                    this.countActualSources(
                        verifiedEvidences
                    );

                const sourceAvailable =
                    sourceCount > 0;

                const actualSupport =
                    verifiedEvidenceCount > 0 &&
                    sourceAvailable &&
                    this.actualEvidenceSupportsDefinition(
                        verifiedEvidences,
                        reasoning.definition
                    );

                const actualVerificationStatus =
                    this.deriveVerificationStatus({
                        reasoning,
                        verifiedEvidenceCount,
                        actualSupport
                    });

                const normalizedReasoning = {

                    ...reasoning,

                    evidences,

                    verifiedEvidences,

                    evidenceCount,

                    verifiedEvidenceCount,

                    sourceCount,

                    sourceAvailable,

                    supported:
                        actualSupport,

                    verificationStatus:
                        actualVerificationStatus,

                    epistemicState:
                        actualVerificationStatus

                };

                const demand =
                    this.analyzeResponsibilityDemand(
                        normalizedReasoning
                    );

                const capacity =
                    this.analyzeResponsibilityCapacity(
                        normalizedReasoning
                    );

                const boundary =
                    this.calculateBoundary(
                        demand,
                        capacity,
                        normalizedReasoning
                    );

                const verifiedEvidenceRequired =
                    this.calculateVerifiedEvidenceRequirement(
                        normalizedReasoning
                    );

                return {

                    testimony,

                    responsibilityActor: {

                        identity:
                            null,

                        role:
                            "expression-owner",

                        authority:
                            null

                    },

                    responsibilityScope: {

                        claims:
                            reasoning.definition
                                ? [
                                    reasoning.definition
                                ]
                                : [],

                        evidenceRequired:
                            evidenceCount,

                        verifiedEvidenceRequired,

                        verificationRequired:
                            true

                    },

                    expression:
                        this.semanticObject
                            .originalContent || "",

                    definition:
                        reasoning.definition,

                    supported:
                        actualSupport,

                    epistemicState:
                        actualVerificationStatus,

                    evidenceCount,

                    verifiedEvidenceCount,

                    sourceCount,

                    sourceAvailable,

                    sources:
                        evidences,

                    verifiedSources:
                        verifiedEvidences,

                    responsibilityDemand:
                        demand,

                    responsibilityCapacity:
                        capacity,

                    responsibilityBoundary:
                        boundary,

                    responsibilityJudgment: {

                        demand:
                            demand.level,

                        capacity:
                            capacity.level,

                        gap:
                            demand.level !== capacity.level

                    },

                    expressionResponsibility:
                        demand.level,

                    evidenceResponsibility:
                        capacity.level,

                    sourceResponsibility:
                        sourceAvailable
                            ? "available"
                            : "missing",

                    verificationResponsibility:
                        "required",

                    responsibilityType:
                        "subject-responsibility-evaluation",

                    verificationStatus:
                        actualVerificationStatus,

                    runtimeTrace:
                        this.semanticObject
                            .runtimeTrace || [],

                    engineRegistry:
                        this.semanticObject
                            .engineRegistry
                            ?.describe?.() || []

                };

            }
        );

    }


    /*
     * 只接受实际存在于 evidences /
     * verifiedEvidences 数组中的证据。
     *
     * 不能使用：
     *
     * reasoning.verifiedEvidenceCount
     * reasoning.supported
     * reasoning.verificationStatus
     *
     * 这些只是声明。
     */

    extractActualVerifiedEvidence(reasoning) {

        const candidates =
            Array.isArray(
                reasoning.verifiedEvidences
            )
                ? reasoning.verifiedEvidences
                : [];

        return candidates.filter(
            evidence =>
                evidence &&
                evidence.verificationStatus ===
                    "VERIFIED" &&
                evidence.epistemicState ===
                    "VERIFIED" &&
                evidence.verificationBasis != null &&
                evidence.sourceAvailable === true
        );

    }


    countActualSources(evidences) {

        return new Set(

            evidences
                .map(
                    evidence =>
                        evidence.source
                )
                .filter(Boolean)

        ).size;

    }


    actualEvidenceSupportsDefinition(
        evidences,
        definition
    ) {

        if (
            !definition ||
            !Array.isArray(evidences) ||
            evidences.length === 0
        ) {

            return false;

        }

        return evidences.some(
            evidence =>
                evidence.supportsClaim === true
        );

    }


    deriveVerificationStatus({
        reasoning,
        verifiedEvidenceCount,
        actualSupport
    }) {

        if (actualSupport) {

            return "SUPPORTED";

        }

        if (verifiedEvidenceCount > 0) {

            return "VERIFIED_BUT_NOT_LINKED";

        }

        if (
            reasoning.verificationStatus ===
            "CONTRADICTED"
        ) {

            return "CONTRADICTED";

        }

        if (
            reasoning.verificationStatus ===
            "UNVERIFIED"
        ) {

            return "UNVERIFIED";

        }

        return "UNKNOWN";

    }


    hasActualVerifiedSupport(reasoning) {

        const evidences =
            this.extractActualVerifiedEvidence(
                reasoning
            );

        return (
            evidences.length > 0 &&
            this.actualEvidenceSupportsDefinition(
                evidences,
                reasoning.definition
            )
        );

    }


    calculateVerifiedEvidenceRequirement(reasoning) {

        const verificationStatus =
            reasoning.verificationStatus ||
            reasoning.epistemicState ||
            "UNKNOWN";

        if (
            verificationStatus ===
            "SUPPORTED"
        ) {

            return 1;

        }

        if (
            verificationStatus ===
            "CONTRADICTED"
        ) {

            return 0;

        }

        return 1;

    }


    analyzeResponsibilityDemand(reasoning) {

        const content =
            this.semanticObject.originalContent || "";

        let level =
            "medium";

        const highResponsibilityMarkers = [

            "一定",

            "必然",

            "所有",

            "绝对",

            "必定",

            "必然如此",

            "毫无例外"

        ];

        if (
            highResponsibilityMarkers.some(
                marker =>
                    content.includes(marker)
            )
        ) {

            level =
                "high";

        }

        return {

            level,

            source:
                "expression-strength"

        };

    }


    analyzeResponsibilityCapacity(reasoning) {

        const verificationStatus =
            reasoning.verificationStatus ||
            "UNKNOWN";

        const verifiedEvidenceCount =
            Number(
                reasoning.verifiedEvidenceCount || 0
            );

        const sourceAvailable =
            reasoning.sourceAvailable === true;

        let level =
            "none";

        if (
            verificationStatus ===
                "SUPPORTED" &&
            verifiedEvidenceCount > 0 &&
            sourceAvailable
        ) {

            level =
                "medium";

        }

        if (
            verificationStatus ===
                "SUPPORTED" &&
            verifiedEvidenceCount > 3 &&
            sourceAvailable
        ) {

            level =
                "high";

        }

        return {

            level,

            verifiedEvidenceCount,

            sourceAvailable,

            source:
                "verified-evidence-and-correspondence"

        };

    }


    calculateBoundary(
        demand,
        capacity,
        reasoning
    ) {

        const verificationStatus =
            reasoning.verificationStatus ||
            "UNKNOWN";

        if (
            verificationStatus !==
            "SUPPORTED"
        ) {

            return {

                status:
                    "exceeded",

                explanation:
                    "当前表达的责任要求超过当前可直接核验的已验证证据能力。",

                epistemicBoundary:
                    "UNKNOWN_OR_UNVERIFIED"

            };

        }

        if (
            demand.level === "high" &&
            capacity.level !== "high"
        ) {

            return {

                status:
                    "exceeded",

                explanation:
                    "主体表达要求承担的责任超过当前已验证证据支持能力。",

                epistemicBoundary:
                    "VERIFIED_SUPPORT_INSUFFICIENT"

            };

        }

        if (
            demand.level === "medium" &&
            capacity.level === "none"
        ) {

            return {

                status:
                    "exceeded",

                explanation:
                    "表达要求承担责任，但当前没有已验证支持。",

                epistemicBoundary:
                    "NO_VERIFIED_SUPPORT"

            };

        }

        return {

            status:
                "matched",

            explanation:
                "主体责任要求没有超过当前已验证证据支持能力。",

            epistemicBoundary:
                "VERIFIED_SUPPORT"

        };

    }

}

export default ResponsibilityEngine;
