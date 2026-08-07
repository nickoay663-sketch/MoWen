const RuntimeContract = {

    version: "8.4",

    principles: {

        definition:
            "没有定义，就没有推理。",

        runtime:
            "没有 Contract，就没有 Runtime。",

        registry:
            "没有注册，就没有可信运行。",

        result:
            "没有 RuntimeResult，就没有统一运行结果。"

    },

    identity: {

        name:
            "MoWen Runtime",

        runtimeVersion:
            "8.4",

        contractVersion:
            "8.4"

    },

    pipeline: {

        input:
            "Expression",

        output:
            "RuntimeResult",

        engines: [

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

        ]

    },

    engineContract: {

        version:
            "2.0",

        requiredFields: [

            "engine",

            "version",

            "status",

            "result",

            "trace",

            "questions",

            "nextRuntimeState",

            "principle",

            "metadata"

        ],

        fieldTypes: {

            principle:
                "string",

            metadata:
                "object",

            engine:
                "string",

            version:
                "string",

            status:
                "string",

            result:
                "object",

            trace:
                "array",

            questions:
                "array",

            nextRuntimeState:
                "string"

        }

    },

    runtimeResultContract: {

        requiredFields: [

            "runtimeVersion",

            "generatedAt",

            "metadata",

            "recognition",

            "definition",

            "search",

            "evidence",

            "correspondence",

            "reasoning",

            "responsibility",

            "reconstruction",

            "generator",

            "selfCheck",

            "runtimeTrace",

            "pipeline",

            "engineRegistry"

        ]

    },

    metadataContract: {

        requiredFields: [

            "runtimeVersion",

            "contractVersion",

            "engineCount",

            "generatedAt"

        ]

    },

    registryContract: {

        required:
            true,

     requiredMetadataFields: [

    "name",

    "version",

    "status",

    "nextRuntimeState",

    "capabilities"

]
    }

};

export default RuntimeContract;