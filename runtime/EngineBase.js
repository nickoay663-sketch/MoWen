class EngineBase {

    constructor(engine, version, principle) {

        this.engine =
            engine;

        this.version =
            version;

        this.principle =
            principle;

    }


    execute(input = {}) {

        if (
            typeof this.run === "function"
        ) {

            return this.run(input);

        }


        return this.result({

            status:
                "engine-no-run-method",

            input

        });

    }


    metadata(extra = {}) {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.version,

            engine:
                this.engine,

            ...extra

        };

    }


    result(data = {}) {

        return {

            engine:
                this.engine,

            version:
                this.version,

            principle:
                this.principle,

            ...data

        };

    }

}


export default EngineBase;