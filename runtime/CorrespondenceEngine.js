class CorrespondenceEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        const matched =
            this.text.includes("是")
            || this.text.includes("有")
            || this.text.includes("属于");

        return {

            originalText: this.text,

            correspondences: [
                {
                    statement: this.text,
                    matched,
                    message: matched ? "发现对应关系" : "等待对象对应"
                }
            ]

        };

    }

}

export default CorrespondenceEngine;