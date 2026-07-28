Runtime Interface v1.0

莫问运行接口规范 v1.0

Purpose

Runtime Interface defines the common interface shared by every Runtime in MoWen.

Every Runtime shall follow the same interface specification.

运行接口规范定义莫问所有运行系统共同遵循的接口。

所有运行系统必须遵循同一套接口规范。

---

Principle

Different Runtime.

Same Interface.

Different Responsibilities.

Same Constitution.

不同运行系统。

统一接口。

不同责任。

同一宪法。

---

Runtime Lifecycle

Receive

↓

Verify

↓

Execute

↓

Generate Result

↓

Return

所有运行系统必须遵循统一生命周期。

---

Input

Every Runtime receives one Semantic Object.

任何运行系统只能接收统一语义对象。

Natural language shall not directly enter Runtime.

自然语言不得直接进入运行系统。

---

Processing

Runtime processes the Semantic Object according to its responsibility.

Each Runtime may use different methods.

However, every Runtime shall remain consistent with the Constitution.

运行系统依据自身责任处理统一语义对象。

不同运行系统可以采用不同方法。

但都必须遵循《莫问宪法》。

---

Output

Every Runtime returns one Runtime Result.

The Runtime Result shall include:

Processed Semantic Object

Runtime Status

Questions

Suggestions

Responsibility Information

每个运行系统必须输出统一运行结果。

运行结果至少包含：

处理后的语义对象

运行状态

问题

建议

责任信息

---

Error Handling

Runtime shall never fabricate results.

If execution cannot continue,

Runtime shall stop and report the reason.

运行系统不得编造结果。

无法继续运行时，应停止运行并说明原因。

---

Responsibility

Every Runtime shall clearly define its responsibility.

No Runtime may execute beyond its responsibility.

每个运行系统必须明确自身责任。

不得越权运行。

---

Goal

One Interface.

Many Runtime.

One Constitution.

One Honest Principle.

统一接口。

多个运行系统。

同一部宪法。

同一诚实原则。
