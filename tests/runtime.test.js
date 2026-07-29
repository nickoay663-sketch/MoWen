import HonestRuntime from "../runtime/HonestRuntime.js";


const input =

    "我是老师。";


const runtime =

    new HonestRuntime(input);



const result =

    runtime.run();



function assert(condition, message) {

    if (!condition) {

        throw new Error(message);

    }

}



assert(

    result.semanticObject,

    "Semantic Object missing"

);



assert(

    result.recognition,

    "Recognition missing"

);



assert(

    result.definition,

    "Definition missing"

);



assert(

    result.evidence,

    "Evidence missing"

);



assert(

    result.correspondence,

    "Correspondence missing"

);



assert(

    result.reasoning,

    "Reasoning missing"

);



assert(

    result.responsibility,

    "Responsibility missing"

);



assert(

    result.reconstruction,

    "Reconstruction missing"

);



assert(

    result.selfCheck,

    "SelfCheck missing"

);



console.log(

    "MoWen Runtime Test Passed."

);
