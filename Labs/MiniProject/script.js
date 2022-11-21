function elt(type, attrs, ...children) {
    let node = document.createElement(type)
    Object.keys(attrs).forEach(key => {
        node.setAttribute(key, attrs[key])
    })
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

function initGameBoard(rows = 6, cols = 7) {
    let board = elt("div", {class: "board"})
    for (i = 1; i <= rows; i++) {
        let row = elt("div", {class: "row"})
        for (j = 1; j <= cols; j++) {
            let field = elt("div", {class: "field"})
            row.appendChild(field)
        }
        board.appendChild(row)
    }
    return board
}

function addGamePiecesAtRandomPosition(color) {
    let piece = elt("div", {class: color + " piece"})
    let board = document.getElementsByClassName("board")[0]
    let row = board.children[Math.floor(Math.random() * board.children.length)]
    let field = row.children[Math.floor(Math.random() * row.children.length)]
    if (field.children.length !== 0) {
        addGamePiecesAtRandomPosition(color)
    }
    field.appendChild(piece)
}

window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(initGameBoard())
    window.localStorage.setItem("coord1", "tbd")
    addGamePiecesAtRandomPosition("red")
    addGamePiecesAtRandomPosition("blue")
});

