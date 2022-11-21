let state = undefined;

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

//
// <div className="row">-->
//     <!--        <div class="field">-->
//     <!--            <div class="blue piece"></div>-->
//     <!--        </div>-->
//     <!--        <div class="field"></div>-->
//     <!--        <div class="field"></div>-->
//     <!--        <div class="field"></div>-->
//     <!--        <div class="field"></div>-->
//     <!--        <div class="field"></div>-->
//     <!--        <div class="field"></div>-->
//     <!--    </div>-->

showBoard = () => {
    const board = document.getElementsByClassName("board")[0]
    // for (let rows = 0; rows < state.length; rows++) {
    //     const row = elt("div", {class: "row"})
    //     for (let cols = 0; cols < state[rows].length; cols++) {
    //         const classes = "field"
    //         const field = elt("div", {"class": classes});
    //         if ("rb".includes(state[rows][cols]) && state[rows][cols] !== "") {
    //             const colorClass = state[rows][cols] === "r" ? "red" : "blue"
    //             const piece = elt("div", {class: colorClass + " piece"})
    //             field.appendChild(piece)
    //         }
    //         row.appendChild(field);
    //     }
    //     board.appendChild(row);
    // }
    // do the same as above but for in functional style
    // const board = document.getElementsByClassName("board")[0]
    const rows = state.map(row => {
        const fields = row.map(field => {
            const classes = "field"
            const fieldElement = elt("div", {"class": classes});
            if (field !== "" && "rb".includes(field)) {
                const colorClass = field === "r" ? "red" : "blue"
                const piece = elt("div", {class: colorClass + " piece"})
                fieldElement.appendChild(piece)
            }
            return fieldElement
        })
        return elt("div", {class: "row"}, ...fields)
    })
    board.innerHTML = ""
    board.append(...rows)
}

//set color of field
function setColorOfField(row, col) {

}

function initGame() {
    document.body.appendChild(elt("div", {class: "board"}))
    initState()
    showBoard()
}

/**
 * Insert a figure of the color at the given position. If the randomly
 * choosen position is already occupied, then clear the cell.
 * @param color
 */
function insertOrRemoveFigureAtRandomPlace(color) {
    const row = Math.floor(Math.random() * state.length)
    const col = Math.floor(Math.random() * state[0].length)
    state[row][col] = state[row][col] === "" ? color : ""
}



initState = (rows = 6, cols = 7) => {
    state = Array(rows).fill('').map(_ => Array(cols).fill(''))
    insertOrRemoveFigureAtRandomPlace("r")
    insertOrRemoveFigureAtRandomPlace("b")
}

window.addEventListener('DOMContentLoaded', () => {
    initGame()

    setInterval(() => {
        insertOrRemoveFigureAtRandomPlace("r")
        insertOrRemoveFigureAtRandomPlace("b")
        showBoard()
    }, 1000)

});

