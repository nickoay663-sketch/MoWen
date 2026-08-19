class ResponsibilityEvent {

    constructor({
        eventId = null,
        identity = null,
        expression = null,
        testimony = null,
        responsibility = null,
        evidence = null,
        correspondence = null,
        reasoning = null,
        epistemicState = "UNKNOWN",
        verificationBoundary = null,
        runtimeTrace = [],
        runtimeVersion = null,
        contractVersion = null,
        source = "MoWen Runtime"
    } = {}) {

        this.type = "ResponsibilityEvent";
        this.version = "1.2";
        this.createdAt = new Date().toISOString();
        this.source = source;

        this.eventId =
            eventId ||
            `mwal-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 10)}`;

        this.identity =
            identity || null;

        this.runtimeVersion = runtimeVersion;
        this.contractVersion = contractVersion;

        this.expression = expression;
        this.testimony = testimony;

        this.epistemicState =
            epistemicState || "UNKNOWN";

        this.responsibility = responsibility;
        this.evidence = evidence;
        this.correspondence = correspondence;
        this.reasoning = reasoning;
        this.verificationBoundary = verificationBoundary;

        this.runtimeTrace =
            Array.isArray(runtimeTrace)
                ? [...runtimeTrace]
                : [];

        /*
         * ---------------------------------------------------------
         * Normalized Responsibility Records
         *
         * IMPORTANT:
         *
         * ResponsibilityEngine may return a wrapper object such as:
         *
         * {
         *     metadata,
         *     responsibilities: [...]
         * }
         *
         * The wrapper is Runtime structure.
         *
         * ResponsibilityEvent must select the normalized
         * responsibility record itself as the primary record.
         *
         * It must never treat the wrapper as a responsibility fact.
         * ---------------------------------------------------------
         */

        this.responsibilityRecords =
            this.collectResponsibilityRecords(
                responsibility
            );

        const primary =
            this.responsibilityRecords[0] ||
            {};

        /*
         * ---------------------------------------------------------
         * Responsibility State
         *
         * These fields are projected exclusively from the
         * normalized responsibility record.
         * ---------------------------------------------------------
         */

        this.responsibilityBoundary =
            primary.responsibilityBoundary ||
            null;

        this.verificationStatus =
            primary.verificationStatus ||
            "UNKNOWN";

        this.supported =
            primary.supported === true;

        this.responsibilityCapacity =
            primary.responsibilityCapacity ||
            null;

        this.responsibilityDemand =
            primary.responsibilityDemand ||
            null;

        this.responsibilityJudgment =
            primary.responsibilityJudgment ||
            null;

        this.runtimeIdentity = {

            name:
                "MoWen",

            identity:
                "Honest Runtime",

            runtimeVersion:
                runtimeVersion,

            contractVersion:
                contractVersion

        };

        this.boundary = {

            epistemic:
                this.epistemicState,

            verification:
                this.verificationStatus,

            responsibility:
                this.responsibilityBoundary,

            supported:
                this.supported

        };

    }


    /*
     * =========================================================
     * Normalized Responsibility Record Detection
     * =========================================================
     *
     * A normalized responsibility record contains responsibility
     * facts produced by ResponsibilityEngine.
     *
     * Runtime wrapper objects are not responsibility records.
     */

    isNormalizedResponsibilityRecord(
        record
    ) {

        if (
            !record ||
            typeof record !== "object" ||
            Array.isArray(record)
        ) {

            return false;

        }

        return (

            Object.prototype.hasOwnProperty.call(
                record,
                "expression"
            ) ||

            Object.prototype.hasOwnProperty.call(
                record,
                "responsibilityBoundary"
            ) ||

            Object.prototype.hasOwnProperty.call(
                record,
                "responsibilityJudgment"
            ) ||

            Object.prototype.hasOwnProperty.call(
                record,
                "responsibilityDemand"
            ) ||

            Object.prototype.hasOwnProperty.call(
                record,
                "responsibilityCapacity"
            ) ||

            Object.prototype.hasOwnProperty.call(
                record,
                "verificationStatus"
            )

        );

    }


    /*
     * =========================================================
     * Responsibility Record Collection
     * =========================================================
     *
     * Priority:
     *
     * 1. responsibility.responsibilities
     * 2. responsibility.result.responsibilities
     * 3. responsibility.result if it is itself normalized
     * 4. responsibility if it is itself normalized
     *
     * Runtime wrapper objects are never promoted to primary
     * responsibility records.
     */

    collectResponsibilityRecords(
        responsibility
    ) {

        const records = [];

        const append =
            candidate => {

                if (
                    !candidate
                ) {

                    return;

                }

                if (
                    Array.isArray(candidate)
                ) {

                    for (
                        const record
                        of candidate
                    ) {

                        if (
                            this.isNormalizedResponsibilityRecord(
                                record
                            )
                        ) {

                            records.push(
                                record
                            );

                        }

                    }

                    return;

                }

                if (
                    this.isNormalizedResponsibilityRecord(
                        candidate
                    )
                ) {

                    records.push(
                        candidate
                    );

                }

            };


        /*
         * ---------------------------------------------------------
         * Preferred normalized array
         * ---------------------------------------------------------
         */

        append(
            responsibility?.responsibilities
        );


        /*
         * ---------------------------------------------------------
         * Nested normalized array
         * ---------------------------------------------------------
         */

        append(
            responsibility?.result?.responsibilities
        );


        /*
         * ---------------------------------------------------------
         * Nested result itself
         * ---------------------------------------------------------
         */

        append(
            responsibility?.result
        );


        /*
         * ---------------------------------------------------------
         * Direct normalized responsibility object
         * ---------------------------------------------------------
         */

        append(
            responsibility
        );


        /*
         * ---------------------------------------------------------
         * Deduplicate records while preserving first-seen order.
         * ---------------------------------------------------------
         */

        return [
            ...new Set(records)
        ];

    }


    /*
     * =========================================================
     * Responsibility Consistency
     * =========================================================
     */

    getResponsibilityConsistency() {

        const errors = [];

        const records =
            this.responsibilityRecords;

        if (
            records.length === 0
        ) {

            return {

                consistent:
                    false,

                errors: [
                    "No responsibility record available."
                ]

            };

        }

        const supportedValues =
            records
                .filter(
                    record =>
                        typeof record.supported ===
                        "boolean"
                )
                .map(
                    record =>
                        record.supported
                );

        if (
            supportedValues.includes(true) &&
            supportedValues.includes(false)
        ) {

            errors.push(
                "Conflicting supported states across responsibility records."
            );

        }

        const verificationValues =
            records
                .filter(
                    record =>
                        typeof record.verificationStatus ===
                        "string"
                )
                .map(
                    record =>
                        record.verificationStatus
                );

        if (
            verificationValues.includes(
                "SUPPORTED"
            ) &&
            verificationValues.some(
                value =>
                    value !== "SUPPORTED"
            )
        ) {

            errors.push(
                "Conflicting verificationStatus across responsibility records."
            );

        }

        const boundaryValues =
            records
                .map(
                    record =>
                        record.responsibilityBoundary?.status
                )
                .filter(
                    status =>
                        typeof status ===
                        "string"
                );

        if (
            boundaryValues.includes(
                "exceeded"
            )
        ) {

            errors.push(
                "Responsibility boundary exceeded."
            );

        }

        const gapDetected =
            records.some(
                record =>
                    record.responsibilityJudgment?.gap ===
                    true
            );

        if (
            gapDetected
        ) {

            errors.push(
                "Responsibility judgment contains an unresolved capacity gap."
            );

        }

        return {

            consistent:
                errors.length === 0,

            errors

        };

    }


    /*
     * =========================================================
     * Validation
     * =========================================================
     */

    validate() {

        const errors = [];

        if (
            this.type !==
            "ResponsibilityEvent"
        ) {

            errors.push(
                "Invalid event type."
            );

        }

        if (
            !this.version
        ) {

            errors.push(
                "Missing event version."
            );

        }

        if (
            !this.createdAt
        ) {

            errors.push(
                "Missing createdAt."
            );

        }

        if (
            !this.eventId
        ) {

            errors.push(
                "Missing eventId."
            );

        }

        if (
            !this.expression
        ) {

            errors.push(
                "Missing expression."
            );

        }

        if (
            !this.epistemicState
        ) {

            errors.push(
                "Missing epistemicState."
            );

        }

        const allowedStates = [

            "DISCOVERED",
            "UNVERIFIED",
            "VERIFIED",
            "VERIFIED_BUT_NOT_LINKED",
            "SUPPORTED",
            "CONTRADICTED",
            "PARTIAL",
            "UNRESOLVED",
            "OUT_OF_DOMAIN",
            "UNKNOWN"

        ];

        if (
            !allowedStates.includes(
                this.epistemicState
            )
        ) {

            errors.push(
                `Invalid epistemicState: ${this.epistemicState}`
            );

        }

        if (
            !Array.isArray(
                this.runtimeTrace
            )
        ) {

            errors.push(
                "runtimeTrace must be an array."
            );

        }

        return {

            passed:
                errors.length === 0,

            errors

        };

    }


    /*
     * =========================================================
     * Publication Boundary
     * =========================================================
     */

    isPublishable() {

        if (
            this.epistemicState !==
            "SUPPORTED"
        ) {

            return false;

        }

        if (
            this.supported !==
            true
        ) {

            return false;

        }

        if (
            this.verificationStatus !==
            "SUPPORTED"
        ) {

            return false;

        }

        if (
            !this.responsibilityBoundary ||
            this.responsibilityBoundary.status !==
            "matched"
        ) {

            return false;

        }

        const consistency =
            this.getResponsibilityConsistency();

        if (
            consistency.consistent !==
            true
        ) {

            return false;

        }

        return true;

    }


    /*
     * =========================================================
     * Responsibility State
     * =========================================================
     */

    getResponsibilityState() {

        return {

            epistemicState:
                this.epistemicState,

            verificationStatus:
                this.verificationStatus,

            supported:
                this.supported,

            responsibilityDemand:
                this.responsibilityDemand,

            responsibilityCapacity:
                this.responsibilityCapacity,

            responsibilityJudgment:
                this.responsibilityJudgment,

            responsibilityBoundary:
                this.responsibilityBoundary,

            responsibilityConsistency:
                this.getResponsibilityConsistency()

        };

    }


    /*
     * =========================================================
     * Serialization
     * =========================================================
     */

    toJSON() {

        return {

            type:
                this.type,

            version:
                this.version,

            createdAt:
                this.createdAt,

            source:
                this.source,

            eventId:
                this.eventId,

            identity:
                this.identity,

            runtimeVersion:
                this.runtimeVersion,

            contractVersion:
                this.contractVersion,

            expression:
                this.expression,

            testimony:
                this.testimony,

            epistemicState:
                this.epistemicState,

            verificationStatus:
                this.verificationStatus,

            supported:
                this.supported,

            responsibility:
                this.responsibility,

            responsibilityDemand:
                this.responsibilityDemand,

            responsibilityCapacity:
                this.responsibilityCapacity,

            responsibilityJudgment:
                this.responsibilityJudgment,

            responsibilityBoundary:
                this.responsibilityBoundary,

            responsibilityRecords:
                this.responsibilityRecords,

            responsibilityConsistency:
                this.getResponsibilityConsistency(),

            evidence:
                this.evidence,

            correspondence:
                this.correspondence,

            reasoning:
                this.reasoning,

            verificationBoundary:
                this.verificationBoundary,

            runtimeTrace:
                this.runtimeTrace,

            runtimeIdentity:
                this.runtimeIdentity,

            boundary:
                this.boundary

        };

    }

}


export default ResponsibilityEvent;
