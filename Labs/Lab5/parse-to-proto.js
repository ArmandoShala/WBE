/*
// Added tests here because I need to abegeben oder
describe('ParseToProto checker', function () {
    const {parseToProto} = require("../../parse-to-proto.js");
    let proto = {};
    let data = '{"type": "cat", "name": "Mimi", "age": 3}';


    it('Should be able to parse a string to a JSON', function () {
        // It is a stupid Idea to test library functions but here I am
        expect(JSON.parse(data)).not.toThrow("JSON Parse error");
        const newJSON = JSON.parse(data);
        expect(newJSON.type).toEqual("cat");
    });

    it('Should add another attribute to a valid JSON', function () {
        proto = {category: "animal"};
        const extendedData = parseToProto(data, proto);
        expect(extendedData.category).toEqual(proto.category)
    })

})
*/



function parseToProto(unparsedJson, object) {
    const parsedJson = parseJSON(unparsedJson);
    Object.keys(parsedJson).forEach(key => object[key] = parsedJson[key]);
    return object;
}

const parseJSON = (data) => JSON.parse(data);

let proto = {category: "animal"}
const data = '{"type": "cat", "name": "Mimi", "age": 3}';
let obj = parseToProto(data, proto);

console.log(obj.age);
console.log(obj.category);


module.exports = { parseToProto }
