class ResponsibilityEngine {

constructor(semanticObject) {

    this.semanticObject =
        semanticObject || {};

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
            "8.0",


        semanticObject:
            this.semanticObject,


        principle:

            "莫问判断表达主体承担的证明责任，以及证据能力允许承担责任之间的边界。",


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

                :

                [

                    "当前表达主体是否明确承担对应证明责任？"

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

            (

                this.semanticObject.runtimeTrace || []

            ).length

    };

}



buildResponsibilities() {

    const reasonings =
        this.semanticObject.reasonings || [];


    const testimony =
        this.semanticObject.testimony || null;


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


            testimony,


            responsibilityActor: {

                identity:
                    null,

                role:
                    "expression-owner",

                authority:
                    null

            },


            responsibilityScope: {

                claims:

                    [

                        reasoning.definition

                    ],


                evidenceRequired:

                    reasoning.evidenceCount || 0,


                verificationRequired:

                    true

            },


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



            responsibilityJudgment: {

                demand:

                    demand.level,


                capacity:

                    capacity.level,


                gap:

                    demand.level !== capacity.level

            },



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

                "subject-responsibility-evaluation",



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

        content.includes("所有") ||

        content.includes("绝对")

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

                "主体表达要求承担的责任超过当前证据支持能力。"

        };

    }



    return {


        status:

            "matched",


        explanation:

            "主体责任要求与证据支持能力基本匹配。"

    };

}


}


export default ResponsibilityEngine;