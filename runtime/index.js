import HonestRuntime from "./HonestRuntime.js";
import ReportFormatter from "./ReportFormatter.js";

class MoWenRuntime {

    constructor(expression) {

        this.expression =
            expression || "";

        this.version =
            "10.2";

    }


    run() {

        const runtimeResult =
            new HonestRuntime(this.expression)
                .run();

        const report =
            new ReportFormatter(runtimeResult)
                .run();

        return {

            version:
                this.version,

            metadata: {

                runtimeVersion:
                    this.version,

                generatedAt:
                    new Date().toISOString()

            },

            runtimeResult,

            report,

            final:
                runtimeResult.generator?.report || null

        };

    }

}


export {

    HonestRuntime,

    ReportFormatter

};

export default MoWenRuntime;