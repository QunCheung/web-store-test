import React from 'react'
import {connect} from "react-redux";
import common from "../../../utils/common";
import * as api from "../../../api/api";
import ProductItem from "../../../components/properties/mobile/listItem/ProductItem";
import Toolbar from "../../../components/properties/mobile/toolbar/ToolBar";
import Grid from "../../../components/properties/mobile/grid/Grid";
import Style from './Activity_mobile.useable.less';
import * as PATH from "../../../conts/path";
import {withRouter} from "react-router";
import BaseComponent from "../../base/BaseComponent";


class Activity_mobile extends BaseComponent {


    constructor(props) {
        super(props);
        let id = common.getQueryString("id");
        this.state = {
            visible: false,
            id,
            publicizePic: "",
            title: "",
            data: {
                productListDto: {
                    productDtoList: []
                }
            }
        };
        this.currentPage = 1;
    }

    componentWillMount() {
        Style.use();
    }

    componentWillUnmount() {
        Style.unuse();
    }

    componentDidMount() {
        this.getData();
        const dom = this.refs.data_layout;
        dom.onscroll = (event) => {
            const clientHeight = event.target.clientHeight;
            const scrollHeight = event.target.scrollHeight;
            const scrollTop = event.target.scrollTop;
            const isBottom = (clientHeight + scrollTop === scrollHeight);
            if (isBottom) {
                this.currentPage++;
                this.getData();
            }
        }
    }


    getData = () => {
        api.getActivityDetail(this.state.id, 10, this.currentPage)
            .then(data => {
                let oldData = this.state.data;
                oldData.productListDto.productDtoList = oldData.productListDto.productDtoList.concat(data.productListDto.productDtoList);
                if (data.length === 0 && this.currentPage !== 1) {
                    this.currentPage--;
                } else {
                    this.setState({data: oldData, title: data.title, publicizePic: data.publicizePic});
                }
            }).catch(e => {
            this.currentPage--
        });
    };

    onRestartSearch = () => {
        this.startPage(PATH.SEARCH + "", false);
    };


    onProductItemClick = (e) => {
        this.startPage(PATH.PRODUCT+"?id=" + e, false);
    };

    setCollection = (key, f) => {
        const {data} = this.state;
        const find = data.productListDto.productDtoList.find(n => n.id === key);
        find.collection = f;
        this.setState({data})
    };


    render() {
        let data4 = [];
        this.state.data.productListDto.productDtoList.forEach((item, index) => {
            data4.push({
                xs: {
                    xs: 12,
                    offset: 0
                },
                sm: {
                    sm: 12,
                    offset: 0
                },
                md: {
                    md: 12,
                    offset: 0
                },
                lg: {
                    lg: 12,
                    offset: 0
                },
                xl: {
                    xl: 12,
                    offset: 0
                },
                xxl: {
                    xxl: 12,
                    offset: 0
                },
                data: {
                    content: <ProductItem
                        productId={item.id}
                        productImg={item.showPic}
                        productName={item.productName}
                        onClick={this.onProductItemClick}
                        productMoney={item.defaultMarketPrice}
                        collection={item.collection}
                        setCollection={this.setCollection}
                        productCurrency={item.currency}
                        productCostMoney={item.defaultCostPrice}
                      />
                }
            })
        });
        const number = window.innerHeight - 88;
        const style = {
            overflowY: "auto",
            height: number
        };

        return <div className={"activity"}>
            <Toolbar
                searchEnable={false}
                showSearch={false}
                showLeftIcon={true}
                showRightIcon={false}
                title={<span className={"title"}>{this.state.title}</span>}
                searchValue={this.state.searchValue}
                restartSearch={this.onRestartSearch}
            />
            <div ref="data_layout" style={style}>
                <img className={"activity-img"} src={this.state.publicizePic}/>
                <Grid dataSource={data4} itemStyle={{margin: "0 15px 0 15px"}}/>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Activity_mobile));
