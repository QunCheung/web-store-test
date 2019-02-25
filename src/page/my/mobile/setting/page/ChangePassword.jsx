import React from 'react';
import style from './ChangePassword.useable.less'
import {Button, Input} from "antd";
import * as api from "../../../../../api/api";
import {md5} from "../../../../../utils/md5";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";

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

    render() {
        const {current, newPsw, confirm} = this.state;
        let changePsw = null;

        try
        {
            changePsw = this.props.pageInfo.language.mobile.my.settings.profile.change_pwd;
        }catch (e) {
            changePsw= {
                current:"",new:"",confirm:"",submit:""
            }
        }
        return (
            <div className={"change-password"}>
                <Input placeholder={changePsw.current} value={current} onChange={(e) => {
                    this.setState({current: e.target.value})
                }}/>
                <Input placeholder={changePsw.new} value={newPsw} onChange={(e) => {
                    this.setState({newPsw: e.target.value})
                }}/>
                <Input placeholder={changePsw.confirm} value={confirm} onChange={(e) => {
                    this.setState({confirm: e.target.value})
                }}/>

                <Button className={"kalinga-font sign-btn"} onClick={this.submit} type="primary">{changePsw.submit}</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(ChangePassword));
