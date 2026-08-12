import UniversalExpression from "./UniversalExpression.js";

class Testimony {

    constructor(input = null) {

        this.type =
            "Testimony";

        this.version =
            "2.0";

        this.createdAt =
            new Date().toISOString();

        this.originalInput =
            input;

        this.content =
            input;

        this.language =
            null;

        this.expressionType =
            null;

        this.objects =
            [];

        this.concepts =
            [];

        this.metadata =
            {};

        this.universalExpression =
            input instanceof UniversalExpression
                ? input
                : null;

    }

}

export default Testimony;
