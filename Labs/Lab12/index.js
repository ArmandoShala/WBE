import {render} from "./suiweb.js";

const initState = {
    board: [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ],
    current: "b",
    winner: "",
};

let rows = initState.board.length;
let columns = initState.board[0].length;
let state = JSON.parse(JSON.stringify(initState));
const playground = document.querySelector("#playground");
let prevMoves = [];

const board = ({board}) => {
    let fields = [].concat(...board).map((type, index) =>
        [determineFieldColor, {type}, {props: {id: index}}]
    );
    return ["div", {className: "playground"}, ...fields];
};

const determineFieldColor = ({type, props}) => {
    var colorId = type === "" ? "" : type === "b" ? "blue" : "red";
    return ["div", {className: "field", id: props.id}, ["div", {className: "piece " + colorId}]];
};

function connect4() {
    return [board, {board: state.board}]
}

function changePlayer() {
    state.current = state.current === "r" ? "b" : "r";
    document.getElementById("gameInfo").innerHTML = `Current player is ${state.current}`;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("save").addEventListener("click", save);
    document.getElementById("load").addEventListener("click", load);
    document.getElementById("undo").addEventListener("click", undoLastMove);
    document.getElementById("newgame").addEventListener("click", startNewGame);
    start();
}, false);

function generateBoard() {
    // fixme: make it work with this function
    for (let i = 0; i < rows; i++) {
        initState.board.push([]);
        for (let j = 0; j < columns; j++) {
            initState.board[i].push("");
        }
    }
}

function start() {
    show().addEventListener("click", (e) => {
        if (state.winner) return;
        if (addPiece(e)) {
            show();
            changePlayer();
            stashMove();
            checkWinner();
        } else {
            prevMoves.pop();
        }
    });
}

function addPiece(e) {
    const target = e.target;
    let selectedField = undefined;
    if (target.classList.contains("field")) {
        selectedField = target;
    } else if (target.classList.contains("piece")) {
        selectedField = target.parentElement;
    } else {
        return;
    }
    const id = selectedField.getAttribute("id");
    const index = parseInt(id);
    const column = index % state.board[0].length;
    for (let row = state.board.length - 1; row >= 0; row--) {
        if (state.board[row][column] === "") {
            state.board[row][column] = state.current;
            return true;
        }
    }

    return false;
}

function stashMove() {
    prevMoves.push(JSON.parse(JSON.stringify(state)));
}

function show() {
    render([connect4], playground);
    return playground;
}


function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            checkWinnerHelper(r, c, 0, 1); // horizontal
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            checkWinnerHelper(r, c, 1, 1); // anti-diagonal
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            checkWinnerHelper(r, c, -1, 1); // diagonal
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            checkWinnerHelper(r, c, 1, 0); // vertical
        }
    }
    // fixme: make it work with this function
    // checkWinnerHelperOptimized(0, 0, 1, 1, rows, columns, 0); // horizontal
    // checkWinnerHelperOptimized(0, 0, 1, 1, rows, columns, -3); // anti-diagonal
    // checkWinnerHelperOptimized(3, 0, -1, 1, rows, columns, 0); // diagonal
    // checkWinnerHelperOptimized(0, 0, 1, 0, columns, rows, 0); // vertical
}

function checkWinnerHelper(r, c, rInc, cInc) {
    if (state.board[r][c] !== '') {
        if (state.board[r][c] === state.board[r + rInc][c + cInc] && state.board[r + rInc][c + cInc] === state.board[r + rInc * 2][c + cInc * 2] && state.board[r + rInc * 2][c + cInc * 2] === state.board[r + rInc * 3][c + cInc * 3]) {
            setWinner(r, c);
        }
    }
}

function checkWinnerHelperOptimized(r, c, rInc, cInc, firstLoop, secondLoop, offsetFirstLoop, offsetSecondLoop = -3) {
    for (c; c < firstLoop + offsetFirstLoop; c++) {
        for (r; r < secondLoop + offsetSecondLoop; r++) {
            if (state.board[r][c] !== ' ') {
                if (state.board[r][c] === state.board[r + rInc][c + cInc] && state.board[r + rInc][c + cInc] === state.board[r + rInc * 2][c + cInc * 2] && state.board[r + rInc * 2][c + cInc * 2] === state.board[r + rInc * 3][c + cInc * 3]) {
                    setWinner(r, c);
                }
            }
        }
    }
}

function setWinner(r, c) {
    state.winner = state.board[r][c];
    document.getElementById("gameInfo").innerHTML = `Winner is ${state.board[r][c]}`;
}


function load() {
    stashMove();
    state = loadState("state");
    prevMoves = loadState("moves");
    show();
}

function save() {
    storeState("state", state);
    storeState("prevMoves", prevMoves);
}

function undoLastMove() {
    if (!prevMoves && prevMoves.length <= 0) {
        return;
    }
    state = prevMoves.pop();
    changePlayer();
    show();
}

function startNewGame() {
    stashMove();
    state = JSON.parse(JSON.stringify(initState));
    show();
    changePlayer();
}

function storeState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadState(key) {
    return JSON.parse(localStorage.getItem(key));
}
