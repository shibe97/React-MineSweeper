import React from 'react';
import Table from './Table.js';

export default class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "easy",
            mineNum : 10,
            rowNum : 10,
            flagNum : 0,
            openNum : 0,
            time : 0
        };
    }
    componentWillUpdate() {
        this.judge();
    }
    componentWillMount() {
        this.intervals = [];
    }
    componentWillUnmount() {
        this.intervals.map(clearInterval);
    }
    componentDidMount() {
        this.setInterval(this.tick.bind(this), 1000);
    }
    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments));
    }
    tick() {
        this.setState({time: this.state.time + 1});
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
        this.setState({level: "easy", mineNum: 10, rowNum: 10, openNum: 0, flagNum: 0, time: 0});
    }
    setNormal() {
        this.setState({level: "normal", mineNum: 40, rowNum: 16, openNum: 0, flagNum: 0, time: 0});
    }
    setHard() {
        this.setState({level: "hard", mineNum: 100, rowNum: 22, openNum: 0, flagNum: 0, time: 0});
    }
    render() {
        return (
            <div>
                <div className="MineSweeper__level">
                    <label><input type="radio" name="level" onChange={this.setEasy.bind(this)} />easy</label>
                    <label><input type="radio" name="level" onChange={this.setNormal.bind(this)} />normal</label>
                    <label><input type="radio" name="level" onChange={this.setHard.bind(this)} />hard</label>
                </div>
                <div className={"MineSweeper " + this.state.level}>
                    <span className="MineSweeper__openNum"> {this.state.openNum}</span>
                    <span className="MineSweeper__time"> {this.state.time}</span>
                    <Table mineNum={this.state.mineNum} rowNum={this.state.rowNum} judge={this.judge.bind(this)} addOpenNum={this.addOpenNum.bind(this)}/>
                </div>
            </div>
        );
    }
}
