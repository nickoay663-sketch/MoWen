import EngineBase from "./EngineBase.js";

class EvidenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "EvidenceEngine",
            "10.2",
            "莫问记录并验证表达相关证据。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const evidences =
            this.buildEvidence();


        return this.result({

            status:
                "completed",

            metadata:
                this.metadata({

                    evidenceCount:
                        evidences.length

                }),

            evidences,

            result: {

                evidences

            },

            trace: [

                {

                    engine:
                        "EvidenceEngine",

                    action:
                        "validate",

                    status:
                        "completed"

                }

            ],

            questions:
                evidences.length > 0
                    ? []
                    : [
                        "evidence verification required"
                    ],

            nextRuntimeState:
                "CorrespondenceEngine"

        });

    }


    buildEvidence() {

        const suppliedEvidence =
            this.semanticObject.evidence;


        if (!Array.isArray(suppliedEvidence)) {

            return [];

        }


        return suppliedEvidence
            .filter(item => {

                if (
                    !item ||
                    typeof item !== "object"
                ) {

                    return false;

                }


                if (
                    !item.source &&
                    !item.content
                ) {

                    return false;

                }


                const source =
                    item.source ||
                    item.content ||
                    "";

                const expression =
                    this.semanticObject.originalContent ||
                    "";


                return (
                    source !== expression
                );

            })
            .map(item => ({

                type:
                    item.type ||
                    "external",

                source:
                    item.source ||
                    item.content,

                independent:
                    true

            }));

    }

}


export default EvidenceEngine;