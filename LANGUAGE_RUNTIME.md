Language Runtime v1.0

莫问语言运行系统 v1.0

Purpose

Language Runtime is the first Runtime executed by MoWen.

Its responsibility is to recognize the language of an expression and convert it into a unified semantic object before entering Expression Engine.

语言运行系统是莫问执行的第一层运行系统。

它负责识别表达所属的自然语言，并将其转换为统一语义对象，然后进入表达引擎。

---

Principle

Language is not the runtime object.

Expression is not the language itself.

Language is only the entrance.

语言不是运行对象。

表达不是语言本身。

语言只是入口。

---

Runtime Flow

Input

↓

Language Detection

↓

Language Semantic Engine

↓

Unified Semantic Object

↓

Expression Engine

---

Supported Languages

Chinese

English

Spanish

Japanese

French

German

Arabic

Russian

Others

莫问可以不断增加新的语言运行系统。

---

Language Detection

The first task of Language Runtime is identifying the natural language.

Output:

Language

Confidence

Detected Features

语言识别只负责确认语言，不负责判断真假。

---

Semantic Conversion

Different languages may use different words to describe the same concept.

Language Runtime converts them into one unified semantic object.

不同语言可以拥有不同表达。

统一语义对象只有一种。

---

Independence

Every language keeps its own grammatical and cultural characteristics.

However, all languages must enter the same MoWen Constitution after semantic conversion.

每种语言保持自身特点。

进入莫问后遵循同一部宪法。

---

Goal

Different Languages.

One Semantic Object.

One Constitution.

One Honest Runtime.

不同语言。

统一语义对象。

同一部宪法。

同一诚实运行系统。
