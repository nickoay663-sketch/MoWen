class ReasoningEngine {

    constructor(text) {

        this.text = text || "";

    }

    run() {

        const reasoningMarkers = [

            "因为",
            "所以",
            "因此",
            "导致",
            "证明",
            "说明",
            "意味着"

        ];

        const matchedMarkers =
            reasoningMarkers.filter(

                marker => this.text.includes(marker)

            );


        const valid =
            matchedMarkers.length > 0;


        return {

            testimony: this.text,

            reasonings: [

                {

                    statement: this.text,

                    valid,

                    markers: matchedMarkers,

                    structure:

                        valid
                            ? "detected"
                            : "missing",

                    message:

                        valid
                            ? "发现推理结构"
                            : "等待推理"

                }

            ],

            status: "completed",

            version: "2.0"

        };

    }

}

export default ReasoningEngine;
