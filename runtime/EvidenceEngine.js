import EngineBase from "./EngineBase.js";

class EvidenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "EvidenceEngine",
            "10.5",
            "莫问记录表达相关证据，但没有可识别的验证行为时，不将外部声明提升为已验证证据。"
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
         * Evidence Boundary v10.5
         *
         * External declarations such as:
         *
         *   verified: true
         *   verificationStatus: "VERIFIED"
         *   verificationBasis: "..."
         *
         * are claims supplied by the input.
         *
         * They are NOT Runtime verification records.
         *
         * Because the current Runtime has no independent
         * verification engine or verification record,
         * such claims cannot promote evidence to VERIFIED.
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
         * No Runtime verification record exists yet.
         *
         * Therefore every supplied/search-derived evidence
         * remains UNVERIFIED.
         */

        const verificationStatus =
            "UNVERIFIED";

        const epistemicState =
            "UNVERIFIED";


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
                null,

            externalVerificationClaim:
                externallyClaimedVerified,

            externalVerificationBasis,

            independent:
                item.independent === true,

            sourceAvailable:
                !!source,

            supportsClaim:
                item.supportsClaim === true,

            evidenceBoundary:
                "UNVERIFIED"

        };

    }

}


export default EvidenceEngine;
