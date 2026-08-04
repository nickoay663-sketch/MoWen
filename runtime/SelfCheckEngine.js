class SelfCheckEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }

    run() {

        const checks =
            this.check();

        const contractChecks =
            this.validateEngineContract();

        const passed =
            Object.values(checks).every(Boolean) &&
            Object.values(contractChecks).every(Boolean);

        return {

            engine:
                "SelfCheckEngine",

            version:
                "4.3",

            principle:
                "莫问检查运行契约，不判断表达结果。",

            checks,

            contractChecks,

            passed,

            result: {

                checks,

                contractChecks,

                passed

            },

            trace: [],

            questions:

                passed

                    ? []

                    : [
                        "运行链是否存在契约违反？"
                    ],

            nextRuntimeState:
                "RuntimeCompleted",

            status:

                passed

                    ? "self-check-passed"

                    : "self-check-warning"

        };

    }

    check() {

        const {

            pipeline,

            contract,

            semanticObject,

            engines

        } = this.runtimeObject;

        return {

            contract:
                !!contract,

            pipeline:
                Array.isArray(pipeline),

            semanticObject:
                !!semanticObject,

            engines:
                !!engines && typeof engines === "object"

        };

    }

    validateEngineContract() {

        const contract =
            this.runtimeObject.contract;

        const engines =
            this.runtimeObject.engines || {};

        if (!contract?.engineContract) {

            return {

                contractLoaded: false

            };

        }

        const requiredFields =
            contract.engineContract.requiredFields || [];

        const result = {

            contractLoaded: true

        };

        for (const [engineName, engine] of Object.entries(engines)) {

            result[engineName] = {};

            for (const field of requiredFields) {

                result[engineName][field] =
                    field in engine;

            }

        }

        return result;

    }

}

export default SelfCheckEngine;