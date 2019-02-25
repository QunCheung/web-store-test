import React from 'react'
import Item from "../../../../components/properties/mobile/listItem/Item";
import img1 from "./img/22.png"
import img2 from "./img/23.png"
import style from "./Setting.useable.less";
import BaseComponent from "../../../base/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Button} from "antd";
import * as api from "../../../../api/api";
import Common from "../../../../utils/common";
import * as actions from "../../../../action/user_action";


class Setting extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            switchFlag: false
        }
    }


    onItemClick = (e) => {
        // console.log(e);
        switch (e.name) {
            case "Receive FS information":
                this.setState({
                    switchFlag: !this.state.switchFlag
                });
                break;
            default:
                this.props.onChangeProps(e);
                break;
        }
    };


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    render() {
        let settings = null;
        try {
            settings= this.props.pageInfo.language.mobile.my.settings;
        }catch (e) {
            settings = {
                profile:{title:""},
                country:"",
                language:"",
                policies:{title:""},
                out:"",
                receive_newsletters:""
            }
        }

        return <React.Fragment>
            <div className={"setting"} style={{height:window.innerHeight}}>
                <Item showIcon={false} actionKey={0} isShowLine={2} Message={settings.profile.title}
                      bindpage={"profile"} onItemClick={this.onItemClick}/>
                <Item showIcon={false} actionKey={0} isShowLine={2} Message={settings.country}
                      bindpage={"country"} onItemClick={this.onItemClick}/>
                <Item showIcon={false} actionKey={0} isShowLine={28} Message={settings.language}
                      bindpage={"language"} onItemClick={this.onItemClick}/>
                <Item showIcon={false} actionKey={0} isShowLine={28} Message={settings.receive_newsletters}
                      customRight={<img className={"switch-btn"} src={this.state.switchFlag ? img1 : img2}/>}
                      bindpage={"order"} onItemClick={this.onItemClick}/>
                <Item showIcon={false} actionKey={0} isShowLine={2} Message={settings.policies.title}
                      bindpage={"policies"} onItemClick={this.onItemClick}/>
                <Button onClick={() => {
                    api.logout({token: this.props.userInfo.userToken}).then(data => {
                        Common.setCookie("token", "");
                        this.props.dispatch(actions.updateUserToken({token: ""}));
                        this.props.history.push('/');
                        location.reload();
                    }).catch(e => {
                    });
                }}
                        className={"kalinga-font sign-btn sign-btn-def-margin"}
                        type="primary">{settings.out}</Button>}
            </div>

        </React.Fragment>
    }
}


const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(Setting));
