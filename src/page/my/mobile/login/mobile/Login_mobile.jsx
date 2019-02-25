import React from 'react';
import ToolBar from "../../../../../components/properties/mobile/toolbar/ToolBar";
import style from './Login_mobile.useable.less'
import {Button, Input, Tabs} from "antd";
import facebook from "../img/24.png";
import ins from "../img/25.png";
import twitter from "../img/26.png";
import {connect} from "react-redux";
import BaseComponent from "../../../../base/BaseComponent";
import img from '../img/line.png'
import img1 from '../img/16.png'
import img2 from '../img/17.png'
import * as md5 from "../../../../../utils/md5.js";
import * as api from "../../../../../api/api";
import common from "../../../../../utils/common";
import logo from "../../../../img/logo.png";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import InstagramLogin from "react-instagram-login";
import * as PATH from "../../../../../conts/path";

const TabPane = Tabs.TabPane;

class Login_mobile extends BaseComponent {

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    forgetPwd = () => {
        this.startPage(PATH.FORGET + "")
    };


    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            username: "",
            password: "",
            email: "",
            userCheck: false,
            emailCheck: false
        };
    }

    register = () => {
        const {userCheck, emailCheck} = this.state;
        if (!userCheck && !emailCheck) {
            return;
        }
        api.register({
            userName: this.state.username,
            email: this.state.email,
            password: md5.md5(this.state.password)
        }).then(data => {
            common.setCookie("token", data);
            location.reload()
        }).catch(e => {

        });
    };

    onUserLogin = () => {
        api.login({
            email: this.state.email,
            password: md5.md5(this.state.password)
        }).then(data => {
            common.setCookie("token", data);
            location.reload();
        }).catch(e => {
            console.log(e);
        });
    };

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    };


    onUserVerify = () => {
        api.checkUsername({userName: this.state.username})
            .then(data => {
                this.setState({userCheck: data});
                console.log(data);
            })
            .catch(e => {
            })
    };
    onEmailVerify = () => {
        api.checkEmail({email: this.state.email})
            .then(data => {
                console.log(data);
                this.setState({emailCheck: data});
            })
            .catch(e => {
            })
    };
    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        }, () => {
            this.verify();
        });
    };
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    verify = () => {
        const {email} = this.state;
        if (email.match(/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/) || !email) {
            this.setState({error: ""})
        } else {
            this.setState({error: "Please enter a valid email"})
        }
    };

    onTabChange = () => {
        this.setState({email: "", username: "", password: ""});
    };


    render() {
        let sign = "";
        let login = {
            title: "",
            login: "",
            email: "",
            psw: "",
            desc: "",
            forgot_password: {
                title: ""
            }
        };
        let register = {
            agreement: ["", "", "", ""],
            email: "",
            psw: "",
            register: "",
            username: "",
            title: ""
        };
        try {
            const my = this.props.pageInfo.language.mobile.my;
            sign = my.sign;
            login = my.login;
            register = my.register;
        } catch (e) {

        }

        return <div className={"login-page"}>
            <ToolBar showLeftIcon={true} title={<span className={"kalinga-font title"}>{sign}</span>}/>
            <div className={"logo"}>
                <img className={"logo-size"} src={logo}/>
            </div>
            <Tabs defaultActiveKey="1" tabBarGutter={188}>
                <TabPane tab={login.title} key="1">
                    <Input className={"username-input nexal-font"} value={this.state.email}
                           onChange={this.onEmailChange} onBlur={this.onEmailVerify} placeholder={login.email}/>
                    <Input style={{fontSize: 32}} className={"pwd-input nexal-font"}
                           value={this.state.password}
                           onChange={this.onPasswordChange}
                           suffix={<img className={"eye-size"} onClick={() => {
                               this.setState({isShowPassword: !this.state.isShowPassword})
                           }} src={!this.state.isShowPassword ? img2 : img1}/>}
                           placeholder={login.psw}
                           type={!this.state.isShowPassword ? "password" : "text"}/>
                    <div onClick={this.forgetPwd} className={"forget nexal-font"}>
                        <a>{login.forgot_password.title}</a>
                    </div>
                    <Button className={"kalinga-font sign-btn"} onClick={this.onUserLogin}
                            type="primary">{login.login}</Button>
                    <img src={img}/>
                    <div className={"login-icon-item"}>
                        <FacebookLogin
                            appId="1060993694091060"
                            autoLoad
                            callback={(e) => {
                                console.log(e);
                            }}
                            render={renderProps => (
                                <img onClick={renderProps.onClick} src={facebook}
                                     className={"login-icon-size login-icon-right"}/>
                            )}
                        />
                        <InstagramLogin
                            cssClass={"button"}
                            clientId="6a8a18f332054bdf8c80282f0fd03684"
                            onSuccess={this.responseInstagram}
                            onFailure={this.responseInstagram}
                        >
                            <img src={ins} className={"login-icon-size "}/>
                        </InstagramLogin>

                    </div>
                </TabPane>
                <TabPane tab={register.title} key="2">
                    <Input className={"username-input nexal-font"} value={this.state.username}
                           onChange={this.onUsernameChange} onBlur={this.onUserVerify} placeholder={register.username}/>
                    <Input className={"email-input nexal-font"} value={this.state.email} onChange={this.onEmailChange}
                           onBlur={this.onEmailVerify} placeholder={register.email}/>
                    <Input style={{fontSize: 32}} className={"pwd-input nexal-font"}
                           value={this.state.password} onChange={this.onPasswordChange}
                           suffix={<img className={"eye-size"} onClick={() => {
                               this.setState({isShowPassword: !this.state.isShowPassword})
                           }} src={!this.state.isShowPassword ? img2 : img1}/>} placeholder={register.psw}
                           type={!this.state.isShowPassword ? "password" : "text"}/>
                    <Button className={"kalinga-font sign-btn"} onClick={this.register}
                            type="primary">{register.register}</Button>
                    <div className={"login-icon-item agreement"}>
                        {register.agreement[0]} <span><a> {register.agreement[1]}</a></span> {register.agreement[2]}
                        <span><a> {register.agreement[3]}</a></span>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default connect(mapStateToProps)(Login_mobile);

