class EvidenceEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        const provided = this.text.includes("因为")
            || this.text.includes("根据")
            || this.text.includes("证据")
            || this.text.includes("数据显示");

        return {

            originalText: this.text,

            evidences: [
                {
                    statement: this.text,
                    type: "claim",
                    provided,
                    message: provided ? "已发现证据线索" : "未提供证据"
                }
            ]

        };

    }

}

export default EvidenceEngine;