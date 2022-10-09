require('./scripts.js')

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
    // find the name of the script that contains the given sample
    // return the name of the script
    // if no script contains the sample, return "No script found"
    let retVal = "No script found";
    SCRIPTS.forEach(script => {
        if (script.ranges.some(range => sample >= range[0] && sample <= range[1])) {
            retVal = script.name;
        }
    })
    return retVal;
}

// console.log(SCRIPTS[3].ranges);
// console.log(oldAndLiving(SCRIPTS));
// console.log(numberOfCodes(SCRIPTS[3]))

console.log(scriptOfSample("A", SCRIPTS), "Latin");
console.log(scriptOfSample("英", SCRIPTS), "Han");
console.log(scriptOfSample("я", SCRIPTS), "Cyrillic");

module.exports = {scriptOfSample}
