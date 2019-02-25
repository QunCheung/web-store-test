import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import InformationPage from './page/information/InformationPage.jsx'
import InformationItemPage from './page/information/InformationItemPage.jsx'
import BrandPage from './page/brand/detail/BrandPage.jsx'
import BrandListPage from './page/brand/BrandListPage.jsx'
import SearchPage from './page/search/SearchPage.jsx'
import ProductPage from './page/product/ProductPage.jsx'
import Activity from './page/activities/Activity.jsx'
import My from './page/my/My.jsx'
import Result from './page/result/Result.jsx'
import CommonResult from './page/result/pc/CommonResult.jsx'
import './common/common.less'
import Nav from './components/nav/Nav.jsx'
import Common from './utils/common.js'
import Loadable from 'react-loadable';
import MyItem from "./page/my/MyItem";
import Login from "./page/my/mobile/login/Login.jsx";
import Forget from "./page/my/mobile/login/forget/Forget.jsx";
import ForgetChangePassword from "./page/my/ForgetChangePassword.jsx";
import * as PageAction from "./action/page_action";
import {hot} from "react-hot-loader";
import Placeholder from "./page/placeholder/Placeholder.jsx";
import Bottom from "./components/properties/pc/bottom/Bottom";
import * as PATH from "./conts/path.js";

const IndexAsync = Loadable({
    loader: () => import('./page/home/HomePage'),
    loading() {
        return ''
    }
});


class AppRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            screen: 1
        };
        this.path = '';

    }

    onWindowResize = (e) => {
        if (window.innerWidth > 768) {
            this.setState({
                screen: 1
            });
            this.props.dispatch(PageAction.renderPageScreen({
                screen: 1
            }));
        } else {

            this.setState({
                screen: 0
            });
            this.props.dispatch(PageAction.renderPageScreen({
                screen: 0
            }));
        }

    };

    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }


    render() {
        console.log(this.props);
        let flag = Common.getQueryUrl();
        let padding = 0;
        if (window.innerWidth > 1440) {
            const number = window.innerWidth - 1530;
            padding = number / 2 + 10;
        }

        return <Router>
            <div className={"page " + (this.props.pageInfo.screen === 1 ? "pc-page" : "")}>
                <div className="container"
                     style={(this.props.pageInfo.screen === 1 ? {
                         padding: "0 " + padding + "px",
                         minHeight: window.innerHeight - 180
                     } : {})}>
                    <Switch>
                        <Route exact path={PATH.DEFAULT} component={IndexAsync}/>
                        <Route path={PATH.HOME} component={IndexAsync}/>
                        <Route path={PATH.INFORMATION} component={InformationPage}/>
                        <Route path={PATH.ITEM_DETAIL} component={InformationItemPage}/>
                        <Route path={PATH.BRAND} component={BrandPage}/>
                        <Route path={PATH.BRANDS} component={BrandListPage}/>
                        <Route path={PATH.MY} component={My}/>
                        <Route path={PATH.I_ITEM} component={MyItem}/>
                        <Route path={PATH.RESULT} component={Result}/>
                        <Route path={PATH.SPECIAL} component={CommonResult}/>
                        <Route path={PATH.ACTIVITY} component={Activity}/>
                        <Route path={PATH.SEARCH} component={SearchPage}/>
                        <Route path={PATH.PRODUCT} component={ProductPage}/>
                        <Route path={PATH.LOGIN} component={Login}/>
                        <Route path={PATH.FORGET} component={Forget}/>
                        <Route path={PATH.FORGETRESETPWD} component={ForgetChangePassword}/>
                        <Route path={PATH.PLACEHOLDER} component={Placeholder}/>
                        <Route>
                            <Redirect to={PATH.DEFAULT}/>
                        </Route>
                    </Switch>
                </div>
                {!flag && this.props.pageInfo.isShow && this.props.pageInfo.screen === 0 && <Nav/>}
                {this.props.pageInfo.screen === 1 && <Bottom/>}
            </div>
        </Router>;
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};

export default hot(module)(connect(mapStateToProps)(AppRoute));
