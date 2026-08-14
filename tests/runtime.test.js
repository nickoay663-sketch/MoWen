import MoWenRuntime from "../runtime/index.js";


const runtime =
    new MoWenRuntime(
        "MoWen Test Expression"
    );


const result =
    runtime.run();


const runtimeResult =
    result.runtimeResult;


const checks = {


    runtimeResult:

        !!runtimeResult,


    report:

        !!result.report,


    metadata:

        !!runtimeResult.metadata,


    runtimeVersion:

        runtimeResult.runtimeVersion === "10.3",


    runtimeTrace:

        Array.isArray(
            runtimeResult.runtimeTrace
        ),


    pipeline:

        Array.isArray(
            runtimeResult.pipeline
        ),


    recognition:

        !!runtimeResult.recognition,


    definition:

        !!runtimeResult.definition,


    search:

        !!runtimeResult.search,


    evidence:

        !!runtimeResult.evidence,


    correspondence:

        !!runtimeResult.correspondence,


    reasoning:

        !!runtimeResult.reasoning,


    responsibility:

        !!runtimeResult.responsibility,


    reconstruction:

        !!runtimeResult.reconstruction,


    generator:

        !!runtimeResult.generator,


    selfCheck:

        !!runtimeResult.selfCheck,


    reportStatus:

        !!result.report.status

};



const passed =

    Object.values(checks)

        .every(Boolean);



if (passed) {


    console.log(

        "MoWen Runtime v10.3 Test Passed."

    );


} else {


    console.log(

        "MoWen Runtime v10.3 Test Failed."

    );


    console.log(checks);


    process.exit(1);

}
