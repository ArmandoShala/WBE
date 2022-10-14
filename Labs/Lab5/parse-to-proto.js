function parseToProto(unparsedJson, object) {
    const parsedJson = JSON.parse(unparsedJson);
    Object.keys(parsedJson).forEach(key => object[key] = parsedJson[key]);
    return object;
}

let proto = {category: "animal"}
let obj = parseToProto('{"type": "cat", "name": "Mimi", "age": 3}', proto);

console.log(obj.age);
console.log(obj.category);
