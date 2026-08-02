import CorrespondenceEngine from "./runtime/CorrespondenceEngine.js";

const runtimeObject = {
    objects: ["苹果"],
    definitions: ["一种水果"],
    evidences: ["超市里有苹果"]
};

const engine = new CorrespondenceEngine(runtimeObject);

console.log(engine.run());