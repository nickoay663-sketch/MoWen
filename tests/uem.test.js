import UniversalExpression from "../runtime/UniversalExpression.js";

const cases = [

    {
        name: "Chinese",
        expression: "我是医生。",
        language: "zh-CN",
        data: {
            subject: "我",
            predicate: "是",
            object: "医生"
        }
    },

    {
        name: "English",
        expression: "I am a doctor.",
        language: "en-US",
        data: {
            subject: "I",
            predicate: "am",
            object: "doctor"
        }
    },

    {
        name: "Spanish",
        expression: "Soy médico.",
        language: "es-ES",
        data: {
            subject: "Yo",
            predicate: "soy",
            object: "médico"
        }
    },

    {
        name: "French",
        expression: "Je suis médecin.",
        language: "fr-FR",
        data: {
            subject: "Je",
            predicate: "suis",
            object: "médecin"
        }
    },

    {
        name: "German",
        expression: "Ich bin Arzt.",
        language: "de-DE",
        data: {
            subject: "Ich",
            predicate: "bin",
            object: "Arzt"
        }
    },

    {
        name: "Italian",
        expression: "Sono medico.",
        language: "it-IT",
        data: {
            subject: "Io",
            predicate: "sono",
            object: "medico"
        }
    },

    {
        name: "Portuguese",
        expression: "Sou médico.",
        language: "pt-PT",
        data: {
            subject: "Eu",
            predicate: "sou",
            object: "médico"
        }
    }

];


let passed = 0;


for (const testCase of cases) {

    const expression =
        new UniversalExpression({

            ...testCase.data,

            originalExpression:
                testCase.expression,

            sourceLanguage:
                testCase.language

        });


    const json =
        expression.toJSON();


    const ok =
        json.originalExpression ===
            testCase.expression &&

        json.sourceLanguage ===
            testCase.language &&

        json.subject ===
            testCase.data.subject &&

        json.predicate ===
            testCase.data.predicate &&

        json.object ===
            testCase.data.object &&

        expression.hasSubject() &&

        expression.hasPredicate() &&

        expression.hasObject();


    if (ok) {

        passed++;

    } else {

        console.log(
            "FAIL:",
            testCase.name,
            json
        );

    }

}


const empty =
    UniversalExpression.empty(
        "我在这里。",
        "zh-CN"
    );


if (
    empty.subject !== null &&
    empty.predicate !== null
) {

    console.log(
        "FAIL: empty expression invented structure"
    );

    process.exit(1);

}


const missingObject =
    new UniversalExpression({

        subject: "我",

        predicate: "是",

        originalExpression:
            "我是。",

        sourceLanguage:
            "zh-CN"

    });


if (
    missingObject.object !== null
) {

    console.log(
        "FAIL: missing object was invented"
    );

    process.exit(1);

}


const clone =
    cases.length > 0
        ? new UniversalExpression({

            ...cases[0].data,

            originalExpression:
                cases[0].expression,

            sourceLanguage:
                cases[0].language

        }).clone()
        : null;


if (
    !clone ||
    clone.originalExpression !==
        cases[0].expression ||
    clone.sourceLanguage !==
        cases[0].language
) {

    console.log(
        "FAIL: clone integrity"
    );

    process.exit(1);

}


console.log(
    `UEM v1.0 Test: ${passed}/${cases.length} PASS`
);


if (
    passed !== cases.length
) {

    process.exit(1);

}


console.log(
    "UEM v1.0 Boundary Test: PASS"
);
