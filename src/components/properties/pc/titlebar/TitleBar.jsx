import React from 'react'
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Breadcrumb, Carousel, Input, Popover} from "antd";
import search from "../img/search.png";
import style from "./TitleBar.useable.less";
import logo from "../img/logo.png";
import Common from "../../../../utils/common";
import * as actions from "../../../../action/user_action.js";
import * as pageActions from "../../../../action/page_action.js";
import * as api from "../../../../api/api";
import * as PATH from "../../../../conts/path";


class TitleBar extends React.Component {


    constructor(props) {
        super(props);
        const search = window.location.search;
        let queryString = Common.getQueryString("search", search);
        this.state = {
            searchValue: queryString,
            language: Common.getCookie("language")
        }
    }

    gotoLogin = () => {
        this.props.history.push(PATH.LOGIN);
    };


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    componentDidMount() {

    }


    onGotoTargetPage = (e) => {
        console.log(e);
        this.props.history.push(e);
    };

    onEnter = () => {
        const {searchValue} = this.state;
        if (!searchValue) {
            return;
        }
        this.props.history.push(PATH.PLACEHOLDER + '?page=/result-search=' + searchValue);
    };

    onSearchChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    };


    startPersonCenter = () => {
        this.props.history.push(PATH.MY)
    };

    getBrands = () => {
        const {brands, language} = this.props.pageInfo;
        const {brand} = language.pc;
        return <div>
            <div className={"brands-title"}>
                {brand.top_brands}
            </div>
            {brands.map(item => {
                return <div onClick={() => {
                    this.props.history.push(PATH.PLACEHOLDER + '?page=/brand-id=' + item.id);

                }} className={"item-title"}>
                    {item.brandName}
                </div>
            })}
            <div className={"brands-title"} onClick={() => {
                this.props.history.push(PATH.BRANDS);
            }}>
                {brand.show_all}
            </div>
        </div>
    };

    checkLanguage = () => {
        const {language} = this.state;
        let l = language.toLocaleLowerCase() === "en" ? "ch" : "en";
        Common.setCookie("language", l);
        api.getLanguage()
            .then(data => {
                this.props.dispatch(pageActions.renderPageLanguage(data));
                this.setState({
                    language: l
                }, () => {
                    // window.location.reload();

                })
            }).catch(e => {
            console.log(e);
        });
    };


    render() {
        const {Breads} = this.props;
        let dom = null;
        try {
            const {sign_in_register, home, new_arrivals, women, men, brand, news, sale} = this.props.pageInfo.language.pc;
            const header = [{name: home.title, path: PATH.DEFAULT},
                {name: new_arrivals.title, path: PATH.PLACEHOLDER + '?page=/special-r=NEW_ARRIVALS'},
                {name: women.title, path: PATH.PLACEHOLDER + '?page=/special-r=WOMEN'},
                {name: men.title, path: PATH.PLACEHOLDER + '?page=/special-r=MEN'},
                {name: brand.title, path: PATH.BRANDS},
                {name: news, path: PATH.INFORMATION},
                {name: sale.title, path: PATH.PLACEHOLDER + '?page=/special-r=SALE'}]
            dom = <React.Fragment>
                <div className={"title-bar"}
                     style={(this.props.page && this.props.page === "home") ? {minHeight: 680} : {minHeight: 120}}>
                    <div className={"title"}>
                        <div className={"header-toolbar"}>
                            <div className={"search inline"}>
                                <Input value={this.state.searchValue} onPressEnter={this.onEnter}
                                       onChange={this.onSearchChange}
                                       suffix={<img onClick={this.onEnter} className={"icon"} src={search}/>}/>
                            </div>
                            <div className={"inline items"}>
                                {
                                    header.map((item) => {
                                        if (item.name !== 'BRANDS' && item.name !== '品牌') {
                                            return <div onClick={() => {
                                                this.onGotoTargetPage(item.path);
                                            }} className={"cursor inline item"}>
                                                {item.name}
                                            </div>
                                        }
                                        return <Popover placement="bottom" title={null}
                                                        content={<div>{this.getBrands()}</div>}
                                                        trigger="hover">
                                            <div onClick={() => {
                                                this.onGotoTargetPage(item.path);
                                            }} className={"cursor inline item"}>
                                                {item.name}
                                            </div>
                                        </Popover>
                                    })
                                }
                            </div>
                            <div className={"inline cursor language"}>
                                <div className={"inline item"} onClick={this.checkLanguage}>
                                    {this.state.language.toLocaleUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.props.userInfo.userToken ?
                        <div className={"username"}>
                            <span onClick={this.startPersonCenter}
                                  className={"cursor"}>{this.props.userInfo.userName}</span><span
                            className={"logout cursor"}
                            onClick={() => {
                                api.logout({token: this.props.userInfo.userToken}).then(data => {
                                }).catch(e => {
                                });
                                Common.setCookie("token", "");
                                this.props.dispatch(actions.updateUserToken({token: ""}));
                                this.props.history.push(PATH.DEFAULT);
                                location.reload();
                            }}>{sign_in_register.sign_out}</span></div> :
                        <div className={"login cursor"} onClick={this.gotoLogin}>
                            {sign_in_register.sign_in} / {sign_in_register.register}
                        </div>
                    }
                    {(this.props.page && this.props.page === "home") && <Carousel autoplay>
                        {!!this.props.dataSource && this.props.dataSource.map((item) => {
                            return <div style={{height: "100%"}}><img src={item.bannerPic}/></div>
                        })}
                    </Carousel>}
                    <img className={this.props.page === "home" ? "home-logo" : "logo"} onClick={() => {
                        this.onGotoTargetPage(PATH.DEFAULT);
                    }} src={logo}/>
                </div>
                {(!this.props.page || this.props.page !== "home") &&
                <div className={"nav"}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item><span className={"cursor"} onClick={() => {
                            this.onGotoTargetPage(PATH.DEFAULT);
                        }}>{Common.getCookie("language") === "en" ? "HOME" : "首页"}</span></Breadcrumb.Item>
                        {Breads && Breads.map((item, index) => {
                            return <Breadcrumb.Item><span className={"cursor"}
                                                          style={index === Breads.length - 1 ? {color: "#000"} : {}}
                                                          onClick={() => {
                                                              if (item.path) {
                                                                  this.onGotoTargetPage(item.path);
                                                              }
                                                          }}>{item.name}</span></Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                    <div className={"hr"}/>
                </div>
                }
            </React.Fragment>
        } catch (e) {

        }


        return (
            <React.Fragment>
                {dom}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(TitleBar));
