import MoWenConfig from "./MoWenConfig.js";
import Definitions from "../definitions/index.js";
import SpanishDefinitions from "../languages/es-ES/Definitions.js";
import EngineBase from "./EngineBase.js";


class DefinitionEngine extends EngineBase {


    constructor(semanticObject) {

        super(
            "DefinitionEngine",
            "7.0",
            "莫问明确表达对象的概念边界，不让未定义概念进入责任判断。"
        );

        this.semanticObject = semanticObject || {};

    }



    run() {


        const metadata =
            this.buildMetadata();



        const definitions =
            this.findDefinitions();



        const status =

            definitions.length > 0

                ? "definition-evaluated"

                : "need-definition-verification";



        return {

            engine:
                "DefinitionEngine",



            version:
                "7.0",



            semanticObject:
                this.semanticObject,



            principle:
                "莫问明确表达对象的概念边界，不让未定义概念进入责任判断。",



            metadata,



            definitions,



            result: {

                metadata,

                definitions,

                status

            },



            trace:
                this.semanticObject.runtimeTrace || [],



            status,



            questions:

                definitions.length > 0

                    ? []

                    : [

                        "该表达中的核心概念是否已经明确定义？"

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




    getDefinitions() {


        return this.semanticObject.language === "es-ES"

            ? SpanishDefinitions

            : Definitions;


    }




    findDefinitions() {


        const library =
            this.getDefinitions();



        const concepts =
            this.semanticObject.concepts || [];



        return concepts.map(concept => {


            const word =
                concept.word || concept;



            const definition =
                library[word] || null;



            return {


                concept:
                    word,



                definition,



                available:
                    !!definition,



                boundary:
                    this.buildBoundary(
                        definition
                    ),



                ambiguity:
                    this.detectAmbiguity(
                        word,
                        definition
                    ),



                scope:
                    definition
                        ? "defined-concept"
                        : "undefined-concept",



                source:
                    "MoWen Definition Library",



                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],



                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };


        });


    }




    buildBoundary(definition) {


        if (!definition) {


            return {

                status:
                    "missing",


                description:
                    "当前概念没有定义边界。"

            };

        }



        return {

            status:
                "available",


            description:
                "当前概念存在定义范围，需要结合表达上下文判断。"

        };


    }




    detectAmbiguity(word, definition) {


        if (!definition) {


            return {

                detected:
                    true,


                reason:
                    "概念不存在定义。"

            };

        }



        return {

            detected:
                false,


            reason:
                ""

        };


    }


}


export default DefinitionEngine;