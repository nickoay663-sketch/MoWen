import MoWenConfig from "./MoWenConfig.js";
import Definitions from "../definitions/index.js";

class DefinitionEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const definitions = this.findDefinitions();

        return {

            testimony: this.testimony,

            principle:
                MoWenConfig.principles.definition,

            definitions,

            matched: definitions.length > 0,

            question:
                definitions.length > 0
                    ? null
                    : "该证词中的对象是否被明确定义？"

        };

    }

    findDefinitions() {

        return Object.keys(Definitions)

            .filter(concept =>

                this.testimony.includes(concept)

            )

            .map(concept => ({

                concept,

                definition: Definitions[concept]

            }));

    }

}

export default DefinitionEngine;
