const RuntimeContract = {

    version: "4.2",

    principles: {

        definition:
            "没有定义，就没有推理。",

        runtime:
            "没有 Contract，就没有 Runtime。"

    },


    identity: {

        name:
            "MoWen Runtime",

        runtimeVersion:
            "3.9",

        contractVersion:
            "4.2"

    },


    pipeline: {

        input:
            "Expression",

        output:
            "ResponsibilityReport",


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
            "1.1",


        requiredFields: [

            "engine",

            "version",

            "status",

            "result",

            "trace",

            "questions",

            "nextRuntimeState"

        ],


        fieldTypes: {

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

        },


        complianceReport: {

            enabled:
                true,

            metrics: [

                "compliance",

                "missingFields",

                "invalidFields"

            ]

        },


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

        engine:
            "",

        version:
            "",

        status:
            "",

        result:
            {},

        trace:
            [],

        questions:
            [],

        nextRuntimeState:
            ""

    },


    runtimeResult: {

        runtimeVersion:
            "",

        contractVersion:
            "",

        identity:
            {},

        pipeline:
            [],

        semanticObject:
            {},

        runtimeTrace:
            [],

        selfCheck:
            {},

        report:
            {}

    }

};


export default RuntimeContract;