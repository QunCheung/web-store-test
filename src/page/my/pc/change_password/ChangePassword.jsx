import React from 'react';
import style from "./ChangePassword.useable.less";
import placeholder from "../../img/profile_placeholder.png";
import {DatePicker, Input} from "antd";
import * as api from "../../../../api/api";
import {md5} from "../../../../utils/md5";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Common from "../../../../utils/common";
import * as actions from "../../../../action/user_action";
import * as PATH from "../../../../conts/path";


class ChangePassword extends React.Component {

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    constructor(props) {
        super(props);
        this.state = {
            current: "",
            newPsw: "",
            confirm: "",
            error: ""
        }
    }

    submit = () => {
        const {current, newPsw, confirm} = this.state;
        api.updatePassword({oldPassword: md5(current), newPassword: md5(newPsw)}).then(data => {
            this.logout();
        }).catch(e => {

        });
    };

    logout = () => {
        api.logout({token: this.props.userInfo.userToken}).then(data => {
            Common.setCookie("token", "");
            this.props.dispatch(actions.updateUserToken({token: ""}));
            this.props.history.push(PATH.LOGIN+'');
            location.reload();
        }).catch(e => {

        })
    };

    render() {
        const {error, current, newPsw, confirm} = this.state;
        const change_pwd = this.props.pageInfo.language.pc.my.change_pwd;
        return (
            <div className={"change-password"}>
                <table style={{"border-collapse": "separate", "border-spacing": "0 30px"}}>
                    <tr>
                        <td>{change_pwd.current}</td>
                        <td>
                            <Input type={"password"} value={current}
                                   onChange={(e) => {
                                       this.setState({current: e.target.value})
                                   }}/>
                        </td>
                    </tr>
                    <tr>
                        <td>{change_pwd.new}</td>
                        <td>
                            <Input type={"password"} value={newPsw}
                                   onChange={(e) => {
                                       this.setState({newPsw: e.target.value})
                                   }}/>
                        </td>
                    </tr>
                    <tr>
                        <td>{change_pwd.confirm}</td>
                        <td>
                            <Input type={"password"} value={confirm}
                                   onChange={(e) => {
                                       this.setState({confirm: e.target.value})
                                   }}/>
                        </td>
                    </tr>
                </table>
                <div className={"error-msg"}>{error}</div>
                <div onClick={this.submit} className={"submit-btn"}>
                    Submit
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(ChangePassword));
