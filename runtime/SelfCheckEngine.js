class SelfCheckEngine {


    constructor(runtime) {

        this.runtime = runtime || {};

    }


    run() {


        const checks = {


            semanticObject:

                !!this.runtime.semanticObject,


            recognition:

                !!this.runtime.semanticObject?.recognition,


            definition:

                !!this.runtime.semanticObject?.definition,


            evidence:

                !!this.runtime.semanticObject?.evidence,


            correspondence:

                !!this.runtime.semanticObject?.correspondence,


            reasoning:

                !!this.runtime.semanticObject?.reasoning,


            responsibility:

                !!this.runtime.semanticObject?.responsibility,


            reconstruction:

                !!this.runtime.reconstruction


        };



        const passed =

            Object.values(checks)

                .every(Boolean);



        return {


            version:

                "2.2",



            principle:

                "莫问首先检查自身运行是否诚实。",



            checks,



            passed,



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

                        "输出是否超过已有依据？"

                    ],



            summary:

                passed

                    ? "Honest Runtime Self Check Passed."

                    : "Honest Runtime Self Check Warning."

        };


    }


}


export default SelfCheckEngine;
