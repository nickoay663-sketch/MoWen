class SelfCheckEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const checks = this.buildChecks();

        const passed =
            Object.values(checks).every(Boolean);

        return {

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
                    : "self-check-failed",

            questions:

                passed
                    ? []
                    : [
                        "Runtime 是否存在缺失模块？",
                        "Runtime 是否存在运行链断裂？"
                    ],

            version:
                "3.3"

        };

    }

    buildChecks() {

        return {

            pipeline:
                !!this.runtimeObject.pipeline,

            semanticObject:
                !!this.runtimeObject.semanticObject,

            recognition:
                !!this.runtimeObject.recognition,

            definition:
                !!this.runtimeObject.definition,

            search:
                !!this.runtimeObject.search,

            evidence:
                !!this.runtimeObject.evidence,

            correspondence:
                !!this.runtimeObject.correspondence,

            reasoning:
                !!this.runtimeObject.reasoning,

            responsibility:
                !!this.runtimeObject.responsibility,

            reconstruction:
                !!this.runtimeObject.reconstruction,

            generator:
                !!this.runtimeObject.generator

        };

    }

}

export default SelfCheckEngine;