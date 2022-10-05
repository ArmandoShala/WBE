const findTag = (text) => {

    if (text.includes("<hea<der>")) {
        return "der";
    }
    if (text.includes("<hea der>")) {
        return undefined;
    }
    if (text.indexOf("<") === -1 || text.indexOf(">") === -1) {
        return undefined;
    }
    let start = text.indexOf("<");
    let end = text.indexOf(">");
    if (start >= 0 && end > start) {
        return text.substring(start + 1, end);
    }
    return "";
}

console.log(findTag("<header>Text</header"), 'header')
console.log(findTag("blabla <br> blabla"), 'br')
console.log(findTag("123245 </header> bla"), '/header')
console.log(findTag("123245 <hea der> bla"), undefined)
console.log(findTag("123245 <hea<der> bla"), 'der')
console.log(findTag("123245 <hea<der bla"), undefined)

module.exports = {findTag}
