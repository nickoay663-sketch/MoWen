import assert from "node:assert/strict";
import GeneratorEngine from "../runtime/GeneratorEngine.js";
import ReportFormatter from "../runtime/ReportFormatter.js";


const supportedRuntimeObject = {

    contract: {

        identity: {

            runtimeVersion:
                "10.6"

        },

        version:
            "10.6"

    },

    pipeline: [

        "RecognitionEngine",
        "DefinitionEngine",
        "SearchEngine",
        "EvidenceEngine",
        "CorrespondenceEngine",
        "ReasoningEngine",
        "ResponsibilityEngine",
        "ReconstructionEngine",
        "GeneratorEngine",
        "SelfCheckEngine"

    ],

    engines: {},

    runtimeTrace: [],

    reconstruction: {

        originalExpression:
            "原始表达",

        reconstructedExpression:
            "重构后的文章",

        reconstructionState:
            "SUPPORTED",

        language:
            "zh-CN",

        responsibilityChain: [

            {

                supported:
                    true,

                verificationStatus:
                    "SUPPORTED",

                epistemicState:
                    "SUPPORTED",

                responsibilityBoundary: {

                    status:
                        "matched"

                }

            }

        ],

        evidenceChain: [],

        sources: [],

        boundaries: {},

        expansion:
            false,

        sourceExpansion:
            false,

        evidenceExpansion:
            false,

        publishable:
            true

    }

};


const unverifiedRuntimeObject = {

    ...supportedRuntimeObject,

    reconstruction: {

        ...supportedRuntimeObject.reconstruction,

        reconstructionState:
            "UNVERIFIED",

        responsibilityChain: [

            {

                supported:
                    false,

                verificationStatus:
                    "UNVERIFIED",

                epistemicState:
                    "UNVERIFIED",

                responsibilityBoundary: {

                    status:
                        "matched"

                }

            }

        ],

        publishable:
            false

    }

};


/*
 * =========================================================
 * 1. Generator：SUPPORTED
 * =========================================================
 */

const supportedGenerator =
    new GeneratorEngine(
        supportedRuntimeObject
    ).execute();

assert.equal(
    supportedGenerator.report.reconstructionState,
    "SUPPORTED"
);

assert.equal(
    supportedGenerator.report.publishable,
    true
);

assert.equal(
    supportedGenerator.publishableText,
    "重构后的文章"
);

assert.equal(
    supportedGenerator.report.responsibilityCount,
    1
);


/*
 * =========================================================
 * 2. Generator：UNVERIFIED
 * =========================================================
 */

const unverifiedGenerator =
    new GeneratorEngine(
        unverifiedRuntimeObject
    ).execute();

assert.equal(
    unverifiedGenerator.report.reconstructionState,
    "UNVERIFIED"
);

assert.equal(
    unverifiedGenerator.report.publishable,
    false
);

assert.equal(
    unverifiedGenerator.publishableText,
    ""
);


/*
 * =========================================================
 * 3. ReportFormatter：SUPPORTED projection
 * =========================================================
 */

const supportedRuntimeResult = {

    runtimeVersion:
        "10.6",

    metadata: {

        runtimeVersion:
            "10.6",

        contractVersion:
            "10.6",

        engineCount:
            10

    },

    generator:
        supportedGenerator,

    selfCheck: {

        result: {

            passed:
                true

        }

    }

};

const supportedReport =
    new ReportFormatter(
        supportedRuntimeResult
    ).run();

const supportedProjection =
    supportedReport.report.generator.report;

assert.equal(
    supportedProjection.reconstructionState,
    "SUPPORTED"
);

assert.equal(
    supportedProjection.publishable,
    true
);

assert.equal(
    supportedProjection.publishableText,
    "重构后的文章"
);

assert.equal(
    supportedProjection.verificationStatus,
    "SUPPORTED"
);

assert.equal(
    supportedProjection.sourceExpansion,
    false
);

assert.equal(
    supportedProjection.evidenceExpansion,
    false
);


/*
 * =========================================================
 * 4. ReportFormatter：UNVERIFIED projection
 * =========================================================
 */

const unverifiedRuntimeResult = {

    runtimeVersion:
        "10.6",

    metadata: {

        runtimeVersion:
            "10.6",

        contractVersion:
            "10.6",

        engineCount:
            10

    },

    generator:
        unverifiedGenerator,

    selfCheck: {

        result: {

            passed:
                true

        }

    }

};

const unverifiedReport =
    new ReportFormatter(
        unverifiedRuntimeResult
    ).run();

const unverifiedProjection =
    unverifiedReport.report.generator.report;

assert.equal(
    unverifiedProjection.reconstructionState,
    "UNVERIFIED"
);

assert.equal(
    unverifiedProjection.publishable,
    false
);

assert.equal(
    unverifiedProjection.publishableText,
    ""
);

assert.equal(
    unverifiedProjection.verificationStatus,
    "UNVERIFIED"
);


/*
 * =========================================================
 * 输出
 * =========================================================
 */

console.log(
    JSON.stringify(
        {

            test:
                "MoWen v10.6 MWAL Generator Publication Projection Test",

            supported: {

                reconstructionState:
                    supportedProjection.reconstructionState,

                publishable:
                    supportedProjection.publishable,

                publishableText:
                    supportedProjection.publishableText,

                verificationStatus:
                    supportedProjection.verificationStatus

            },

            unverified: {

                reconstructionState:
                    unverifiedProjection.reconstructionState,

                publishable:
                    unverifiedProjection.publishable,

                publishableText:
                    unverifiedProjection.publishableText,

                verificationStatus:
                    unverifiedProjection.verificationStatus

            }

        },
        null,
        2
    )
);

console.log(
    "MoWen v10.6 MWAL Generator Publication Projection Test Passed."
);
