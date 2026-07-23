import HonestRuntime from "./runtime/HonestRuntime.js";

const input = process.argv.slice(2).join(" ") || "我是老师。";

const runtime = new HonestRuntime(input);

const result = runtime.run();

console.log(result);
