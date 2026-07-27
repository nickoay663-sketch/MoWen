import MoWenConfig from "./MoWenConfig.js";

class MoWenIdentity {

    run() {

        return {

            version: "2.0",

            name:
                MoWenConfig.name,

            principle:
                MoWenConfig.principles,

            mission:
                MoWenConfig.mission ||
                "检查证词、定义对象、验证对应、追问责任。",

            status:
                "active"

        };

    }

}

export default MoWenIdentity;
