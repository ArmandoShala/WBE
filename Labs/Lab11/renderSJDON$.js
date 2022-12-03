const element = ["div", {style: "background: salmon"}, ["h1", "Hello World"], ["h2", {style: "text-align:right"}, "from our library"]]
let appRoot = document.getElementById("app");


renderSJDON = (element, parent) => {
    let [tag, props, ...children] = element;
    let node = document.createElement(tag);
    for (let prop in props) {
        node[prop] = props[prop];
    }


    for (let child of children) {
        if (typeof child === "string") {
            child = document.createTextNode(child);
        }
        node.appendChild(child);
    }
    parent.appendChild(node);
}

// obfuscate the above function
renderSJDON = (element, parent) => {
    let [tag, props, ...children] = element;
    let node = document.createElement(tag);
    for (let prop in props) {
        node[prop] = props[prop];
    }
    children.map(child => {
        if (typeof child === "string") {
            child = document.createTextNode(child);
        }
        node.appendChild(child);
    })
    parent.appendChild(node);
}



renderSJDON(element, appRoot)

