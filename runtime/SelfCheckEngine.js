class SelfCheckEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }


    run() {

        const checks =
            this.check();


        const contractReport =
            this.validateEngineContract();


        const selfDescriptionReport =
            this.validateEngineDescription();


        const failureExplanation =
            this.createFailureExplanation(

                contractReport,

                selfDescriptionReport

            );


        const recoveryGuidance =
            this.createRecoveryGuidance(

                failureExplanation

            );


        const auditTrail =
            this.createAuditTrail(

                contractReport

            );


        const passed =
            Object.values(checks).every(Boolean) &&
            contractReport.passed &&
            selfDescriptionReport.passed;


        return {

            engine:
                "SelfCheckEngine",


            version:
                "5.1",


            principle:
                "莫问检查运行契约，不判断表达结果。",


            checks,


            contractReport,


            selfDescriptionReport,


            failureExplanation,


            recoveryGuidance,


            auditTrail,


            passed,


            result: {

                checks,

                contractReport,

                selfDescriptionReport,

                failureExplanation,

                recoveryGuidance,

                auditTrail,

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
                !!engines &&
                typeof engines === "object"

        };

    }



    validateEngineContract() {

        const contract =
            this.runtimeObject.contract;


        const engines =
            this.runtimeObject.engines || {};


        const engineContract =
            contract?.engineContract || {};


        const requiredFields =
            engineContract.requiredFields || [];


        const fieldTypes =
            engineContract.fieldTypes || {};


        const report = {

            passed:
                true,


            totalEngines:
                Object.keys(engines).length,


            engines: {}

        };


        for (const [engineName, engine] of Object.entries(engines)) {


            const missingFields = [];

            const invalidFields = [];


            for (const field of requiredFields) {


                if (!(field in engine)) {

                    missingFields.push(field);

                    continue;

                }


                const expectedType =
                    fieldTypes[field];


                if (expectedType) {


                    if (

                        !this.validateType(

                            engine[field],

                            expectedType

                        )

                    ) {

                        invalidFields.push(field);

                    }

                }

            }


            report.engines[engineName] = {

                compliance:

                    requiredFields.length === 0

                        ? 100

                        :

                        Math.round(

                            (

                                requiredFields.length -
                                missingFields.length -
                                invalidFields.length

                            )

                            /

                            requiredFields.length

                            *

                            100

                        ),


                missingFields,

                invalidFields

            };


            if (

                missingFields.length > 0 ||
                invalidFields.length > 0

            ) {

                report.passed = false;

            }

        }


        return report;

    }



    validateEngineDescription() {


        const engines =
            this.runtimeObject.engines || {};


        const report = {

            passed:
                true,


            engines: {}

        };


        for (const [engineName, engine] of Object.entries(engines)) {


            const missing = [];


            if (!engine.engine) {

                missing.push("engine");

            }


            if (!engine.version) {

                missing.push("version");

            }


            if (!Array.isArray(engine.capabilities)) {

                missing.push("capabilities");

            }


            report.engines[engineName] = {

                missing

            };


            if (missing.length > 0) {

                report.passed = false;

            }

        }


        return report;

    }



    createFailureExplanation(contractReport, descriptionReport) {


        const failures = [];


        for (const [engineName, data] of Object.entries(contractReport.engines)) {

            if (

                data.missingFields.length > 0 ||
                data.invalidFields.length > 0

            ) {

                failures.push({

                    engine: engineName,

                    problemType:
                        "contract-failure",

                    fields:
                        [
                            ...data.missingFields,
                            ...data.invalidFields
                        ],

                    impact:
                        "该 Engine 不符合运行契约。"

                });

            }

        }


        for (const [engineName, data] of Object.entries(descriptionReport.engines)) {

            if (data.missing.length > 0) {

                failures.push({

                    engine: engineName,

                    problemType:
                        "self-description-failure",

                    fields:
                        data.missing,

                    impact:
                        "该 Engine 无法完整描述自身能力。"

                });

            }

        }


        return failures;

    }



    createRecoveryGuidance(failures) {

        return failures.map(failure => {

            return {

                engine:
                    failure.engine,


                action:
                    "补充 Engine 自描述信息或修正 Contract 后重新运行 SelfCheck。",


                reason:
                    failure.impact

            };

        });

    }



    createAuditTrail(contractReport) {

        return {

            engine:
                "SelfCheckEngine",


            version:
                "5.1",


            timestamp:
                new Date().toISOString(),


            checkedEngines:
                Object.keys(contractReport.engines),


            runtimeTrace:
                this.runtimeObject.runtimeTrace || [],


            traceCount:
                (this.runtimeObject.runtimeTrace || []).length,


            validationResult:
                contractReport.passed

                    ? "PASS"

                    : "FAIL"

        };

    }



    validateType(value, type) {

        if (type === "array") {

            return Array.isArray(value);

        }


        if (type === "object") {

            return (

                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)

            );

        }


        return typeof value === type;

    }

}


export default SelfCheckEngine;