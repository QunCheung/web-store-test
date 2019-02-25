import React from 'react'
import {Icon, Input} from "antd";
import style from './Toolbar.useable.less'
import {withRouter} from "react-router";
import {connect} from "react-redux";
import action from "../../../../action/action";
import left from './img/leftarrow.png'
import search from './img/18.png'

class ToolBar extends React.Component {

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    onLeftClick = (e) => {
        console.log(this.props);
        this.props.dispatch(action.showNav());
        const historyPages = this.props.historyPage.historyPages;
        let splice = historyPages.splice(historyPages.length - 1, 1);
        this.props.dispatch(action.updatePageAction(historyPages));
        splice = !splice || splice.length === 0 ? ["/"] : splice;
        this.props.history.push(splice[0]);
    };



    render() {
        const {
            showLeftIcon,
            CustomLeft,
            title,
            showSearch,
            onSearch,
            showRightIcon,
            CustomRight,
            searchValue,
            searchEnable,
            restartSearch,
            CustomItem,
            onRightClick,
            onLeftClick
        } = this.props;
        let holder = null;
        try
        {
            holder = this.props.pageInfo.language.mobile.search.search;
        }catch (e) {
            holder = "";
        }
        return <React.Fragment>
            <div className={"toolbar-size toolbar-position toolbar"}>
                {!!CustomItem ? CustomItem : <div>
                    {
                        showLeftIcon && (!!CustomLeft ? CustomLeft :
                            <span onClick={onLeftClick ? onLeftClick : this.onLeftClick}>
                    <img src={left}
                         className={"toolbar-icon-size toolbar-left-icon toolbar-bg toolbar-align-left toolbar-content-center"}/>
                </span>)
                    }

                    {title && <div className={"toolbar-title-parent"}>
                        <span className={"toolbar-title"}>{title}</span>
                    </div>}
                    {showSearch && <div className={"toolbar-search-parent"}>
                        <Input
                            value={searchValue}
                            placeholder={holder}
                            className={"toolbar-search"}
                            onChange={onSearch}
                            disabled={!searchEnable}

                        />
                        {!searchEnable && <div onClick={restartSearch} className={"toolbar-search toolbar-position"}/>}

                    </div>}
                    {
                        showRightIcon && (!!CustomRight ? <span
                                className={"toolbar-right-size toolbar-right-icon-position toolbar-right-icon toolbar-bg toolbar-align-right toolbar-content-center"}> {CustomRight}</span> :
                            <span onClick={onRightClick}>
                        <img src={search}
                             className={"toolbar-icon-size toolbar-right-icon-position toolbar-right-icon toolbar-bg toolbar-align-right toolbar-content-center"}/>
                        </span>)
                    }
                </div>}
            </div>
            <div className={"toolbar-size toolbar-bg"}/>
        </React.Fragment>

    }
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(ToolBar));
