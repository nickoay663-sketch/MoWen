class RecognitionEngine {

    constructor(text){
        this.text = text;
    }

    run(){

        const result = {
            originalText: this.text,
            objects: [],
            concepts: []
        };

        const objectWords = [
            "我",
            "你",
            "他",
            "她",
            "我们",
            "他们"
        ];

        const conceptWords = [
            "老师",
            "医生",
            "学生",
            "父亲",
            "母亲",
            "国家",
            "政府",
            "法律"
        ];

        objectWords.forEach(word=>{
            if(this.text.includes(word)){
                result.objects.push(word);
            }
        });

        conceptWords.forEach(word=>{
            if(this.text.includes(word)){
                result.concepts.push(word);
            }
        });

        return result;

    }

}

export default RecognitionEngine;
