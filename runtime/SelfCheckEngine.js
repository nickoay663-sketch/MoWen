class SelfCheckEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }


    run() {

        const checks =
            this.check();

        const contractReport =
            this.validateEngineContract();


        const passed =
            Object.values(checks).every(Boolean) &&
            contractReport.passed;


        return {

            engine:
                "SelfCheckEngine",

            version:
                "4.4",


            principle:
                "莫问检查运行契约，不判断表达结果。",


            checks,


            contractReport,


            passed,


            result: {

                checks,

                contractReport,

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


        const engines =
            this.runtimeObject.engines || {};


        const requiredFields = [

            "engine",

            "version",

            "status",

            "result",

            "trace",

            "questions",

            "nextRuntimeState"

        ];



        const report = {


            passed:
                true,


            engines: {}

        };



        for (const [engineName, engine] of Object.entries(engines)) {


            const missing = [];

            const invalid = [];



            for (const field of requiredFields) {


                if (!(field in engine)) {

                    missing.push(field);

                    continue;

                }



                const value =
                    engine[field];



                if (

                    field === "version" &&
                    typeof value !== "string"

                ) {

                    invalid.push(field);

                }



                if (

                    field === "trace" &&
                    !Array.isArray(value)

                ) {

                    invalid.push(field);

                }



                if (

                    field === "questions" &&
                    !Array.isArray(value)

                ) {

                    invalid.push(field);

                }



                if (

                    field === "result" &&
                    (
                        typeof value !== "object" ||
                        value === null
                    )

                ) {

                    invalid.push(field);

                }

            }



            const compliance =

                requiredFields.length === 0

                    ? 100

                    :

                    Math.round(

                        (

                            requiredFields.length -
                            missing.length -
                            invalid.length

                        )

                        /

                        requiredFields.length

                        *

                        100

                    );



            report.engines[engineName] = {


                compliance,


                missing,


                invalid

            };



            if (

                missing.length > 0 ||
                invalid.length > 0

            ) {

                report.passed = false;

            }

        }



        return report;

    }

}


export default SelfCheckEngine;