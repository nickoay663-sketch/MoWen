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
                "4.2",

            principle:
                "莫问检查自身运行契约，不判断表达结果。",

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

            definition,

            search,

            evidence,

            correspondence,

            reasoning,

            responsibility,

            reconstruction,

            generator

        } = this.runtimeObject;

        return {

            contract:
                !!contract,

            pipeline:
                Array.isArray(pipeline),

            semanticObject:
                !!semanticObject,

            definition:
                !!definition,

            search:
                !!search,

            evidence:
                !!evidence,

            correspondence:
                !!correspondence,

            reasoning:
                !!reasoning,

            responsibility:
                !!responsibility,

            reconstruction:
                !!reconstruction,

            generator:
                !!generator

        };

    }

    validateEngineContract() {

        const contract =
            this.runtimeObject.contract;

        if (!contract?.engineContract) {

            return {

                contractLoaded: false

            };

        }

        const requiredFields =
            contract.engineContract.requiredFields || [];

        const generator =
            this.runtimeObject.generator || {};

        const result = {};

        for (const field of requiredFields) {

            result[field] =
                field in generator;

        }

        return {

            contractLoaded: true,

            ...result

        };

    }

}

export default SelfCheckEngine;