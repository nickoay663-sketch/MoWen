class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            "8.0";

        this.generatedAt =
            new Date().toISOString();

        this.recognition =
            null;

        this.definition =
            null;
     
            this.testimony =
            null;

        this.testimonyValidation =
            null;

        this.search =
            null;

        this.evidence =
            null;

        this.correspondence =
            null;

        this.reasoning =
            null;

        this.responsibility =
            null;

        this.reconstruction =
            null;

        this.generator =
            null;

        this.selfCheck =
            null;

        this.engineRegistry =
            null;

        this.runtimeTrace =
            [];

        this.pipeline =
            [];

        this.metadata = {

            contractVersion:
                null,

            runtimeVersion:
                "8.0",

            engineCount:
                0,

            generatedAt:
                this.generatedAt

        };

    }

    setMetadata(metadata = {}) {

        this.metadata = {

            ...this.metadata,

            ...metadata

        };

        return this;

    }

    setEngine(name, value) {

        this[name] = value;

        return this;

    }

    setTrace(trace = []) {

        this.runtimeTrace = trace;

        return this;

    }

    setPipeline(pipeline = []) {

        this.pipeline = pipeline;

        return this;

    }

}

export default RuntimeResult;