class CorrespondenceEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        const metadata =
            this.buildMetadata();


        const correspondences =
            this.buildCorrespondences();


        return {

            engine:
                "CorrespondenceEngine",

            version:
                "7.0",

            semanticObject:
                this.semanticObject,


            principle:
                "莫问判断定义、证据与表达之间的真实对应关系。",


            metadata,


            correspondences,


            result: {

                metadata,

                correspondences

            },


            trace:
                this.semanticObject.runtimeTrace || [],


            nextRuntimeState:
                "ReasoningEngine",


            status:

                correspondences.length > 0

                    ? "correspondence-evaluated"

                    : "need-correspondence",


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


        return definitions.map(definition => {


            const matched =

                evidences.filter(

                    evidence =>

                        evidence.conceptId === definition.id

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


                supportLevel:

                    matched.length === 0

                        ? "none"

                        : matched.length > 3

                            ? "strong"

                            : "medium",


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


}


export default CorrespondenceEngine;