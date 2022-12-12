let state = {
    board: [],
    nextPlayer: "red"
};
let next = undefined
let board = undefined;

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

let showBoard = () => {
    const rows = state.board.map((row, rowIndex) => {
        const fields = row.map((field, fieldIndex) => {
            const classes = "field"
            const fieldElement = elt("div", {"class": classes, "data-row": rowIndex, "data-col": fieldIndex});
            if (field !== "" && "rb".includes(field)) {
                const colorClass = field === "r" ? "red" : "blue"
                const piece = elt("div", {class: colorClass + " piece", style: "z-index:-1"})
                fieldElement.appendChild(piece)
            }
            return fieldElement
        })
        return elt("div", {class: "row"}, ...fields)
    })
    board.innerHTML = ""
    board.append(...rows)
}

function initGame() {
    board = document.getElementsByClassName("board")[0]
    initState()
    showBoard()
    evaluateNextPlayer()
}

let initState = (rows = 6, cols = 7) => {
    state.board = Array(rows).fill('').map(_ => Array(cols).fill(''))
    state.nextPlayer = "red"
}

let evaluateNextPlayer = () => {
    next = next === "red" ? "blue" : "red"
    document.getElementById("nextPlayer").innerHTML = next;
    document.getElementById("nextPlayer").style.color = next;
}

let evaluateClickedField = (row, col) => {
    if (state.board[row][col] !== "") {
        alert("Field is already occupied!");
        return;
    }

    for (let i = state.board.length - 1; i >= 0; i--) {
        if (state.board[i][col] === "") {
            state.board[i][col] = next[0];
            break;
        }
    }

    evaluateNextPlayer();
    showBoard();
}

document.addEventListener('DOMContentLoaded', () => {
    initGame()
    document.body.addEventListener("click", () => {
        if ("field,piece".includes(event.target.classList)) {
            const row = event.target.dataset.row
            const col = event.target.dataset.col
            evaluateClickedField(row, col);
        }
    });

    document.getElementById("btnReset").addEventListener("click", () => {
        initState()
        showBoard()
        evaluateNextPlayer()
    })

});
