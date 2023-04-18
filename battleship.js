const board = [
    ['O', 1, 'X', 'X', 'O'],
    ['O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 2, 'O', 'O'],
    ['O', 'O', 2, 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O']
]

const checkBoatState = (boat, x, y, board) => {
    let boatAlive = false;

    board.forEach(r => {
        for (let j = 0; j < board[0].length; j++) {
            if (r[j] === boat) {
                console.log(`Boat ${boat} is still alive`);
                boatAlive = true;
            }
        }
    });

    if (!boatAlive) {
        console.log(`Boat ${boat} is dead`);
    }
};

const checkWin = (board) => {
    let winState = true;

    board.forEach(r => {
        console.log(`row: `, r);
        for (let j = 0; j < board[0].length; j++) {
            console.log(`cell ${j}: `, r[j]);
            if (!isNaN(r[j])) {
                winState = false;
            }
        }
    });

    return winState;
}

const attack = (x, y, board) => {
    if (x < 0 || x > board.length || y < 0 || y > board[0].length) {
        console.log('Invalid coordinates');
    }
    if (board[x][y] === 'O') {
        console.log('Miss');
    }
    if (board[x][y] === 'X') {
        console.log('Already hit');
    }
    if (!isNaN(board[x][y])) {
        const boat = board[x][y];
        board[x][y] = 'X';
        console.log('Hit');

        checkBoatState(boat, x, y, board);
    }

    return checkWin(board) ? 'Win' : 'Continue';
}

console.log(attack(0, 1, board));