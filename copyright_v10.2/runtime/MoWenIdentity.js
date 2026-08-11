import MoWenConfig from "./MoWenConfig.js";


class MoWenIdentity {


    run() {


        return {


            version:

                "2.2",



            name:

                MoWenConfig.name,



            identity:

                MoWenConfig.identity,



            motto:

                MoWenConfig.motto,



            principle:

                MoWenConfig.principles,



            mission:

                MoWenConfig.mission,



            coreRule:

                "莫问处理表达，不判断人；检验责任，不替代判断。",



            languagePrinciple:

                "语言是入口，表达责任是运行对象。",



            status:

                "active"


        };


    }


}


export default MoWenIdentity;
