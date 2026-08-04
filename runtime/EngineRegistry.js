class EngineRegistry {

    constructor() {

        this.engines = {};

    }


    register(name, engine) {

        if (!name || !engine) {

            return false;

        }


        this.engines[name] = {

            name,

            engine,

            version:
                engine.version || "",

            capabilities:
                engine.capabilities || [],

            registeredAt:
                new Date().toISOString()

        };


        return true;

    }



    get(name) {

        return this.engines[name];

    }



    getEngine(name) {

        return this.engines[name]?.engine;

    }



    all() {

        return this.engines;

    }



    has(name) {

        return !!this.engines[name];

    }



    list() {

        return Object.keys(this.engines);

    }



    describe() {

        return Object.values(

            this.engines

        ).map(item => {

            return {

                name:
                    item.name,

                version:
                    item.version,

                capabilities:
                    item.capabilities

            };

        });

    }



    validate() {

        const result = {

            passed:
                true,

            engines: {}

        };


        for (const [name, item] of Object.entries(this.engines)) {


            const missing = [];


            if (!item.name) {

                missing.push("name");

            }


            if (!item.version) {

                missing.push("version");

            }


            if (!Array.isArray(item.capabilities)) {

                missing.push("capabilities");

            }


            result.engines[name] = {

                missing

            };


            if (missing.length > 0) {

                result.passed = false;

            }

        }


        return result;

    }

}


export default EngineRegistry;