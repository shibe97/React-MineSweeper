import React from 'react';
import Table from './Table.js';

export default class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mineNum : 15,
            flagNum : 0,
            openNum : 0,
            mineTable : this.createTable()
        };
        this.setMine();
    }
    componentWillUpdate() {
        this.judge();
    }
    judge() {
        if(this.state.mineNum + this.state.openNum >= 100){
            alert("Congratulations!!");
        }
    }
    setMine(){
        var mineTable = this.state.mineTable;
        for(var i = 0; i < this.state.mineNum; i++){
            var cell = mineTable[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)];
            if(cell.hasMine){
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        this.setState({
            mineTable: mineTable
        });
    }
    addOpenNum() {
        this.setState({
            openNum : ++ this.state.openNum
        });
    }
    createTable() {
        var mineTable = [];
        for(var row = 0; row < 10; row++){
            mineTable.push([]);
            for(var col = 0; col < 10; col++){
                mineTable[row].push({
                    x : col,
                    y : row,
                    count : 0,
                    isOpened : false,
                    hasMine : false,
                    hasFlag : false
                });
            }
        }
        return mineTable;
    }
    render() {
        return (
            <div className="MineSweeper">
                <p className="MineSweeper__openNum">open : {this.state.openNum}</p>
                <Table rows={this.state.mineTable} judge={this.judge.bind(this)} addOpenNum={this.addOpenNum.bind(this)}/>
            </div>
        );
    }
}
