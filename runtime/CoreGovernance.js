class CoreGovernance {

    constructor() {

        this.version =
            "1.2";

        this.name =
            "MoWen Core Governance";

        this.principle =
            "能力向外增长，边界向内守住。";

        this.core = {

            status:
                "minimum-complete",

            principle:
                "MoWen Core is a minimum-complete honest runtime infrastructure.",

            responsibilities: [

                "Honest execution",
                "Responsibility chain preservation",
                "Evidence boundary preservation",
                "Epistemic boundary preservation",
                "External language boundary preservation",
                "Runtime contract enforcement",
                "SelfCheck enforcement",
                "Execution integrity preservation"

            ]

        };

        this.coreBoundaries = {

            noCoreExpansion:
                true,

            noEvidenceFabrication:
                true,

            noResponsibilityExpansion:
                true,

            noEpistemicPromotion:
                true,

            noExternalLanguageOwnership:
                true,

            noExternalLanguageInterpretation:
                true,

            noPipelineBypass:
                true,

            noContractBypass:
                true,

            noSelfCheckBypass:
                true,

            noExecutionIntegrityBypass:
                true

        };

        this.extensionPrinciples = {

            extensionsMayGrow:
                true,

            extensionsMustNotReplaceCore:
                true,

            extensionsMustNotModifyCoreRules:
                true,

            extensionsMustRespectContracts:
                true,

            extensionsMustRemainAuditable:
                true

        };

        this.executionIntegrity = {

            requiredMethods: [

                "validateCore",
                "validateBoundaries",
                "validateExtensions",
                "validateExecutionIntegrity",
                "enforce"

            ],

            immutableMethodNames:
                true,

            executionIntegrityRequired:
                true

        };

        this.executionIntegrity.methodReferences = {};

        for (
            const methodName
            of this.executionIntegrity.requiredMethods
        ) {

            this.executionIntegrity.methodReferences[
                methodName
            ] = this[methodName];

        }

    }


    describe() {

        return {

            name:
                this.name,

            version:
                this.version,

            principle:
                this.principle,

            core:
                this.core,

            coreBoundaries:
                this.coreBoundaries,

            extensionPrinciples:
                this.extensionPrinciples,

            executionIntegrity: {

                requiredMethods:
                    this.executionIntegrity.requiredMethods,

                immutableMethodNames:
                    this.executionIntegrity.immutableMethodNames,

                executionIntegrityRequired:
                    this.executionIntegrity.executionIntegrityRequired

            }

        };

    }


    validateCore() {

        const requiredCoreResponsibilities = [

            "Honest execution",
            "Responsibility chain preservation",
            "Evidence boundary preservation",
            "Epistemic boundary preservation",
            "External language boundary preservation",
            "Runtime contract enforcement",
            "SelfCheck enforcement",
            "Execution integrity preservation"

        ];

        const missing =
            requiredCoreResponsibilities.filter(
                responsibility =>
                    !this.core.responsibilities.includes(
                        responsibility
                    )
            );

        return {

            passed:
                missing.length === 0,

            missing,

            status:
                missing.length === 0
                    ? "core-definition-pass"
                    : "core-definition-failed"

        };

    }


    validateBoundaries() {

        const invalid = [];

        for (
            const [name, value]
            of Object.entries(
                this.coreBoundaries
            )
        ) {

            if (value !== true) {

                invalid.push(name);

            }

        }

        return {

            passed:
                invalid.length === 0,

            invalid,

            status:
                invalid.length === 0
                    ? "core-boundary-pass"
                    : "core-boundary-failed"

        };

    }


    validateExtensions() {

        const invalid = [];

        for (
            const [name, value]
            of Object.entries(
                this.extensionPrinciples
            )
        ) {

            if (value !== true) {

                invalid.push(name);

            }

        }

        return {

            passed:
                invalid.length === 0,

            invalid,

            status:
                invalid.length === 0
                    ? "extension-boundary-pass"
                    : "extension-boundary-failed"

        };

    }


    validateExecutionIntegrity() {

        const invalid = [];

        const requiredMethods =
            this.executionIntegrity
                ?.requiredMethods || [];

        const methodReferences =
            this.executionIntegrity
                ?.methodReferences || {};

        for (
            const methodName
            of requiredMethods
        ) {

            const currentMethod =
                this[methodName];

            const originalMethod =
                methodReferences[methodName];

            if (
                typeof currentMethod !== "function"
            ) {

                invalid.push(
                    methodName
                );

                continue;

            }

            if (
                typeof originalMethod !== "function"
            ) {

                invalid.push(
                    `${methodName}:original-reference-missing`
                );

                continue;

            }

            if (
                currentMethod !== originalMethod
            ) {

                invalid.push(
                    `${methodName}:method-tampered`
                );

            }

        }

        if (
            this.executionIntegrity
                ?.immutableMethodNames
            !== true
        ) {

            invalid.push(
                "immutableMethodNames"
            );

        }

        if (
            this.executionIntegrity
                ?.executionIntegrityRequired
            !== true
        ) {

            invalid.push(
                "executionIntegrityRequired"
            );

        }

        return {

            passed:
                invalid.length === 0,

            invalid,

            status:
                invalid.length === 0
                    ? "execution-integrity-pass"
                    : "execution-integrity-failed"

        };

    }


    enforce() {

        const safeValidate =
            (methodName, fallback) => {

                try {

                    if (
                        typeof this[methodName]
                        !== "function"
                    ) {

                        return fallback;

                    }

                    return this[methodName]();

                } catch (error) {

                    return {

                        passed:
                            false,

                        invalid: [

                            `${methodName}:execution-failed`

                        ],

                        error:
                            error?.message ||
                            String(error),

                        status:
                            `${methodName}-execution-failed`

                    };

                }

            };

        const core =
            safeValidate(
                "validateCore",
                {
                    passed: false,
                    missing: [
                        "validateCore"
                    ],
                    status:
                        "core-validation-unavailable"
                }
            );

        const boundaries =
            safeValidate(
                "validateBoundaries",
                {
                    passed: false,
                    invalid: [
                        "validateBoundaries"
                    ],
                    status:
                        "boundary-validation-unavailable"
                }
            );

        const extensions =
            safeValidate(
                "validateExtensions",
                {
                    passed: false,
                    invalid: [
                        "validateExtensions"
                    ],
                    status:
                        "extension-validation-unavailable"
                }
            );

        const executionIntegrity =
            safeValidate(
                "validateExecutionIntegrity",
                {
                    passed: false,
                    invalid: [
                        "validateExecutionIntegrity"
                    ],
                    status:
                        "execution-integrity-validation-unavailable"
                }
            );

        const passed =
            core.passed &&
            boundaries.passed &&
            extensions.passed &&
            executionIntegrity.passed;

        return {

            governance:
                this.name,

            version:
                this.version,

            principle:
                this.principle,

            core,

            boundaries,

            extensions,

            executionIntegrity,

            passed,

            status:
                passed
                    ? "governance-pass"
                    : "governance-failed"

        };

    }

}


export default CoreGovernance;
