import EngineBase from "./EngineBase.js";

class CorrespondenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "CorrespondenceEngine",
            "10.2",
            "莫问判断定义、证据与表达之间的真实对应关系，不把发现或未验证证据扩大为支持。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const correspondences =
            this.buildCorrespondences();

        const supportedCount =
            correspondences.filter(
                item =>
                    item.supported === true
            ).length;

        const unverifiedCount =
            correspondences.filter(
                item =>
                    item.verificationStatus === "UNVERIFIED"
            ).length;

        const unknownCount =
            correspondences.filter(
                item =>
                    item.verificationStatus === "UNKNOWN"
            ).length;


        return this.result({

            status:
                correspondences.length > 0
                    ? "correspondence-evaluated"
                    : "need-correspondence",

            metadata:
                this.metadata({

                    correspondenceCount:
                        correspondences.length,

                    supportedCount,

                    unverifiedCount,

                    unknownCount

                }),

            correspondences,

            result: {

                correspondences,

                epistemicBoundary: {

                    supportedCount,

                    unverifiedCount,

                    unknownCount

                }

            },

            trace: [

                {

                    engine:
                        "CorrespondenceEngine",

                    action:
                        "check",

                    status:
                        "completed"

                }

            ],

            questions:
                correspondences.some(
                    item =>
                        item.verificationStatus !== "SUPPORTED"
                )
                    ? [
                        "definition-evidence correspondence verification required"
                    ]
                    : [],

            nextRuntimeState:
                "ReasoningEngine"

        });

    }


    buildCorrespondences() {

        const definitions =
            Array.isArray(
                this.semanticObject.definitions
            )
                ? this.semanticObject.definitions
                : [];


        const evidences =
            Array.isArray(
                this.semanticObject.evidences
            )
                ? this.semanticObject.evidences
                : [];


        if (
            definitions.length === 0
        ) {

            return [];

        }


        return definitions.map(
            definition =>
                this.buildCorrespondence(
                    definition,
                    evidences
                )
        );

    }


    buildCorrespondence(
        definition,
        evidences
    ) {

        const independentEvidences =
            evidences.filter(
                evidence =>
                    evidence &&
                    evidence.independent === true
            );


        const verifiedEvidences =
            independentEvidences.filter(
                evidence =>
                    evidence.verificationStatus === "VERIFIED" &&
                    evidence.epistemicState === "VERIFIED"
            );


        const unverifiedEvidences =
            independentEvidences.filter(
                evidence =>
                    evidence.verificationStatus === "UNVERIFIED" ||
                    evidence.epistemicState === "DISCOVERED"
            );


        const sourceAvailable =
            independentEvidences.length > 0;


        const verifiedSourceAvailable =
            verifiedEvidences.length > 0;


        /*
         * 核心边界：
         *
         * 有搜索结果 ≠ 有证据
         * 有未验证证据 ≠ 已证明
         * 有已验证来源 ≠ 自动证明当前定义
         *
         * 只有明确存在：
         * 1. 定义
         * 2. 独立证据
         * 3. VERIFIED 状态
         * 4. 明确支持当前主张
         *
         * 才允许进入 SUPPORTED。
         */

        const supported =
            verifiedSourceAvailable &&
            verifiedEvidences.some(
                evidence =>
                    evidence.supportsClaim === true
            );


        let verificationStatus =
            "UNKNOWN";


        if (
            supported
        ) {

            verificationStatus =
                "SUPPORTED";

        } else if (
            unverifiedEvidences.length > 0
        ) {

            verificationStatus =
                "UNVERIFIED";

        } else if (
            independentEvidences.length > 0
        ) {

            verificationStatus =
                "VERIFIED_BUT_NOT_LINKED";

        }


        return {

            definitionCount:
                1,

            evidenceCount:
                independentEvidences.length,

            verifiedEvidenceCount:
                verifiedEvidences.length,

            unverifiedEvidenceCount:
                unverifiedEvidences.length,

            matched:
                supported,

            supported,

            sourceAvailable,

            verifiedSourceAvailable,

            sourceCount:
                independentEvidences.length,

            verificationStatus,

            epistemicState:
                verificationStatus,

            definition,

            evidences:
                independentEvidences,

            verifiedEvidences,

            unverifiedEvidences,

            responsibilityBoundary:
                supported
                    ? "SUPPORTED"
                    : "NOT_SUPPORTED",

            knowledgeBoundary:
                supported
                    ? "VERIFIED_SUPPORT"
                    : "UNKNOWN_OR_UNVERIFIED"

        };

    }

}


export default CorrespondenceEngine;