import EngineBase from "./EngineBase.js";

class CorrespondenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "CorrespondenceEngine",
            "10.2",
            "莫问判断定义、证据与表达之间的真实对应关系。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const correspondences =
            this.buildCorrespondences();


        return this.result({

            status:
                "completed",

            metadata:
                this.metadata({

                    correspondenceCount:
                        correspondences.length

                }),

            correspondences,

            result: {

                correspondences

            },

            trace: [

                {

                    engine:
                        "CorrespondenceEngine",

                    action:
                        "check",

                    status:
                        "completed"

                }

            ],

            questions:
                correspondences.some(
                    item => item.matched === false
                )
                    ? [
                        "definition-evidence correspondence verification required"
                    ]
                    : [],

            nextRuntimeState:
                "ReasoningEngine"

        });

    }


    buildCorrespondences() {

        const definitions =
            Array.isArray(
                this.semanticObject.definitions
            )
                ? this.semanticObject.definitions
                : [];


        const evidences =
            Array.isArray(
                this.semanticObject.evidences
            )
                ? this.semanticObject.evidences
                : [];


        const independentEvidences =
            evidences.filter(
                evidence =>
                    evidence &&
                    evidence.independent === true
            );


        if (
            definitions.length === 0 &&
            independentEvidences.length === 0
        ) {

            return [];

        }


        const matched =
            definitions.length > 0 &&
            independentEvidences.length > 0;


        return [

            {

                definitionCount:
                    definitions.length,

                evidenceCount:
                    independentEvidences.length,

                matched,

                supported:
                    matched,

                sourceAvailable:
                    independentEvidences.length > 0,

                sourceCount:
                    independentEvidences.length,

                verificationStatus:
                    matched
                        ? "supported"
                        : "insufficient-support"

            }

        ];

    }

}


export default CorrespondenceEngine;