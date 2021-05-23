import React, {Component} from 'react';
import './style.css';
  
class Board extends Component {
    renderSquare(i) {
        var highlight = false;
        for(let index = 0; index < this.props.line.length; index ++) {
            if(i === this.props.line[index]){
                highlight = true;
            }
        }
        return (<Square 
            value={this.props.squares[i]} 
            onClick={() => {this.props.onClick(i)}}
            highlight = {highlight}
        />);
    }
    render() {
        const row = [];
        for(let i = 0; i < 9; i = i + 3){
            row.push(
                <div key = {i} className="board-row">
                    {this.renderSquare(i)}
                    {this.renderSquare(i + 1)}
                    {this.renderSquare(i + 2)}
                </div>
            )
        }
        return (
        <div>
            <div className="status">{this.props.status}</div>
            {row}
        </div>
        );
    }      
}

//只包含 render 方法且沒有自己 state 的 component 適合寫成 function component 
function Square(props) {
    return (
        <button className= {props.highlight ? "highlight" : "square" } onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Board;