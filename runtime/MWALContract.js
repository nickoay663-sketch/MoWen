/**
 * MoWen Accountability Layer
 * MWAL Contract v1.0
 *
 * Core principle:
 * Expression is signed.
 * Publication is preceded by responsibility review.
 *
 * MWAL does not equate:
 * - signature with truth
 * - identity with responsibility
 * - storage with verification
 * - discovery with evidence
 * - verification with legal judgment
 */

class MWALContract {

    static VERSION = "1.0";

    static NAME = "MoWen Accountability Layer";

    static IDENTIFIER = "MWAL";

    static PRINCIPLE =
        "Expression is signed, and publication is preceded by responsibility review.";

    /**
     * MWAL responsibility states.
     *
     * These states describe the epistemic and responsibility
     * condition of an expression. They do not constitute legal judgment.
     */
    static RESPONSIBILITY_STATES = Object.freeze({
        UNKNOWN: "UNKNOWN",
        UNESTABLISHED: "UNESTABLISHED",
        ESTABLISHED: "ESTABLISHED",
        PARTIAL: "PARTIAL",
        DISPUTED: "DISPUTED"
    });

    /**
     * Verification states.
     */
    static VERIFICATION_STATES = Object.freeze({
        UNKNOWN: "UNKNOWN",
        UNVERIFIED: "UNVERIFIED",
        DISCOVERED: "DISCOVERED",
        SUPPORTED: "SUPPORTED",
        VERIFIED: "VERIFIED",
        CONTRADICTED: "CONTRADICTED"
    });

    /**
     * Propagation decisions.
     */
    static PROPAGATION_STATES = Object.freeze({
        ALLOW: "ALLOW",
        ALLOW_WITH_BOUNDARY: "ALLOW_WITH_BOUNDARY",
        REQUIRE_VERIFICATION: "REQUIRE_VERIFICATION",
        BLOCK: "BLOCK"
    });

    /**
     * Required fields for every MWAL responsibility event.
     */
    static REQUIRED_FIELDS = Object.freeze([
        "eventId",
        "expression",
        "identity",
        "timestamp",
        "verificationState",
        "responsibilityState",
        "propagationState",
        "runtimeVersion",
        "contractVersion"
    ]);

    /**
     * Fields describing the responsibility boundary.
     */
    static RESPONSIBILITY_FIELDS = Object.freeze([
        "subject",
        "scope",
        "basis",
        "limitations"
    ]);

    /**
     * Fields used for auditability.
     */
    static AUDIT_FIELDS = Object.freeze([
        "eventId",
        "timestamp",
        "runtimeVersion",
        "contractVersion",
        "identity",
        "verificationState",
        "responsibilityState",
        "propagationState"
    ]);

    /**
     * Create a normalized MWAL contract envelope.
     *
     * This method does not claim that the supplied information is true.
     * It only establishes the standard structure in which the information
     * is recorded and audited.
     */
    static createEnvelope(data = {}) {

        return {
            mwal: {
                name: MWALContract.NAME,
                identifier: MWALContract.IDENTIFIER,
                version: MWALContract.VERSION
            },

            eventId:
                data.eventId || null,

            expression:
                data.expression || null,

            identity:
                data.identity || null,

            timestamp:
                data.timestamp || null,

            verificationState:
                data.verificationState ||
                MWALContract.VERIFICATION_STATES.UNKNOWN,

            responsibilityState:
                data.responsibilityState ||
                MWALContract.RESPONSIBILITY_STATES.UNKNOWN,

            responsibility:
                data.responsibility || null,

            propagationState:
                data.propagationState ||
                MWALContract.PROPAGATION_STATES.REQUIRE_VERIFICATION,

            evidence:
                Array.isArray(data.evidence)
                    ? data.evidence
                    : [],

            auditTrail:
                Array.isArray(data.auditTrail)
                    ? data.auditTrail
                    : [],

            signature:
                data.signature || null,

            runtimeVersion:
                data.runtimeVersion || null,

            contractVersion:
                data.contractVersion || null
        };
    }

    /**
     * Validate the structural compliance of a MWAL envelope.
     *
     * Validation here means contract compliance only.
     * It does not mean factual truth.
     */
    static validate(envelope = {}) {

        const missingFields =
            MWALContract.REQUIRED_FIELDS.filter(
                field =>
                    envelope[field] === undefined ||
                    envelope[field] === null
            );

        const validVerificationStates =
            Object.values(
                MWALContract.VERIFICATION_STATES
            );

        const validResponsibilityStates =
            Object.values(
                MWALContract.RESPONSIBILITY_STATES
            );

        const validPropagationStates =
            Object.values(
                MWALContract.PROPAGATION_STATES
            );

        const verificationStateValid =
            validVerificationStates.includes(
                envelope.verificationState
            );

        const responsibilityStateValid =
            validResponsibilityStates.includes(
                envelope.responsibilityState
            );

        const propagationStateValid =
            validPropagationStates.includes(
                envelope.propagationState
            );

        const valid =
            missingFields.length === 0 &&
            verificationStateValid &&
            responsibilityStateValid &&
            propagationStateValid;

        return {
            valid,

            contract: {
                name: MWALContract.NAME,
                identifier: MWALContract.IDENTIFIER,
                version: MWALContract.VERSION
            },

            missingFields,

            stateValidation: {
                verificationStateValid,
                responsibilityStateValid,
                propagationStateValid
            },

            principle:
                MWALContract.PRINCIPLE
        };
    }

    /**
     * Determine whether publication requires further verification.
     *
     * This is a responsibility gate, not a truth oracle.
     */
    static requiresVerification(envelope = {}) {

        if (
            envelope.verificationState ===
            MWALContract.VERIFICATION_STATES.VERIFIED
        ) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether an envelope may enter a propagation pipeline.
     *
     * MWAL never converts uncertainty into certainty.
     */
    static canPropagate(envelope = {}) {

        const validation =
            MWALContract.validate(envelope);

        if (!validation.valid) {
            return false;
        }

        return (
            envelope.propagationState ===
            MWALContract.PROPAGATION_STATES.ALLOW
        ) ||
        (
            envelope.propagationState ===
            MWALContract.PROPAGATION_STATES.ALLOW_WITH_BOUNDARY
        );
    }

    /**
     * Contract-level invariants.
     */
    static invariants() {

        return Object.freeze([
            "SIGNATURE_IS_NOT_TRUTH",
            "IDENTITY_IS_NOT_AUTOMATIC_RESPONSIBILITY",
            "STORAGE_IS_NOT_VERIFICATION",
            "DISCOVERY_IS_NOT_EVIDENCE",
            "VERIFICATION_IS_NOT_LEGAL_JUDGMENT",
            "UNKNOWN_MUST_NOT_BE_PRESENTED_AS_KNOWN",
            "RESPONSIBILITY_MUST_NOT_EXCEED_EVIDENCE",
            "PROPAGATION_MUST_RESPECT_VERIFICATION_STATE"
        ]);
    }
}

export default MWALContract;
