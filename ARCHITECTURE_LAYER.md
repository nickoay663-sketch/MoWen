MoWen Architecture Layer v1.0

一、架构定义

莫问不是由功能堆积形成的程序。

莫问是由四个层次构成的完整系统：

1. Value Layer（价值层）
2. Runtime Layer（运行层）
3. Phenomenon Layer（现象层）
4. Implementation Layer（实现层）

四个层次分别承担不同责任。

任何层次不得越权。

---

Layer 1：Value Layer（价值层）

核心：诚实

诚实不是莫问的功能。

诚实不是莫问的规则。

诚实是莫问存在的方式。

莫问因诚实而运行。

离开诚实，莫问不再是莫问。

因此：

所有识别、定义、检索、对应、证据、推理、责任检查和重构，都必须服从诚实。

---

Layer 2：Runtime Layer（运行层）

目的

将输入表达转化为可检验、可修正、可重构的证词链。

运行流程

Waiting
等待输入

↓

Recognition
识别证词、对象、关系

↓

Definition
建立概念定义

↓

Search
发现缺失时检索补全

↓

Correspondence
检查表达与对象是否对应

↓

Evidence
检查证据支持

↓

Reasoning
检查推理链是否成立

↓

Responsibility
检查表达是否能够承担责任

↓

Reconstruction
重构为更能承担责任的表达

↓

Waiting
等待新的证词

运行原则

缺失，不立即结束。

缺失，首先检索。

检索仍无法补全：

进入 Honest Stop。

Honest Stop 不是否定表达者。

而是指出：

当前表达无法继续承担其结论所需要的责任。

---

Layer 3：Phenomenon Layer（现象层）

诚实运行后的自然表现：

- 一致性
- 完整性
- 对应性
- 可追溯性
- 可修正性
- 过滤不能成立的表达
- 保留能够承担责任的表达

这些不是莫问的根。

这些是诚实运行后的结果。

---

Layer 4：Implementation Layer（实现层）

目的

将莫问架构转化为可运行程序。

包括：

- JavaScript
- Node.js
- Engine 模块
- GitHub 项目结构
- UI
- API

实现层服从运行层。

运行层服从价值层。

程序不能改变莫问原则。

---

架构自检原则

任何新增功能进入莫问之前，必须回答：

1. 是否符合诚实？

2. 属于哪个运行步骤？

3. 产生什么运行结果？

4. 如何实现？

无法回答者，不进入莫问。

---

最终架构

                 诚实
                   │
                   ▼
          Runtime 诚实运行
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
 Phenomenon              Reconstruction
 运行表现                责任承担
        │                     │
        └──────────┬──────────┘
                   ▼
          Implementation
              实现

---

莫问使命

莫问不是为了替人产生答案。

莫问通过诚实运行，帮助表达不断重构。

直到表达能够承担相应责任。

当表达无法继续运行时：

莫问留下不可回避的问题。

等待新的证词。

等待下一次诚实运行。
