import GeneratorEngine from "../runtime/GeneratorEngine.js";

const fakeResponsibility = {

    expression:
        "某事件已经被证实。",

    definition:
        "某事件已经被证实。",

    supported:
        true,

    verificationStatus:
        "SUPPORTED",

    epistemicState:
        "SUPPORTED",

    verifiedEvidenceCount:
        1,

    responsibilityCapacity: {
        level: "medium",
        verifiedEvidenceCount: 1,
        sourceAvailable: true
    },

    responsibilityBoundary: {

        status:
            "exceeded",

        explanation:
            "当前责任要求超过证据能力。",

        epistemicBoundary:
            "NO_VERIFIED_SUPPORT"

    },

    sources: [],

    verifiedSources: [],

    evidenceCount:
        0,

    sourceCount:
        0,

    sourceAvailable:
        false
};

const fakeReconstruction = {

    originalExpression:
        "某事件已经被证实。",

    reconstructedExpression:
        "某事件已经被证实。",

    responsibilityChain:
        [fakeResponsibility],

    responsibilityCount:
        1,

    evidenceChain:
        [],

    sources:
        [],

    sourceCount:
        0,

    boundaries: {
        responsibility:
            "preserved"
    },

    expansion:
        false,

    verificationStatus:
        "evaluated"
};

const runtimeObject = {

    semanticObject: {
        originalContent:
            "某事件已经被证实。"
    },

    reconstruction: {
        reconstruction:
            fakeReconstruction
    },

    runtimeTrace: [],

    engines: {},

    contract: {
        identity: {
            runtimeVersion:
                "10.4"
        },
        version:
            "10.4"
    }
};

const engine =
    new GeneratorEngine(runtimeObject);

const result =
    engine.execute();

const report =
    result.report || {};

const responsibility =
    report.responsibilities?.[0] || {};

const boundary =
    responsibility.responsibilityBoundary || {};

const attackBlocked =
    responsibility.supported !== true
    &&
    responsibility.verificationStatus !==
        "SUPPORTED"
    &&
    boundary.status ===
        "exceeded";

console.log(
    JSON.stringify(
        {
            attack: {

                fakeSupported:
                    true,

                fakeVerificationStatus:
                    "SUPPORTED",

                fakeBoundary:
                    "exceeded",

                fakeVerifiedEvidenceCount:
                    1,

                fakeSourceCount:
                    0
            },

            observed: {

                supported:
                    responsibility.supported,

                verificationStatus:
                    responsibility.verificationStatus,

                epistemicState:
                    responsibility.epistemicState,

                boundary:
                    boundary.status,

                verifiedEvidenceCount:
                    responsibility.verifiedEvidenceCount,

                sourceCount:
                    responsibility.sourceCount
            },

            assertions: {

                generatorDidNotPromote:
                    responsibility.supported !== true,

                generatorDidNotMarkVerified:
                    responsibility.verificationStatus !==
                    "SUPPORTED",

                generatorPreservedExceededBoundary:
                    boundary.status ===
                    "exceeded",

                attackBlocked

            }
        },
        null,
        2
    )
);

if (!attackBlocked) {

    console.error(
        "GENERATOR BOUNDARY ATTACK FAILED: 责任边界状态被 Generator 穿透或提升。"
    );

    process.exit(1);

}

console.log(
    "GENERATOR BOUNDARY ATTACK BLOCKED"
);
