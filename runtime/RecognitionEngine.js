import Dictionary from "./Dictionary.js";

class RecognitionEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const objects = this.findObjects();

        const concepts = this.findConcepts();

        return {

            testimony: this.testimony,

            principle: "莫问只识别，不猜测。",

            objects,

            concepts,

            matched:
                objects.length > 0 ||
                concepts.length > 0,

            question:
                objects.length > 0 ||
                concepts.length > 0
                    ? null
                    : "该证词中是否存在尚未定义的对象或概念？"

        };

    }

    findObjects() {

        return Dictionary.objects.filter(

            item => this.contains(item.word)

        );

    }

    findConcepts() {

        return Dictionary.concepts.filter(

            item => this.contains(item.word)

        );

    }

    contains(word) {

        return this.testimony.includes(word);

    }

}

export default RecognitionEngine;
