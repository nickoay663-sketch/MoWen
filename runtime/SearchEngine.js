class SearchEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const tokens = this.tokenize();

        const keywords = this.extractKeywords(tokens);

        const objects = this.detectObjects(keywords);

        const concepts = this.detectConcepts(keywords);

        return {

            testimony: this.testimony,

            tokens,

            keywords,

            objects,

            concepts,

            sources: [],

            results: [],

            status: "completed",

            version: "2.0"

        };

    }

    tokenize() {

        return this.testimony

            .replace(/[。，！？,.!?；;：:"“”‘’（）()【】\s]/g, "")

            .split("")

            .filter(Boolean);

    }

    extractKeywords(tokens) {

        const frequency = {};

        tokens.forEach(word => {

            if (!this.isStopWord(word)) {

                frequency[word] = (frequency[word] || 0) + 1;

            }

        });

        return Object.entries(frequency)

            .sort((a, b) => b[1] - a[1])

            .map(item => ({

                word: item[0],

                count: item[1]

            }));

    }

    detectObjects(keywords) {

        const objectLibrary = [

            "人民",
            "国家",
            "政府",
            "党",
            "历史"

        ];

        return keywords

            .filter(item => objectLibrary.includes(item.word))

            .map(item => item.word);

    }

    detectConcepts(keywords) {

        const conceptLibrary = [

            "自由",
            "民主",
            "文明",
            "战争",
            "和平",
            "责任",
            "权利",
            "法律",
            "事实",
            "真相",
            "利益"

        ];

        return keywords

            .filter(item => conceptLibrary.includes(item.word))

            .map(item => item.word);

    }

    isStopWord(word) {

        const stopWords = [

            "的",
            "了",
            "是",
            "在",
            "和",
            "与",
            "我",
            "你",
            "他",
            "们",
            "这",
            "那",
            "一个",
            "我们"

        ];

        return stopWords.includes
