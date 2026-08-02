class SelfCheckEngine {

    constructor(runtime) {

        this.runtime = runtime || {};

    }


    run() {

        const checks = {

            pipeline:

                !!this.runtime.recognition &&
                !!this.runtime.definition &&
                !!this.runtime.search &&
                !!this.runtime.evidence &&
                !!this.runtime.correspondence &&
                !!this.runtime.reasoning &&
                !!this.runtime.responsibility &&
                !!this.runtime.reconstruction &&
                !!this.runtime.generator,


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

                "3.0",


            principle:

                "莫问检查自身运行，不判断表达结果。",


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

                    :

                    [

                        "Runtime 是否缺少必要运行环节？",

                        "输出是否超过已有证词、定义和证据范围？"

                    ],


            summary:

                passed

                    ? "Honest Runtime Self Check Passed."

                    : "Honest Runtime Self Check Warning."

        };

    }

}


export default SelfCheckEngine;