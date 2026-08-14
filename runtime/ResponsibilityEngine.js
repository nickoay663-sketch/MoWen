import EngineBase from "./EngineBase.js";

class ResponsibilityEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "ResponsibilityEngine",
            "10.3",
            "莫问判断表达所要求承担的责任是否超过当前已验证证据能够承担的责任。"
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
                    reasoning.verificationStatus ===
                    "SUPPORTED"
            ).length;

        const unverifiedCount =
            reasonings.filter(
                reasoning =>
                    reasoning.verificationStatus ===
                    "UNVERIFIED"
            ).length;

        const unknownCount =
            reasonings.filter(
                reasoning =>
                    reasoning.verificationStatus ===
                    "UNKNOWN"
            ).length;

        return this.metadata({

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.semanticObject.contract
                    ?.identity
                    ?.runtimeVersion ||
                "10.3",

            contractVersion:
                this.semanticObject.contract
                    ?.version ||
                "10.3",

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

                const demand =
                    this.analyzeResponsibilityDemand(
                        reasoning
                    );

                const capacity =
                    this.analyzeResponsibilityCapacity(
                        reasoning
                    );

                const boundary =
                    this.calculateBoundary(
                        demand,
                        capacity,
                        reasoning
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
                            reasoning.evidenceCount || 0,

                        verifiedEvidenceRequired:
                            reasoning.verifiedEvidenceCount ||
                            0,

                        verificationRequired:
                            true

                    },

                    expression:
                        this.semanticObject
                            .originalContent || "",

                    definition:
                        reasoning.definition,

                    supported:
                        reasoning.supported === true,

                    epistemicState:
                        reasoning.epistemicState ||
                        reasoning.verificationStatus ||
                        "UNKNOWN",

                    evidenceCount:
                        reasoning.evidenceCount || 0,

                    verifiedEvidenceCount:
                        reasoning.verifiedEvidenceCount ||
                        0,

                    sourceCount:
                        reasoning.sourceCount || 0,

                    sourceAvailable:
                        reasoning.sourceAvailable === true,

                    sources:
                        reasoning.evidences || [],

                    verifiedSources:
                        reasoning.verifiedEvidences || [],

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
                        reasoning.sourceAvailable === true
                            ? "available"
                            : "missing",

                    verificationResponsibility:
                        "required",

                    responsibilityType:
                        "subject-responsibility-evaluation",

                    verificationStatus:
                        reasoning.verificationStatus ||
                        "UNKNOWN",

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

        /*
         * 核心边界：
         *
         * UNKNOWN      -> 不产生证据责任能力
         * UNVERIFIED   -> 不产生证据责任能力
         * VERIFIED_BUT_NOT_LINKED
         *              -> 来源可信，但不能证明当前主张
         * SUPPORTED    -> 才允许产生支持能力
         */

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
            verificationStatus !== "SUPPORTED"
        ) {

            return {

                status:
                    "exceeded",

                explanation:
                    "当前表达的责任要求超过未经验证、未知或尚未建立支持关系的信息能力。",

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