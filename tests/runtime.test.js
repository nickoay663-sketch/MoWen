import CorrespondenceEngine from "../runtime/CorrespondenceEngine.js";
import ReasoningEngine from "../runtime/ReasoningEngine.js";
import ResponsibilityEngine from "../runtime/ResponsibilityEngine.js";


function runCorrespondence(
    definition,
    evidences
) {

    const engine =
        new CorrespondenceEngine({

            definitions:
                [definition],

            evidences

        });

    const result =
        engine.execute();

    return result.correspondences?.[0];

}


function runReasoning(
    correspondence
) {

    const engine =
        new ReasoningEngine({

            originalContent:
                "MoWen Test Expression",

            correspondences:
                [correspondence],

            runtimeTrace:
                []

        });

    const result =
        engine.execute();

    return result.reasonings?.[0];

}


function runResponsibility(
    reasoning
) {

    const engine =
        new ResponsibilityEngine({

            originalContent:
                "MoWen Test Expression",

            reasonings:
                [reasoning],

            runtimeTrace:
                []

        });

    const result =
        engine.execute();

    return result.responsibilities?.[0];

}


const definition =
    "MoWen Test Definition";


/*
 * ============================================================
 * v10.6 Runtime Verification Record
 * ============================================================
 *
 * VERIFIED 不再由输入对象单方面声明。
 *
 * 测试中只有同时存在：
 *
 *   verificationStatus === "VERIFIED"
 *   epistemicState === "VERIFIED"
 *   verificationBasis
 *   runtimeVerificationRecord === true
 *   sourceAvailable === true
 *
 * 才允许进入 CorrespondenceEngine 的 VERIFIED 分支。
 *
 * ============================================================
 */

const verifiedSupportingEvidence = {

    source:
        "https://example.com/verified-support",

    independent:
        true,

    verificationStatus:
        "VERIFIED",

    epistemicState:
        "VERIFIED",

    verificationBasis:
        "explicit-verification",

    runtimeVerificationRecord:
        true,

    sourceAvailable:
        true,

    supportsClaim:
        true

};


const verifiedNonSupportingEvidence = {

    source:
        "https://example.com/verified-unrelated",

    independent:
        true,

    verificationStatus:
        "VERIFIED",

    epistemicState:
        "VERIFIED",

    verificationBasis:
        "explicit-verification",

    runtimeVerificationRecord:
        true,

    sourceAvailable:
        true,

    supportsClaim:
        false

};


const unverifiedEvidence = {

    source:
        "https://example.com/unverified",

    independent:
        true,

    verificationStatus:
        "UNVERIFIED",

    epistemicState:
        "DISCOVERED",

    sourceAvailable:
        true,

    supportsClaim:
        true

};


/*
 * 1.
 * 没有独立证据。
 *
 * 预期：
 * UNKNOWN
 */

const case1 =
    runCorrespondence(
        definition,
        []
    );


const case1Passed =
    case1 &&
    case1.verificationStatus ===
        "UNKNOWN" &&
    case1.supported === false;


/*
 * 2.
 * 有搜索/证据记录，但没有 VERIFIED。
 *
 * 预期：
 * UNVERIFIED
 */

const case2 =
    runCorrespondence(
        definition,
        [
            unverifiedEvidence
        ]
    );


const case2Passed =
    case2 &&
    case2.verificationStatus ===
        "UNVERIFIED" &&
    case2.supported === false;


/*
 * 3.
 * Runtime 已经存在 VERIFIED 记录，
 * 但是证据明确不支持当前 Definition。
 *
 * 预期：
 * VERIFIED_BUT_NOT_LINKED
 */

const case3 =
    runCorrespondence(
        definition,
        [
            verifiedNonSupportingEvidence
        ]
    );


const case3Passed =
    case3 &&
    case3.verificationStatus ===
        "VERIFIED_BUT_NOT_LINKED" &&
    case3.supported === false;


/*
 * 4.
 * Runtime VERIFIED + supportsClaim=true。
 *
 * 预期：
 * SUPPORTED
 */

const case4 =
    runCorrespondence(
        definition,
        [
            verifiedSupportingEvidence
        ]
    );


const case4Passed =
    case4 &&
    case4.verificationStatus ===
        "SUPPORTED" &&
    case4.supported === true;


/*
 * 5.
 * 上游伪造 SUPPORTED。
 *
 * ResponsibilityEngine 不允许直接相信：
 *
 * supported
 * verificationStatus
 * verifiedEvidenceCount
 * sourceAvailable
 *
 * 而必须重新从实际证据数组计算。
 */

const forgedReasoning = {

    definition,

    evidences:
        [],

    verifiedEvidences:
        [],

    unverifiedEvidences:
        [],

    evidenceCount:
        99,

    verifiedEvidenceCount:
        99,

    sourceCount:
        99,

    sourceAvailable:
        true,

    supported:
        true,

    matched:
        true,

    verificationStatus:
        "SUPPORTED",

    epistemicState:
        "SUPPORTED"

};


const case5 =
    runResponsibility(
        forgedReasoning
    );


const case5Passed =
    case5 &&
    case5.supported === false &&
    case5.verificationStatus !==
        "SUPPORTED" &&
    case5.responsibilityBoundary?.status ===
        "exceeded";


/*
 * 6.
 * 验证正常 SUPPORTED 链路能够进入 Responsibility。
 */

const validReasoning =
    runReasoning(
        case4
    );


const validResponsibility =
    runResponsibility(
        validReasoning
    );


const case6Passed =
    validReasoning &&
    validReasoning.supported === true &&
    validReasoning.verificationStatus ===
        "SUPPORTED" &&
    validResponsibility &&
    validResponsibility.supported === true;


/*
 * 7.
 * 外部声明 VERIFIED，
 * 但不存在 Runtime verification record。
 *
 * 预期：
 * 不得进入 VERIFIED。
 *
 * 这是 v10.6 新增的关键防伪测试。
 */

const forgedVerifiedEvidence = {

    source:
        "https://example.com/forged-verified",

    independent:
        true,

    verificationStatus:
        "VERIFIED",

    epistemicState:
        "VERIFIED",

    verificationBasis:
        "external-claim",

    sourceAvailable:
        true,

    supportsClaim:
        true

};


const case7 =
    runCorrespondence(
        definition,
        [
            forgedVerifiedEvidence
        ]
    );


const case7Passed =
    case7 &&
    case7.supported === false &&
    case7.verificationStatus !==
        "SUPPORTED";


/*
 * 汇总。
 */

const checks = {

    noEvidenceBecomesUnknown:
        case1Passed,

    unverifiedDoesNotBecomeSupported:
        case2Passed,

    verifiedSourceWithoutLinkDoesNotBecomeSupported:
        case3Passed,

    verifiedSupportingEvidenceBecomesSupported:
        case4Passed,

    forgedUpstreamSupportIsRejected:
        case5Passed,

    validSupportSurvivesReasoningAndResponsibility:
        case6Passed,

    externalVerifiedClaimDoesNotBecomeRuntimeVerified:
        case7Passed

};


const passed =
    Object.values(checks)
        .every(Boolean);


console.log(
    JSON.stringify(
        {
            test:
                "MoWen Runtime v10.6 Evidence Boundary Test",

            checks,

            cases: {

                case1:
                    case1?.verificationStatus,

                case2:
                    case2?.verificationStatus,

                case3:
                    case3?.verificationStatus,

                case4:
                    case4?.verificationStatus,

                case5:
                    {
                        supported:
                            case5?.supported,

                        verificationStatus:
                            case5?.verificationStatus,

                        responsibilityBoundary:
                            case5
                                ?.responsibilityBoundary
                                ?.status
                    },

                case6:
                    {
                        reasoning:
                            validReasoning
                                ?.verificationStatus,

                        responsibility:
                            validResponsibility
                                ?.verificationStatus
                    },

                case7:
                    {
                        supported:
                            case7?.supported,

                        verificationStatus:
                            case7?.verificationStatus
                    }

            }

        },
        null,
        2
    )
);


if (!passed) {

    console.log(
        "MoWen Runtime v10.6 Evidence Boundary Test Failed."
    );

    process.exit(1);

}


console.log(
    "MoWen Runtime v10.6 Evidence Boundary Test Passed."
);
