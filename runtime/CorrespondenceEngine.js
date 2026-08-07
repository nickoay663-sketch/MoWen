class CorrespondenceEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        const metadata =
            this.buildMetadata();


        const correspondences =
            this.buildCorrespondences();


        const status =
            correspondences.length > 0
                ? "correspondence-evaluated"
                : "need-correspondence";


        return {

            engine:
                "CorrespondenceEngine",


            version:
                "7.0",


            semanticObject:
                this.semanticObject,


            principle:
                "莫问判断证据与表达之间的真实支持关系，而不是仅记录证据存在。",


            metadata,


            correspondences,


            result: {

                metadata,

                correspondences,

                status

            },


            trace:
                this.semanticObject.runtimeTrace || [],


            nextRuntimeState:
                "ReasoningEngine",


            status,


            questions:

                correspondences.length > 0

                    ? []

                    : [
                        "当前表达是否获得有效对应支持？"
                    ]

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



    buildCorrespondences() {


        const definitions =
            this.semanticObject.definitions || [];


        const evidences =
            this.semanticObject.evidences || [];



        const claims =
            this.semanticObject.reasonings || [];



        return definitions.map(definition => {


            const matched =

                evidences.filter(

                    evidence =>

                        evidence.conceptId === definition.id

                );



            const supportLevel =
                this.evaluateSupport(
                    matched
                );



            const scopeCheck =
                this.checkScope(
                    matched,
                    definition
                );



            const overreach =
                this.detectOverreach(
                    matched,
                    claims
                );



            return {

                definition,


                evidences:
                    matched,


                evidenceCount:
                    matched.length,


                sourceCount:

                    matched.filter(

                        item => item.sourceAvailable === true

                    ).length,



                sourceAvailable:

                    matched.some(

                        item => item.sourceAvailable === true

                    ),



                supported:
                    matched.length > 0,



                supportLevel,


                scopeCheck,


                overreach,



                correspondenceType:
                    "claim-evidence-responsibility",



                verificationStatus:

                    matched.length > 0

                        ? "evaluated"

                        : "missing-evidence",



                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],



                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };

        });

    }



    evaluateSupport(evidences) {


        if (evidences.length === 0) {

            return "none";

        }


        const hasSource =

            evidences.some(

                item => item.sourceAvailable === true

            );


        if (hasSource && evidences.length > 3) {

            return "strong";

        }


        if (hasSource) {

            return "medium";

        }


        return "weak";

    }



    checkScope(evidences, definition) {


        return {

            matched:

                evidences.length > 0,


            limitation:

                evidences.length > 0

                    ? "证据范围需要结合具体条件判断。"

                    : "没有发现对应证据范围。"

        };

    }



    detectOverreach(evidences, claims) {


        const hasEvidence =
            evidences.length > 0;


        const hasStrongClaim =

            claims.some(

                claim =>

                    JSON.stringify(claim)

                        .includes("一定")

            );



        return {

            detected:

                hasStrongClaim && !hasEvidence,


            reason:

                hasStrongClaim && !hasEvidence

                    ? "表达强度超过证据支持能力。"

                    : ""

        };

    }


}


export default CorrespondenceEngine;