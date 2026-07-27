import Dictionary from "./Dictionary.js";

class RecognitionEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const result = {

            testimony: this.testimony,

            objects: [],

            concepts: [],

            unknown: [],

            matched: false,

            question: null

        };

        Dictionary.objects.forEach(item => {

            if (this.contains(item.word)) {

                result.objects.push(item);

            }

        });

        Dictionary.concepts.forEach(item => {

            if (this.contains(item.word)) {

                result.concepts.push(item);

            }

        });

        result.unknown =
            this.findUnknownObjects(
                result.objects,
                result.concepts
            );

        if (
            result.objects.length > 0 ||
            result.concepts.length > 0
        ) {

            result.matched = true;

        } else {

            result.question =
                "是否存在尚未识别的对象或概念？";

        }

        return result;

    }

    contains(word) {

        return this.testimony.includes(word);

    }

    findUnknownObjects(objects, concepts) {

        const recognized = [

            ...objects.map(i => i.word),

            ...concepts.map(i => i.word)

        ];

        return this.testimony

            .replace(/[。，！？,.!?；：\s]/g, "")

            .split("")

            .filter(Boolean)

            .filter(word =>

                !recognized.includes(word)

            );

    }

}

export default RecognitionEngine;
