import React from 'react'
import {Tabs} from "antd";
import Grid from "../../../../components/properties/mobile/grid/Grid";
import ProductItem from "../../../../components/properties/mobile/listItem/ProductItem";
import style from './Favorites.useable.less'
import FavoritesItem1 from "./item/FavoritesItem1";
import FavoritesItem3 from "./item/FavoritesItem3";
import FavoritesItem2 from "./item/FavoritesItem2";
import * as api from "../../../../api/api";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import Common from "../../../../utils/common";

const TabPane = Tabs.TabPane;

class Favorites extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            titles: [
                {
                    key: 1,
                    name: "COMMODITY"
                }, {
                    key: 2,
                    name: "BRANDS"
                }, {
                    key: 3,
                    name: "WEBSITE"
                }
            ]
        }
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    onTitleClick = (current) => {
        this.setState({current})
    };


    componentDidMount() {

    }

    getCurrentDom = () => {
        const {current} = this.state;
        switch (current) {
            case 1:
                return <FavoritesItem1 onRightDom={this.props.onRightDom}/>;
            case 2:
                return <FavoritesItem2 onRightDom={this.props.onRightDom}/>;
            case 3:
                return <FavoritesItem3 onRightDom={this.props.onRightDom}/>

        }
        return null;
    };

    render() {

        try {
            const favorites = this.props.pageInfo.language.mobile.my.favorites;
            const titles = this.state.titles;
            const deepClone = Common.deepClone(titles);
            deepClone[0].name = favorites.item1.title;
            deepClone[1].name = favorites.item2.title;
            deepClone[2].name = favorites.item3.title;
            if (JSON.stringify(titles) !== JSON.stringify(deepClone)) {
                this.setState({titles: deepClone})
            }
        } catch (e) {

        }
        let dom = this.getCurrentDom();
        return <div className={"favorites"}>
            <div className={"header"}>
                {
                    this.state.titles.map((item, index) =>
                        <div onClick={() => {
                            this.onTitleClick(item.key)
                        }}
                             className={"title " + (this.state.current === item.key ? "select-color" : "def-color")}>{item.name}
                        </div>
                    )
                }
            </div>
            <div className={"bg"}>
                {dom}
            </div>
        </div>
    }


}


const mapStateToProps = state => {
    return {...state};
};


export default connect(mapStateToProps)(Favorites);

