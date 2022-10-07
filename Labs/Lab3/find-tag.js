const findTag = (text) => {

    if(!(text.includes("<") && text.includes(">"))){
        // it's not a tag if it doesn't have < and > in it
        return undefined;
    }

    if(!(text.indexOf("<") < text.indexOf(">"))){
        // There are < and > but they are not in the right order
        return undefined;
    }

    let start = text.indexOf("<");
    let end = text.indexOf(">");
    let extractedTag = "";
    if (start >= 0 && end > start) {
        extractedTag = text.substring(start + 1, end);
    }

    if(extractedTag.includes(" ")){
        // if the tag contains a space, it's not a tag
        return undefined;
    }

    if(extractedTag.includes("<")){
        extractedTag = findTag(extractedTag + ">");
    }

    return extractedTag;
}

console.log(findTag("<header>Text</header"), 'header')
console.log(findTag("blabla <br> blabla"), 'br')
console.log(findTag("123245 </header> bla"), '/header')
console.log(findTag("123245 <hea der> bla"), undefined)
console.log(findTag("123245 <hea<der> bla"), 'der')
console.log(findTag("123245 <hea<der bla"), undefined)

module.exports = {findTag}
