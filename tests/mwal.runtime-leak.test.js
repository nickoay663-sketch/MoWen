import HonestRuntime from "../runtime/HonestRuntime.js";
import MWALResponsibilityInterface from "../runtime/MWALResponsibilityInterface.js";

const runtime =
    new HonestRuntime("这是一个事实");

const result =
    await runtime.run();

const event =
    result?.responsibilityEvent;

if (!event) {
    throw new Error(
        "MWAL runtime-leak test failed: ResponsibilityEvent was not produced."
    );
}


/*
 * =========================================================
 * 1. REAL RUNTIME ENVELOPE
 * =========================================================
 */

const envelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(event);

const forbiddenTopLevelFields = [
    "engineRegistry",
    "runtimeContext",
    "semanticObject",
    "engines",
    "trace",
    "metadata",
    "nextRuntimeState"
];

const leakedTopLevelFields =
    forbiddenTopLevelFields.filter(
        field =>
            Object.prototype.hasOwnProperty.call(
                envelope,
                field
            )
    );


/*
 * =========================================================
 * 2. MALICIOUS NORMALIZED RECORD
 * =========================================================
 */

const maliciousRecord = {

    expression:
        "这是一个事实",

    responsibilityActor: {
        identity: "test-identity",
        role: "expression-owner",
        authority: null
    },

    responsibilityScope: {},

    definition: {
        expression:
            "这是一个事实",

        definition:
            "Expression entering MoWen Runtime"
    },

    epistemicState:
        "UNKNOWN",

    supported:
        false,

    evidenceCount:
        0,

    verifiedEvidenceCount:
        0,

    sourceCount:
        0,

    verifiedSourceCount:
        0,

    verificationStatus:
        "UNKNOWN",

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

    expressionResponsibility:
        "medium",

    evidenceResponsibility:
        "none",

    sourceResponsibility:
        "missing",

    verificationResponsibility:
        "required",


    /*
     * FORBIDDEN RUNTIME INTERNALS
     */

    semanticObject: {
        secret:
            "RUNTIME_LEAK"
    },

    engineRegistry: {
        secret:
            "RUNTIME_REGISTRY_LEAK"
    },

    runtimeContext: {
        secret:
            "RUNTIME_CONTEXT_LEAK"
    },

    engines: {
        secret:
            "ENGINE_LEAK"
    },

    trace: {
        secret:
            "TRACE_LEAK"
    },

    metadata: {
        secret:
            "METADATA_LEAK"
    },

    nextRuntimeState:
        "RuntimeLeak"
};


/*
 * =========================================================
 * 3. POLLUTED RESPONSIBILITY EVENT
 * =========================================================
 */

const pollutedEvent = {

    eventId:
        "mwal-runtime-leak-test",

    expression:
        "这是一个事实",

    identity:
        "test-identity",

    timestamp:
        new Date().toISOString(),

    epistemicState:
        "UNKNOWN",

    responsibilityState:
        "UNESTABLISHED",

    propagationState:
        "REQUIRE_VERIFICATION",

    runtimeVersion:
        "10.4",

    contractVersion:
        "10.4",

    responsibility: {
        responsibilities: [
            maliciousRecord
        ]
    },

    evidence: [],

    auditTrail: [],

    signature: null
};


/*
 * =========================================================
 * 4. PROJECT POLLUTED RECORD
 * ========================================================= */

const pollutedEnvelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(
            pollutedEvent
        );


/*
 * =========================================================
 * 5. DEEP LEAK CHECK
 * ========================================================= */

const pollutedSerialized =
    JSON.stringify(
        pollutedEnvelope
    );

const forbiddenLeakMarkers = [
    "RUNTIME_LEAK",
    "RUNTIME_REGISTRY_LEAK",
    "RUNTIME_CONTEXT_LEAK",
    "ENGINE_LEAK",
    "TRACE_LEAK",
    "METADATA_LEAK",
    "RuntimeLeak"
];

const leakedMarkers =
    forbiddenLeakMarkers.filter(
        marker =>
            pollutedSerialized.includes(
                marker
            )
    );


/*
 * =========================================================
 * 6. STRUCTURAL CHECKS
 * ========================================================= */

const evidenceIsArray =
    Array.isArray(
        envelope.evidence
    );

const auditTrailIsArray =
    Array.isArray(
        envelope.auditTrail
    );

const envelopeSerializable =
    (() => {
        try {
            JSON.stringify(envelope);
            return true;
        } catch {
            return false;
        }
    })();

const pollutedEnvelopeSerializable =
    (() => {
        try {
            JSON.stringify(pollutedEnvelope);
            return true;
        } catch {
            return false;
        }
    })();

const validation =
    MWALResponsibilityInterface
        .validate(
            envelope
        );

const pollutedValidation =
    MWALResponsibilityInterface
        .validate(
            pollutedEnvelope
        );

const propagation =
    MWALResponsibilityInterface
        .canPropagate(
            pollutedEnvelope
        );

const verificationRequired =
    MWALResponsibilityInterface
        .requiresVerification(
            pollutedEnvelope
        );


/*
 * =========================================================
 * 7. OUTPUT
 * ========================================================= */

console.log(
    JSON.stringify(
        {

            runtimeState:
                result?.metadata?.runtimeState,

            executionComplete:
                result?.metadata?.executionComplete,

            executionCompletedCount:
                result?.metadata?.executionCompletedCount,

            executionExpectedCount:
                result?.metadata?.executionExpectedCount,

            selfCheckPassed:
                result?.epistemicBoundary?.selfCheckPassed,

            responsibilityEventExists:
                !!event,

            mwalEnvelopeKeys:
                Object.keys(
                    envelope
                ),

            leakedTopLevelFields,

            evidenceIsArray,

            auditTrailIsArray,

            envelopeSerializable,

            pollutedEnvelopeSerializable,

            pollutedEnvelopeKeys:
                Object.keys(
                    pollutedEnvelope
                ),

            leakedMarkers,

            validation,

            pollutedValidation,

            propagation,

            verificationRequired

        },
        null,
        2
    )
);


/*
 * =========================================================
 * 8. ASSERTIONS
 * ========================================================= */

if (
    leakedTopLevelFields.length !== 0
) {
    throw new Error(
        `MWAL runtime leak detected: ${leakedTopLevelFields.join(", ")}`
    );
}

if (
    leakedMarkers.length !== 0
) {
    throw new Error(
        `MWAL deep runtime leak detected: ${leakedMarkers.join(", ")}`
    );
}

if (!evidenceIsArray) {
    throw new Error(
        "MWAL runtime leak test failed: evidence is not an array."
    );
}

if (!auditTrailIsArray) {
    throw new Error(
        "MWAL runtime leak test failed: auditTrail is not an array."
    );
}

if (!envelopeSerializable) {
    throw new Error(
        "MWAL runtime leak test failed: MWAL envelope contains circular runtime state."
    );
}

if (!pollutedEnvelopeSerializable) {
    throw new Error(
        "MWAL runtime leak test failed: polluted MWAL envelope is not serializable."
    );
}

if (
    validation?.valid !== true
) {
    throw new Error(
        `MWAL runtime leak test failed: envelope validation failed: ${JSON.stringify(validation)}`
    );
}

if (
    pollutedValidation?.valid !== true
) {
    throw new Error(
        `MWAL runtime leak test failed: polluted envelope validation failed: ${JSON.stringify(pollutedValidation)}`
    );
}

if (
    pollutedEnvelope.propagationState !==
    "REQUIRE_VERIFICATION"
) {
    throw new Error(
        "MWAL runtime leak test failed: polluted envelope propagation state was upgraded."
    );
}

if (propagation !== false) {
    throw new Error(
        "MWAL runtime leak test failed: polluted envelope was allowed to propagate."
    );
}

if (verificationRequired !== true) {
    throw new Error(
        "MWAL runtime leak test failed: polluted envelope did not require verification."
    );
}


/*
 * =========================================================
 * 9. PASS
 * ========================================================= */

console.log(
    "\n=== MWAL RUNTIME LEAK TEST PASSED ==="
);
