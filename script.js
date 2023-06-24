//your JS code here. If required.
 let currentPlayer = 1;
        let player1Name = '';
        let player2Name = '';

        function startGame() {
            player1Name = document.getElementById("player-1").value;
            player2Name = document.getElementById("player-2").value;

            if (player1Name.trim() === '' || player2Name.trim() === '') {
                alert('Please enter names for both players.');
                return;
            }

            document.getElementById("player-input").style.display = "none";
            document.getElementById("game-board").style.display = "block";

            updateMessage(`${player1Name}, you're up!`);
        }

        function makeMove(event) {
            const cell = event.target;

            if (cell.classList.contains('cell')) {
                if (cell.textContent === '') {
                    cell.textContent = currentPlayer === 1 ? 'X' : 'O';
                    cell.classList.add(currentPlayer === 1 ? 'x' : 'o');

                    if (checkWin()) {
                        const winner = currentPlayer === 1 ? player1Name : player2Name;
                        updateMessage(`${winner}, congratulations you won!`);
                        disableBoard();
                    } else if (checkDraw()) {
                        updateMessage('It\'s a draw!');
                        disableBoard();
                    } else {
                        currentPlayer = currentPlayer === 1 ? 2 : 1;
                        updateMessage(`${currentPlayer === 1 ? player1Name : player2Name}, you're up!`);
                    }
                }
            }
        }

        function updateMessage(message) {
            document.getElementById('message').textContent = message;
        }

        function disableBoard() {
            const cells = document.getElementsByClassName('cell');
            for (let i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', makeMove);
            }
        }

        function checkWin() {
            const winningCombinations = [
                [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
                [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
                [1, 5, 9], [3, 5, 7] // Diagonals
            ];

            const cells = document.getElementsByClassName('cell');

            for (let i = 0; i < winningCombinations.length; i++) {
                const [a, b, c] = winningCombinations[i];
                if (cells[a - 1].textContent !== '' && cells[a - 1].textContent === cells[b - 1].textContent && cells[b - 1].textContent === cells[c - 1].textContent) {
                    return true;
                }
            }

            return false;
        }

        function checkDraw() {
            const cells = document.getElementsByClassName('cell');
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === '') {
                    return false;
                }
            }
            return true;
        }