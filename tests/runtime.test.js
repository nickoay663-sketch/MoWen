import MoWenRuntime from "../runtime/index.js";


const runtime =

    new MoWenRuntime(

        "测试表达"

    );


const result =

    runtime.run();



const checks = {


    runtimeResult:

        !!result.runtimeResult,


    report:

        !!result.report,


    generator:

        !!result.runtimeResult.generator,


    selfCheck:

        !!result.runtimeResult.selfCheck,


    reportStatus:

        !!result.report.status

};



const passed =

    Object.values(checks)

        .every(Boolean);



if (passed) {

    console.log(

        "MoWen Runtime v3.0 Test Passed."

    );

} else {

    console.log(

        "MoWen Runtime v3.0 Test Failed."

    );


    console.log(checks);

    process.exit(1);

}