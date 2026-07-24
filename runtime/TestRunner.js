import HonestRuntime from "./HonestRuntime.js";
import TestCases from "./TestCases.js";


class TestRunner {

    run() {

        const results = [];


        for (const test of TestCases) {

            const runtime =
                new HonestRuntime(test.input);


            const output =
                runtime.run();


            results.push({

                name: test.name,

                input: test.input,

                output,

                status: "completed"

            });

        }


        return results;

    }

}


export default TestRunner;
