class SearchEngine {

    constructor(testimony) {

        this.testimony = testimony || "";

    }

    run() {

        const tokens = this.tokenize();

        const keywords = this.extractKeywords(tokens);

        const objects = this.detectObjects(keywords);

        return {

            testimony: this.testimony,

            keywords,

            objects,

            sources: [],

            results: [],

            status: "completed",

            version: "1.0"

        };

    }

    tokenize() {

        return this.testimony

            .replace(/[。，！？,.!?；;：:"“”‘’（）()【】\[\]\s]/g, "")

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

        const possibleObjects = [

            "人民",
            "国家",
            "政府",
            "党",
            "自由",
            "民主",
            "文明",
            "战争",
            "和平",
            "责任",
            "权利",
            "法律",
            "历史",
            "事实",
            "真相",
            "利益"

        ];

        return keywords

            .filter(item => possibleObjects.includes(item.word))

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

        return stopWords.includes(word);

    }

}

export default SearchEngine;
