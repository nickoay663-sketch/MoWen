import EngineBase from "./EngineBase.js";

class ReasoningEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "ReasoningEngine",
            "10.2",
            "莫问分析证据对应关系中的推理边界，不让结论超过前提支持范围。"
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
                reasonings.length > 0
                    ? []
                    : [
                        "reasoning support verification required"
                    ],

            nextRuntimeState:
                "ResponsibilityEngine",

            status

        });

    }


    buildMetadata() {

        return this.metadata({

            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion ||
                "10.2",

            contractVersion:
                this.semanticObject.contract?.version ||
                "10.2",

            engineCount:
                Object.keys(
                    this.semanticObject.engines || {}
                ).length,

            traceCount:
                (
                    this.semanticObject.runtimeTrace || []
                ).length

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

            const sourceCount =
                Number(item.sourceCount || 0);

            const sourceAvailable =
                item.sourceAvailable === true &&
                sourceCount > 0;

            const supported =
                item.supported === true &&
                item.matched === true &&
                evidenceCount > 0 &&
                sourceAvailable;

            const assumptions =
                this.detectAssumptions({
                    ...item,
                    evidenceCount,
                    sourceCount,
                    sourceAvailable,
                    supported
                });

            const leap =
                this.detectReasoningLeap({
                    ...item,
                    evidenceCount,
                    sourceCount,
                    sourceAvailable,
                    supported
                });

            const strength =
                this.evaluateStrength({
                    ...item,
                    evidenceCount,
                    sourceCount,
                    sourceAvailable,
                    supported
                });

            return {

                definition:
                    item.definition,

                evidences:
                    Array.isArray(item.evidences)
                        ? item.evidences
                        : [],

                evidenceCount,

                sourceAvailable,

                sourceCount,

                supported,

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
                        ? "evaluated"
                        : "insufficient-support",

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
            item.evidenceCount === 0
        ) {

            assumptions.push(
                "当前定义缺少独立证据支持"
            );

        }

        if (
            item.evidenceCount > 0 &&
            !item.sourceAvailable
        ) {

            assumptions.push(
                "存在证据记录，但没有可验证来源"
            );

        }

        return assumptions;

    }


    detectReasoningLeap(item) {

        const overreach =
            item.overreach || {};

        const detected =
            overreach.detected === true ||
            (
                item.supported !== true &&
                (
                    Number(item.evidenceCount || 0) === 0 ||
                    item.sourceAvailable !== true
                )
            );

        let reason =
            overreach.reason || "";

        if (
            !reason &&
            detected
        ) {

            reason =
                "结论缺少足够的独立证据或来源支持";

        }

        return {

            detected,

            reason

        };

    }


    evaluateStrength(item) {

        if (
            item.supported === true &&
            item.sourceAvailable === true &&
            item.evidenceCount > 3
        ) {

            return "strong";

        }

        if (
            item.supported === true &&
            item.sourceAvailable === true
        ) {

            return "medium";

        }

        return "weak";

    }

}


export default ReasoningEngine;