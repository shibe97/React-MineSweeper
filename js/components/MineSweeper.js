import React from 'react';
import Table from './Table.js';

export default class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minesNum : 0,
            flagsNum : 0,
            minesTable : this.createTable()
        };

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
                    hasMine : Math.random() > 0.85 ? true : false
                });
            }
        }
        return mineTable;
    }
    render() {
        return (
            <Table rows={this.state.minesTable} />
        );
    }
}
