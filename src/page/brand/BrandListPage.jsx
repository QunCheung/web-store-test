import React from 'react'
import {connect} from "react-redux";
import BaseComponent from "../base/BaseComponent";
import PC from "./pc/BrandListPage_PC.jsx";
import Mobile from "./mobile/BrandListPage_Mobile.jsx";

class BrandListPage extends BaseComponent {


    constructor(props) {
        super(props);

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

export default connect(mapStateToProps)(BrandListPage);
