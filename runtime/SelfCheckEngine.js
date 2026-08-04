class SelfCheckEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }


    run() {

        const checks =
            this.check();


        const contractReport =
            this.validateEngineContract();


        const failureExplanation =
            this.createFailureExplanation(contractReport);


        const auditTrail =
            this.createAuditTrail(

                contractReport

            );


        const passed =
            Object.values(checks).every(Boolean) &&
            contractReport.passed;


        return {

            engine:
                "SelfCheckEngine",


            version:
                "4.8",


            principle:
                "莫问检查运行契约，不判断表达结果。",


            checks,


            contractReport,


            failureExplanation,


            auditTrail,


            passed,


            result: {

                checks,

                contractReport,

                failureExplanation,

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

                    const valid =
                        this.validateType(

                            engine[field],

                            expectedType

                        );


                    if (!valid) {

                        invalidFields.push(field);

                    }

                }

            }


            const compliance =

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

                    );


            report.engines[engineName] = {

                compliance,

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



    createFailureExplanation(report) {


        const failures = [];


        for (const [engineName, data] of Object.entries(report.engines)) {


            if (

                data.missingFields.length > 0 ||
                data.invalidFields.length > 0

            ) {


                failures.push({

                    engine:
                        engineName,


                    problemType:

                        data.missingFields.length > 0

                            ? "missing-fields"

                            : "invalid-fields",


                    fields:

                        [

                            ...data.missingFields,

                            ...data.invalidFields

                        ],


                    impact:
                        "该 Engine 不符合运行契约，结果不能被完全信任。"

                });

            }

        }


        return failures;

    }



    createAuditTrail(contractReport) {


        return {

            engine:
                "SelfCheckEngine",


            version:
                "4.8",


            timestamp:
                new Date().toISOString(),


            checkedEngines:
                Object.keys(

                    contractReport.engines

                ),


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