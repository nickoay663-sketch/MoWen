import MoWenConfig from "./MoWenConfig.js";


class EvidenceEngine {

    constructor(text) {
        this.text = text;
    }


    run() {

        const statement =
            this.text.trim();


        return {

            originalText:
                this.text,


            evidences: [

                {

                    statement,


                    type:
                        "claim",


                    evidence:
                        false,


                    source:
                        null,


                    status:
                        MoWenConfig.states.evidence

                }

            ]

        };

    }

}


export default EvidenceEngine;
