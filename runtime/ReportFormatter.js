class ReportFormatter {


    constructor(result) {

        this.result = result || {};

    }



    run() {


        const semanticObject =

            this.result.semanticObject || {};



        const selfCheck =

            this.result.selfCheck || {};



        return {


            title:

                "莫问 · 诚实运行报告",



            principle:

                "莫问报告运行过程，不替代人的判断。",



            expression:

                semanticObject.originalContent || null,



            language:

                semanticObject.language || null,



            semanticObject,



            verificationChain: {


                recognition:

                    this.result.recognition || {},


                definition:

                    this.result.definition || {},


                evidence:

                    this.result.evidence || {},


                correspondence:

                    this.result.correspondence || {},


                reasoning:

                    this.result.reasoning || {},


                responsibility:

                    this.result.responsibility || {}

            },



            reconstruction:

                this.result.reconstruction || {},



            questions:

                this.collectQuestions(),



            selfCheck,



            runtimeStatus:

                selfCheck.status || "unknown",



            status:

                selfCheck.passed

                    ? "self-check-passed"

                    : "self-check-warning",



            version:

                "2.3"


        };


    }



    collectQuestions() {


        const questions = [];



        const modules = [

            this.result.correspondence,

            this.result.reasoning,

            this.result.responsibility,

            this.result.reconstruction

        ];



        modules.forEach(module => {


            if (!module)

                return;



            if (Array.isArray(module.questions))

                questions.push(...module.questions);



        });



        return questions.filter(Boolean);


    }


}


export default ReportFormatter;
