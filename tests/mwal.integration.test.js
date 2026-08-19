import HonestRuntime from "../runtime/HonestRuntime.js";
import MWALResponsibilityInterface from "../runtime/MWALResponsibilityInterface.js";

const runtime =
    new HonestRuntime("这是一个事实");

const result =
    await runtime.run();

const event =
    result?.responsibilityEvent;

console.log(
    JSON.stringify(
        {
            runtimeState:
                result?.metadata?.runtimeState,

            executionComplete:
                result?.metadata?.executionComplete,

            executionCompletedCount:
                result?.metadata?.executionCompletedCount,

            executionExpectedCount:
                result?.metadata?.executionExpectedCount,

            selfCheckPassed:
                result?.epistemicBoundary?.selfCheckPassed,

            responsibilityEventExists:
                !!event,

            responsibilityEvent:
                event
                    ? {
                        type:
                            event.type,

                        version:
                            event.version,

                        expression:
                            event.expression,

                        epistemicState:
                            event.epistemicState,

                        verificationStatus:
                            event.verificationStatus,

                        supported:
                            event.supported,

                        responsibilityBoundary:
                            event.responsibilityBoundary
                    }
                    : null
        },
        null,
        2
    )
);

if (!event) {

    throw new Error(
        "MWAL integration failed: ResponsibilityEvent was not produced."
    );

}

const envelope =
    MWALResponsibilityInterface
        .fromResponsibilityEvent(event);

const validation =
    MWALResponsibilityInterface
        .validate(envelope);

const propagation =
    MWALResponsibilityInterface
        .canPropagate(envelope);

const verificationRequired =
    MWALResponsibilityInterface
        .requiresVerification(envelope);

console.log(
    JSON.stringify(
        {
            mwalEnvelope:
                envelope,

            validation,

            propagation,

            verificationRequired,

            interfaceContract:
                MWALResponsibilityInterface.contract()
        },
        null,
        2
    )
);

if (
    validation?.valid !== true
) {

    throw new Error(
        `MWAL integration failed: envelope validation failed: ${JSON.stringify(
            validation
        )}`
    );

}

console.log(
    "\n=== MWAL REAL INTEGRATION TEST PASSED ==="
);
