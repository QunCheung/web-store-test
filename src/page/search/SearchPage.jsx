import React from 'react'
import ToolBar from "../../components/properties/mobile/toolbar/ToolBar";
import {connect} from "react-redux";
import action from "../../action/action";
import style from './SearchPage.useable.less'
import {Tag, message} from 'antd';
import Common from "../../utils/common";
import BaseComponent from '../base/BaseComponent.jsx'
import * as PATH from "../../conts/path";

const {CheckableTag} = Tag;

class SearchPage extends BaseComponent {


    constructor(props) {
        super(props);
        const {search} = this.props.history.location;
        let queryString = Common.getQueryString("search", search);
        this.state = {
            searchValue: queryString
        };
    }

    componentWillMount() {
        style.use();
    }


    componentDidMount() {
    }

    componentWillUnmount() {
        style.unuse();
    }

    onTagChange = (e) => {
        this.setState({
            searchValue: e
        }, () => {
            this.startSearch();
        })
    };

    onSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    };


    startSearch = () => {
        const {searchValue} = this.state;
        if (!searchValue) {
            return;
        }
        this.startPage(PATH.RESULT + '?search=' + searchValue, false);
    };


    render() {
        let data = [
            "magenta",
            "red",
            "volcano",
            "orange",
            "gold",
            "lime",
            "green",
            "cyan",
            "blue",
            "geekblue",
            "purple"
        ];
        let search = null;
        try {
            search = this.props.pageInfo.language.mobile.search;
        } catch (e) {
            search = {button: ""}
        }

        return <div className={'search-page'}>
            <ToolBar
                searchValue={this.state.searchValue}
                showSearch={true}
                searchEnable={true}
                showRightIcon={true}
                showLeftIcon={true}
                onSearch={this.onSearch}
                onRightClick={this.startSearch}
                /* CustomRight={<span onClick={this.startSearch}
                                    className={"toolbar-font-size-24 toolbar-right-small-icon toolbar-align-right toolbar-content-center"}>{search.button}</span>}*//>
            <div style={{margin: 15}}>
                {
                    data.map((item, position) => {
                        return <Tag onClick={(e) => {
                            this.onTagChange(item)
                        }} className={"tag-size"}>{item}</Tag>
                    })
                }
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default connect(mapStateToProps)(SearchPage);
