const RuntimeContract = {

    version: "4.1",

    principles: {

        definition:
            "没有定义，就没有推理。",

        runtime:
            "没有 Contract，就没有 Runtime。"

    },

    identity: {

        name: "MoWen Runtime",

        runtimeVersion: "3.9",

        contractVersion: "4.1"

    },

    pipeline: {

        input: "Expression",

        output: "ResponsibilityReport",

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

        version: "1.0",

        requiredFields: [

            "engine",

            "version",

            "status",

            "result",

            "trace",

            "questions",

            "nextRuntimeState"

        ],

        allowedStatus: [

            "Passed",

            "Failed",

            "Need Definition",

            "Need Evidence",

            "Need Correspondence",

            "Need Responsibility",

            "Generated"

        ]

    },

    engineResult: {

        engine: "",

        version: "",

        status: "",

        result: {},

        trace: [],

        questions: [],

        nextRuntimeState: ""

    },

    runtimeResult: {

        runtimeVersion: "",

        pipeline: [],

        semanticObject: {},

        runtimeTrace: [],

        selfCheck: {}

    }

};

export default RuntimeContract;