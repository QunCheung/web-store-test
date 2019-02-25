import React from 'react'
import {connect} from "react-redux";
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import style from "./My_PC.useable.less"
import Distribution from "./Distribution.jsx";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";
import common from "../../../utils/common";

class My_PC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftItem: [
                {
                    name: "My Orders",
                    page: "order",
                    isSelect: true
                },
                {
                    name: "My Favorite",
                    page: "favorites",
                    isSelect: false,
                    subItem: [
                        {
                            name: "Products",
                            isSelect: true,
                            page: "product"
                        },
                        {
                            name: "Brands",
                            isSelect: false,
                            page: "brands"
                        }
                    ]
                },
                {
                    name: "Recently Viewed",
                    page: "recently_viewed",
                    isSelect: false
                },
                {
                    name: "My Profile",
                    page: "profile",
                    isSelect: false
                },
                {
                    name: "Change Password",
                    page: "change_password",
                    isSelect: false
                }
            ],
            currentPage: "order"

        }
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        try {

        } catch (e) {

        }
    }

    render() {
        const {currentPage} = this.state;
        let title = null;
        try {
            title = this.props.pageInfo.language.pc.my.title;
            const {my} = this.props.pageInfo.language.pc;
            const {leftItem} = this.state;
            const deepClone = common.deepClone(leftItem);
            const order = deepClone.find(n => n.page === "order");
            const favorites = deepClone.find(n => n.page === "favorites");
            const recently_viewed = deepClone.find(n => n.page === "recently_viewed");
            const profile = deepClone.find(n => n.page === "profile");
            const change_password = deepClone.find(n => n.page === "change_password");
            order.name = my.order.title;
            recently_viewed.name = my.recently_viewed.title;
            favorites.name = my.favorites.title;
            profile.name = my.profile.title;
            change_password.name = my.change_pwd.title;
            const subItem = favorites.subItem;
            const product = subItem.find(n => n.page === "product");
            const brands = subItem.find(n => n.page === "brands");
            product.name = my.favorites.item1.title;
            brands.name = my.favorites.item2.title;
            if (JSON.stringify(leftItem) !== JSON.stringify(deepClone)) {
                this.setState({leftItem: deepClone});
            }
        } catch (e) {
            title = "";
        }
        return <React.Fragment>
            <TitleBar Breads={[{name: title, path: PATH.MY + ""}]}/>
            <div className={"my-pc"}>
                <div className={"left-layout"}>
                    {
                        this.state.leftItem.map((item, index) => {
                            return <React.Fragment>
                                <div onClick={() => {
                                    const {leftItem} = this.state;
                                    let currentPage = "";
                                    leftItem.forEach(n => {
                                        n.isSelect = n.name === item.name;
                                        if (n.isSelect && !n.subItem) {
                                            currentPage = n.page;
                                        } else if (n.isSelect && n.subItem) {
                                            currentPage = n.subItem[0].page;
                                        }
                                    });
                                    const find = leftItem.find(n => n.page === 'favorites');
                                    find.subItem[0].isSelect = true;
                                    find.subItem[1].isSelect = false;
                                    this.setState({leftItem, currentPage});
                                }} className={item.isSelect ? "left-border-select" : "left-border"}>
                                    {item.name}
                                </div>
                                <React.Fragment>
                                    {item.isSelect && !!item.subItem && item.subItem.map((obj, index) => {
                                        return <div onClick={() => {
                                            const {leftItem} = this.state;
                                            const find = leftItem.find(n => n.name === item.name);
                                            let currentPage = "";
                                            find.subItem.forEach((dom) => {
                                                dom.isSelect = dom.name === obj.name;
                                                if (dom.isSelect) {
                                                    currentPage = dom.page;
                                                }
                                            });
                                            this.setState({leftItem, currentPage});
                                        }} key={obj.name + index}
                                                    className={"child-item " + (obj.isSelect ? "child-item-select" : "")}>
                                            {obj.name}
                                        </div>
                                    })}
                                </React.Fragment>
                            </React.Fragment>
                        })
                    }
                </div>
                <div className={"right-layout"}>
                    <Distribution current={currentPage}/>
                </div>
            </div>
        </React.Fragment>;
    }
}


const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(My_PC));
