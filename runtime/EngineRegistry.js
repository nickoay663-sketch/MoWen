class EngineRegistry {

    constructor() {

        this.engines = {};

    }


    register(name, engine) {

        this.engines[name] = engine;

    }


    get(name) {

        return this.engines[name];

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

}


export default EngineRegistry;