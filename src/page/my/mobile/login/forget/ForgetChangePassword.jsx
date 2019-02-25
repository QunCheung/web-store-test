import React from 'react';
import ToolBar from "../../../../../components/properties/mobile/toolbar/ToolBar";
import {Button, Input} from "antd";
import style from "./ForgetChangePassword.useable.less";
import {connect} from "react-redux";
import BaseComponent from "../../../../base/BaseComponent";
import common from "../../../../../utils/common";
import {md5} from "../../../../../utils/md5.js";
import * as api from "../../../../../api/api";
import * as actions from "../../../../../action/user_action";
import logo from "../../../../img/logo.png";
import * as PATH from "../../../../../conts/path";


class ForgetChangePassword extends BaseComponent {

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    componentDidMount() {
        api.checkForgetPwdKey({k: this.state.key}).then(data => {
        }).catch(e => {
        })
    }

    constructor(props) {
        super(props);
        const key = common.getQueryString("k");
        const email = common.getQueryString("email");
        this.state = {
            key,
            email,
            psw: "",
            confirm: "",
            error: ""
        }
    }

    onPwdChange = (e) => {
        const value = e.target.value.replace(/\s+/g, "");
        this.setState({
            psw: value,
            error: ""
        })
    };

    onConfirmPwdChange = (e) => {
        this.setState({
            confirm: e.target.value.replace(/\s+/g, ""),
            error: ""
        })
    };

    verify = () => {
        const {psw, confirm, key} = this.state;
        if (psw === confirm) {
            api.resetPassword({k:key, newPassword: md5(psw)}).then(data => {
                this.startPage(PATH.LOGIN+"");
            }).catch(e => {

            });
        } else {
            this.setState({
                error: "Two passwords are inconsistent"
            })
        }
    };

    render() {
        const {email} = this.state;
        let resetPsw = null;
        try {
            resetPsw  = this.props.pageInfo.language.mobile.my.reset_psw;
        }catch (e) {
            resetPsw = {
                confirm_psw: "",
                new_psw: "",
                submit: "",
                title: ""
            }
        }
        return <div className={"forgetReset-page"}>
            <ToolBar showLeftIcon={false} title={<span className={"kalinga-font title"}>{resetPsw.title}</span>}/>
            <div className={"logo"}>
                <img className={"logo-size"} src={logo}/>
            </div>
            <div className={"email nexal-font"}>
                {email}
            </div>
            <Input onChange={this.onPwdChange} style={{fontSize: 32}} value={this.state.psw}
                   className={"psw-input nexal-font " + (this.state.error ? "error-border" : "border")}
                   placeholder={resetPsw.new_psw}
                   type={"password"}
            />
            <Input onChange={this.onConfirmPwdChange} style={{fontSize: 32}} value={this.state.confirm}
                   className={"psw-input nexal-font " + (this.state.error ? "error-border" : "border")}
                   placeholder={resetPsw.confirm_psw}
                   type={"password"}
            />
            <div className={"error-msg  nexal-font"}>
                {this.state.error}
            </div>

            {!this.state.error && <Button onClick={this.verify}
                                          className={"kalinga-font sign-btn sign-btn-def-margin"}
                                          type="primary">{resetPsw.submit}</Button>}
            {!!this.state.error && <Button onClick={this.verify}
                                           className={"kalinga-font sign-btn sign-btn-error-margin"}
                                           type="primary">{resetPsw.submit}</Button>}
        </div>
    }

}


const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default connect(mapStateToProps)(ForgetChangePassword);
