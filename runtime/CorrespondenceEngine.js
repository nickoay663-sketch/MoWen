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
                "6.4",

            semanticObject:
                this.semanticObject,

            principle:
                "莫问建立定义、证据和来源入口之间的对应关系。",

            metadata,

            correspondences,

            result: {

                metadata,

                correspondences

            },

            trace: [],

            nextRuntimeState:
                "ReasoningEngine",

            status:

                correspondences.length > 0

                    ? "correspondence-connected"

                    : "need-correspondence",

            questions:

                correspondences.length > 0

                    ? []

                    : [
                        "当前定义是否获得来源支持？"
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

                correspondenceType:
                    "definition-evidence-source",

                verificationStatus:

                    matched.length > 0

                        ? "pending"

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