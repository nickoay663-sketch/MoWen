class SelfCheckEngine {


    constructor(runtimeObject) {

        this.runtimeObject =
            runtimeObject || {};

    }



    run() {


        const checks =
            this.check();



        const contractReport =
            this.validateEngineContract();



        const registryReport =
            this.validateRegistry();



        const selfDescriptionReport =
            this.validateEngineDescription();



        const runtimeResultReport =
            this.validateRuntimeResult();


        const failureExplanation =
            this.createFailureExplanation(

                contractReport,

                registryReport,

                selfDescriptionReport

            );



        const recoveryGuidance =
            this.createRecoveryGuidance(

                failureExplanation

            );



        const auditTrail =
            this.createAuditTrail(

                contractReport,

                registryReport,

                runtimeResultReport

            );



            const passed =

            Object.values(checks).every(Boolean)

            &&

            contractReport.passed

            &&

            registryReport.passed

            &&

            selfDescriptionReport.passed

            &&

            runtimeResultReport.passed;



        return {


            engine:

                "SelfCheckEngine",



            version:

                "5.4",



            principle:

                "莫问检查运行契约，不判断表达结果。",



            checks,


            contractReport,


            registryReport,


            selfDescriptionReport,


            runtimeResultReport,


            failureExplanation,


            recoveryGuidance,


            auditTrail,


            passed,



            result: {

                checks,

                contractReport,

                registryReport,

                selfDescriptionReport,

                runtimeResultReport,

                failureExplanation,

                recoveryGuidance,

                auditTrail,

                passed

            },



            trace: [],



            questions:


                passed

                    ? []

                    :

                    [

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




    validateRegistry() {


        const registry =

            this.runtimeObject.engineRegistry;



        const engines =

            this.runtimeObject.engines || {};



        const report = {


            passed:

                true,



            registered:

                [],



            missing:

                []

        };



        if (!registry) {


            report.passed = false;


            report.missing.push(

                "EngineRegistry"

            );


            return report;

        }




        for (const engineName of Object.keys(engines)) {


            if (

                registry.has(engineName)

            ) {


                report.registered.push(

                    engineName

                );


            } else {


                report.passed = false;


                report.missing.push(

                    engineName

                );


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


                missing.push(

                    "engine"

                );

            }



            if (!engine.version) {


                missing.push(

                    "version"

                );

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


    validateRuntimeResult() {

        const result =
            this.runtimeObject.runtimeResult;

        const requiredFields =
            this.runtimeObject.contract
                ?.runtimeResultContract
                ?.requiredFields || [];

        const missingFields =
            requiredFields.filter(

                field =>
                    !(field in (result || {}))

            );

        return {

            passed:
                missingFields.length === 0,

            missingFields

        };

    }

    createFailureExplanation(

        contractReport,

        registryReport,

        descriptionReport

    ) {


        const failures = [];



        for (const [engineName, data] of Object.entries(contractReport.engines)) {


            if (

                data.missingFields.length > 0 ||

                data.invalidFields.length > 0

            ) {


                failures.push({


                    engine:

                        engineName,



                    problemType:

                        "contract-failure",



                    fields:

                        [

                            ...data.missingFields,

                            ...data.invalidFields

                        ],



                    impact:

                        "该 Engine 不符合 Runtime Contract。"


                });


            }


        }




        if (!registryReport.passed) {


            failures.push({


                engine:

                    "EngineRegistry",



                problemType:

                    "registry-failure",



                fields:

                    registryReport.missing,



                impact:

                    "Engine 未完成注册，不能进入可信运行链。"


            });


        }




        for (const [engineName, data] of Object.entries(descriptionReport.engines)) {


            if (data.missing.length > 0) {


                failures.push({


                    engine:

                        engineName,



                    problemType:

                        "description-failure",



                    fields:

                        data.missing,



                    impact:

                        "Engine 无法完整描述自身能力。"


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

                    "修正 Engine 注册信息或 Contract 后重新运行 SelfCheck。",



                reason:

                    failure.impact


            };


        });


    }




    createAuditTrail(

        contractReport,

        registryReport,


        runtimeResultReport

    ) {


        return {


            engine:

                "SelfCheckEngine",



            version:

                "5.4",



            timestamp:

                new Date().toISOString(),



            checkedEngines:

                Object.keys(

                    contractReport.engines

                ),



            registryStatus:

                registryReport.passed

                    ? "PASS"

                    : "FAIL",


            runtimeResultStatus:

                runtimeResultReport.passed

                    ? "PASS"

                    : "FAIL",



            runtimeTrace:

                this.runtimeObject.runtimeTrace || [],



            traceCount:

                (

                    this.runtimeObject.runtimeTrace || []

                ).length


        };


    }




    validateType(value, type) {


        if (type === "array") {


            return Array.isArray(value);


        }




        if (type === "object") {


            return (

                typeof value === "object"

                &&

                value !== null

                &&

                !Array.isArray(value)

            );


        }



        return typeof value === type;


    }


}



export default SelfCheckEngine;