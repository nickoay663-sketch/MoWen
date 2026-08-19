import CapabilityContract from "./CapabilityContract.js";
import CapabilityAdmission from "./CapabilityAdmission.js";

class ExternalSearchAdapter {

    constructor(options = {}) {

        this.name =
            options.name ||
            "ExternalSearchAdapter";

        this.version =
            "1.2";

        this.enabled =
            options.enabled === true;

        this.provider =
            typeof options.provider === "function"
                ? options.provider
                : null;

        this.capability =
            "external-search";

    }


    async search(query) {

        const normalizedQuery =
            typeof query === "string"
                ? query.trim()
                : "";


        if (!normalizedQuery) {

            return this.buildCapabilityResponse({

                status:
                    "search-empty",

                output: null,

                sources: []

            });

        }


        /*
         * ---------------------------------------------------------
         * External Search Capability Boundary
         *
         * Adapter 负责：
         *
         * 1. 接收 Runtime 搜索请求
         * 2. 调用外部 Provider
         * 3. 清洗 Provider 来源
         * 4. 转换为 CapabilityContract
         * 5. 通过 CapabilityAdmission
         *
         * Adapter 不：
         *
         * - 创建 Evidence
         * - 验证事实
         * - 支持 Claim
         * - 生成 Conclusion
         * - 提升 epistemic state
         * ---------------------------------------------------------
         */


        if (!this.enabled) {

            return this.buildCapabilityResponse({

                status:
                    "adapter-disabled",

                output: null,

                sources: []

            });

        }


        if (!this.provider) {

            return this.buildCapabilityResponse({

                status:
                    "provider-unavailable",

                output: null,

                sources: []

            });

        }


        let providerResult;


        try {

            providerResult =
                await this.provider(
                    normalizedQuery
                );

        } catch (error) {

            return this.buildCapabilityResponse({

                status:
                    "provider-error",

                output: null,

                sources: [],

                error:
                    error &&
                        error.message
                        ? error.message
                        : String(error)

            });

        }


        const suppliedSources =
            providerResult &&
                Array.isArray(
                    providerResult.sources
                )
                ? providerResult.sources
                : [];


        const sources =
            suppliedSources
                .filter(
                    source =>
                        this.isUsableSource(
                            source
                        )
                )
                .map(
                    source =>
                        this.normalizeSource(
                            source
                        )
                );


        return this.buildCapabilityResponse({

            status:
                sources.length > 0
                    ? "search-completed"
                    : "search-empty",

            output: {

                query:
                    normalizedQuery,

                providerStatus:
                    providerResult?.status ||
                    null

            },

            sources

        });

    }


    buildCapabilityResponse({

        status =
            "completed",

        output =
            null,

        sources =
            [],

        error =
            null

    } = {}) {

        const response =
            CapabilityContract.createResponse({

                capability:
                    this.capability,

                provider:
                    this.name,

                providerVersion:
                    this.version,

                status,

                output,

                sources,

                outputState:
                    sources.length > 0
                        ? "DISCOVERED"
                        : "UNKNOWN",

                verificationState:
                    "UNVERIFIED",

                evidenceCreated:
                    false,

                supportsClaim:
                    false,

                verified:
                    false,

                conclusion:
                    null,

                trace: [

                    {

                        engine:
                            "ExternalSearchAdapter",

                        action:
                            "capability-contract",

                        status:
                            "created"

                    }

                ]

            });


        const admission =
            new CapabilityAdmission();


        const admissionResult =
            admission.admit(
                response
            );


        if (
            admissionResult.admitted !== true
        ) {

            return {

                status:
                    "capability-rejected",

                query:
                    output?.query ||
                    "",

                sources: [],

                capability:
                    null,

                admission:
                    admissionResult

            };

        }


        return {

            status,

            query:
                output?.query ||
                "",

            sources:
                response.sources,

            capability:
                response,

            admission:
                admissionResult,

            error

        };

    }


    isUsableSource(source) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return false;

        }


        const hasIdentity =
            Boolean(
                typeof source.source === "string" &&
                source.source.trim()
            ) ||
            Boolean(
                typeof source.url === "string" &&
                source.url.trim()
            );


        const hasContent =
            typeof source.content === "string" &&
            source.content.trim().length > 0;


        return (
            hasIdentity &&
            hasContent
        );

    }


    normalizeSource(source) {

        return {

            source:
                source.source ||
                source.url,

            url:
                source.url || null,

            title:
                source.title || null,

            publisher:
                source.publisher || null,

            publishedTime:
                source.publishedTime || null,

            content:
                source.content,

            type:
                source.type ||
                "external",

            state:
                "DISCOVERED",

            verificationStatus:
                "UNVERIFIED",

            epistemicState:
                "DISCOVERED",

            verified:
                false,

            verificationBasis:
                null,

            verificationSource:
                null,

            verifier:
                null,

            supportsClaim:
                false,

            independent:
                source.independent === true

        };

    }

}


export default ExternalSearchAdapter;
