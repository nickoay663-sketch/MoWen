class EvidenceEngine {

    constructor(text) {

        this.text = text || "";

    }

    run() {

        const evidenceTypes = [

            "因为",
            "根据",
            "证据",
            "数据显示",
            "研究表明",
            "调查显示",
            "统计显示"

        ];

        const matchedTypes = evidenceTypes.filter(

            keyword => this.text.includes(keyword)

        );

        return {

            testimony: this.text,

            evidences: [

                {

                    statement: this.text,

                    type: "claim",

                    provided: matchedTypes.length > 0,

                    keywords: matchedTypes,

                    strength:

                        matchedTypes.length > 0
                            ? "candidate"
                            : "missing",

                    message:

                        matchedTypes.length > 0
                            ? "发现证据线索"
                            : "未提供证据"

                }

            ],

            status: "completed",

            version: "2.0"

        };

    }

}

export default EvidenceEngine;
