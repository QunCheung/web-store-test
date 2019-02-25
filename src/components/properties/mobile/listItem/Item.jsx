import React from 'react'
import {Icon} from "antd";
import style from './Item.useable.less'
import logo from "../../../../page/img/logo.png";

export default class Item extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    render() {
        return <React.Fragment>
            <div className={"items-container " + this.props.class}>
                <div className={"items-text-size"} onClick={(e) => {
                    this.props.onItemClick({
                        page: this.props.bindpage || "",
                        name: this.props.Message
                    });
                }}>
                    {this.props.showIcon &&
                    <img src={this.props.icon ? this.props.icon : logo}
                         className={"item-location margin-left-10"}/>}
                    <span
                        className={"item-location " + (this.props.showIcon ? "margin-left-30" : "")}>{this.props.Message}</span>
                    {this.props.customRight ?
                        <span className={"right-arrow-float margin-right-30"}>{this.props.customRight}</span> :
                        <Icon type="right" className={"right-arrow-float item-location margin-right-30"}/>}
                    {this.props.appendDom &&
                    <div className={"right-arrow-float append-item"}>{this.props.appendDom}</div>}
                </div>
            </div>
            {this.props.isShowLine === 2 ? <div className={"line-color line-size-2"}/> : <div/>}
            {this.props.isShowLine === 28 ? <div className={"line-color line-size-28"}/> : <div/>}

        </React.Fragment>
    }

}
