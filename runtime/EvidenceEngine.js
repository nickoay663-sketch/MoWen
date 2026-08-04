class EvidenceEngine {

    constructor(semanticObject) {

        this.semanticObject = semanticObject || {};

    }

    run() {

        const metadata =
            this.buildMetadata();

        const evidences =
            this.collectEvidence();

        return {

            engine:
                "EvidenceEngine",

            version:
                "6.5",

            semanticObject:
                this.semanticObject,

            principle:
                "莫问记录来源入口和证据状态，不替代真实性验证。",

            metadata,

            evidences,

            result: {

                metadata,

                evidences

            },

            trace: [],

            nextRuntimeState:
                "CorrespondenceEngine",

            status:

                evidences.length > 0

                    ? "evidence-connected"

                    : "need-evidence",

            questions:

                evidences.length > 0

                    ? []

                    : [
                        "当前表达是否存在可验证来源？"
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

                    item => item.keyword === search.keyword

                ) || null;

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

                verificationStatus:
                    "pending",

                evidenceType:
                    "external-source-entry",

                responsibility:
                    null,

                runtimeTrace:
                    this.semanticObject.runtimeTrace || [],

                engineRegistry:

                    this.semanticObject.engineRegistry?.describe?.() || []

            };

        });

    }

}

export default EvidenceEngine;