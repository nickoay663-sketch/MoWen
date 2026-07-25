class ResponsibilityEngine {

    constructor(text) {
        this.text = text;
    }

    run() {

        return {

            originalText: this.text,

            responsibilities: [
                {
                    statement: this.text,
                    accountable: false,
                    message: "等待责任判断"
                }
            ]

        };

    }

}

export default ResponsibilityEngine;