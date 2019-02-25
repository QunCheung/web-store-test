import React from 'react';
import TitleBar from "../../../../../components/properties/pc/titlebar/TitleBar";
import {Button, Icon, Input, Tabs, message, Modal} from "antd";
import Bottom from "../../../../../components/properties/pc/bottom/Bottom";
import style from "./Login_PC.useable.less";
import * as api from "../../../../../api/api";
import * as md5 from "../../../../../utils/md5.js";
import common from "../../../../../utils/common";
import Success from '../img/success.png'
import ReactDom from 'react-dom';

const TabPane = Tabs.TabPane;
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import InstagramLogin from 'react-instagram-login';
import * as PATH from "../../../../../conts/path";
import connect from "react-redux/es/connect/connect";

class Login_PC extends React.Component {


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    constructor(props) {
        super(props);
        this.state = {
            error: "",
            forget: false,
            username: "",
            password: "",
            email: "",
            userCheck: false,
            emailCheck: false,
            forgetEmail: "",
            forgetError: "",
            forgetCheckSuccess: false
        }

    }

    forgetPwd = () => {
        this.setState({
            forget: !this.state.forget,
            forgetEmail: "",
            forgetCheckSuccess: false
        });
    };


    register = () => {
        const {userCheck, emailCheck} = this.state;
        if (!userCheck && !emailCheck) {
            message.error('Please enter the correct one username and email');
            return;
        }
        api.register({
            userName: this.state.username,
            email: this.state.email,
            password: md5.md5(this.state.password)
        }).then(data => {
            message.success('register user success ,please wait 2s reload');
            common.setCookie("token", data);
            window.setTimeout(() => {
                window.location.reload()
            }, 1000);
        }).catch(e => {
            message.error(e)
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
            message.error(e)
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
    responseInstagram = (response) => {
        console.log(response);
    }

    /**
     * https://www.npmjs.com/package/react-facebook-login
     * https://www.npmjs.com/package/react-instagram-login
     * @returns {*}
     */
    render() {
        let sign_in = null;
        let register = null;
        let fogot_psw = null;
        try {
            register = this.props.pageInfo.language.pc.register;
            sign_in = this.props.pageInfo.language.pc.sign_in;
            fogot_psw = this.props.pageInfo.language.error.fogot_psw;
        } catch (e) {
            sign_in = {
                email: "",
                forgot_password: {
                    submit: "",
                    placeholder: "",
                    title: ""
                },
                login: "",
                psw: "",
                title: ""
            };

            register = {
                agreement: ["", "", "", ""],
                email: "",
                psw: "",
                register: "",
                title: "",
                username: ""
            };
        }

        return (
            <React.Fragment>
                <div>
                    <TitleBar Breads={[{path: PATH.LOGIN + "", name: sign_in.title + " / " + register.title}]}/>
                    <div className={"login"}
                    >
                        <Tabs defaultActiveKey="1" tabBarGutter={130} onChange={this.onTabChange}>
                            <TabPane tab={sign_in.title} key="1">
                                <div className={"username-input"}>
                                    <input placeholder={sign_in.email} value={this.state.email}
                                           onChange={this.onEmailChange} onBlur={this.onEmailVerify}/>
                                </div>
                                <div className={"password-input"}>
                                    <input
                                        placeholder={sign_in.psw} value={this.state.password}
                                        onChange={this.onPasswordChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                this.onUserLogin();
                                            }
                                        }}
                                        type={"password"}/>
                                </div>
                                <div className={"error"}>
                                    {!!this.state.error && <div className={"content"}>{this.state.error}</div>}
                                </div>
                                <div>
                                    <Button onClick={this.onUserLogin} className={"sign-btn"}
                                            type="primary">{sign_in.login}</Button>
                                </div>
                                <div className={"forget-desc"} onClick={this.forgetPwd}>
                                    <a>{sign_in.forgot_password.title}</a>
                                </div>
                            </TabPane>
                            <TabPane tab={register.title} key="2">
                                <div className={"username-input"}>
                                    <input placeholder={register.username} value={this.state.username}
                                           onChange={this.onUsernameChange} onBlur={this.onUserVerify}/>
                                </div>
                                <div className={"email-input"}>
                                    <input placeholder={register.email} value={this.state.email}
                                           onChange={this.onEmailChange}
                                           onBlur={this.onEmailVerify}/>
                                </div>
                                <div className={"password-input"}>
                                    <input
                                        placeholder={register.psw} value={this.state.password}
                                        onChange={this.onPasswordChange}
                                        type={"password"}/>
                                </div>
                                <div className={"error"}>
                                    {!!this.state.error && <div className={"content"}>{this.state.error}</div>}
                                </div>
                                <div>
                                    <Button className={"sign-btn"} onClick={this.register}
                                            type="primary">{register.register}</Button>
                                </div>
                                <div className={"policy"}>
                                    {register.agreement[0]}<span><a>{register.agreement[1]}</a></span> {register.agreement[2]}
                                    <span><a>{register.agreement[3]}</a></span>
                                </div>
                                <div className={"three-register"}>
                                    <FacebookLogin
                                        appId="1060993694091060"
                                        autoLoad
                                        callback={(e) => {
                                            console.log(e);
                                        }}
                                        render={renderProps => (
                                            <span onClick={renderProps.onClick} className={"facebook"}>facebook</span>
                                        )}
                                    />
                                    <InstagramLogin
                                        cssClass={"button"}
                                        clientId="6a8a18f332054bdf8c80282f0fd03684"
                                        onSuccess={this.responseInstagram}
                                        onFailure={this.responseInstagram}
                                    >
                                        <span className={"ins"}>instagram</span>
                                    </InstagramLogin>

                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                <Modal
                    title={null}
                    visible={this.state.forget}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    centered={true}
                    closable={false}
                >
                    <div className={"dialog-container"}>
                        {this.state.forgetCheckSuccess ?
                            <div className={"content"}>
                                <img className={"success-img"} src={Success}/>
                                <div className={"success-text"}>
                                    {fogot_psw.EMAIL_SENT}
                                </div>
                                <div className={"close"} onClick={this.forgetPwd}>
                                    <Icon type="close"/>
                                </div>
                            </div> :
                            <div className={"content"}>
                                <div className={"title"}>
                                    {sign_in.forgot_password.title}
                                </div>
                                <div className={"msg"}>
                                    {sign_in.forgot_password.placeholder}
                                </div>
                                <div>
                                    <input value={this.state.forgetEmail}
                                           onChange={(e) => {
                                               this.setState({forgetEmail: e.target.value})
                                           }}/>
                                </div>
                                <div className={"forget-error"}>
                                    {
                                        this.state.forgetError
                                    }
                                </div>
                                <div>
                                    <Button className={"send"} onClick={this.sendForget}
                                            type="primary">{sign_in.forgot_password.submit}</Button>
                                </div>
                                <div className={"close"} onClick={this.forgetPwd}>
                                    <Icon type="close"/>
                                </div>
                            </div>}
                    </div>
                </Modal>
            </React.Fragment>
        );
    }

    sendForget = () => {
        api.forgetPassword({email: this.state.forgetEmail})
            .then(data => {
                this.setState({forgetCheckSuccess: true, forgetEmail: ""});
            })
            .catch(e => {
                this.setState({forgetError: e})
            })
    }
}

const mapStateToProps = state => {
    return {...state};
};


export default connect(mapStateToProps)(Login_PC);
