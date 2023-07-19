import css from "./style.css";

export const Ship = (length, hitNumber = 0) => {
  const hit = () => hitNumber += 1;
  const isSunk = () => length - hitNumber === 0;
  return {hit, isSunk}
}

export const Gameboard = (name) => {

    const player = name;
    const board = [];
    const allShips = [];

    const makeBoard = (() => {
        
        for (let i = 0; i < 10; i++) {
            let rows = [...Array(10)];
            
            board.push(rows);
        }
    
    })();

    function placeShip (position, length, rows, columns) {
        let newShip = Ship(length);
        if(position === 'vertical') {
            for (let i = 0; i < length; i++) {
                board[rows + i][columns] = newShip;
            }
        } else if(position === 'horizontal') {
            for (let i = 0; i < length; i++) {
                board[rows][columns + i] = newShip;
            }
        }
        allShips.push(newShip);
    }

    const receiveAttack = (board, rows, columns) => {
        if (typeof board[rows][columns] === 'object' && board[rows][columns] !== null) {
            board[rows][columns].hit();
            board[rows][columns] = 'O';
        } else {
            board[rows][columns] = 'X';
        }
        
    }

    const displayResult = () => {
        if(checkSunk(allShips) === true) {
            const result = document.querySelector('.result');
            if(player === 'Computer') {
                result.textContent = `You win!`;
            } else {
                result.textContent = `The computer wins!`;
            }
            let squares = document.querySelectorAll('.click');
            squares.forEach(square => {
                square.classList.remove('click');
                square.removeEventListener('click', addListener)
            });
        }
    }

    const checkSunk = (allShips) => {
        for (let i = 0; i < allShips.length; i++) {
            if(allShips[i].isSunk() === false) {
                return false;
            }
        }
        return true 
    }

    const randomMove = (board) => {
        let rows = 0;
        let columns = 0;
        
        do {
        rows = Math.floor(Math.random() * 10);
        columns = Math.floor(Math.random() * 10);
        }
        while (board[rows][columns] === 'X' || board[rows][columns] === 'O'); 

        receiveAttack(board, rows, columns);


    }

    const renderPCBoard = (board) => {
        const container = document.querySelector('.container')
        const replacedBoard = document.querySelector('.board');
        const containerBoard = document.createElement('div');
        containerBoard.classList.add('board');
        for(let i = 0; i < 10; i++) {
            let rows = document.createElement('div');
            rows.classList.add('rows');
            for (let j = 0; j < 10; j++) {
                let columns = document.createElement('div');
                columns.setAttribute('data-rows', i);
                columns.setAttribute('data-columns', j);
                columns.classList.add('square');
                columns.classList.add('cpu');
                if(board[i][j] === 'X') {
                    columns.style.backgroundColor = 'red';
                } else if (board[i][j] === 'O') {
                    columns.style.backgroundColor = 'blue';
                } else {
                    columns.textContent = '';
                }
                
                if(board[i][j] !== 'X' && board[i][j] !== 'O') {
                    columns.classList.add('click');
                    columns.addEventListener('click', addListener)
                }
                rows.appendChild(columns);
            }
            containerBoard.appendChild(rows);
            replacedBoard.replaceWith(containerBoard);
                
            }
            
        }
    
    const addListener = (e) => {
        let rowCoordinate = e.target.dataset.rows;
        let columnCoordinate = e.target.dataset.columns;
        receiveAttack(board, rowCoordinate, columnCoordinate);
        renderPCBoard(board);
        displayResult();
    }
    
    const renderBeginning = (board) => {
        const container = document.querySelector('.container')
        const replacedBoard = document.querySelector('.boardplayer');
        const containerBoard = document.createElement('div');
        containerBoard.classList.add('boardplayer');
        for(let i = 0; i < 10; i++) {
            let rows = document.createElement('div');
            rows.classList.add('rows');
            for (let j = 0; j < 10; j++) {
                let columns = document.createElement('div');
                columns.setAttribute('data-rows', i);
                columns.setAttribute('data-columns', j);
                columns.setAttribute('data-verticalrows', j);
                columns.setAttribute('data-verticalcolumns', i);
                columns.classList.add('square');
                columns.classList.add('five');
                columns.classList.add('four');
                columns.classList.add('two');
                columns.classList.add('one');

                if (board[i][j] === 'X') {
                    columns.style.backgroundColor = 'red';
                } else if (board[i][j] === 'O') {
                    columns.style.backgroundColor = 'blue';
                    columns.textContent = 'O';
                } else if (typeof board[i][j] === 'object' && board[i][j] !== null) {
                    columns.style.backgroundColor = 'blue';
                } else {
                    columns.textContent = '';
                }
                rows.appendChild(columns);
            }
            containerBoard.appendChild(rows);
            replacedBoard.replaceWith(containerBoard);
        }
    }
    
    const renderBeginningVertical = (board) => {
        const container = document.querySelector('.container')
        const replacedBoard = document.querySelector('.boardplayer');
        const containerBoard = document.createElement('div');
        containerBoard.classList.add('boardplayer');
        for(let i = 0; i < 10; i++) {
            let rows = document.createElement('div');
            rows.classList.add('rows');
            for (let j = 0; j < 10; j++) {
                let columns = document.createElement('div');
                columns.setAttribute('data-rows', i);
                columns.setAttribute('data-columns', j);
                columns.setAttribute('data-verticalrows', j);
                columns.setAttribute('data-verticalcolumns', i);
                columns.classList.add('square');
                columns.classList.add('five');
                columns.classList.add('four');
                columns.classList.add('two');
                columns.classList.add('one');

                if (board[j][i] === 'X') {
                    columns.style.backgroundColor = 'red';
                } else if (board[j][i] === 'O') {
                    columns.style.backgroundColor = 'blue';
                    columns.textContent = 'O';
                } else if (typeof board[j][i] === 'object' && board[j][i] !== null) {
                    columns.style.backgroundColor = 'blue';
                } else {
                    columns.textContent = '';
                }
                rows.appendChild(columns);
            }
            containerBoard.appendChild(rows);
            replacedBoard.replaceWith(containerBoard);
        }
    }
    
    
    
    const renderPlayerBoard = (board) => {
        const container = document.querySelector('.container')
        const replacedBoard = document.querySelector('.boardplayer');
        const containerBoard = document.createElement('div');
        containerBoard.classList.add('boardplayer');
        for(let i = 0; i < 10; i++) {
            let rows = document.createElement('div');
            rows.classList.add('rows');
            for (let j = 0; j < 10; j++) {
                let columns = document.createElement('div');
                columns.setAttribute('data-rows', i);
                columns.setAttribute('data-columns', j);
                columns.classList.add('square');
                if (board[i][j] === 'X') {
                    columns.style.backgroundColor = 'red';
                } else if (board[i][j] === 'O') {
                    columns.style.backgroundColor = 'blue';
                    columns.textContent = 'O';
                } else if (typeof board[i][j] === 'object' && board[i][j] !== null) {
                    columns.style.backgroundColor = 'blue';
                } else {
                    columns.textContent = '';
                }
                rows.appendChild(columns);
            }
            containerBoard.appendChild(rows);
            replacedBoard.replaceWith(containerBoard);
        }
    }

    return {board, allShips, placeShip, checkSunk, receiveAttack, randomMove, renderPlayerBoard, renderPCBoard, renderBeginning, renderBeginningVertical};
}

const Player = (name) => {

    const gameboard = Gameboard(name);

    return {name, gameboard}
}

const gameloop = (() => {
    
    // Create players
    const player = Player('Human');
    player.gameboard;
    const computer = Player('Computer');
    computer.gameboard;

    let vertical = false;
    let step = 1;
     // Render board
    player.gameboard.renderBeginning(player.gameboard.board);


    let boxes = document.querySelectorAll('.five');
    boxes.forEach(box => {box.addEventListener('click', clickShip)});

    let button = document.querySelector('button');
    button.addEventListener('click', changeVertical);

    function changeVertical() {
        console.log(step);
        vertical = true;
        player.gameboard.renderBeginningVertical(player.gameboard.board);

        let boardPlayer = document.querySelector('.boardplayer');
        boardPlayer.style.display = "flex";

        let rows = document.querySelectorAll('.rows');
 
        rows.forEach(row => {row.style.flexDirection = "column";});

        if (step === 1) {
            let boxes = document.querySelectorAll('.five');
            boxes.forEach(box => {box.addEventListener('click', clickShip)});
        } else if (step === 2) {
            let five = document.querySelectorAll('.five');
            five.forEach(box => {box.classList.remove('five');});
            let boxes = document.querySelectorAll('.four');
            boxes.forEach(box => {box.addEventListener('click', clickShipSecond)});
        } else if (step === 3) {
            let five = document.querySelectorAll('.five');
    
            five.forEach(box => {
                box.classList.remove('four');
                box.classList.remove('five');
            });

            let boxes = document.querySelectorAll('.two');
            boxes.forEach(box => {box.addEventListener('click', clickShipThird)});
        } else if (step === 4) {
            let five = document.querySelectorAll('.five');
    
            five.forEach(box => {
                box.classList.remove('four');
                box.classList.remove('five');
                box.classList.remove('two');
            });
            
            let boxes = document.querySelectorAll('.one');
            boxes.forEach(box => {box.addEventListener('click', clickShipFourth)});
        }
    }

    function clickShip(e) {
        
        let rows;
        let columns;

        if(vertical === true) {
            rows = e.target.dataset.verticalrows;
            columns = e.target.dataset.verticalcolumns;
            if ((parseInt(rows) + 4) < 10) {
            player.gameboard.placeShip('vertical', 5, parseInt(rows), parseInt(columns));    
             
            player.gameboard.renderBeginning(player.gameboard.board);
            
            let five = document.querySelectorAll('.five');
            five.forEach(box => {box.classList.remove('five');});
            
            let boxes = document.querySelectorAll('.four');
            boxes.forEach(box => {box.addEventListener('click', clickShipSecond)});
            vertical = false;
            
            let button = document.querySelector('button');
            button.addEventListener('click', changeVertical);

            step = 2;
            }
        }  else if (vertical === false) {
        
        let rows = e.target.dataset.rows;
        let columns = e.target.dataset.columns;
        

        if ((parseInt(columns) + 4) < 10) {
            player.gameboard.placeShip('horizontal', 5, parseInt(rows), parseInt(columns));
          
            player.gameboard.renderBeginning(player.gameboard.board);
                
            let five = document.querySelectorAll('.five');
            five.forEach(box => {box.classList.remove('five');});
            
            let boxes = document.querySelectorAll('.four');
            boxes.forEach(box => {box.addEventListener('click', clickShipSecond)});

            let button = document.querySelector('button');
            button.addEventListener('click', changeVertical);

            step = 2;
            }
        }  
        
    }


    function clickShipSecond(e) {
      
        let rows;
        let columns;

        if(vertical === true) {
            rows = e.target.dataset.verticalrows;
            columns = e.target.dataset.verticalcolumns;
            
            if (player.gameboard.board[parseInt(rows)][parseInt(columns)] === undefined && player.gameboard.board[parseInt(rows) + 1][parseInt(columns)] === undefined 
            && player.gameboard.board[parseInt(rows) + 2][parseInt(columns)] === undefined 
            && player.gameboard.board[parseInt(rows) + 3][parseInt(columns)] === undefined && (parseInt(rows) + 3) < 10) {
                player.gameboard.placeShip('vertical', 4, parseInt(rows), parseInt(columns));
                player.gameboard.renderBeginning(player.gameboard.board);
                let five = document.querySelectorAll('.five');
    
            five.forEach(box => {
                box.classList.remove('four');
                box.classList.remove('five');
            });
            
            let boxes = document.querySelectorAll('.two');
            boxes.forEach(box => {box.addEventListener('click', clickShipThird)});
            step = 3;
            } 

        }  else if (vertical === false) {
        
            let rows = e.target.dataset.rows;
            let columns = e.target.dataset.columns;
            
            if (player.gameboard.board[rows][parseInt(columns)] === undefined && player.gameboard.board[rows][parseInt(columns) + 1] === undefined 
                && player.gameboard.board[rows][parseInt(columns) + 2] === undefined 
                && player.gameboard.board[rows][parseInt(columns) + 3] === undefined && (parseInt(columns) + 3) < 10) {
                
                player.gameboard.placeShip('horizontal', 4, parseInt(rows), parseInt(columns));
                player.gameboard.renderBeginning(player.gameboard.board);
                let five = document.querySelectorAll('.five');
    
            five.forEach(box => {
                box.classList.remove('four');
                box.classList.remove('five');
            });
            
            let boxes = document.querySelectorAll('.two');
            boxes.forEach(box => {box.addEventListener('click', clickShipThird)});
            step = 3;
            } 
        }
    }


    function clickShipThird(e) {
       
        let rows;
        let columns;

        if(vertical === true) {
            rows = e.target.dataset.verticalrows;
            columns = e.target.dataset.verticalcolumns;
            
           
        if (player.gameboard.board[rows][parseInt(columns)] === undefined && player.gameboard.board[parseInt(rows) + 1][parseInt(columns)] === undefined 
        && (parseInt(rows) + 1) < 10) {
            player.gameboard.placeShip('vertical', 2, parseInt(rows), parseInt(columns));
            player.gameboard.renderBeginning(player.gameboard.board);
   
            let five = document.querySelectorAll('.five');
            five.forEach(box => {
            box.classList.remove('two');
            box.classList.remove('four');
            box.classList.remove('five');
            });
        
            
        let boxes = document.querySelectorAll('.one');
        
             boxes.forEach(box => {box.addEventListener('click', clickShipFourth)}); 
           let button = document.querySelector('button');
           button.remove();
        } 

        }  else if (vertical === false) {
        
            let rows = e.target.dataset.rows;
            let columns = e.target.dataset.columns;
        
            if (player.gameboard.board[rows][parseInt(columns)] === undefined && player.gameboard.board[rows][parseInt(columns) + 1] === undefined 
             && (parseInt(columns) + 1) < 10) {
                player.gameboard.placeShip('horizontal', 2, parseInt(rows), parseInt(columns));
                player.gameboard.renderBeginning(player.gameboard.board);
                
                let five = document.querySelectorAll('.five');
                five.forEach(box => {
                box.classList.remove('two');
                box.classList.remove('four');
                box.classList.remove('five');
                });

        let boxes = document.querySelectorAll('.one');
        
        boxes.forEach(box => {box.addEventListener('click', clickShipFourth)});
        
        let button = document.querySelector('button');
        button.remove();
            } 
        
        
        
    }
    }

    function clickShipFourth(e) {
        
        let rows = e.target.dataset.rows;
        let columns = e.target.dataset.columns;
        if (player.gameboard.board[rows][parseInt(columns)] === undefined) {
        player.gameboard.placeShip('horizontal', 1, parseInt(rows), parseInt(columns));
        player.gameboard.renderPlayerBoard(player.gameboard.board);
        let boxes = document.querySelectorAll('.boardplayer > .rows > .square');
        setEnemyShip(computer);

        let result = document.querySelector('.result');
        result.textContent = "Start targeting your opponent's board"

        let label = document.querySelector('.label');
        let playerlabel = document.createElement('div');
        let computerlabel = document.createElement('div');
        playerlabel.textContent = "Player's Board"
        computerlabel.textContent = "Computer's Board"

        label.appendChild(computerlabel);
        label.appendChild(playerlabel);

        let container = document.querySelector('.container');
        let boardDiv = document.createElement('div');
        boardDiv.classList.add('board');
        container.prepend(boardDiv);

        computer.gameboard.renderPCBoard(computer.gameboard.board);

        let click = document.querySelectorAll('.click');
    
        click.forEach(div => {div.addEventListener('click', enemyMove)});
        }
    }
  
    function setEnemyShip(computer) {
        computer.gameboard.placeShip((Math.random() < 0.5) ? 'vertical' : 'horizontal', 1, 0, Math.floor(Math.random() * 10));
        computer.gameboard.placeShip((Math.random() < 0.5) ? 'vertical' : 'horizontal', 2, 2, Math.floor(Math.random() * 9));
        computer.gameboard.placeShip((Math.random() < 0.5) ? 'vertical' : 'horizontal', 4, 4, Math.floor(Math.random() * 7));
        computer.gameboard.placeShip('horizontal', 5, 8, Math.floor(Math.random() * 4));
        console.log(computer.gameboard.board);
    }
    
    function enemyMove () {
        console.log('enemymove')
        player.gameboard.randomMove(player.gameboard.board);
        let sunk = player.gameboard.checkSunk(player.gameboard.allShips);
        player.gameboard.renderPlayerBoard(player.gameboard.board);
        if (sunk === true) {
            let result = document.querySelector('.result');
            result.textContent = 'The Computer Wins';
        } else { 
            let click = document.querySelectorAll('.click');
            click.forEach(div => {div.addEventListener('click', enemyMove)});
        }
    }
})();