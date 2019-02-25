import React from 'react'
import Toolbar from "../../../components/properties/mobile/toolbar/ToolBar";
import * as PageAction from "../../../action/page_action";
import {connect} from "react-redux";
import Common from "../../../utils/common";
import Distribution from "./Distribution";
import style from "./MyItem_mobile.useable.less";


class MyItem_mobile extends React.Component {


    constructor(props) {
        super(props);
        let currentPage = Common.getQueryString("name");
        let title = Common.getQueryString("title");
        this.state = {
            currentPage,
            title,
            titles: [],
            rootTitle: title,
            rootPage: currentPage,
            showRight: false,
            rightDom: null,
            temp:""
        }
    }


    onChangeProps = (e) => {
        const titles = this.state.titles;
        titles.push(e);
        this.setState({
            currentPage: e.page,
            title: e.name,
            titles
        })
    };

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    onPageClick = () => {
        const titles = this.state.titles;
        titles.splice(titles.length - 1, 1);
        this.setState({
            currentPage: titles.length === 0 ? this.state.rootPage : titles[titles.length - 1].page,
            title: titles.length === 0 ? this.state.rootTitle : titles[titles.length - 1].name,
            titles
        })
    };

    onRightDomAppend = (show, dom) => {
        console.log(show, dom);
        this.setState({
            showRight: show,
            rightDom: !dom ? <div/> : dom
        })
    };


    componentWillReceiveProps(nextProps){
        this.setState({temp:""})
    }

    render() {
        const {title, currentPage, titles, rootTitle} = this.state;
        return <div className={"my-item"} style={{height:window.innerHeight}}>
            <Toolbar onLeftClick={(titles.length !== 0 && title !== rootTitle) && this.onPageClick}
                     title={<span className={"toolbar-title-size"}>{title.toLocaleUpperCase()}</span>}
                     showRightIcon={this.state.showRight}
                     CustomRight={this.state.rightDom}
                     showLeftIcon={true}/>

            <div className={title.toLocaleUpperCase() === "MY FAVORITE" ? "div-bg-white" : "div-bg"}>
                <div style={{paddingTop: title.toLocaleUpperCase() === "MY FAVORITE" ? 0 : 20, height: "100%"}}>
                    <Distribution onRightDom={this.onRightDomAppend} onChangeProps={this.onChangeProps}
                                  currentPage={currentPage}/>
                </div>
            </div>

        </div>
    }


}


const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default connect(mapStateToProps)(MyItem_mobile);
