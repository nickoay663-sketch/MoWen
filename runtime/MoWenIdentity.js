import MoWenConfig from "./MoWenConfig.js";


class MoWenIdentity {

    run() {

        return {

            name:
                MoWenConfig.name,


            principle:
                MoWenConfig.principle,


            mission:
                "检查证词、定义对象、验证对应、追问责任。",


            rule:
                MoWenConfig.rule,


            status:
                "active"

        };

    }

}


export default MoWenIdentity;
