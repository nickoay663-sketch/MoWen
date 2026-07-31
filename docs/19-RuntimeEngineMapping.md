# MoWen Runtime Engine Mapping v3.0

# 莫问运行引擎映射 v3.0

---

# Purpose

Runtime Mapping defines how Runtime communicates with every Engine.

Every Engine receives a unified Runtime Context.

Every Engine returns a unified Runtime Result.

Runtime does not bypass any Engine.

运行映射规定 Runtime 如何与每个 Engine 通信。

所有 Engine 接收统一运行上下文。

所有 Engine 返回统一运行结果。

Runtime 不允许绕过任何 Engine。

---

# Runtime Flow

Expression

↓

RecognitionEngine

↓

DefinitionEngine

↓

SearchEngine

↓

EvidenceEngine

↓

CorrespondenceEngine

↓

ReasoningEngine

↓

ResponsibilityEngine

↓

ReconstructionEngine

↓

SelfCheckEngine

↓

Runtime Output

---

# Runtime Context

Runtime passes one Runtime Context to every Engine.

Runtime Context contains:

- originalContent
- language
- semanticObject
- previousRuntimeResult

所有 Engine 接收统一 Runtime Context。

包括：

- 原始表达
- 语言
- 语义对象
- 上一步运行结果

---

# Runtime Result

Every Engine returns:

- status
- result
- trace
- nextRuntimeState

所有 Engine 返回统一结果：

- status
- result
- trace
- nextRuntimeState

---

# Runtime Rule

Runtime never changes Engine Result.

Runtime only transfers Runtime Context.

Runtime never skips Runtime Chain.

Runtime 不修改 Engine 输出。

Runtime 只负责传递运行上下文。

Runtime 不允许跳过责任链。

---

# Core Principle

One Runtime.

One Context.

One Interface.

One Responsibility Chain.

统一 Runtime。

统一 Context。

统一 Interface。

统一责任链。
