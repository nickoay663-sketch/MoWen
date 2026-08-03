class SelfCheckEngine {


    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }



    run() {


        const checks =

            this.check();



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

                    : "self-check-warning",



            questions:

                passed

                    ? []

                    : [
                        "运行链是否存在验证缺口？"
                    ],



            version:

                "3.7"


        };

    }





    check() {


        const {

            pipeline,

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



            pipeline:

                Array.isArray(pipeline),



            semanticObject:

                !!semanticObject,



            definition:

                !!definition,



            search:

                !!search &&

                Array.isArray(search.searches),



            evidence:

                !!evidence &&

                Array.isArray(evidence.evidences),



            evidenceSourceStructure:

                evidence?.evidences

                    ? evidence.evidences.every(item =>

                        "source" in item &&

                        "reference" in item

                    )

                    : false,



            correspondence:

                !!correspondence &&

                Array.isArray(correspondence.correspondences),



            reasoning:

                !!reasoning &&

                Array.isArray(reasoning.reasonings),



            responsibility:

                !!responsibility &&

                Array.isArray(responsibility.responsibilities),



            reconstruction:

                !!reconstruction,



            generator:

                !!generator &&

                generator.status === "generator-ready"


        };


    }


}


export default SelfCheckEngine;