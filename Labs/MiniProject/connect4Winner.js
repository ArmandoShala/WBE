export function connect4Winner(color, board) {
    // check for horizontal win
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (board[row][col] === color && board[row][col + 1] === color && board[row][col + 2] === color && board[row][col + 3] === color) {
                return true;
            }
        }
    }

// check for vertical win
    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === color && board[row + 1][col] === color && board[row + 2][col] === color && board[row + 3][col] === color) {
                return true;
            }
        }
    }

// check for diagonal win
    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (board[row][col] === color && board[row + 1][col + 1] === color && board[row + 2][col + 2] === color && board[row + 3][col + 3] === color) {
                return true;
            }
        }
    }

// check for anti diagonal win
    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 3; col < board[row].length; col++) {
            if (board[row][col] === color && board[row + 1][col - 1] === color && board[row + 2][col - 2] === color && board[row + 3][col - 3] === color) {
                return true;
            }
        }
    }

    return false
}

