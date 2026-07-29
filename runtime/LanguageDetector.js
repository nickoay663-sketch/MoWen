class LanguageDetector {

    constructor(text) {

        this.text = text || "";

    }

    run() {

        return {

            language: this.detect(),

            status: "completed",

            version: "1.0"

        };

    }

    detect() {

        if (/[áéíóúñü¿¡]/i.test(this.text)) {

            return "es-ES";

        }

        if (/[\u4e00-\u9fff]/.test(this.text)) {

            return "zh-CN";

        }

        return "unknown";

    }

}

export default LanguageDetector;
