import React from 'react'
import {connect} from "react-redux";
import PC from "./pc/login/forget/ForgetChangePassword";
import Mobile from "./mobile/login/forget/ForgetChangePassword";

class ForgetChangePassword extends React.Component {
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


export default connect(mapStateToProps)(ForgetChangePassword);
