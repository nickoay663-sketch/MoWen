import EngineBase from "./EngineBase.js";

class EvidenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "EvidenceEngine",
            "10.6",
            "莫问区分已发现、未验证与已验证：搜索发现可以保留为DISCOVERED，但没有可识别的Runtime验证行为时，不得提升为VERIFIED。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const evidences =
            this.buildEvidence();

        const verifiedCount =
            evidences.filter(
                item =>
                    item.verificationStatus === "VERIFIED"
            ).length;

        const unverifiedCount =
            evidences.filter(
                item =>
                    item.verificationStatus === "UNVERIFIED"
            ).length;

        const discoveredCount =
            evidences.filter(
                item =>
                    item.epistemicState === "DISCOVERED"
            ).length;


        return this.result({

            status:
                evidences.length > 0
                    ? "evidence-evaluated"
                    : "need-evidence",

            metadata:
                this.metadata({

                    evidenceCount:
                        evidences.length,

                    verifiedCount,

                    unverifiedCount,

                    discoveredCount

                }),

            evidences,

            result: {

                evidences,

                evidenceState: {

                    verifiedCount,

                    unverifiedCount,

                    discoveredCount

                }

            },

            trace: [

                {

                    engine:
                        "EvidenceEngine",

                    action:
                        "validate",

                    status:
                        evidences.length > 0
                            ? "completed"
                            : "no-evidence"

                }

            ],

            questions:
                evidences.length > 0
                    ? []
                    : [
                        "evidence verification required"
                    ],

            nextRuntimeState:
                "CorrespondenceEngine"

        });

    }


    buildEvidence() {

        const suppliedEvidence =
            this.semanticObject.evidence;

        const searchedSources =
            Array.isArray(
                this.semanticObject.search?.sources
            )
                ? this.semanticObject.search.sources
                : [];


        const candidates = [];


        if (Array.isArray(suppliedEvidence)) {

            for (const item of suppliedEvidence) {

                candidates.push({

                    ...item,

                    origin:
                        "supplied"

                });

            }

        }


        for (const source of searchedSources) {

            if (
                source &&
                typeof source === "object"
            ) {

                candidates.push({

                    ...source,

                    origin:
                        source.origin || "search"

                });

            }

        }


        return candidates

            .filter(
                item =>
                    item &&
                    typeof item === "object"
            )

            .map(
                item =>
                    this.normalizeEvidence(item)
            )

            .filter(
                item =>
                    item !== null
            );

    }


    normalizeEvidence(item) {

        const source =
            item.source ||
            item.url ||
            item.content ||
            "";

        const content =
            item.content ||
            "";


        if (!source && !content) {

            return null;

        }


        const expression =
            this.semanticObject.originalContent ||
            "";


        if (
            source === expression &&
            content === expression
        ) {

            return null;

        }


        /*
         * Evidence Boundary v10.6
         *
         * EvidenceEngine distinguishes three different states:
         *
         *   DISCOVERED
         *       Runtime has discovered the source or statement.
         *
         *   UNVERIFIED
         *       Runtime has not established verification.
         *
         *   VERIFIED
         *       Only allowed when a Runtime-owned verification
         *       record exists.
         *
         * Search discovery itself is NOT verification.
         *
         * External declarations such as:
         *
         *   verified: true
         *   verificationStatus: "VERIFIED"
         *   verificationBasis: "..."
         *
         * are input claims, not Runtime verification records.
         */


        const externallyClaimedVerified =
            item.verified === true ||
            item.verificationStatus === "VERIFIED";


        const externalVerificationBasis =
            item.verificationBasis ||
            item.verificationSource ||
            item.verifier ||
            null;


        /*
         * Runtime verification record.
         *
         * The current Runtime does not expose an independent
         * verification record to EvidenceEngine.
         *
         * Therefore external verification claims can never
         * promote evidence to VERIFIED.
         */

        const runtimeVerificationRecord =
            item.runtimeVerification === true ||
            item.runtimeVerificationRecord === true;


        const verificationStatus =
            runtimeVerificationRecord
                ? "VERIFIED"
                : "UNVERIFIED";


        /*
         * Preserve epistemic discovery state.
         *
         * SearchEngine already distinguishes:
         *
         *   DISCOVERED
         *
         * from verification status.
         *
         * EvidenceEngine must not destroy that information.
         */

        const epistemicState =
            item.epistemicState === "DISCOVERED" ||
            item.state === "DISCOVERED"
                ? "DISCOVERED"
                : verificationStatus === "VERIFIED"
                    ? "VERIFIED"
                    : "UNVERIFIED";


        return {

            type:
                item.type ||
                "external",

            source,

            content,

            origin:
                item.origin ||
                "supplied",

            epistemicState,

            verificationStatus,

            verificationBasis:
                runtimeVerificationRecord
                    ? (
                        item.verificationBasis ||
                        item.verificationSource ||
                        item.verifier ||
                        null
                    )
                    : null,

            externalVerificationClaim:
                externallyClaimedVerified,

            externalVerificationBasis,

            runtimeVerificationRecord,

            independent:
                item.independent === true,

            sourceAvailable:
                !!source,

            supportsClaim:
                item.supportsClaim === true,

            evidenceBoundary:
                verificationStatus === "VERIFIED"
                    ? "VERIFIED"
                    : "UNVERIFIED"

        };

    }

}


export default EvidenceEngine;
