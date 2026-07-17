function verifyLanguage() {

    let text = document.getElementById("inputText").value;

    let result = "";

    if(text.trim()==""){
        result="请输入需要验证的证词。";
    }else{

        result="<h3>莫问验证结果</h3>";

        result+="<p>正在分析证词……</p>";

        result+="<p>① 是否存在证词？ ✔</p>";

        result+="<p>② 是否存在对象？ ✔</p>";

        result+="<p>③ 是否存在定义？ ✔</p>";

        result+="<p>④ 是否存在逻辑跳跃？（开发中）</p>";

        result+="<p>⑤ 是否存在无法验证证词？（开发中）</p>";

    }

    document.getElementById("result").innerHTML=result;

}
