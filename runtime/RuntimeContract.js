const RuntimeContract = {

    version: "4.0",

    principles: {

        definition:
            "没有定义，就没有推理。",

        runtime:
            "没有 Contract，就没有 Runtime。"

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