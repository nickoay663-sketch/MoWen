class ReconstructionEngine {


    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }



    run() {


        const metadata =
            this.buildMetadata();



        const reconstruction =
            this.buildReconstruction();



        return {


            engine:
                "ReconstructionEngine",



            version:
                "7.0",



            semanticObject:
                this.runtimeObject.semanticObject,



            principle:
                "莫问重构责任链结构，不增加未经验证的信息。",



            metadata,



            reconstruction,



            result: {

                metadata,

                reconstruction

            },



            trace:
                this.runtimeObject.runtimeTrace || [],



            nextRuntimeState:
                "GeneratorEngine",



            status:

                reconstruction.responsibilityCount > 0

                    ? "reconstruction-evaluated"

                    : "need-reconstruction",



            questions:

                reconstruction.responsibilityCount > 0

                    ? []

                    : [

                        "当前责任链是否完整？"

                    ]

        };

    }




    buildMetadata() {


        return {


            reconstructedAt:
                new Date().toISOString(),



            runtimeVersion:
                this.runtimeObject.contract?.identity?.runtimeVersion || "",



            contractVersion:
                this.runtimeObject.contract?.version || "",



            engineCount:

                Object.keys(

                    this.runtimeObject.engines || {}

                ).length,



            traceCount:

                (this.runtimeObject.runtimeTrace || []).length

        };

    }




    buildReconstruction() {


        const responsibilities =

            this.runtimeObject.responsibility?.responsibilities || [];



        const sources =

            responsibilities.flatMap(

                item => item.sources || []

            );



        const evidenceChain =

            responsibilities.map(

                item => ({

                    definition:
                        item.definition,

                    evidenceCount:
                        item.evidenceCount || 0,

                    sourceCount:
                        item.sourceCount || 0

                })

            );



        return {


            originalExpression:

                this.runtimeObject.semanticObject?.originalContent || "",



            reconstructedExpression:

                this.runtimeObject.semanticObject?.originalContent || "",



            language:

                this.runtimeObject.semanticObject?.language || null,



            responsibilityChain:

                responsibilities,



            responsibilityCount:

                responsibilities.length,



            evidenceChain,



            sources,



            sourceCount:

                sources.length,



            boundaries: {


                evidence:
                    "preserved",



                source:
                    "preserved",



                responsibility:
                    "preserved"

            },



            expansion:

                false,



            reconstructionType:

                "responsibility-chain-reconstruction",



            verificationStatus:

                responsibilities.length > 0

                    ? "evaluated"

                    : "missing-responsibility",



            runtimeTrace:

                this.runtimeObject.runtimeTrace || [],



            engineRegistry:

                this.runtimeObject.engineRegistry?.describe?.() || []

        };

    }


}


export default ReconstructionEngine;