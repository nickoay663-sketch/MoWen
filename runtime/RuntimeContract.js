const RuntimeContract = {

    version: "5.0",


    principles: {

        definition:
            "没有定义，就没有推理。",

        runtime:
            "没有 Contract，就没有 Runtime。",

        evolution:
            "没有版本演化，就没有持续运行。"

    },


    identity: {

        name:
            "MoWen Runtime",

        runtimeVersion:
            "3.9",

        contractVersion:
            "5.0"

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


    contractEvolution: {

        enabled:
            true,


        versionPolicy: {

            major:
                "Breaking change requires migration.",

            minor:
                "Backward compatible extension.",

            patch:
                "Compatible correction."

        },


        migrationSupport:

        {

            enabled:
                true,

            currentVersion:
                "5.0"

        }

    },


    engineContract: {

        engineRegistry: {

    enabled:
        true,


    version:
        "1.0",


    registrationRequired:
        true,


    registryMethods: [

        "register",

        "get",

        "all",

        "has",

        "list"

    ]

},

        version:
            "2.0",


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


        selfDescription: {

            enabled:
                true,


            requiredMetadata: [

                "engine",

                "version",

                "capabilities"

            ]

        },


        compatibility: {

            enabled:
                true,


            strategy:

                [

                    "major",

                    "minor",

                    "patch"

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

        capabilities:
            [],

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