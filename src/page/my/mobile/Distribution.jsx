import React from 'react'
import Order from "./order/Order";
import Setting from "./setting/Setting";
import Favorites from "./favorites/Favorites";
import CommonProblem from "./common_problem/CommonProblem";
import Country from "./setting/page/Country";
import Language from "./setting/page/Language";
import Policies from "./setting/page/Policies";
import About from "./about/About";
import Profile from "./setting/page/Profile";
import ChangePassword from "./setting/page/ChangePassword";
import Recently_Viewed from "./recently_viewed/Recently_Viewed";


export default class Distribution extends React.Component {

    getComponents = (currentNode) => {
        switch (currentNode) {
            case "order":
                return <Order/>;
            case "setting":
                return <Setting onChangeProps={this.props.onChangeProps}/>;
            case "favorites":
                return <Favorites onRightDom={this.props.onRightDom}/>;
            case "Common_problem":
                return <CommonProblem/>;
            case "country":
                return <Country/>;
            case "language":
                return <Language/>;
            case "policies":
                return <Policies onChangeProps={this.props.onChangeProps}/>;
            case "about":
                return <About/>;
            case "profile":
                return <Profile onChangeProps={this.props.onChangeProps}/>;
            case "change_password":
                return <ChangePassword onChangeProps={this.props.onChangeProps}/>;
            case "recently_viewed":
                return <Recently_Viewed onRightDom={this.props.onRightDom}/>;
            default:
                return null;
        }
    };

    render() {
        let proCom = null;
        if (this.props.currentPage) {
            let currentNode = this.props.currentPage;
            proCom = null;
            proCom = this.getComponents(currentNode);
        }
        return <React.Fragment>
            {proCom}
        </React.Fragment>
    }

}
