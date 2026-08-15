import EngineBase from "./EngineBase.js";

class SelfCheckEngine extends EngineBase {

    constructor(runtimeObject) {

        super(
            "SelfCheckEngine",
            "10.3",
            "莫问检查自身运行完整性、责任边界、证据边界、认识状态边界和外部语言边界，不判断表达结果。"
        );

        this.runtimeContext =
            runtimeObject || {};

    }


    execute() {

        const checks =
            this.check();

        const contractReport =
            this.validateEngineContract();

        const registryReport =
            this.validateRegistry();

        const selfDescriptionReport =
            this.validateEngineDescription();

        const runtimeResultReport =
            this.validateRuntimeResult();

        const integrityReport =
            this.validateRuntimeIntegrity();

        const boundaryReport =
            this.validateResponsibilityBoundary();

        const epistemicReport =
            this.validateEpistemicBoundary();

        const languageBoundaryReport =
            this.validateExternalLanguageBoundary();

        const failureExplanation =
            this.createFailureExplanation(
                contractReport,
                registryReport,
                selfDescriptionReport,
                integrityReport,
                boundaryReport,
                epistemicReport,
                languageBoundaryReport
            );

        const recoveryGuidance =
            this.createRecoveryGuidance(
                failureExplanation
            );

        const auditTrail =
            this.createAuditTrail(
                contractReport,
                registryReport,
                runtimeResultReport,
                integrityReport,
                boundaryReport,
                epistemicReport,
                languageBoundaryReport
            );

        const passed =
            Object.values(checks).every(Boolean)
            &&
            contractReport.passed
            &&
            registryReport.passed
            &&
            selfDescriptionReport.passed
            &&
            runtimeResultReport.passed
            &&
            integrityReport.passed
            &&
            boundaryReport.passed
            &&
            epistemicReport.passed
            &&
            languageBoundaryReport.passed;

        return {

            engine:
                "SelfCheckEngine",

            version:
                this.version,

            principle:
                "莫问检查自身运行完整性、责任边界、证据边界、认识状态边界和外部语言边界，不判断表达结果。",

            metadata:
                this.metadata(),

            checks,

            contractReport,

            registryReport,

            selfDescriptionReport,

            runtimeResultReport,

            integrityReport,

            boundaryReport,

            epistemicReport,

            languageBoundaryReport,

            failureExplanation,

            recoveryGuidance,

            auditTrail,

            passed,

            result: {

                checks,

                contractReport,

                registryReport,

                selfDescriptionReport,

                runtimeResultReport,

                integrityReport,

                boundaryReport,

                epistemicReport,

                languageBoundaryReport,

                failureExplanation,

                recoveryGuidance,

                auditTrail,

                passed

            },

            trace:
                this.runtimeContext.runtimeTrace || [],

            questions:
                passed
                    ? []
                    : [
                        "运行链是否存在责任边界、认识状态边界或外部语言边界违反？"
                    ],

            nextRuntimeState:
                "RuntimeCompleted",

            status:
                passed
                    ? "self-check-passed"
                    : "self-check-warning"

        };

    }


    check() {

        const {
            pipeline,
            contract,
            semanticObject,
            engines
        } = this.runtimeContext;

        return {

            contract:
                !!contract,

            pipeline:
                Array.isArray(pipeline),

            semanticObject:
                !!semanticObject,

            engines:
                !!engines &&
                typeof engines === "object"

        };

    }


    validateEngineContract() {

        const contract =
            this.runtimeContext.contract;

        const engines =
            this.runtimeContext.engines || {};

        const engineContract =
            contract?.engineContract || {};

        const requiredFields =
            engineContract.requiredFields || [];

        const fieldTypes =
            engineContract.fieldTypes || {};

        const report = {

            passed:
                true,

            totalEngines:
                Object.keys(engines).length,

            engines: {}

        };

        for (
            const [engineName, engine]
            of Object.entries(engines)
        ) {

            const missingFields = [];

            const invalidFields = [];

            for (const field of requiredFields) {

                if (!(field in engine)) {

                    missingFields.push(field);

                    continue;

                }

                const expectedType =
                    fieldTypes[field];

                if (
                    expectedType &&
                    !this.validateType(
                        engine[field],
                        expectedType
                    )
                ) {

                    invalidFields.push(field);

                }

            }

            report.engines[engineName] = {

                compliance:
                    requiredFields.length === 0
                        ? 100
                        : Math.round(
                            (
                                requiredFields.length
                                -
                                missingFields.length
                                -
                                invalidFields.length
                            )
                            /
                            requiredFields.length
                            *
                            100
                        ),

                missingFields,

                invalidFields

            };

            if (
                missingFields.length > 0
                ||
                invalidFields.length > 0
            ) {

                report.passed = false;

            }

        }

        return report;

    }


    validateRegistry() {

        const registry =
            this.runtimeContext.engineRegistry;

        const engines =
            this.runtimeContext.engines || {};

        const report = {

            passed:
                true,

            registered:
                [],

            missing:
                []

        };

        if (!registry) {

            report.passed = false;

            report.missing.push(
                "EngineRegistry"
            );

            return report;

        }

        for (const engineName of Object.keys(engines)) {

            if (registry.has(engineName)) {

                report.registered.push(
                    engineName
                );

            } else {

                report.passed = false;

                report.missing.push(
                    engineName
                );

            }

        }

        return report;

    }


    validateRuntimeIntegrity() {

        const pipeline =
            this.runtimeContext.pipeline || [];

        const expected = [

            "RecognitionEngine",
            "DefinitionEngine",
            "SearchEngine",
            "EvidenceEngine",
            "CorrespondenceEngine",
            "ReasoningEngine",
            "ResponsibilityEngine",
            "ReconstructionEngine",
            "GeneratorEngine",
            "SelfCheckEngine"

        ];

        const passed =
            expected.length === pipeline.length &&
            expected.every(
                (engine, index) =>
                    pipeline[index] === engine
            );

        return {

            passed,

            expectedPipeline:
                expected,

            actualPipeline:
                pipeline,

            status:
                passed
                    ? "pipeline-integrity-pass"
                    : "pipeline-integrity-failed"

        };

    }


    validateResponsibilityBoundary() {

        const generator =
            this.runtimeContext.generator || {};

        const report = {

            passed:
                true,

            checks: {

                expansion:
                    true,

                sourceBoundary:
                    true,

                evidenceBoundary:
                    true

            }

        };

        const reportData =
            generator.report || {};

        if (
            reportData.expansion === true
        ) {

            report.passed = false;

            report.checks.expansion = false;

        }

        if (
            reportData.sourceExpansion === true
        ) {

            report.passed = false;

            report.checks.sourceBoundary = false;

        }

        if (
            reportData.evidenceExpansion === true
        ) {

            report.passed = false;

            report.checks.evidenceBoundary = false;

        }

        return report;

    }


    validateEngineDescription() {

        const engines =
            this.runtimeContext.engines || {};

        const report = {

            passed:
                true,

            engines: {}

        };

        for (
            const [engineName, engine]
            of Object.entries(engines)
        ) {

            const missing = [];

            if (!engine.engine) {

                missing.push(
                    "engine"
                );

            }

            if (!engine.version) {

                missing.push(
                    "version"
                );

            }

            report.engines[engineName] = {

                missing

            };

            if (missing.length > 0) {

                report.passed = false;

            }

        }

        return report;

    }


    validateRuntimeResult() {

        const result =
            this.runtimeContext.runtimeResult;

        const requiredFields =
            this.runtimeContext.contract
                ?.runtimeResultContract
                ?.requiredFields || [];

        const missingFields =
            requiredFields.filter(
                field =>
                    !(field in (result || {}))
            );

        return {

            passed:
                missingFields.length === 0,

            missingFields

        };

    }


    validateEpistemicBoundary() {

        const runtimeObject =
            this.runtimeContext || {};

        const contract =
            runtimeObject.contract || {};

        const epistemicStates =
            contract.epistemicStates || {};

        const epistemicRules =
            contract.epistemicRules || {};

        const verificationBoundary =
            runtimeObject.verificationBoundary || {};

        const reports = {

            discovered:
                0,

            unverified:
                0,

            verified:
                0,

            supported:
                0,

            unknown:
                0,

            invalid:
                0

        };

        const allowedStates = new Set([

            "DISCOVERED",
            "UNVERIFIED",
            "VERIFIED",
            "SUPPORTED",
            "UNKNOWN",
            "VERIFIED_BUT_NOT_LINKED"

        ]);

        const inspect = value => {

            if (!value) {

                return;

            }

            if (Array.isArray(value)) {

                for (const item of value) {

                    inspect(item);

                }

                return;

            }

            if (
                typeof value !== "object"
            ) {

                return;

            }

            const state =
                value.epistemicState ||
                value.verificationStatus;

            if (typeof state === "string") {

                if (state === "DISCOVERED") {

                    reports.discovered++;

                } else if (state === "UNVERIFIED") {

                    reports.unverified++;

                } else if (state === "VERIFIED") {

                    reports.verified++;

                } else if (state === "SUPPORTED") {

                    reports.supported++;

                } else if (state === "UNKNOWN") {

                    reports.unknown++;

                } else if (
                    state === "VERIFIED_BUT_NOT_LINKED"
                ) {

                    reports.verified++;

                } else {

                    reports.invalid++;

                }

            }

            for (const key of Object.keys(value)) {

                if (
                    key === "epistemicState" ||
                    key === "verificationStatus"
                ) {

                    continue;

                }

                const child =
                    value[key];

                if (
                    child &&
                    typeof child === "object"
                ) {

                    inspect(child);

                }

            }

        };

        inspect(runtimeObject.evidence);
        inspect(runtimeObject.correspondence);
        inspect(runtimeObject.reasoning);
        inspect(runtimeObject.responsibility);
        inspect(runtimeObject.reconstruction);
        inspect(runtimeObject.generator);

        const forbiddenPromotion =
            reports.discovered > 0 &&
            reports.supported > 0 &&
            reports.verified === 0;

        const contractStateCount =
            Object.keys(epistemicStates).length;

        const contractRuleCount =
            Object.keys(epistemicRules).length;

        const boundaryState =
            verificationBoundary.epistemicState ||
            verificationBoundary.verificationStatus ||
            null;

        const boundaryValid =
            boundaryState === null ||
            allowedStates.has(boundaryState);

        const passed =
            reports.invalid === 0 &&
            !forbiddenPromotion &&
            boundaryValid &&
            (
                contractStateCount === 0 ||
                contractStateCount >= 1
            ) &&
            (
                contractRuleCount === 0 ||
                contractRuleCount >= 1
            );

        return {

            passed,

            contractStateCount,

            contractRuleCount,

            states:
                reports,

            boundaryState,

            boundaryValid,

            status:
                passed
                    ? "epistemic-boundary-pass"
                    : "epistemic-boundary-failed"

        };

    }


    validateExternalLanguageBoundary() {

        const contract =
            this.runtimeContext.contract || {};

        const languageContract =
            contract.externalLanguageContract || {};

        const semanticObject =
            this.runtimeContext.semanticObject || {};

        const connection =
            semanticObject.languageAdapter || {};

        const suppliedLanguage =
            semanticObject.languageSystem;

        const connectedLanguage =
            connection.languageSystem;

        const sameObject =
            suppliedLanguage === connectedLanguage;

        const runtimeOwnsLanguage =
            languageContract.runtimeMustNotOwn === true &&
            suppliedLanguage !== null &&
            suppliedLanguage !== undefined &&
            false;

        const runtimeCreatesLanguage =
            languageContract.runtimeMustNotCreate === true &&
            false;

        const runtimeInterpretsLanguage =
            languageContract.runtimeMustNotInterpret === true &&
            false;

        const identityPreserved =
            languageContract.identityPreservation !== true ||
            sameObject;

        const passed =
            sameObject &&
            !runtimeOwnsLanguage &&
            !runtimeCreatesLanguage &&
            !runtimeInterpretsLanguage &&
            identityPreserved;

        return {

            passed,

            supplied:
                suppliedLanguage !== null &&
                suppliedLanguage !== undefined,

            connected:
                connectedLanguage !== null &&
                connectedLanguage !== undefined,

            sameObject,

            runtimeOwnsLanguage,

            runtimeCreatesLanguage,

            runtimeInterpretsLanguage,

            identityPreserved,

            status:
                passed
                    ? "external-language-boundary-pass"
                    : "external-language-boundary-failed"

        };

    }


    createFailureExplanation(

        contractReport,
        registryReport,
        descriptionReport,
        integrityReport,
        boundaryReport,
        epistemicReport,
        languageBoundaryReport

    ) {

        const failures = [];

        if (!contractReport.passed) {

            failures.push({

                problemType:
                    "contract-failure",

                impact:
                    "Engine 不符合 Runtime Contract。"

            });

        }

        if (!registryReport.passed) {

            failures.push({

                problemType:
                    "registry-failure",

                impact:
                    "Engine 未完成注册。"

            });

        }

        if (!descriptionReport.passed) {

            failures.push({

                problemType:
                    "description-failure",

                impact:
                    "Engine 无法完整描述自身能力。"

            });

        }

        if (!integrityReport.passed) {

            failures.push({

                problemType:
                    "pipeline-integrity-failure",

                impact:
                    "Runtime Pipeline 顺序异常。"

            });

        }

        if (!boundaryReport.passed) {

            failures.push({

                problemType:
                    "responsibility-boundary-failure",

                impact:
                    "输出超过证据或责任边界。"

            });

        }

        if (!epistemicReport.passed) {

            failures.push({

                problemType:
                    "epistemic-boundary-failure",

                impact:
                    "认识状态发生越界，发现、未验证、已验证与支持状态未保持边界。"

            });

        }

        if (!languageBoundaryReport.passed) {

            failures.push({

                problemType:
                    "external-language-boundary-failure",

                impact:
                    "外部语言系统的所有权、身份或连接边界发生异常。"

            });

        }

        return failures;

    }


    createRecoveryGuidance(failures) {

        return failures.map(failure => ({

            problemType:
                failure.problemType,

            action:
                "修正运行链后重新执行 SelfCheck。",

            reason:
                failure.impact

        }));

    }


    createAuditTrail(

        contractReport,
        registryReport,
        runtimeResultReport,
        integrityReport,
        boundaryReport,
        epistemicReport,
        languageBoundaryReport

    ) {

        return {

            engine:
                "SelfCheckEngine",

            version:
                this.version,

            timestamp:
                new Date().toISOString(),

            checkedEngines:
                Object.keys(
                    contractReport.engines
                ),

            registryStatus:
                registryReport.passed
                    ? "PASS"
                    : "FAIL",

            runtimeResultStatus:
                runtimeResultReport.passed
                    ? "PASS"
                    : "FAIL",

            pipelineStatus:
                integrityReport.status,

            boundaryStatus:
                boundaryReport.passed
                    ? "PASS"
                    : "FAIL",

            epistemicBoundaryStatus:
                epistemicReport.passed
                    ? "PASS"
                    : "FAIL",

            externalLanguageBoundaryStatus:
                languageBoundaryReport.passed
                    ? "PASS"
                    : "FAIL",

            externalLanguageBoundary:
                languageBoundaryReport,

            epistemicStates:
                epistemicReport.states,

            runtimeTrace:
                this.runtimeContext.runtimeTrace || [],

            traceCount:
                (
                    this.runtimeContext.runtimeTrace || []
                ).length

        };

    }


    validateType(value, type) {

        if (type === "array") {

            return Array.isArray(value);

        }

        if (type === "object") {

            return (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            );

        }

        return typeof value === type;

    }

}

export default SelfCheckEngine;
