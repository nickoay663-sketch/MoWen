import EngineBase from "./EngineBase.js";

class GeneratorEngine extends EngineBase {

    constructor(runtimeObject) {

        super(
            "GeneratorEngine",
            "7.1",
            "莫问生成责任链报告，只保留责任引擎已经允许承担的状态，不提升、不修饰、不越过责任边界。"
        );

        this.runtimeObject =
            runtimeObject || {};

    }


    execute() {

        const metadata =
            this.buildMetadata();

        const report =
            this.buildReport();

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

            result: {

                metadata,

                report,

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
                this.runtimeObject.contract?.identity?.runtimeVersion || "",

            contractVersion:
                this.runtimeObject.contract?.version || "",

            pipeline:
                this.runtimeObject.pipeline || [],

            engineCount:
                Object.keys(
                    this.runtimeObject.engines || {}
                ).length,

            traceCount:
                (this.runtimeObject.runtimeTrace || []).length

        };

    }


    buildReport() {

        const reconstruction =
            this.runtimeObject.reconstruction?.reconstruction || {};

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

        return {

            expression:
                reconstruction.originalExpression || "",

            reconstructedExpression:
                reconstruction.reconstructedExpression || "",

            language:
                reconstruction.language || null,

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

            reportType:
                "responsibility-verification-report",

            verificationStatus:
                this.calculateReportVerificationStatus(
                    normalizedResponsibilities
                ),

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

        /*
         * 最终报告边界：
         *
         * responsibilityBoundary = exceeded
         *
         * 永远不能继续输出 SUPPORTED。
         *
         * Generator 不重新验证证据，
         * 只阻止已经越界的状态继续传播。
         */

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


        /*
         * 只有责任边界明确 matched，
         * 才允许保留 SUPPORTED。
         */

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


        /*
         * 其他状态一律不得提升。
         */

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
        responsibilities
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
            allSupported
        ) {

            return "SUPPORTED";

        }

        return "UNVERIFIED";

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
