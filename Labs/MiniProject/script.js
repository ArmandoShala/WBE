const SERVICE = "http://localhost:3000/api/data/c4state?api-key=c4game"
let state = {
    board: [],
    nextPlayer: "red"
};
let nextPlayer = undefined
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

showBoard = () => {
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

/**
 * Insert a figure of the color at the given position. If the randomly
 * choosen position is already occupied, then clear the cell.
 * @param color
 * @deprecated use evaluateClickedField instead
 */
function insertOrRemoveFigureAtRandomPlace(color) {
    // this method is not used in the current version of the game, but it may be useful in the future to implement a bot
    const row = Math.floor(Math.random() * state.board)
    const col = Math.floor(Math.random() * state.board[0].length)
    state[row][col] = state[row][col] === "" ? color[0] : ""
}

initState = (rows = 6, cols = 7) => {
    state.board = Array(rows).fill('').map(_ => Array(cols).fill(''))
    state.nextPlayer = "red"
}

evaluateNextPlayer = () => {
    nextPlayer = nextPlayer === "red" ? "blue" : "red"
    document.getElementById("nextPlayer").innerHTML = nextPlayer;
    document.getElementById("nextPlayer").style.color = nextPlayer;
}

evaluateClickedField = (row, col) => {
    if (state.board[row][col] !== "") {
        alert("Field is already occupied!");
        return;
    }

    // fixme: optimize this loop
    for (let i = state.board.length - 1; i >= 0; i--) {
        if (state.board[i][col] === "") {
            state.board[i][col] = nextPlayer[0];
            break;
        }
    }

    evaluateNextPlayer();
    showBoard();
}

window.addEventListener('DOMContentLoaded', () => {
    initGame()
    document.body.addEventListener("click", () => {
        if ("field,piece".includes(event.target.classList)) {
            // fixme: dont use event (Deprecated symbol used, consult docs for better alternative)
            const row = event.target.dataset.row
            const col = event.target.dataset.col
            evaluateClickedField(row, col)
        }
    });

    document.getElementById("btnReset").addEventListener("click", () => {
        initState()
        showBoard()
        evaluateNextPlayer()
    })

});
