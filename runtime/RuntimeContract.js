const RuntimeContract = {

    version: "5.4",


    principles: {

        definition:
            "没有定义，就没有推理。",

        runtime:
            "没有 Contract，就没有 Runtime。",

        registry:
            "没有注册，就没有可信运行。"

    },


    identity: {

        name:
            "MoWen Runtime",

        runtimeVersion:
            "3.9",

        contractVersion:
            "5.4"

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
            "1.2",


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


        registryContract: {

            required:
                true,


            requireMetadata:
                true,


            requiredMetadataFields: [

                "name",

                "version",

                "capabilities"

            ]

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

        registry:
            {},

        selfCheck:
            {},

        report:
            {}

    }

};


export default RuntimeContract;