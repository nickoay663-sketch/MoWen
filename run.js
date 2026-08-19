import HonestRuntime from "./runtime/HonestRuntime.js";
import ReportFormatter from "./runtime/ReportFormatter.js";

const input =
    process.argv
        .slice(2)
        .join(" ")
    ||
    "请输入需要检查的表达。";

const runtime =
    new HonestRuntime(
        input
    );

const result =
    await runtime.run();

const report =
    new ReportFormatter(
        result
    ).run();

console.log(
    JSON.stringify(
        report,
        null,
        2
    )
);
