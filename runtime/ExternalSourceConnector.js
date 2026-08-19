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


        this.capabilityAdmission =
            new CapabilityAdmission();

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


        const capabilityResponse =
            CapabilityContract.createResponse({

                capability:
                    "search",

                provider:
                    this.adapter.name ||
                    "ExternalSearchAdapter",

                providerVersion:
                    this.adapter.version ||
                    null,

                status:
                    searchResult &&
                        searchResult.status
                        ? searchResult.status
                        : "unknown",

                output:
                    sources,

                sources,

                outputState:
                    "DISCOVERED",

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
                            "ExternalSourceConnector",

                        action:
                            "adapter-search",

                        status:
                            searchResult &&
                                searchResult.status
                                ? searchResult.status
                                : "completed"

                    },

                    {

                        engine:
                            "ExternalSourceConnector",

                        action:
                            "collect-source",

                        status:
                            sources.length > 0
                                ? "completed"
                                : "empty"

                    }

                ]

            });


        /*
         * ---------------------------------------------------------
         * Capability Admission
         *
         * Admission 不接受 Capability 自报身份作为信任依据。
         *
         * Trusted Context 来自 Connector 实际持有的 Adapter。
         * ---------------------------------------------------------
         */

        const admission =
            this.capabilityAdmission.admit(

                capabilityResponse,

                {

                    provider:
                        this.adapter.name ||
                        "ExternalSearchAdapter",

                    providerVersion:
                        this.adapter.version ||
                        null

                }

            );


        if (!admission.admitted) {

            return {

                engine:
                    "ExternalSourceConnector",

                version:
                    "7.2",

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
                        searchResult &&
                            searchResult.status
                            ? searchResult.status
                            : "unknown"

                },

                capability: {

                    contract:
                        "CapabilityContract",

                    contractVersion:
                        CapabilityContract.version(),

                    capability:
                        capabilityResponse.capability,

                    provider:
                        capabilityResponse.provider,

                    providerVersion:
                        capabilityResponse.providerVersion,

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

                    ...capabilityResponse.trace,

                    ...admission.trace

                ],

                questions:
                    admission.errors,

                nextRuntimeState:
                    "EvidenceEngine"

            };

        }


        return {

            engine:
                "ExternalSourceConnector",

            version:
                "7.2",

            principle:
                "莫问连接外部来源，但不把来源内容直接视为证据。外部能力必须经过 Capability Admission 与 Provenance 校验。",

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
                    searchResult &&
                        searchResult.status
                        ? searchResult.status
                        : "unknown"

            },

            capability: {

                contract:
                    capabilityResponse.contract,

                contractVersion:
                    capabilityResponse.contractVersion,

                capability:
                    capabilityResponse.capability,

                provider:
                    capabilityResponse.provider,

                providerVersion:
                    capabilityResponse.providerVersion,

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
                    "DISCOVERED",

                verificationState:
                    "UNVERIFIED",

                evidenceCreated:
                    false

            },

            trace: [

                ...capabilityResponse.trace,

                ...admission.trace

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
