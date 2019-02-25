import React from 'react';
import {Button, Input, message} from "antd";
import style from "./ForgetChangePassword.useable.less";
import {connect} from "react-redux";
import BaseComponent from "../../../../base/BaseComponent";
import common from "../../../../../utils/common";
import {md5} from "../../../../../utils/md5.js";
import * as api from "../../../../../api/api";
import logo from "../../../../img/logo.png";
import TitleBar from "../../../../../components/properties/pc/titlebar/TitleBar";
import Bottom from "../../../../../components/properties/pc/bottom/Bottom";
import {withRouter} from "react-router";
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
            api.resetPassword({k: key, newPassword: md5(psw)}).then(data => {
                message.success("修改成功");
                this.props.history.push(PATH.LOGIN+'');
            }).catch(e => {
                message.error(e);
            });
            return;
        }
        this.setState({
            error: "Two passwords are inconsistent"
        })
    };

    render() {
        const {email} = this.state;
        let resetPsw = null;
        try {
            resetPsw  = this.props.pageInfo.language.pc.reset_psw;
        }catch (e) {
            resetPsw = {
                confirm_psw: "",
                new_psw: "",
                submit: "",
                title: ""
            }
        }

        return <div>
            <TitleBar Breads={[{name: resetPsw.title, path: PATH.FORGETRESETPWD + ''}]}/>
            <div className={"forgetReset-pc"}>
                <div className={"email-input"}>
                    <input
                        disabled={true}
                        value={email}
                        type={"text"}/>
                </div>
                <div className={"password-input"}>
                    <input
                        placeholder={resetPsw.new_psw} value={this.state.psw} onChange={this.onPwdChange}
                        type={"password"}/>
                </div>
                <div className={"password-input"}>
                    <input
                        placeholder={resetPsw.confirm_psw} value={this.state.confirm} onChange={this.onConfirmPwdChange}
                        type={"password"}/>
                </div>
                <div className={"error"}>
                    {!!this.state.error && <div className={"content"}>{this.state.error}</div>}
                </div>
                <div>
                    <Button className={"sign-btn"} onClick={this.verify} type="primary">{resetPsw.submit}</Button>
                </div>
            </div>
            <Bottom/>
        </div>
    }

}


const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default withRouter(connect(mapStateToProps)(ForgetChangePassword));
