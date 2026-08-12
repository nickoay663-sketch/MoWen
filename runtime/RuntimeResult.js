class RuntimeResult {

    constructor() {

        this.runtimeVersion =
            "10.2";


        this.generatedAt =
            new Date().toISOString();


        this.metadata = {

            contractVersion:
                "10.2",

            runtimeVersion:
                "10.2",

            engineCount:
                0,

            generatedAt:
                this.generatedAt

        };


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


        this.responsibilityModel =
            null;


        this.reconstruction =
            null;


        this.generator =
            null;


        this.selfCheck =
            null;


        this.engineRegistry =
            null;


        this.testimonyChain =
            null;


        this.verificationBoundary =
            null;


        this.identity =
            null;


        this.contract =
            null;


        this.semanticObject =
            null;


        this.runtimeTrace =
            [];


        this.pipeline =
            [];

    }


    setMetadata(metadata = {}) {

        this.metadata = {

            ...this.metadata,

            ...metadata,

            runtimeVersion:
                metadata.runtimeVersion ||
                this.runtimeVersion,

            contractVersion:
                metadata.contractVersion ||
                this.metadata.contractVersion

        };


        return this;

    }


    setEngine(name, value) {

        if (
            typeof name === "string" &&
            name.length > 0
        ) {

            this[name] =
                value;

        }


        return this;

    }


    setTrace(trace = []) {

        this.runtimeTrace =
            Array.isArray(trace)
                ? trace
                : [];


        return this;

    }


    setPipeline(pipeline = []) {

        this.pipeline =
            Array.isArray(pipeline)
                ? pipeline
                : [];


        return this;

    }


    setResponsibilityModel(model = []) {

        this.responsibilityModel =
            model;


        return this;

    }


    setTestimonyChain(chain = {}) {

        this.testimonyChain =
            chain;


        return this;

    }


    setVerificationBoundary(boundary = {}) {

        this.verificationBoundary =
            boundary;


        return this;

    }


    complete() {

        return {

            runtimeVersion:
                this.runtimeVersion,

            generatedAt:
                this.generatedAt,

            metadata:
                this.metadata,

            recognition:
                this.recognition,

            definition:
                this.definition,

            testimony:
                this.testimony,

            testimonyValidation:
                this.testimonyValidation,

            search:
                this.search,

            evidence:
                this.evidence,

            correspondence:
                this.correspondence,

            reasoning:
                this.reasoning,

            responsibility:
                this.responsibility,

            responsibilityModel:
                this.responsibilityModel,

            reconstruction:
                this.reconstruction,

            generator:
                this.generator,

            selfCheck:
                this.selfCheck,

            engineRegistry:
                this.engineRegistry,

            testimonyChain:
                this.testimonyChain,

            verificationBoundary:
                this.verificationBoundary,

            identity:
                this.identity,

            contract:
                this.contract,

            semanticObject:
                this.semanticObject,

            runtimeTrace:
                this.runtimeTrace,

            pipeline:
                this.pipeline,

            result:
                this

        };

    }

}


export default RuntimeResult;
