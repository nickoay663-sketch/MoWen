class CoreGovernance {

    constructor() {

        this.version =
            "1.0";

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
                "SelfCheck enforcement"

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
                this.extensionPrinciples

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
            "SelfCheck enforcement"

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


    enforce() {

        const core =
            this.validateCore();

        const boundaries =
            this.validateBoundaries();

        const extensions =
            this.validateExtensions();

        const passed =
            core.passed &&
            boundaries.passed &&
            extensions.passed;

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

            passed,

            status:
                passed
                    ? "governance-pass"
                    : "governance-failed"

        };

    }

}


export default CoreGovernance;
