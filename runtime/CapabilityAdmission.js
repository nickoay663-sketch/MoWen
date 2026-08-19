import CapabilityContract from "./CapabilityContract.js";

class CapabilityAdmission {

    constructor(options = {}) {

        this.name =
            options.name ||
            "CapabilityAdmission";

        this.version =
            "1.0";

    }


    admit(response) {

        const validation =
            CapabilityContract.validate(
                response
            );


        if (!validation.valid) {

            return {

                admitted:
                    false,

                status:
                    "capability-rejected",

                admission:
                    "REJECT",

                errors:
                    validation.errors,

                response:
                    null,

                trace: [

                    {

                        engine:
                            "CapabilityAdmission",

                        action:
                            "validate-capability",

                        status:
                            "rejected"

                    }

                ]

            };

        }


        return {

            admitted:
                true,

            status:
                "capability-admitted",

            admission:
                "PASS",

            errors:
                [],

            response,

            trace: [

                {

                    engine:
                        "CapabilityAdmission",

                    action:
                        "validate-capability",

                    status:
                        "passed"

                }

            ]

        };

    }


    isAdmitted(response) {

        const result =
            this.admit(response);


        return (
            result.admitted === true
        );

    }

}


export default CapabilityAdmission;
