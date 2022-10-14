
const oldAndLivingIter = (SCRIPTS) => {
    retArray = []
    SCRIPTS.forEach(script => {
        if (script.living && script.year < 0) {
            retArray.push(script.name);
        }
    })
    return retArray;
}
const oldAndLivingMap = (SCRIPTS) => SCRIPTS.filter(_ => _.living && _.year < 0).map(_ => _.name);

const oldAndLiving = (SCRIPTS) => oldAndLivingMap(SCRIPTS)

const numberOfCodes = (data) => data.ranges.reduce((previousValue, currentValue) => previousValue = previousValue + currentValue[1] - currentValue[0], 0);

const scriptOfSample1 = (sample, SCRIPTS) => {
    return SCRIPTS.find(_ => _.range).map(_ => _.name);
}

const scriptOfSample = (sample, SCRIPTS) => {
    const foundScript = SCRIPTS.find(_ => _.ranges.some(range => sample.codePointAt(0) >= range[0] && sample.codePointAt(0) <= range[1]));
    return foundScript ? foundScript.name : "unknown";
};


const scriptsInString = (string, SCRIPTS) => {
    let retObj = {};
    [...string].forEach(str => {
        let currScriptName = scriptOfSample(str, SCRIPTS);
        Object.hasOwn(retObj, currScriptName) ? retObj[currScriptName] += 1 : retObj[currScriptName] = 1
    });
    return retObj;
}

// console.log(SCRIPTS[3].ranges);
// console.log(oldAndLiving(SCRIPTS));
// console.log(numberOfCodes(SCRIPTS[3]))
// console.log(scriptOfSample("A", SCRIPTS), "Latin");
// console.log(scriptOfSample("英", SCRIPTS), "Han");
// console.log(scriptOfSample("я", SCRIPTS), "Cyrillic");
// console.log(scriptOfSample(" ", SCRIPTS), "unknown");
// console.log(scriptsInString('英国的狗说 "JavaScript", "тяв"', SCRIPTS))
// console.log(scriptsInString('https://pоstfinance.ch', SCRIPTS))


module.exports = {scriptOfSample}
