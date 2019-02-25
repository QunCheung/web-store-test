import React from 'react'
import {connect} from "react-redux";
import PC from "./pc/BrandPage.jsx";
import Mobile from "./mobile/BrandPage.jsx";

class BrandPage extends React.Component {


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

export default connect(mapStateToProps)(BrandPage);
