import React, {Component} from 'react';
import './style.css';
import Board from './Board.js'
// JSX 用 {} 標示代表裡面是純 javascript
class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }
            ],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calWin(squares).result || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState(() => {
            return {
                // concat return a new array, it is better tahn push in React (immutable)
                history: history.concat([{
                    squares: squares,
                }]),
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length,
            }
        })
    }

    jumpTo(step) {
        this.setState(() => {
            return {
                stepNumber: step,
                xIsNext: (step % 2) === 0, 
            }
        })
    }

    reset() {
        this.setState(() => {
            return {
                history: [{
                    squares: Array(9).fill(null),
                }
                ],
                stepNumber: 0,
                xIsNext: true, 
            }
        }) 
    }

    calWin(squares){
        var count = 0;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (squares[line[0]] !== null && squares[line[1]] === squares[line[0]] && squares[line[2]] === squares[line[0]]){
                return {result: squares[line[0]], line: line};
            }  
        }
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== null) {
                count ++;
            }
        }
        if(count === 9)
            return {result: 'tie', line: []};
        return {result: null, line: []};    
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calWin(current.squares).result;
        const line = this.calWin(current.squares).line;
        const moves = history.map((item, index) => {
            const desc = index ?
            "Go to move #" + index :
            "Go to game start";
            return (
                <li key={index}>
                    <button onClick={() => {this.jumpTo(index)}}> {desc} </button>
                </li>
            )
        })
        const draw = (winner === "tie") ? <button onClick={() => {this.reset()}}> Draw </button> : null ;
        let status;
        if (winner) {
            if(winner === "tie") {
                status = "Tie";
            }else {
                status = "Winner: " + winner;
            }
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
        }
        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares = {current.squares}
                onClick = {(i) => this.handleClick(i)}
                status = {status}
                line = {line}
            />
            {draw}
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

export default Game;