const equal = (obj1, obj2) => {
    if (obj1 === obj2) {
        return true;
    } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        if (obj1 === null || obj2 === null) {
            return false;
        } else if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        } else {
            for (const key of Object.keys(obj1)) {
                for (let key in obj1) {
                    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
                        return false;
                    }
                }
            }
            return true;
        }
    } else {
        return false;
    }
}
let emptyObj = {}

console.log(equal(16, 16), true)
console.log(equal("hi", "hi"), true)
console.log(equal({}, {}), true)
console.log(equal({a: 1, b: 2}, {b: 2, a: 1}), true)
console.log(equal({a: 1, b: 2}, {c: 3, b: 2, a: 1}), false)
console.log(equal({a: {}}, {a: {}}), false)
console.log(equal({a: emptyObj}, {a: emptyObj}), true)


module.exports = {equal}
