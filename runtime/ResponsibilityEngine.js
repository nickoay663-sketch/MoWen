class ResponsibilityEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        const metadata =
            this.buildMetadata();


        const responsibilities =
            this.buildResponsibilities();


        const status =
            responsibilities.length > 0
                ? "responsibility-evaluated"
                : "need-responsibility";


        return {

            engine:
                "ResponsibilityEngine",

            version:
                "7.0",


            semanticObject:
                this.semanticObject,


            principle:
                "莫问判断表达要求承担的责任与证据推理允许承担的责任之间的边界。",


            metadata,


            responsibilities,


            result: {

                metadata,

                responsibilities,

                status

            },


            trace:
                this.semanticObject.runtimeTrace || [],


            questions:

                responsibilities.length > 0

                    ? []

                    : [
                        "当前表达责任是否可以评估？"
                    ],


            nextRuntimeState:
                "ReconstructionEngine",


            status

        };

    }



    buildMetadata() {

        return {

            generatedAt:
                new Date().toISOString(),


            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion || "",


            contractVersion:
                this.semanticObject.contract?.version || "",


            engineCount:

                Object.keys(

                    this.semanticObject.engines || {}

                ).length,


            traceCount:

                (this.semanticObject.runtimeTrace || []).length

        };

    }



    buildResponsibilities() {


        const reasonings =
            this.semanticObject.reasonings || [];



        return reasonings.map(reasoning => {


            const demand =
                this.analyzeResponsibilityDemand(
                    reasoning
                );


            const capacity =
                this.analyzeResponsibilityCapacity(
                    reasoning
                );


            const boundary =
                this.calculateBoundary(
                    demand,
                    capacity
                );



            return {

                expression:
                    this.semanticObject.originalContent || "",


                definition:
                    reasoning.definition,


                supported:
                    reasoning.supported,


                evidenceCount:
                    reasoning.evidenceCount || 0,


                sourceCount:
                    reasoning.sourceCount || 0,


                sourceAvailable:
                    reasoning.sourceAvailable,


                sources:
                    reasoning.evidences || [],



                responsibilityDemand:
                    demand,


                responsibilityCapacity:
                    capacity,


                responsibilityBoundary:
                    boundary,



                expressionResponsibility:
                    demand.level,


                evidenceResponsibility:
                    capacity.level,


                sourceResponsibility:
                    reasoning.sourceAvailable
                        ? "available"
                        : "missing",



                verificationResponsibility:
                    "required",



                responsibilityType:
                    "responsibility-evaluation",



                verificationStatus:
                    reasoning.verificationStatus,



                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],



                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };

        });

    }



    analyzeResponsibilityDemand(reasoning) {


        const content =
            this.semanticObject.originalContent || "";


        let level =
            "medium";


        if (

            content.includes("一定") ||

            content.includes("必然") ||

            content.includes("所有")

        ) {

            level =
                "high";

        }


        return {

            level,

            source:
                "expression-strength"

        };

    }



    analyzeResponsibilityCapacity(reasoning) {


        let level =
            "low";


        const evidenceCount =
            reasoning.evidenceCount || 0;


        const sourceAvailable =
            reasoning.sourceAvailable;



        if (

            evidenceCount > 0 &&
            sourceAvailable

        ) {

            level =
                "medium";

        }



        if (

            evidenceCount > 3 &&
            sourceAvailable

        ) {

            level =
                "high";

        }



        return {

            level,

            source:
                "evidence-and-reasoning"

        };

    }



    calculateBoundary(
        demand,
        capacity
    ) {


        if (

            demand.level === "high" &&
            capacity.level !== "high"

        ) {

            return {

                status:
                    "partial",

                explanation:
                    "表达责任要求超过当前证据与推理支持能力。"

            };

        }



        return {

            status:
                "matched",

            explanation:
                "当前表达责任与支持能力基本匹配。"

        };

    }


}


export default ResponsibilityEngine;