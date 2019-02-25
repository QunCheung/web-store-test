import React from 'react'
import {Component} from 'react'
import {Col, Row} from "antd";
import style from './GridTitle.useable.less'

export default class GridTitle extends Component {


    constructor(props) {
        super(props);
    }


    componentWillMount() {
        style.use();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        style.unuse();
    }


    render() {
        return <React.Fragment>
            <div className={this.props.className}>
                {this.props.title}
            </div>
        </React.Fragment>
    }

}