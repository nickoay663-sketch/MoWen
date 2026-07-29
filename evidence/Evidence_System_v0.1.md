# Evidence System v1.0

# 莫问证据系统 v1.0


## Purpose


Evidence System provides supporting information for testimony verification.


证据系统为证词验证提供支持信息。


Evidence does not create conclusions.

Evidence only supports correspondence checking.


证据不创造结论。

证据只支持对应关系检查。


---

# Core Principle


Testimony requires evidence.

Evidence requires source.


证词需要证据。

证据需要来源。


Without evidence, expression responsibility cannot be fully examined.


没有证据，表达责任无法充分检验。


---

# Testimony and Evidence


Testimony:

The expression being examined.


证词：

被检验的表达。


Evidence:

Information used to examine whether testimony has support.


证据：

用于检验证词是否具有支持的信息。


Relationship:


Testimony

↓

Evidence

↓

Correspondence

↓

Responsibility


---

# Evidence Object


Each Evidence contains:


```json
{
 "content":"",
 "source":"",
 "language":"",
 "time":"",
 "location":"",
 "object":"",
 "reference":"",
 "verificationStatus":"",
 "responsibility":""
}
