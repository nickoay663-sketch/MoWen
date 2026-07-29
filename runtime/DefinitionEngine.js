import MoWenConfig from "./MoWenConfig.js";
import Definitions from "../definitions/index.js";


class DefinitionEngine {


    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }



    run() {


        const definitions =
            this.findDefinitions();



        return {


            semanticObject:

                this.semanticObject,



            principle:

                MoWenConfig.principles.definition,



            definitions,



            status:

                definitions.length > 0

                    ? "definition-available"

                    : "need-definition-verification",



            questions:

                definitions.length > 0

                    ? []

                    :

                    [

                        "该表达中的概念是否已经明确定义？"

                    ],



            version:

                "2.2"


        };


    }



    findDefinitions() {


        const concepts =

            this.semanticObject.concepts || [];



        return concepts

            .filter(concept =>

                Definitions[concept]

            )

            .map(concept => ({


                concept,


                definition:

                    Definitions[concept],


                source:

                    "MoWen Definition Library"


            }));


    }


}



export default DefinitionEngine;
