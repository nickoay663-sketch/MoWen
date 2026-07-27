class ResponsibilityEngine {

    constructor(text) {

        this.text = text || "";

    }

    run() {

        const responsibilityMarkers = [

            "我",
            "我们",
            "作者",
            "机构",
            "政府",
            "组织",
            "研究者",
            "来源"

        ];

        const matchedSubjects =
            responsibilityMarkers.filter(

                marker => this.text.includes(marker)

            );


        const accountable =
            matchedSubjects.length > 0;


        return {

            testimony: this.text,

            responsibilities: [

                {

                    statement: this.text,

                    accountable,

                    subjects: matchedSubjects,

                    status:

                        accountable
                            ? "identified"
                            : "missing",

                    message:

                        accountable
                            ? "发现责任主体"
                            : "等待责任判断"

                }

            ],

            status: "completed",

            version: "2.0"

        };

    }

}

export default ResponsibilityEngine;
