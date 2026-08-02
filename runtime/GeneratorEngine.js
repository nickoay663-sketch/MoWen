class GeneratorEngine {

    constructor(runtimeObject) {

        this.runtimeObject = runtimeObject || {};

    }


    run() {

        return {

            semanticObject:
                this.runtimeObject.semanticObject || {},

            principle:
                "莫问不直接给出结论，只生成基于运行链的表达。",

            reconstruction:
                this.runtimeObject.reconstruction || {},

            responsibility:
                this.runtimeObject.responsibility || {},

            conclusion:
                "莫问没有直接给出结论，而是提出需要验证的问题。",

            status:
                "Generated",

            version:
                "3.0"

        };

    }

}


export default GeneratorEngine;