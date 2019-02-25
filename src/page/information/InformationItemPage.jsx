import React from 'react'
import PC from "./pc/InformationItemPage.jsx";
import Mobile from "./mobile/InformationItemPage.jsx";
import {connect} from "react-redux";


class InformationItemPage extends React.Component {


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


export default connect(mapStateToProps)(InformationItemPage);
