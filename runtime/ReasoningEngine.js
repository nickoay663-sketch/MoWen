import EngineBase from "./EngineBase.js";

class ReasoningEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "ReasoningEngine",
            "10.3",
            "莫问分析已验证对应关系中的推理边界，不把发现、未验证或未知扩大为结论。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const metadata =
            this.buildMetadata();

        const reasonings =
            this.buildReasonings();

        const status =
            reasonings.length > 0
                ? "reasoning-evaluated"
                : "need-reasoning";

        return this.result({

            semanticObject:
                this.semanticObject,

            principle:
                this.principle,

            metadata,

            reasonings,

            result: {

                metadata,

                reasonings,

                status

            },

            trace:
                this.semanticObject.runtimeTrace || [],

            questions:
                reasonings.some(
                    item =>
                        item.verificationStatus !== "SUPPORTED"
                )
                    ? [
                        "reasoning support verification required"
                    ]
                    : [],

            nextRuntimeState:
                "ResponsibilityEngine",

            status

        });

    }


    buildMetadata() {

        const reasonings =
            Array.isArray(
                this.semanticObject.correspondences
            )
                ? this.semanticObject.correspondences
                : [];

        const supportedCount =
            reasonings.filter(
                item =>
                    item.verificationStatus === "SUPPORTED"
            ).length;

        const unverifiedCount =
            reasonings.filter(
                item =>
                    item.verificationStatus === "UNVERIFIED"
            ).length;

        const unknownCount =
            reasonings.filter(
                item =>
                    item.verificationStatus === "UNKNOWN"
            ).length;

        return this.metadata({

            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion ||
                "10.3",

            contractVersion:
                this.semanticObject.contract?.version ||
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


    buildReasonings() {

        const correspondences =
            Array.isArray(
                this.semanticObject.correspondences
            )
                ? this.semanticObject.correspondences
                : [];

        return correspondences.map(item => {

            const evidenceCount =
                Number(item.evidenceCount || 0);

            const verifiedEvidenceCount =
                Number(
                    item.verifiedEvidenceCount || 0
                );

            const sourceCount =
                Number(item.sourceCount || 0);

            const sourceAvailable =
                item.sourceAvailable === true &&
                sourceCount > 0;

            const verificationStatus =
                item.verificationStatus ||
                "UNKNOWN";

            const supported =
                verificationStatus === "SUPPORTED" &&
                item.supported === true &&
                item.matched === true &&
                verifiedEvidenceCount > 0 &&
                sourceAvailable;

            const assumptions =
                this.detectAssumptions({

                    ...item,

                    evidenceCount,

                    verifiedEvidenceCount,

                    sourceCount,

                    sourceAvailable,

                    verificationStatus,

                    supported

                });

            const leap =
                this.detectReasoningLeap({

                    ...item,

                    evidenceCount,

                    verifiedEvidenceCount,

                    sourceCount,

                    sourceAvailable,

                    verificationStatus,

                    supported

                });

            const strength =
                this.evaluateStrength({

                    ...item,

                    evidenceCount,

                    verifiedEvidenceCount,

                    sourceCount,

                    sourceAvailable,

                    verificationStatus,

                    supported

                });

            return {

                definition:
                    item.definition,

                evidences:
                    Array.isArray(item.evidences)
                        ? item.evidences
                        : [],

                verifiedEvidences:
                    Array.isArray(item.verifiedEvidences)
                        ? item.verifiedEvidences
                        : [],

                unverifiedEvidences:
                    Array.isArray(item.unverifiedEvidences)
                        ? item.unverifiedEvidences
                        : [],

                evidenceCount,

                verifiedEvidenceCount,

                sourceAvailable,

                sourceCount,

                supported,

                epistemicState:
                    verificationStatus,

                reasoningStrength:
                    strength,

                hiddenAssumptions:
                    assumptions,

                reasoningLeap:
                    leap,

                reasoningType:
                    "responsibility-bounded-reasoning",

                verificationStatus:
                    supported
                        ? "SUPPORTED"
                        : verificationStatus,

                conclusionBoundary:
                    supported
                        ? "SUPPORTED"
                        : "UNKNOWN",

                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],

                engineRegistry:
                    this.semanticObject.engineRegistry
                        ?.describe?.() || []

            };

        });

    }


    detectAssumptions(item) {

        const assumptions = [];

        if (
            !item.definition &&
            item.evidenceCount === 0
        ) {

            assumptions.push(
                "表达没有可验证的定义与独立证据"
            );

        }

        if (
            item.definition &&
            item.verifiedEvidenceCount === 0 &&
            item.verificationStatus !== "SUPPORTED"
        ) {

            assumptions.push(
                "当前定义没有已验证的独立证据支持"
            );

        }

        if (
            item.evidenceCount > 0 &&
            item.verifiedEvidenceCount === 0
        ) {

            assumptions.push(
                "存在信息或证据记录，但尚未形成已验证支持"
            );

        }

        if (
            item.verificationStatus === "VERIFIED_BUT_NOT_LINKED"
        ) {

            assumptions.push(
                "来源已经验证，但尚未证明其支持当前定义"
            );

        }

        return assumptions;

    }


    detectReasoningLeap(item) {

        const overreach =
            item.overreach || {};

        const detected =
            overreach.detected === true ||
            item.verificationStatus !== "SUPPORTED" ||
            item.supported !== true;

        let reason =
            overreach.reason || "";

        if (
            !reason &&
            item.verificationStatus === "UNVERIFIED"
        ) {

            reason =
                "证据尚未验证，不能进入已支持结论";

        }

        if (
            !reason &&
            item.verificationStatus === "UNKNOWN"
        ) {

            reason =
                "当前证据关系未知，不能形成支持性结论";

        }

        if (
            !reason &&
            item.verificationStatus === "VERIFIED_BUT_NOT_LINKED"
        ) {

            reason =
                "来源已经验证，但尚未证明与当前定义对应";

        }

        if (
            !reason &&
            detected
        ) {

            reason =
                "结论超过当前已验证证据支持范围";

        }

        return {

            detected,

            reason

        };

    }


    evaluateStrength(item) {

        if (
            item.verificationStatus !== "SUPPORTED" ||
            item.supported !== true
        ) {

            return "none";

        }

        if (
            item.verifiedEvidenceCount > 3 &&
            item.sourceAvailable
        ) {

            return "strong";

        }

        if (
            item.verifiedEvidenceCount > 0 &&
            item.sourceAvailable
        ) {

            return "medium";

        }

        return "weak";

    }

}

export default ReasoningEngine;