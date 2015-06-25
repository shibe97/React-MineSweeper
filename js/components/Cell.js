import React from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMine : props.cell.hasMine,
            isOpened : props.cell.isOpened,
            count : 0,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpened : nextProps.cell.isOpened,
            count : nextProps.cell.count
        });
    }
    open() {
        this.props.open(this.props.cell);
    }
    judge() {
        if(this.state.hasMine){
            alert("Game Over");
        }
    }
    render() {
        var _this = this;
        var cell = () => {
            if(_this.state.isOpened){
                return (
                    <div className="Cell__cover Cell__cover--opened">
                        <span className={"Cell__number"+_this.state.count}>{_this.state.count}</span>
                    </div>            
                );
            } else {
                return (
                    <div className="Cell__cover"></div>            
                );
            }
        }();
        return (
            <td className="Cell" onClick={this.open.bind(this)}>
                {cell}
            </td>
        );
    }
}
