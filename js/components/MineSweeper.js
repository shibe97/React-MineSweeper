import React from 'react';
import Table from './Table.js';

export default class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mineNum : 10,
            rowNum : 10,
            flagNum : 0,
            openNum : 0
        };
    }
    componentWillUpdate() {
        this.judge();
    }
    judge() {
        if(this.state.mineNum + this.state.openNum >= this.state.rowNum * this.state.rowNum){
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
    setEasy() {
        this.setState({mineNum: 10, rowNum: 10, openNum: 0, flagNum: 0});
    }
    setNormal() {
        this.setState({mineNum: 10, rowNum: 20, openNum: 0, flagNum: 0});
    }
    setHard() {
        this.setState({mineNum: 10, rowNum: 30, openNum: 0, flagNum: 0});
    }
    render() {
        return (
            <div className="MineSweeper">
                <div className="MineSweeper__level">
                    <label><input type="radio" name="level" onChange={this.setEasy.bind(this)} />easy</label>
                    <label><input type="radio" name="level" onChange={this.setNormal.bind(this)} />normal</label>
                    <label><input type="radio" name="level" onChange={this.setHard.bind(this)} />hard</label>
                </div>
                <p className="MineSweeper__openNum">open : {this.state.openNum}</p>
                <Table mineNum={this.state.mineNum} rowNum={this.state.rowNum} judge={this.judge.bind(this)} addOpenNum={this.addOpenNum.bind(this)}/>
            </div>
        );
    }
}
