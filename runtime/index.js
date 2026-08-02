import HonestRuntime from "./HonestRuntime.js";
import ReportFormatter from "./ReportFormatter.js";


class MoWenRuntime {

    constructor(expression) {

        this.expression = expression || "";

    }


    run() {

        const runtimeResult =

            new HonestRuntime(this.expression)

                .run();


        const report =

            new ReportFormatter(runtimeResult)

                .run();


        return {

            runtimeResult,

            report

        };

    }

}


export {

    HonestRuntime,

    ReportFormatter

};


export default MoWenRuntime;