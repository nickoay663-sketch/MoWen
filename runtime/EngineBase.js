class EngineBase {

    constructor(
        engine,
        version,
        principle
    ) {

        this.engine =
            engine;

        this.version =
            version;

        this.principle =
            principle;

        this.status =
            "ready";

        this.capabilities =
            [];

        this.nextRuntimeState =
            null;

    }


    metadata(extra = {}) {

        return {

            generatedAt:
                new Date().toISOString(),

            runtimeVersion:
                this.version,

            engine:
                this.engine,

            version:
                this.version,

            status:
                this.status,

            principle:
                this.principle,

            capabilities:
                this.capabilities,

            nextRuntimeState:
                this.nextRuntimeState,

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

            status:
                this.status,

            trace:
                [],

            questions:
                [],

            nextRuntimeState:
                this.nextRuntimeState,

            metadata:
                this.metadata(),

            ...data

        };

    }


    setStatus(status) {

        if (
            typeof status === "string" &&
            status.length > 0
        ) {

            this.status =
                status;

        }

        return this;

    }


    setCapabilities(capabilities = []) {

        this.capabilities =
            Array.isArray(capabilities)
                ? capabilities
                : [];

        return this;

    }


    setNextRuntimeState(nextRuntimeState) {

        this.nextRuntimeState =
            nextRuntimeState;

        return this;

    }


    execute() {

        throw new Error(
            `${this.engine} must implement execute()`
        );

    }

}


export default EngineBase;