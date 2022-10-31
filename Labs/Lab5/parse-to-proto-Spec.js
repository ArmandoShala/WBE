describe("parseToProto", function () {
    var parseToProto = require('../../lib/Lab5/parse-to-proto');
    var proto;
    var obj;
    var objValid = {type: "cat", name: "Mimi", age: 3, category: "animal"}
    var dataAsJson = {type: "cat", name: "Mimi", age: 3}
    var testData;
    // var proto = require('../../lib/Lab5/proto');
    // var parse = require('../../lib/Lab5/parse');
    // var fs = require('fs');
    // var path = require('path');
    // var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
    // var output = fs.readFileSync(path.join(__dirname, 'output.txt'), 'utf8');
    // var ast = parse(input);
    // var protoAst = parseToProto(ast);
    // var protoOutput = proto(protoAst);

    beforeEach(function () {
        proto = {category: "animal"}
        testData = '{"type": "cat", "name": "Mimi", "age": 3}';
    })


    it("should parse a JSON", function () {
        const mergedJSON = parseJSON(testData);
        expect(mergedJSON).toEqual(dataAsJson);
    })


    it("should merge a string and an object and assign the ", function () {
        obj = parseToProto(testData, proto);
        expect(obj).toEqual(objValid);
    });
});
