import HonestRuntime from "./HonestRuntime.js";
import ReportFormatter from "./ReportFormatter.js";

/*
 * =========================================================
 * MoWen Runtime
 * =========================================================
 *
 * Publish Boundary:
 *
 *     HonestRuntime
 *          ↓
 *     runtimeResult
 *          ↓
 *     ReportFormatter
 *          ↓
 *        report
 *
 * report is the ONLY publishable output.
 *
 * Generator.report is an internal Runtime result.
 * It MUST NOT bypass ReportFormatter / MWAL Publish Boundary.
 *
 * Therefore:
 *
 *     Generator.report ─X→ final
 *
 * No Generator.report bypass is permitted here.
 * =========================================================
 */

class MoWenRuntime {

    constructor(
        expression,
        options = {}
    ) {

        this.expression =
            expression || "";

        this.options =
            options || {};

        this.version =
            "10.4";

    }


    async run() {

        const runtimeResult =
            await new HonestRuntime(
                this.expression,
                this.options
            ).run();

        /*
         * MWAL Publish Boundary
         *
         * ReportFormatter is the only component allowed
         * to construct the publishable report.
         */

        const report =
            new ReportFormatter(
                runtimeResult
            ).run();

        return {

            version:
                this.version,

            metadata: {

                runtimeVersion:
                    this.version,

                generatedAt:
                    new Date().toISOString()

            },

            /*
             * Internal Runtime result remains available for
             * Runtime consumers and testing.
             *
             * It is NOT the publish boundary.
             */

            runtimeResult,

            /*
             * Sole publishable output.
             */

            report

        };

    }

}


export {

    HonestRuntime,
    ReportFormatter

};


export default MoWenRuntime;
