import React from 'react'
import style from './My_mobile.useable.less'
import Item from '../../../components/properties/mobile/listItem/Item.jsx'
import {connect} from "react-redux";
import BaseComponent from "../../base/BaseComponent";
import ToolBar from "../../../components/properties/mobile/toolbar/ToolBar";
import W0 from '../img/W0.png'
import W1 from '../img/W1.png'
import W2 from '../img/W2.png'
import W3 from '../img/W3.png'
import W4 from '../img/W4.png'
import W5 from '../img/W5.png'
import W6 from '../img/W6.png'
import W7 from '../img/W7.png'
import logo from "../../img/logo.png";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";

class My_mobile extends BaseComponent {


    constructor(props) {
        super(props);

    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    onItemClick = (e) => {
        this.startPage(PATH.I_ITEM + '?name=' + e.page + '&title=' + e.name);
    };

    startLogin = () => {
        this.startPage(PATH.LOGIN);
    };


    render() {
        const my = this.props.pageInfo.language.mobile.my;
        return <div className="my-container" style={{height: window.innerHeight, paddingBottom: 88}}>
            <ToolBar title={<span className={"toolbar-title-size"}>{my.title}</span>}
                     showRightIcon={false}
                     showLeftIcon={false}
            />
            <div className={"header-bg"}>
                {!this.props.userInfo.userToken ? <div className={"vertical-center-div"} onClick={this.startLogin}>
                    <img className={"img-size img-radius"}
                         src={W0}/>
                    <div className={"text-color login-text-size kalinga-font"} style={{marginTop: 36}}>
                        {my.sign}
                    </div>
                </div> : <div className={"vertical-center-div"}>
                    <img className={"img-size img-radius"}
                         src={this.props.userInfo.headPic}/>
                    <div className={"text-color login-text-size kalinga-font"} style={{marginTop: 36}}>
                        {this.props.userInfo.userName}
                    </div>
                </div>}
            </div>
            <Item showIcon={true} actionKey={0} isShowLine={2} Message={my.order.title} icon={W1}
                  bindpage={"order"} onItemClick={this.onItemClick}/>
            <Item bindpage={"favorites"} showIcon={true} actionKey={1} isShowLine={2} Message={my.favorites.title} icon={W2}
                  onItemClick={this.onItemClick}/>
            <Item showIcon={true} action Key={2} isShowLine={28} Message={my.recently_viewed.title} icon={W3}
                  bindpage={"recently_viewed"}
                  onItemClick={this.onItemClick}/>
            <Item showIcon={true} actionKey={3} isShowLine={28} Message={my.settings.title} icon={W4}
                  bindpage={"setting"} onItemClick={this.onItemClick}/>
            <Item showIcon={true} actionKey={4} isShowLine={2} Message={my.settings.call_service} icon={W5}
                  onItemClick={this.onItemClick}/>
            <Item bindpage={"Common_problem"} showIcon={true} actionKey={5} isShowLine={2} Message={my.settings.faq}
                  icon={W6}
                  onItemClick={this.onItemClick}/>
            <Item showIcon={true} actionKey={6} isShowLine={0} Message={my.settings.about} icon={W7}
                  bindpage={"about"}
                  onItemClick={this.onItemClick}/>
            <div style={{height: 100, width: "100%", background: "#ffffff"}}/>
        </div>
    }
}

const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(My_mobile));
