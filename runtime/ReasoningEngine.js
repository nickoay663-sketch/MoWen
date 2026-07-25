class ReasoningEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        const valid =
            this.text.includes("因为")
            || this.text.includes("所以")
            || this.text.includes("因此");

        return {

            originalText: this.text,

            reasonings: [
                {
                    statement: this.text,
                    valid,
                    message: valid ? "发现推理结构" : "等待推理"
                }
            ]

        };

    }

}

export default ReasoningEngine;