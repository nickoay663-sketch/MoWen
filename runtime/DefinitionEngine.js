import EngineBase from "./EngineBase.js";

class DefinitionEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "DefinitionEngine",
            "10.2",
            "莫问定义表达对象的明确含义与边界。"
        );

        this.semanticObject =
            semanticObject || {};

    }


    execute() {

        const definitions =
            this.buildDefinitions();


        return this.result({

            status:
                "completed",

            metadata:
                this.metadata({

                    definitionCount:
                        definitions.length

                }),

            definitions,

            result: {

                definitions

            },

            trace: [

                {

                    engine:
                        "DefinitionEngine",

                    action:
                        "define",

                    status:
                        "completed"

                }

            ],

            questions: [],

            nextRuntimeState:
                "SearchEngine"

        });

    }


    buildDefinitions() {

        const content =
            this.semanticObject.originalContent || "";


        if (!content) {

            return [];

        }


        return [

            {

                expression:
                    content,

                definition:
                    "Expression entering MoWen Runtime"

            }

        ];

    }

}


export default DefinitionEngine;