class EngineBase {

    constructor(engine, version, principle) {

        this.engine =
            engine;

        this.version =
            version;

        this.principle =
            principle;

    }

    metadata(extra = {}) {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.version,

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