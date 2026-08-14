import EngineBase from "./EngineBase.js";

class EvidenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "EvidenceEngine",
            "10.3",
            "莫问记录并验证表达相关证据，不把发现扩大为证明。"
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


        const explicitVerified =
            item.verified === true ||
            item.verificationStatus === "VERIFIED";


        const verificationBasis =
            item.verificationBasis ||
            item.verificationSource ||
            item.verifier ||
            null;


        const verified =
            explicitVerified &&
            !!verificationBasis;


        return {

            type:
                item.type ||
                "external",

            source,

            content,

            origin:
                item.origin ||
                "supplied",

            epistemicState:
                verified
                    ? "VERIFIED"
                    : "DISCOVERED",

            verificationStatus:
                verified
                    ? "VERIFIED"
                    : "UNVERIFIED",

            verificationBasis,

            independent:
                item.independent !== false,

            supportsClaim:
                item.supportsClaim === true,

            sourceAvailable:
                !!source,

            evidenceBoundary:
                verified
                    ? "VERIFIED"
                    : "UNVERIFIED"

        };

    }

}


export default EvidenceEngine;