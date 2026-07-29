class ResponsibilityEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }


    run() {

        return {

            semanticObject: this.semanticObject,

            principle:
                "莫问只建立责任关系，不提前裁决责任。",

            responsibilities:
                this.collectResponsibilities(),

            questions:
                [
                    "谁提出了该表达？",
                    "该表达的责任来源是否明确？"
                ],

            status:
                "need_responsibility",

            version:
                "2.2"

        };

    }


    collectResponsibilities() {

        return [

            {

                expression:
                    this.semanticObject.originalContent || "",

                provider:
                    this.semanticObject.responsibility || null,

                source:
                    null,

                responsibilityType:
                    "expression",

                state:
                    "pending"

            }

        ];

    }

}


export default ResponsibilityEngine;
