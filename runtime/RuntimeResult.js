import RuntimeContract from "./RuntimeContract.js";

class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            RuntimeContract.identity?.runtimeVersion ||
            RuntimeContract.version ||
            "10.7";

        this.generatedAt =
            new Date().toISOString();

        this.metadata = {};

        this.recognition = {};

        this.definition = {};

        this.testimony = {};

        this.testimonyValidation = {};

        this.search = {};

        this.evidence = {};

        this.correspondence = {};

        this.reasoning = {};

        this.responsibility = {};

        this.responsibilityModel = {};

        this.reconstruction = {};

        this.generator = {};

        this.selfCheck = {};

        this.engineRegistry = [];

        this.testimonyChain = {};

        this.verificationBoundary = {};

        this.identity = {};

        this.contract =
            RuntimeContract;

        this.semanticObject = {};

        this.runtimeTrace = [];

        this.pipeline = [];

        this.epistemicState =
            "UNKNOWN";

        this.epistemicBoundary = {};

        this.runtimeState =
            "RuntimeRunning";

        this.responsibilityEvent = null;

        this.responsibilityEventValidation = null;

        this.responsibilityEventPublishable =
            false;

    }


    setPipeline(pipeline = []) {

        this.pipeline =
            Array.isArray(pipeline)
                ? [...pipeline]
                : [];

        return this;

    }


    setTrace(trace = []) {

        this.runtimeTrace =
            Array.isArray(trace)
                ? [...trace]
                : [];

        return this;

    }


    setMetadata(metadata = {}) {

        this.metadata = {

            ...(this.metadata || {}),

            ...(metadata || {})

        };

        return this;

    }


    setEpistemicState(state) {

        const allowedStates =
            Object.values(
                RuntimeContract.epistemicStates || {}
            ).filter(
                value =>
                    typeof value === "string"
            );

        this.epistemicState =
            allowedStates.includes(state)
                ? state
                : "UNKNOWN";

        return this;

    }


    buildEpistemicBoundary() {

        const contract =
            RuntimeContract || {};

        const epistemicStates =
            contract.epistemicStates || {};

        const allowedStates =
            Object.values(
                epistemicStates
            ).filter(
                state =>
                    typeof state === "string"
            );

        const currentState =
            allowedStates.includes(
                this.epistemicState
            )
                ? this.epistemicState
                : "UNKNOWN";

        const boundary = {

            state:
                currentState,

            allowedStates,

            source:
                "RuntimeContract.epistemicStates",

            governed:
                true,

            canPromote:
                currentState === "SUPPORTED",

            canPublish:
                currentState === "SUPPORTED",

            responsibilityBoundary:
                this.verificationBoundary || null

        };

        return boundary;

    }


    setEpistemicBoundary(boundary = {}) {

        this.epistemicBoundary = {

            ...(this.epistemicBoundary || {}),

            ...(boundary || {})

        };

        return this;

    }


    close() {

        this.runtimeState =
            "RuntimeClosed";

        return this;

    }


    isClosed() {

        return (
            this.runtimeState ===
            "RuntimeClosed"
        );

    }


    hasRequiredFields() {

        const requiredFields =
            RuntimeContract
                .runtimeResultContract
                ?.requiredFields || [];

        return requiredFields.every(
            field =>
                Object.prototype.hasOwnProperty.call(
                    this,
                    field
                )
        );

    }


    validate() {

        const requiredFields =
            RuntimeContract
                .runtimeResultContract
                ?.requiredFields || [];

        const missingFields =
            requiredFields.filter(
                field =>
                    !Object.prototype.hasOwnProperty.call(
                        this,
                        field
                    )
            );

        return {

            valid:
                missingFields.length === 0,

            missingFields

        };

    }

}


export default RuntimeResult;
