class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            "7.0";

        this.generatedAt =
            new Date().toISOString();

        this.recognition =
            null;

        this.definition =
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
                "7.0",

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

}
    setMetadata(metadata = {}) {

        this.metadata = {

            ...this.metadata,

            ...metadata

        };

        return this;

    }


export default RuntimeResult;
