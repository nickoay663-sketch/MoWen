class CorrespondenceEngine {

    constructor(text) {

        this.text = text || "";

    }

    run() {

        const rules = [

            "是",
            "有",
            "属于",
            "对应",
            "定义为"

        ];

        const matchedRules = rules.filter(

            rule => this.text.includes(rule)

        );

        return {

            testimony: this.text,

            correspondences: [

                {

                    statement: this.text,

                    matched: matchedRules.length > 0,

                    rules: matchedRules,

                    strength:

                        matchedRules.length > 0
                            ? "candidate"
                            : "missing",

                    message:

                        matchedRules.length > 0
                            ? "发现对应关系"
                            : "等待对象对应"

                }

            ],

            status: "completed",

            version: "2.0"

        };

    }

}

export default CorrespondenceEngine;
