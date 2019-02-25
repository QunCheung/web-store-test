import React from 'react'
import {connect} from "react-redux";
import PC from "./pc/My_PC.jsx";
import Mobile from "./mobile/My_mobile.jsx";

class My extends React.Component {
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
        return <div>{dom}</div>;
    }
}


const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default connect(mapStateToProps)(My);
