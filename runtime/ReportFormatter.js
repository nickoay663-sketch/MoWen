class ReportFormatter {


    constructor(result) {

        this.result = result || {};

    }



    run() {


        const semanticObject =
            this.result.semanticObject || {};



        const selfCheck =
            this.result.selfCheck;



        return {


            title:

                "莫问 · 诚实运行报告",



            expression:

                semanticObject.originalContent || null,



            languageEnvironment:

                semanticObject.language || null,



            semanticObject,



            evidence:

                this.result.evidence || {},



            correspondence:

                this.result.correspondence || {},



            reasoning:

                this.result.reasoning || {},



            responsibility:

                this.result.responsibility || {},



            reconstruction:

                this.result.reconstruction || {},



            questions:

                this.collectQuestions(),



            selfCheck,



            runtimeStatus:

                selfCheck?.status || "unknown",



            status:

                selfCheck?.passed

                    ? "verified-runtime"

                    : "need-verification",



            version:

                "2.2"

        };


    }



    collectQuestions() {


        const questions = [];



        const correspondence =
            this.result.correspondence;



        const reasoning =
            this.result.reasoning;



        const responsibility =
            this.result.responsibility;



        if (correspondence?.question)

            questions.push(correspondence.question);



        if (reasoning?.questions)

            questions.push(...reasoning.questions);



        if (responsibility?.questions)

            questions.push(...responsibility.questions);



        return questions.filter(Boolean);


    }


}



export default ReportFormatter;
