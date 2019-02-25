import React from 'react'
import BaseComponent from "../base/BaseComponent";
import {connect} from "react-redux";
import PC from "./pc/InformationPage_PC.jsx";
import Mobile from "./mobile/InformationPage_mobile.jsx";

class InformationPage extends BaseComponent {


    constructor(props) {
        super(props);
    }


    componentWillMount() {
    }

    componentWillUnmount() {
    }


    render() {
        let screen = this.props.pageInfo.screen;
        let dom = null;
        if (screen === 1) {
            dom = <PC/>
        } else {
            dom = <Mobile/>
        }
        return <div>{dom}</div>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default connect(mapStateToProps)(InformationPage);
