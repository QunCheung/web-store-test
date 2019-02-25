import React from 'react'
import style from "./Bottom.useable.less";
import facebook from './img/facebook.png'
import {connect} from "react-redux";
import Common from "../../../../utils/common";

class Bottom extends React.Component {


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    render() {
        let footer = null;
        try {
            footer = this.props.pageInfo.language.pc.footer;
        }catch (e) {
            footer = {
                FAQ: "",
                about_us: "",
                cantact: "",
                privacy_policy: "",
                terms_conditions: "",
            };
        }
        return <div className={"bottom"}>
            <div className={"title"}>{Common.getCookie("language") === "en" ? "CAN I HELP YOU ?":"有什么我能帮你的吗？"}</div>
            <div className={"help"}>
                <span>{footer.terms_conditions}</span>
                <span>{footer.privacy_policy}</span>
                <span>{footer.FAQ}</span>
                <span>{footer.cantact}</span>
                <span>{footer.about_us}</span>
            </div>
            <img onClick={()=>{
                window.open("https://www.facebook.com/fashionsafari.cc/")
            }} className={"third-party"} src={facebook}/>
        </div>
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(Bottom);
