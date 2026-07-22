import HonestRuntime from "./runtime/HonestRuntime.js";

const input = "我是老师。";

const runtime = new HonestRuntime(input);

const result = runtime.run();

console.log(result);
