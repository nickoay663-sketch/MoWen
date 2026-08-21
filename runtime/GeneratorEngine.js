import EngineBase from "./EngineBase.js";

class GeneratorEngine extends EngineBase {

    constructor(runtimeObject) {

        super(
            "GeneratorEngine",
            "10.7",
            "莫问生成责任边界内的最终表达，只输出重构层已经允许承担的内容，不重新验证、不提升认识状态、不越过责任边界。"
        );

        this.runtimeObject =
            runtimeObject || {};

    }


    execute() {

        const metadata =
            this.buildMetadata();

        const report =
            this.buildReport();

        const publishableText =
            this.buildPublishableText(
                report
            );

        return {

            engine:
                this.engine,

            version:
                this.version,

            semanticObject:
                this.runtimeObject.semanticObject,

            principle:
                this.principle,

            generator:
                true,

            metadata,

            report,

            publishableText,

            result: {

                metadata,

                report,

                publishableText,

                generator:
                    true

            },

            trace:
                this.runtimeObject.runtimeTrace || [],

            questions:
                this.buildQuestions(report),

            nextRuntimeState:
                "SelfCheckEngine",

            status:
                report.responsibilityCount > 0
                    ? "generator-evaluated"
                    : "need-report-data"

        };

    }


    buildMetadata() {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.runtimeObject.contract?.identity?.runtimeVersion ||
                this.runtimeObject.contract?.version ||
                "",

            contractVersion:
                this.runtimeObject.contract?.version ||
                "",

            engineVersion:
                this.version,

            pipeline:
                this.runtimeObject.pipeline || [],

            engineCount:
                Object.keys(
                    this.runtimeObject.engines || {}
                ).length,

            traceCount:
                (this.runtimeObject.runtimeTrace || []).length,

            generationMode:
                "responsibility-bound-final-expression",

            publicationRule:
                "generator-does-not-upgrade-epistemic-state",

            publishableTextRule:
                "publishableText-requires-publishable-report"

        };

    }


    buildReport() {

        const reconstruction =
            this.runtimeObject.reconstruction?.reconstruction ||
            this.runtimeObject.reconstruction ||
            {};

        const responsibilities =
            Array.isArray(
                reconstruction.responsibilityChain
            )
                ? reconstruction.responsibilityChain
                : Array.isArray(
                    reconstruction.responsibilities
                )
                    ? reconstruction.responsibilities
                    : [];

        const normalizedResponsibilities =
            responsibilities.map(
                responsibility =>
                    this.normalizeResponsibility(
                        responsibility
                    )
            );

        const evidenceChain =
            Array.isArray(
                reconstruction.evidenceChain
            )
                ? reconstruction.evidenceChain
                : [];

        const sources =
            Array.isArray(
                reconstruction.sources
            )
                ? reconstruction.sources
                : [];

        const reconstructionState =
            reconstruction.reconstructionState ||
            "UNKNOWN";

        const verificationStatus =
            this.calculateReportVerificationStatus(
                normalizedResponsibilities,
                reconstructionState
            );

        const publishable =
            reconstruction.publishable === true &&
            verificationStatus === "SUPPORTED";

        return {

            expression:
                reconstruction.originalExpression || "",

            reconstructedExpression:
                reconstruction.reconstructedExpression || "",

            language:
                reconstruction.language || null,

            reconstructionState,

            responsibilities:
                normalizedResponsibilities,

            responsibilityCount:
                normalizedResponsibilities.length,

            evidenceChain,

            sources,

            sourceCount:
                sources.length,

            boundaries:
                reconstruction.boundaries || {},

            expansion:
                reconstruction.expansion === true,

            sourceExpansion:
                reconstruction.sourceExpansion === true,

            evidenceExpansion:
                reconstruction.evidenceExpansion === true,

            publishable,

            reportType:
                "responsibility-verification-report",

            verificationStatus,

            runtimeTrace:
                this.runtimeObject.runtimeTrace || [],

            engineRegistry:
                this.runtimeObject.engineRegistry?.describe?.() || []

        };

    }


    normalizeResponsibility(
        responsibility
    ) {

        const item =
            responsibility || {};

        const boundary =
            item.responsibilityBoundary || {};

        const boundaryStatus =
            boundary.status || "unknown";

        const originalVerificationStatus =
            item.verificationStatus ||
            item.epistemicState ||
            "UNKNOWN";

        if (
            boundaryStatus === "exceeded"
        ) {

            return {

                ...item,

                supported:
                    false,

                epistemicState:
                    "UNKNOWN",

                verificationStatus:
                    "UNVERIFIED",

                responsibilityBoundary:
                    boundary

            };

        }


        if (
            originalVerificationStatus === "SUPPORTED" &&
            item.supported === true &&
            boundaryStatus === "matched"
        ) {

            return {

                ...item,

                supported:
                    true,

                epistemicState:
                    "SUPPORTED",

                verificationStatus:
                    "SUPPORTED",

                responsibilityBoundary:
                    boundary

            };

        }


        return {

            ...item,

            supported:
                false,

            epistemicState:
                originalVerificationStatus,

            verificationStatus:
                originalVerificationStatus,

            responsibilityBoundary:
                boundary

        };

    }


    calculateReportVerificationStatus(
        responsibilities,
        reconstructionState
    ) {

        if (
            responsibilities.length === 0
        ) {

            return "pending";

        }

        const hasExceededBoundary =
            responsibilities.some(
                item =>
                    item.responsibilityBoundary?.status ===
                    "exceeded"
            );

        if (
            hasExceededBoundary
        ) {

            return "UNVERIFIED";

        }

        const allSupported =
            responsibilities.every(
                item =>
                    item.supported === true &&
                    item.verificationStatus ===
                    "SUPPORTED" &&
                    item.responsibilityBoundary?.status ===
                    "matched"
            );

        if (
            allSupported &&
            reconstructionState === "SUPPORTED"
        ) {

            return "SUPPORTED";

        }

        return "UNVERIFIED";

    }


    buildPublishableText(
        report
    ) {

        /*
         * MWAL 最终发布闸门。
         *
         * Generator 不重新验证证据，
         * 但必须服从自己刚刚生成的责任报告。
         *
         * publishable !== true
         *       ↓
         * publishableText = ""
         */

        if (
            !report ||
            report.publishable !== true
        ) {

            return "";

        }

        const reconstructed =
            typeof report.reconstructedExpression === "string"
                ? report.reconstructedExpression.trim()
                : "";

        if (
            reconstructed.length === 0
        ) {

            return "";

        }

        return reconstructed;

    }


    buildQuestions(report) {

        if (
            report.responsibilityCount === 0
        ) {

            return [
                "当前责任链是否完整？"
            ];

        }

        if (
            report.verificationStatus !== "SUPPORTED"
        ) {

            return [
                "当前责任链是否具有足够的已验证支持以承担最终表达责任？"
            ];

        }

        return [];

    }

}

export default GeneratorEngine;
