import ExternalSearchAdapter from "./ExternalSearchAdapter.js";
import CapabilityContract from "./CapabilityContract.js";
import CapabilityAdmission from "./CapabilityAdmission.js";

class ExternalSourceConnector {

    constructor(searchRequest = {}) {

        this.searchRequest =
            searchRequest || {};

        const suppliedAdapter =
            this.searchRequest.adapter;


        if (
            suppliedAdapter &&
            typeof suppliedAdapter.search === "function"
        ) {

            this.adapter =
                suppliedAdapter;

        } else {

            this.adapter =
                new ExternalSearchAdapter(

                    suppliedAdapter &&
                        typeof suppliedAdapter === "object"
                        ? suppliedAdapter
                        : (
                            this.searchRequest.adapterOptions ||
                            {}
                        )

                );

        }


        /*
         * ---------------------------------------------------------
         * Trusted Adapter Provenance
         *
         * CapabilityAdmission 的真实接口只有：
         *
         *     admit(response)
         *
         * Trusted Context 必须在构造时注入。
         *
         * Connector 实际持有的 Adapter 身份才是可信来源。
         * ---------------------------------------------------------
         */

        this.capabilityAdmission =
            new CapabilityAdmission({

                trustedProvider:
                    this.adapter.name ||
                    "ExternalSearchAdapter",

                trustedProviderVersion:
                    this.adapter.version ||
                    null

            });

    }


    async run() {

        const searchResult =
            await this.adapter.search(
                this.searchRequest.keyword || ""
            );


        const suppliedSources =
            searchResult &&
                Array.isArray(searchResult.sources)
                ? searchResult.sources
                : [];


        const sources =
            suppliedSources
                .filter(
                    source =>
                        this.isRealSource(source)
                )
                .map(
                    source =>
                        this.normalizeSource(source)
                );


        /*
         * ---------------------------------------------------------
         * Adapter Admission Result
         *
         * Connector 不得把 Adapter 已经明确拒绝的 Capability
         * 重新提升为 PASS。
         *
         * 因此：
         *
         *   Adapter REJECT → Connector REJECT
         *   Adapter PASS   → 继续 Provenance 校验
         * ---------------------------------------------------------
         */

        if (
            searchResult?.capabilityAdmission ===
            "REJECT"
        ) {

            return {

                engine:
                    "ExternalSourceConnector",

                version:
                    "7.4",

                principle:
                    "Connector 尊重 Adapter 已完成的 Capability Admission，不得将 REJECT 重新提升为 PASS。",

                status:
                    "capability-rejected",

                adapter: {

                    name:
                        this.adapter.name ||
                        "ExternalSearchAdapter",

                    version:
                        this.adapter.version ||
                        null,

                    status:
                        searchResult?.status ||
                        "unknown"

                },

                capability: {

                    contract:
                        searchResult?.capability?.contract ||
                        "CapabilityContract",

                    contractVersion:
                        searchResult?.capability?.contractVersion ||
                        CapabilityContract.version(),

                    capability:
                        searchResult?.capability?.capability ||
                        null,

                    provider:
                        searchResult?.capability?.provider ||
                        this.adapter.name ||
                        null,

                    providerVersion:
                        searchResult?.capability?.providerVersion ||
                        this.adapter.version ||
                        null,

                    admission:
                        "REJECT",

                    errors:
                        searchResult?.admission?.errors ||
                        [
                            `Adapter rejected capability: ${searchResult?.status || "unknown"}`
                        ]

                },

                sources: [],

                result: {

                    sources: [],

                    sourceCount:
                        0,

                    outputState:
                        "REJECTED",

                    verificationState:
                        "UNVERIFIED",

                    evidenceCreated:
                        false

                },

                trace: [

                    ...(Array.isArray(
                        searchResult?.capability?.trace
                    )
                        ? searchResult.capability.trace
                        : []),

                    ...(Array.isArray(
                        searchResult?.admission?.trace
                    )
                        ? searchResult.admission.trace
                        : []),

                    {

                        engine:
                            "ExternalSourceConnector",

                        action:
                            "adapter-admission",

                        status:
                            "rejected"

                    }

                ],

                questions:
                    searchResult?.admission?.errors ||
                    [
                        "外部 Capability 未通过 Adapter Admission。"
                    ],

                nextRuntimeState:
                    "EvidenceEngine"

            };

        }


        /*
         * ---------------------------------------------------------
         * Capability Contract
         * ---------------------------------------------------------
         */

        const adapterCapability =
            searchResult &&
                searchResult.capability &&
                typeof searchResult.capability === "object"
                ? searchResult.capability
                : null;


        if (!adapterCapability) {

            return {

                engine:
                    "ExternalSourceConnector",

                version:
                    "7.4",

                principle:
                    "外部能力必须由 Adapter 产生合法 CapabilityContract，并经过 Capability Admission 与 Provenance 校验。Connector 不伪造 Capability。",

                status:
                    "capability-rejected",

                adapter: {

                    name:
                        this.adapter.name ||
                        "ExternalSearchAdapter",

                    version:
                        this.adapter.version ||
                        null,

                    status:
                        searchResult?.status ||
                        "unknown"

                },

                capability: {

                    contract:
                        "CapabilityContract",

                    contractVersion:
                        CapabilityContract.version(),

                    capability:
                        null,

                    provider:
                        this.adapter.name ||
                        "ExternalSearchAdapter",

                    providerVersion:
                        this.adapter.version ||
                        null,

                    admission:
                        "REJECT",

                    errors: [
                        "External adapter did not return a CapabilityContract."
                    ]

                },

                sources: [],

                result: {

                    sources: [],

                    sourceCount:
                        0,

                    outputState:
                        "REJECTED",

                    verificationState:
                        "UNVERIFIED",

                    evidenceCreated:
                        false

                },

                trace: [

                    {

                        engine:
                            "ExternalSourceConnector",

                        action:
                            "capability-contract-required",

                        status:
                            "rejected"

                    }

                ],

                questions: [
                    "External adapter did not return a valid CapabilityContract."
                ],

                nextRuntimeState:
                    "EvidenceEngine"

            };

        }


        /*
         * ---------------------------------------------------------
         * Connector Provenance Validation
         *
         * CapabilityAdmission 已经在 constructor 中获得：
         *
         *   trustedProvider
         *   trustedProviderVersion
         *
         * 所以这里必须只传 Capability response。
         * ---------------------------------------------------------
         */

        const admission =
            this.capabilityAdmission.admit(
                adapterCapability
            );


        if (
            admission.admitted !== true
        ) {

            return {

                engine:
                    "ExternalSourceConnector",

                version:
                    "7.4",

                principle:
                    "外部能力必须通过 Capability Admission 与 Adapter Provenance 双重边界才能进入 Runtime。Capability 不产生证据、验证或结论。",

                status:
                    "capability-rejected",

                adapter: {

                    name:
                        this.adapter.name ||
                        "ExternalSearchAdapter",

                    version:
                        this.adapter.version ||
                        null,

                    status:
                        searchResult?.status ||
                        "unknown"

                },

                capability: {

                    contract:
                        adapterCapability.contract ||
                        "CapabilityContract",

                    contractVersion:
                        adapterCapability.contractVersion ||
                        CapabilityContract.version(),

                    capability:
                        adapterCapability.capability ||
                        null,

                    provider:
                        adapterCapability.provider ||
                        null,

                    providerVersion:
                        adapterCapability.providerVersion ||
                        null,

                    admission:
                        "REJECT",

                    errors:
                        admission.errors

                },

                sources: [],

                result: {

                    sources: [],

                    sourceCount:
                        0,

                    outputState:
                        "REJECTED",

                    verificationState:
                        "UNVERIFIED",

                    evidenceCreated:
                        false

                },

                trace: [

                    ...(Array.isArray(
                        adapterCapability.trace
                    )
                        ? adapterCapability.trace
                        : []),

                    ...admission.trace,

                    {

                        engine:
                            "ExternalSourceConnector",

                        action:
                            "provenance-validation",

                        status:
                            "rejected"

                    }

                ],

                questions:
                    admission.errors,

                nextRuntimeState:
                    "EvidenceEngine"

            };

        }


        /*
         * ---------------------------------------------------------
         * Capability PASS
         *
         * PASS 只代表 Capability 合法并且 Provenance 匹配。
         *
         * 不代表：
         *
         *   sources > 0
         *   evidence
         *   verification
         *   supportsClaim
         *   conclusion
         *
         * 因此 EMPTY_PROVIDER 合法 PASS。
         * ---------------------------------------------------------
         */

        return {

            engine:
                "ExternalSourceConnector",

            version:
                "7.4",

            principle:
                "莫问连接外部来源，但不把来源内容直接视为证据。Capability PASS 不等于来源存在，更不等于事实已验证。",

            status:
                sources.length > 0
                    ? "source-connected"
                    : "need-source",

            adapter: {

                name:
                    this.adapter.name ||
                    "ExternalSearchAdapter",

                version:
                    this.adapter.version ||
                    null,

                status:
                    searchResult?.status ||
                    "unknown"

            },

            capability: {

                contract:
                    adapterCapability.contract,

                contractVersion:
                    adapterCapability.contractVersion,

                capability:
                    adapterCapability.capability,

                provider:
                    adapterCapability.provider,

                providerVersion:
                    adapterCapability.providerVersion,

                admission:
                    "PASS",

                status:
                    "capability-admitted"

            },

            sources,

            result: {

                sources,

                sourceCount:
                    sources.length,

                outputState:
                    adapterCapability.outputState ||
                    (
                        sources.length > 0
                            ? "DISCOVERED"
                            : "UNKNOWN"
                    ),

                verificationState:
                    adapterCapability.verificationState ||
                    "UNVERIFIED",

                evidenceCreated:
                    adapterCapability.evidenceCreated === true

            },

            trace: [

                ...(Array.isArray(
                    adapterCapability.trace
                )
                    ? adapterCapability.trace
                    : []),

                ...admission.trace,

                {

                    engine:
                        "ExternalSourceConnector",

                    action:
                        "capability-admitted",

                    status:
                        "passed"

                }

            ],

            questions:
                sources.length > 0
                    ? []
                    : [
                        "没有连接到真实外部来源。"
                    ],

            nextRuntimeState:
                "EvidenceEngine"

        };

    }


    isRealSource(source) {

        if (
            !source ||
            typeof source !== "object"
        ) {

            return false;

        }


        const hasSourceIdentity =
            Boolean(
                source.source ||
                source.url
            );


        const hasContent =
            typeof source.content === "string" &&
            source.content.trim().length > 0;


        return (
            hasSourceIdentity &&
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


export default ExternalSourceConnector;
