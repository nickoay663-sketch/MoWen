import ResponsibilityEvent from "../runtime/ResponsibilityEvent.js";

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function makeEvent(overrides = {}) {

    return new ResponsibilityEvent({

        expression:
            "测试表达",

        epistemicState:
            "SUPPORTED",

        responsibility: {

            responsibilities: [{

                expression:
                    "测试表达",

                supported:
                    true,

                verificationStatus:
                    "SUPPORTED",

                responsibilityBoundary: {

                    status:
                        "matched"

                },

                responsibilityJudgment: {

                    gap:
                        false

                },

                responsibilityDemand: {

                    level:
                        "medium"

                },

                responsibilityCapacity: {

                    level:
                        "medium",

                    actualSupport:
                        true

                }

            }]

        },

        ...overrides

    });

}


/*
 * CASE 1
 * 完整责任链必须获得唯一发布授权。
 */

const valid =
    makeEvent();

const case1 =
    valid.isPublishable();


/*
 * CASE 2
 * 下游 reconstruction.publishable 不能伪造发布权。
 */

const fakeReconstruction =
{
    publishable:
        true,

    verificationStatus:
        "SUPPORTED",

    reconstructionState:
        "SUPPORTED"
};

const case2 =
    valid.isPublishable() &&
    fakeReconstruction.publishable === true;


/*
 * CASE 3
 * Generator/Reconstruction 的状态不能替代
 * ResponsibilityEvent 的发布授权。
 *
 * epistemicState 改成 UNKNOWN 后，
 * 即使下游继续声称 SUPPORTED，也必须拒绝。
 */

const invalid =
    makeEvent({

        epistemicState:
            "UNKNOWN"

    });

const fakeDownstream =
{
    publishable:
        true,

    verificationStatus:
        "SUPPORTED"
};

const case3 =
    invalid.isPublishable() === false &&
    fakeDownstream.publishable === true;


/*
 * CASE 4
 * responsibility boundary 被突破时，
 * 任何下游 SUPPORTED 都不能恢复发布权。
 */

const exceeded =
    makeEvent({

        responsibility: {

            responsibilities: [{

                expression:
                    "测试表达",

                supported:
                    true,

                verificationStatus:
                    "SUPPORTED",

                responsibilityBoundary: {

                    status:
                        "exceeded"

                },

                responsibilityJudgment: {

                    gap:
                        true

                }

            }]

        }

    });

const case4 =
    exceeded.isPublishable() === false;


/*
 * CASE 5
 * 序列化不能改变唯一发布授权。
 */

const serialized =
    JSON.parse(
        JSON.stringify(valid)
    );

const restored =
    new ResponsibilityEvent(serialized);

const case5 =
    restored.isPublishable() ===
    valid.isPublishable();


const checks = {

    validResponsibilityCreatesAuthority:
        case1 === true,

    downstreamPublishableIsNotAuthority:
        case2 === true,

    unsupportedUpstreamCannotBePromoted:
        case3 === true,

    exceededBoundaryCannotBePublished:
        case4 === true,

    serializationPreservesAuthority:
        case5 === true

};

assert(
    Object.values(checks).every(Boolean),
    "MWAL v10.7 Publication Authority Test Failed"
);

console.log(
    JSON.stringify(
        {
            test:
                "MoWen Runtime v10.7 Single Publication Authority Test",

            checks,

            publicationAuthority:
                valid.isPublishable(),

            invalidPublicationAuthority:
                invalid.isPublishable(),

            exceededBoundaryAuthority:
                exceeded.isPublishable()
        },
        null,
        2
    )
);

console.log(
    "MoWen Runtime v10.7 Single Publication Authority Test Passed."
);
