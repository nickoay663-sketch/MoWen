import HonestRuntime from "./runtime/HonestRuntime.js";
import ReportFormatter from "./runtime/ReportFormatter.js";

const input =
    process.argv.slice(2).join(" ")
    || "我是老师。";

const runtime =
    new HonestRuntime(input);

const result =
    runtime.run();

const report =
    new ReportFormatter(result).run();

// Runtime Information
report.runtime = {

    name: "MoWen Honest Runtime",

    version: "0.2",

    principle: "没有定义，就没有推理。"

};

// Output
console.log(
    JSON.stringify(report, null, 4)
);
