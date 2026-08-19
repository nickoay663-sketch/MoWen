import MWALResponsibilityInterface from "../runtime/MWALResponsibilityInterface.js";

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function createEvent() {
    return {
        eventId: "mwal-provenance-gate-test",
        expression: "这是一个事实",
        identity: null,
        timestamp: new Date().toISOString(),

        epistemicState: "UNKNOWN",
        responsibilityState: "UNESTABLISHED",
        propagationState: "REQUIRE_VERIFICATION",

        runtimeVersion: "10.4",
        contractVersion: "10.4",

        responsibility: {
            responsibilities: [
                {
                    expression: "这是一个事实",

                    responsibilityActor: {
                        identity: null,
                        role: "expression-owner",
                        authority: null
                    },

                    responsibilityScope: {
                        claims: [
                            {
                                expression: "这是一个事实"
                            }
                        ]
                    },

                    definition: {
                        expression: "这是一个事实",
                        definition: "Expression entering MoWen Runtime"
                    },

                    supported: false,
                    epistemicState: "UNKNOWN",

                    evidenceCount: 0,
                    verifiedEvidenceCount: 0,
                    sourceCount: 0,
                    verifiedSourceCount: 0,

                    verificationStatus: "UNKNOWN",

                    responsibilityDemand: {
                        level: "medium"
                    },

                    responsibilityCapacity: {
                        level: "none"
                    },

                    responsibilityBoundary: {
                        status: "exceeded"
                    },

                    responsibilityJudgment: {
                        demand: "medium",
                        capacity: "none",
                        gap: true
                    },

                    expressionResponsibility: "medium",
                    evidenceResponsibility: "none",
                    sourceResponsibility: "missing",
                    verificationResponsibility: "required"
                }
            ]
        },

        evidence: [],
        auditTrail: [],
        signature: null
    };
}


/*
 * =========================================================
 * MWAL GATE 5
 * PROVENANCE / STATE AUTHORITY BOUNDARY
 * =========================================================
 */

const baseline =
    createEvent();

const baselineEnvelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(
            baseline
        );


/*
 * ---------------------------------------------------------
 * ATTACK 1
 * Forge VERIFIED
 * ---------------------------------------------------------
 */

const forgedVerified =
    clone(baseline);

forgedVerified.epistemicState =
    "VERIFIED";

forgedVerified
    .responsibility
    .responsibilities[0]
    .epistemicState =
        "VERIFIED";

forgedVerified
    .responsibility
    .responsibilities[0]
    .verificationStatus =
        "VERIFIED";


const forgedVerifiedEnvelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(
            forgedVerified
        );


/*
 * ---------------------------------------------------------
 * ATTACK 2
 * Forge ESTABLISHED
 * ---------------------------------------------------------
 */

const forgedEstablished =
    clone(baseline);

forgedEstablished
    .responsibility
    .responsibilities[0]
    .responsibilityState =
        "ESTABLISHED";

forgedEstablished
    .responsibility
    .responsibilities[0]
    .responsibilityBoundary = {
        status: "within"
    };

forgedEstablished
    .responsibility
    .responsibilities[0]
    .responsibilityJudgment = {
        demand: "medium",
        capacity: "high",
        gap: false
    };


const forgedEstablishedEnvelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(
            forgedEstablished
        );


/*
 * ---------------------------------------------------------
 * ATTACK 3
 * Forge ALLOW
 * ---------------------------------------------------------
 */

const forgedAllow =
    clone(baseline);

forgedAllow.propagationState =
    "ALLOW";


const forgedAllowEnvelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(
            forgedAllow
        );


/*
 * ---------------------------------------------------------
 * ATTACK 4
 * Forge complete authority chain
 * ---------------------------------------------------------
 */

const forgedComplete =
    clone(baseline);

const completeRecord =
    forgedComplete
        .responsibility
        .responsibilities[0];

completeRecord.epistemicState =
    "VERIFIED";

completeRecord.verificationStatus =
    "VERIFIED";

completeRecord.supported =
    true;

completeRecord.evidenceCount =
    10;

completeRecord.verifiedEvidenceCount =
    10;

completeRecord.sourceCount =
    10;

completeRecord.verifiedSourceCount =
    10;

completeRecord.responsibilityState =
    "ESTABLISHED";

completeRecord.responsibilityBoundary = {
    status: "within"
};

completeRecord.responsibilityJudgment = {
    demand: "medium",
    capacity: "high",
    gap: false
};

forgedComplete.propagationState =
    "ALLOW";


const forgedCompleteEnvelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(
            forgedComplete
        );


/*
 * ---------------------------------------------------------
 * OUTPUT
 * ---------------------------------------------------------
 */

console.log(
    JSON.stringify(
        {
            baseline: {
                verificationState:
                    baselineEnvelope.verificationState,

                responsibilityState:
                    baselineEnvelope.responsibilityState,

                propagationState:
                    baselineEnvelope.propagationState
            },

            forgedVerified: {
                verificationState:
                    forgedVerifiedEnvelope
                        .verificationState,

                responsibilityState:
                    forgedVerifiedEnvelope
                        .responsibilityState,

                propagationState:
                    forgedVerifiedEnvelope
                        .propagationState
            },

            forgedEstablished: {
                verificationState:
                    forgedEstablishedEnvelope
                        .verificationState,

                responsibilityState:
                    forgedEstablishedEnvelope
                        .responsibilityState,

                propagationState:
                    forgedEstablishedEnvelope
                        .propagationState
            },

            forgedAllow: {
                verificationState:
                    forgedAllowEnvelope
                        .verificationState,

                responsibilityState:
                    forgedAllowEnvelope
                        .responsibilityState,

                propagationState:
                    forgedAllowEnvelope
                        .propagationState,

                canPropagate:
                    MWALResponsibilityInterface
                        .canPropagate(
                            forgedAllowEnvelope
                        )
            },

            forgedComplete: {
                verificationState:
                    forgedCompleteEnvelope
                        .verificationState,

                responsibilityState:
                    forgedCompleteEnvelope
                        .responsibilityState,

                propagationState:
                    forgedCompleteEnvelope
                        .propagationState,

                canPropagate:
                    MWALResponsibilityInterface
                        .canPropagate(
                            forgedCompleteEnvelope
                        )
            }
        },
        null,
        2
    )
);


/*
 * =========================================================
 * GATE 5 ASSERTIONS
 * =========================================================
 *
 * An untrusted event must not manufacture authority.
 */

if (
    forgedVerifiedEnvelope.verificationState ===
    "VERIFIED"
) {
    throw new Error(
        "MWAL Gate 5 breach: forged VERIFIED state accepted."
    );
}

if (
    forgedEstablishedEnvelope.responsibilityState ===
    "ESTABLISHED"
) {
    throw new Error(
        "MWAL Gate 5 breach: forged ESTABLISHED responsibility accepted."
    );
}

if (
    forgedAllowEnvelope.propagationState ===
    "ALLOW"
) {
    throw new Error(
        "MWAL Gate 5 breach: forged ALLOW state accepted."
    );
}

if (
    forgedCompleteEnvelope.verificationState ===
        "VERIFIED" ||
    forgedCompleteEnvelope.responsibilityState ===
        "ESTABLISHED" ||
    forgedCompleteEnvelope.propagationState ===
        "ALLOW" ||
    MWALResponsibilityInterface
        .canPropagate(
            forgedCompleteEnvelope
        ) === true
) {
    throw new Error(
        "MWAL Gate 5 breach: forged authority chain accepted."
    );
}


console.log(
    "\n=== MWAL GATE 5 PROVENANCE TEST PASSED ==="
);
