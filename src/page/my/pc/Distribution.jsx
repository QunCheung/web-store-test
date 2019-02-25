import React from 'react'
import Order from "./order/Order";
import Products from "./favorite/Products";
import Brands from "./favorite/Brands";
import Profile from "./profile/Profile";
import ChangePassword from "./change_password/ChangePassword";
import Recently_Viewed from "./recently_viewed/Recently_Viewed";


export default class Distribution extends React.Component {

    getComponents = (currentNode) => {
        switch (currentNode) {
            case "order":
                return <Order/>;
            case "product":
                return <Products/>;
            case "brands":
                return <Brands/>;
            case "profile":
                return <Profile/>;
            case "change_password":
                return <ChangePassword/>;
            case "recently_viewed":
                return <Recently_Viewed/>;
            default:
                return null;
        }
    };

    render() {
        let proCom = null;
        if (this.props.current) {
            let currentNode = this.props.current;
            console.log(currentNode);
            proCom = null;
            proCom = this.getComponents(currentNode);
        }
        return <React.Fragment>
            {proCom}
        </React.Fragment>
    }

}
