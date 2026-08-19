import HonestRuntime from "../runtime/HonestRuntime.js";

const runtime =
    new HonestRuntime("这是一个事实");

const result =
    await runtime.run();

const event =
    result?.responsibilityEvent;

console.log(
    JSON.stringify(
        {
            responsibilityType:
                typeof event?.responsibility,

            responsibilityKeys:
                event?.responsibility &&
                typeof event.responsibility === "object"
                    ? Object.keys(event.responsibility)
                    : [],

            evidenceIsArray:
                Array.isArray(event?.evidence),

            auditTrailIsArray:
                Array.isArray(event?.auditTrail),

            responsibilityHasEngineRegistry:
                !!event?.responsibility?.engineRegistry,

            responsibilityHasRuntimeContext:
                !!event?.responsibility?.runtimeContext,

            responsibilityHasResult:
                !!event?.responsibility?.result?.engineRegistry,

            responsibilityHasResponsibilities:
                Array.isArray(
                    event?.responsibility?.responsibilities
                ),

            responsibilityRecordCount:
                Array.isArray(
                    event?.responsibility?.responsibilities
                )
                    ? event.responsibility.responsibilities.length
                    : 0
        },
        null,
        2
    )
);
