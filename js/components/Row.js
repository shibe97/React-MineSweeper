import React from 'react';
import Cell from './Cell.js';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells : props.cells
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            cells : nextProps.cells
        });
    }
    render(){
        console.log("render");
        var Cells = this.state.cells.map((cell, index) => {
            return(
                <Cell cell={cell} open={this.props.open} countMines={this.props.countMines} openAround={this.props.openAround} />
            );
        });
        return (
            <tr>
                {Cells}
            </tr>
        );
    }
}
