import MWALContract from "./MWALContract.js";

/**
 * MoWen Accountability Layer
 * Responsibility Interface v1.1
 *
 * Purpose:
 * Convert an explicit MoWen ResponsibilityEvent into
 * the standard MWAL responsibility envelope.
 *
 * This interface does not:
 * - create evidence
 * - verify facts
 * - infer identity
 * - infer responsibility
 * - assign legal responsibility
 *
 * It only translates explicitly supplied responsibility
 * information into the MWAL contract structure.
 */

class MWALResponsibilityInterface {

    static VERSION = "1.1";

    static NAME =
        "MWALResponsibilityInterface";

    /**
     * Convert an explicit ResponsibilityEvent into
     * a MWAL responsibility envelope.
     *
     * No fallback field guessing is performed.
     */
    static fromResponsibilityEvent(
        responsibilityEvent = {}
    ) {

        const event =
            responsibilityEvent || {};

        return MWALContract.createEnvelope({

            eventId:
                event.eventId || null,

            expression:
                event.expression || null,

            identity:
                event.identity || null,

            timestamp:
                event.timestamp || null,

            verificationState:
                event.verificationState ||
                MWALContract.VERIFICATION_STATES.UNKNOWN,

            responsibilityState:
                event.responsibilityState ||
                MWALContract.RESPONSIBILITY_STATES.UNKNOWN,

            responsibility:
                event.responsibility || null,

            propagationState:
                event.propagationState ||
                MWALContract.PROPAGATION_STATES.REQUIRE_VERIFICATION,

            evidence:
                Array.isArray(event.evidence)
                    ? event.evidence
                    : [],

            auditTrail:
                Array.isArray(event.auditTrail)
                    ? event.auditTrail
                    : [],

            signature:
                event.signature || null,

            runtimeVersion:
                event.runtimeVersion || null,

            contractVersion:
                event.contractVersion ||
                MWALContract.VERSION
        });
    }

    /**
     * Validate a MWAL responsibility envelope.
     *
     * Validation means structural contract compliance only.
     * It does not establish factual truth or legal responsibility.
     */
    static validate(
        mwalEnvelope = {}
    ) {

        return MWALContract.validate(
            mwalEnvelope
        );
    }

    /**
     * Determine whether the MWAL envelope
     * is permitted to enter a propagation pipeline.
     */
    static canPropagate(
        mwalEnvelope = {}
    ) {

        return MWALContract.canPropagate(
            mwalEnvelope
        );
    }

    /**
     * Determine whether additional verification
     * is required before propagation.
     */
    static requiresVerification(
        mwalEnvelope = {}
    ) {

        return MWALContract.requiresVerification(
            mwalEnvelope
        );
    }

    /**
     * Return the interface contract information.
     */
    static contract() {

        return Object.freeze({

            name:
                MWALResponsibilityInterface.NAME,

            version:
                MWALResponsibilityInterface.VERSION,

            contract:
                MWALContract.IDENTIFIER,

            contractVersion:
                MWALContract.VERSION,

            purpose:
                "Translate explicit ResponsibilityEvent data into a MWAL accountability envelope.",

            principles: Object.freeze([
                "NO_IDENTITY_INFERENCE",
                "NO_RESPONSIBILITY_INFERENCE",
                "NO_EVIDENCE_CREATION",
                "NO_FACTUAL_VERIFICATION",
                "NO_LEGAL_JUDGMENT",
                "UNKNOWN_MUST_REMAIN_EXPLICIT"
            ]),

            invariants:
                MWALContract.invariants()
        });
    }
}

export default MWALResponsibilityInterface;
