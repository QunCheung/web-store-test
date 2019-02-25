import React from 'react';
import {connect} from "react-redux";
import BaseComponent from "../../../base/BaseComponent";
import Mobile from "./mobile/Login_mobile.jsx";
import PC from "../../pc/login/pc/Login_PC.jsx";
import common from "../../../../utils/common";


class Login extends BaseComponent {

    constructor(props) {
        super(props);
    }



    render() {
        let screen = this.props.pageInfo.screen;
        const userToken = this.props.userInfo.userToken;
        if (userToken) {
            this.props.history.push('/')
        }
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
    return {...state};
};


export default connect(mapStateToProps)(Login);

