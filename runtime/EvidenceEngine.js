import EngineBase from "./EngineBase.js";

class EvidenceEngine extends EngineBase {

    constructor(semanticObject) {

        super(
            "EvidenceEngine",
            "7.0",
            "莫问分析证据来源、支持能力和责任边界，不替代真实性判断。"
        );

        this.semanticObject = semanticObject || {};

    }


    run() {

        const metadata =
            this.buildMetadata();


        const evidences =
            this.collectEvidence();


        const status =
            evidences.length > 0
                ? "evidence-evaluated"
                : "need-evidence";


        return {

            engine:
                this.engine,


            version:
                this.version,


            semanticObject:
                this.semanticObject,


            principle:
                this.principle,


            metadata,


            evidences,


            result: {

                metadata,

                evidences,

                status

            },


            trace:
                this.semanticObject.runtimeTrace || [],


            nextRuntimeState:
                "CorrespondenceEngine",


            status,


            questions:

                evidences.length > 0

                    ? []

                    : [
                        "当前表达是否存在可分析证据？"
                    ]

        };

    }



    buildMetadata() {

        return {

            generatedAt:
                new Date().toISOString(),


            runtimeVersion:
                this.semanticObject.contract?.identity?.runtimeVersion || "",


            contractVersion:
                this.semanticObject.contract?.version || "",


            engineCount:

                Object.keys(

                    this.semanticObject.engines || {}

                ).length,


            traceCount:

                (this.semanticObject.runtimeTrace || []).length

        };

    }



    collectEvidence() {


        const searches =
            this.semanticObject.search?.searches || [];


        const sources =
            this.semanticObject.search?.sources || [];


        return searches.map(search => {


            const source =

                sources.find(

                    item =>

                        item.keyword === search.keyword

                ) || null;


            const strength =
                this.evaluateStrength(
                    source
                );


            return {

                keyword:
                    search.keyword,


                conceptId:
                    search.conceptId,


                category:
                    search.category,


                content:
                    this.semanticObject.originalContent || "",


                source,


                sourceAvailable:
                    !!source,


                reference:
                    source?.url || null,


                citation:
                    null,


                evidenceStrength:
                    strength,


                evidenceLimitation:

                    source

                        ? "来源存在，但需要进一步验证支持范围。"

                        : "没有发现对应来源。",


                responsibility:

                {

                    level:
                        strength,

                    type:
                        "evidence-support"

                },


                verificationStatus:

                    source

                        ? "evaluated"

                        : "missing-source",


                evidenceType:
                    "responsibility-bounded-evidence",


                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],


                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };

        });

    }



    evaluateStrength(source) {


        if (!source) {

            return "none";

        }


        if (

            source.url &&
            source.title

        ) {

            return "medium";

        }


        return "weak";

    }

}

export default EvidenceEngine;