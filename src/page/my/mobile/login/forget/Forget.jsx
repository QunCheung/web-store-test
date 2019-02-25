import React from 'react';
import BaseComponent from "../../../../base/BaseComponent";
import ToolBar from "../../../../../components/properties/mobile/toolbar/ToolBar";
import style from "./Forget.useable.less";
import {Button, Input} from "antd";
import logo from "../../../../img/logo.png";
import * as api from "../../../../../api/api";

export default class Forget extends BaseComponent {

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    verify = () => {
        const {email} = this.state;
        if (email.match(/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/)) {
            this.sendForget();
        } else {
            this.setState({error: "Please enter a valid email"})
        }

    };

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value,
            error: ""
        })
    };


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: ""
        }
    }

    sendForget = () => {
        api.forgetPassword({email: this.state.email})
            .then(data => {
                this.setState({forget: false});
            })
            .catch(e => {

            })
    };

    render() {
        return <div className={"forget-page"}>
            <ToolBar showLeftIcon={true} title={<span className={"kalinga-font title"}>FORGOT PASSWORD</span>}/>
            <div className={"logo"}>
                <img className={"logo-size"} src={logo}/>
            </div>
            <Input onChange={this.onEmailChange} style={{fontSize: 32}} value={this.state.email}
                   className={"email-input nexal-font"}
                   placeholder="Please input the email address"
            />
            <div className={(!!this.state.error ? "error-msg" : "")}>
                {this.state.error}
            </div>
            {!this.state.error && <Button onClick={this.verify}
                                          className={"kalinga-font sign-btn sign-btn-def-margin"}
                                          type="primary">Next step</Button>}
            {!!this.state.error && <Button onClick={this.verify}
                                           className={"kalinga-font sign-btn sign-btn-error-margin"}
                                           type="primary">Next step</Button>}
        </div>
    }

}
