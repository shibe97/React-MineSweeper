import React from 'react';
import Row from './Row.js';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows : this.props.rows
        };
    }
    open(cell) {
        var num = this.countMines(cell);
        var _rows = this.state.rows;
        _rows[cell.y][cell.x].isOpened = true;
        _rows[cell.y][cell.x].count = cell.hasMine ? "b" : num;
        this.setState({rows : _rows});
        if(!cell.hasMine && num === 0){
            this.openAround(cell);
        }
        if(cell.hasMine){
            alert("Game Over");
        }
        this.props.addOpenNum();
    }
    countMines(cell) {
        var aroundMinesNum = 0;
        for(var row = -1; row <= 1; row++){
            for(var col = -1; col <= 1; col++){
                if(cell.y-0 + row >= 0 && cell.x-0 + col >= 0 && cell.y-0 + row < this.props.rows.length && cell.x-0 + col < this.props.rows[0].length && this.props.rows[cell.y-0 + row][cell.x-0 + col].hasMine && !(row === 0 && col === 0)){
                    aroundMinesNum ++;
                }
            }
        }
        return aroundMinesNum;
    }
    openAround(cell){
        var _rows = this.state.rows;
        for(var row = -1; row <= 1; row++){
            for(var col = -1; col <= 1; col++){
                if(cell.y-0 + row >= 0 && cell.x-0 + col >= 0 && cell.y-0 + row < this.props.rows.length && cell.x-0 + col < this.props.rows[0].length && !this.props.rows[cell.y-0 + row][cell.x-0 + col].hasMine && !this.props.rows[cell.y-0 + row][cell.x-0 + col].isOpened){
                   this.open(_rows[cell.y-0 + row][cell.x-0 + col]);
                }
            }
        }
    }
    render() {
        var Rows = this.state.rows.map((row, index) => {
            return(
                <Row cells={row} open={this.open.bind(this)} countMines={this.countMines.bind(this)} openAround={this.openAround.bind(this)} />
            );
        });
        return(
            <table className="Table">
                {Rows}
            </table>
        );
    }
}
