const assert = require('assert')

// const powerLecture = function (base, exponent) {
//     let result = 1
//     for (let count = 0; count < exponent; count++) {
//         result *= base
//     }
//     return result;
// }

// const powerA = function (base, exponent) {
//     if (exponent == 0) {
//         return 1;
//     } else {
//         return base * powerA(base, exponent - 1);
//     }
// }

// const powerB = function (base, exponent) {
//     if (exponent == 0) {
//         return 1;
//     } else if (exponent % 2 == 0) {
//         return powerB(base, exponent / 2) ** 2
//     } else {
//         return base * powerB(base, exponent - 1)
//     }
// }

// const powerC = function (base, exponent) {
//     console.assert(Number.isInteger(exponent), "Exponent is not an integer");
//     console.assert(exponent >= 0, "Exponent is negative");
//     console.assert(base != 0 || exponent != 0, "0^0 is undefined");
//     return "It'll work"
//     // do stuff
// }

const power = function (base, exponent) {
    assert.equal(Number.isInteger(base), true, "Base is not an integer")
    assert.equal(Number.isInteger(exponent), true, "Exponent is not an integer")
    assert.equal(exponent < 0, false, "Exponent is negative")
    if (exponent === 0 || (base === 0 && exponent === 0)) {
        return 1;
    } else if (exponent % 2 === 0) {
        return power(base, exponent / 2) ** 2
    } else {
        return base * power(base, exponent - 1)
    }
}

// const base = 2;
// const exponent = 0.6;
//
// const results = {
//     powerLecture: powerLecture(base, exponent),
//     powerA: powerA(base, exponent),
//     powerB: powerB(base, exponent),
//     powerC: powerC(base, exponent),
//     power: power(base, exponent),
// }
// console.table(results)
const base = 10;
const exponent = 4;
console.log(power(base, exponent))

module.exports = { power }
