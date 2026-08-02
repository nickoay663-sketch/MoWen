class SelfCheckEngine {


    constructor(runtime) {

        this.runtime = runtime || {};

    }



    run() {


        const requiredPipeline = [

            "Recognition",

            "Definition",

            "Search",

            "Evidence",

            "Correspondence",

            "Reasoning",

            "Responsibility",

            "Reconstruction",

            "Generator",

            "SelfCheck"

        ];



        const pipelineValid =

            Array.isArray(this.runtime.pipeline)

            &&

            requiredPipeline.every(

                step =>

                    this.runtime.pipeline.includes(step)

            );



        const checks = {


            pipeline:

                pipelineValid,


            outputBoundary:

                !this.runtime.overreach,


            semanticObject:

                !!this.runtime.semanticObject,


            recognition:

                !!this.runtime.recognition,


            definition:

                !!this.runtime.definition,


            search:

                !!this.runtime.search,


            evidence:

                !!this.runtime.evidence,


            correspondence:

                !!this.runtime.correspondence,


            reasoning:

                !!this.runtime.reasoning,


            responsibility:

                !!this.runtime.responsibility,


            reconstruction:

                !!this.runtime.reconstruction,


            generator:

                !!this.runtime.generator

        };



        const passed =

            Object.values(checks)

                .every(Boolean);



        return {


            version:

                "3.1",



            principle:

                "莫问检查自身运行结构，不判断表达结果。",



            checks,



            passed,



            result: {

                checks,

                passed

            },



            trace: [],



            nextRuntimeState:

                "RuntimeCompleted",



            status:

                passed

                    ? "self-check-passed"

                    : "self-check-warning",



            questions:

                passed

                    ? []

                    : [

                        "Runtime 是否缺少必要运行环节？",

                        "输出是否超过已有证词、定义和证据范围？"

                    ]

        };

    }

}


export default SelfCheckEngine;