import React from "react";
import {Icon, Input} from "antd";
import style from "./Search.useable.less";


export default class Search extends React.Component {


    constructor(props) {
        super(props)
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
            <div className="search-bg">
                <Icon type="google" className={"logo inline"}/>
                <div style={{marginLeft: 20}} className={"inline ant-input-div"}>
                    <Input
                        placeholder="请输入搜索内容"
                        className={"input-search"}
                        suffix={<Icon type="search" style={{fontSize:24}} />}
                    />
                </div>
            </div>
        </React.Fragment>
    }
}