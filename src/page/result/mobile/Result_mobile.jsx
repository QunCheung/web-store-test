import React from 'react'
import Toolbar from "../../../components/properties/mobile/toolbar/ToolBar";
import {connect} from "react-redux";
import Grid from "../../../components/properties/mobile/grid/Grid";
import ProductNavigation from '../../../components/properties/mobile/listItem/ProductNavigation.jsx'
import Common from '../../../utils/common.js'
import ProductItem from "../../../components/properties/mobile/listItem/ProductItem";
import BaseComponent from "../../base/BaseComponent";
import * as api from "../../../api/api";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";
import common from "../../../utils/common";

class Result_mobile extends BaseComponent {


    constructor(props) {
        super(props);
        const search = window.location.search;
        let queryString = Common.getQueryString("search", search);
        this.state = {
            visible: false,
            searchValue: queryString,
            data: [],
            currentData: [],
            range: {
                STYLE: [],
                BRANDS: [],
                CLASSIFICATION: [{
                    thirdCategoryDtoList: []
                }]
            },
            minMarketPrice: "",
            maxMarketPrice: "",
            sort: ""
        };
        this.currentPage = 1;
    }

    componentDidMount() {
        this.getData();
        this.getInfo();
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

    getInfo = () => {
        const {searchValue} = this.state;
        api.getRange({search: searchValue})
            .then(range => {
                range.defmaxMarketPrice = range.maxMarketPrice;
                range.defminMarketPrice = range.minMarketPrice;
                range = this.setRange(range);
                this.setState({range});

            })
            .catch(e => {

            })
    };

    setRange = (range) => {
        const firstCategoryDtoList = range.firstCategoryDtoList;
        const brandDtoList = range.brandDtoList;
        const secondCategoryDtoList = range.secondCategoryDtoList;
        const data = {};
        data["STYLE"] = firstCategoryDtoList;
        data["BRANDS"] = brandDtoList;
        data["CLASSIFICATION"] = secondCategoryDtoList;
        return data;
    };

    selectRange = (p, position, index) => {
        const {range} = this.state;
        if (p === 0) {
            let style = range.STYLE[position];
            style.isSelect = !style.isSelect;
        } else if (p === 1) {
            const brand = range.BRANDS[position];
            brand.isSelect = !brand.isSelect;
        } else {
            const element = range.CLASSIFICATION[position].thirdCategoryDtoList[index];
            element.categoryDto.isSelect = !element.categoryDto.isSelect
        }
        this.setState({
            range
        })
    };

    onRestData = () => {
        const {range} = this.state;
        range.STYLE.forEach((item) => {
            item.isSelect = false;
        });
        range.BRANDS.forEach((item) => {
            item.isSelect = false;
        });
        range.CLASSIFICATION.forEach((item) => {
            item.thirdCategoryDtoList.forEach((obj) => {
                obj.categoryDto.isSelect = false;
            })
        });
        this.setState({
            range,
            maxMarketPrice:"",
            minMarketPrice:""
        })
    };


    getData = () => {

        const cookie = common.getCookie("language");
        let brandName = "";
        let categoryName = "";
        const {range} = this.state;
        range.BRANDS.forEach((item) => {
            if (item.isSelect) {
                brandName = brandName + item.brandName + ",";
            }
        });
        range.CLASSIFICATION.forEach((item) => {
            item.thirdCategoryDtoList.forEach(obj => {
                if (obj.categoryDto.isSelect) {
                    categoryName = categoryName + (cookie !== "en" ? obj.categoryDto.categoryName : obj.categoryDto.categoryEnglish) + ",";
                }
            })
        });
        if (brandName.length > 0) {
            brandName = brandName.substr(0, brandName.length - 1);
        }
        if (categoryName.length > 0) {
            categoryName = categoryName.substr(0, categoryName.length - 1);
        }
        api.startSearch(10, this.currentPage, {
            queryStr: this.state.searchValue,
            price: (this.state.minMarketPrice === 0 && this.state.maxMarketPrice === 0) ? "*-*" :
                this.state.minMarketPrice + "-" + this.state.maxMarketPrice,
            sort: this.state.sort === "Relevance" ? "" : this.state.sort,
            brandName, categoryName
        })
            .then(data => {
                if (data.length === 0 && this.currentPage !== 1) {
                    this.setState({current: this.currentPage - 1})
                } else {
                    let oldData = this.state.data;
                    oldData = oldData.concat(data.productListDto.productDtoList);
                    this.setState({data: oldData, total: data.productListDto.total});
                }
            }).catch(e => {
            this.setState({current: this.currentPage - 1});
        });
    };

    onRestartSearch = () => {
        const {searchValue} = this.state;
        this.startPage(PATH.SEARCH + "?search=" + searchValue, false);
    };


    onProductItemClick = (e) => {
        // this.startPage("/product?id=" + e, false);
        this.startPage(PATH.PRODUCT + "?id=" + e, false);
    };

    setCollection = (key, f) => {
        const {data} = this.state;
        const find = data.find(n => n.id === key);
        find.collection = f;
        this.setState({data})
    };


    render() {
        let data4 = [];
        this.state.data.forEach((item, index) => {
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
        const number = window.innerHeight - 88 - 88;
        const style = {
            overflowY: "auto",
            height: number
        };
        return <div>
            <Toolbar
                searchEnable={false}
                showSearch={true}
                showLeftIcon={true}
                showRightIcon={false}
                searchValue={this.state.searchValue}
                restartSearch={this.onRestartSearch}
            />
            <ProductNavigation
                onComprehensiveClick={() => {
                    this.setState({
                        sort: "Relevance"
                    }, () => {
                        this.getData();
                    });
                }}
                onPriceClick={() => {
                    this.setState({
                        sort: this.state.sort === "asc" ? "desc" : "asc"
                    }, () => {
                        this.getData();
                    });
                }}
                range={this.state.range}
                maxPriceChange={(e) => {
                    this.setState({maxMarketPrice: e.target.value})
                }}
                minPriceChange={(e) => {
                    this.setState({minMarketPrice: e.target.value})
                }}
                minMarketPrice={this.state.minMarketPrice}
                maxMarketPrice={this.state.maxMarketPrice}
                onChange={this.selectRange}
                onConfirmClick={() => {
                    this.getData()
                }}
                onRestData={this.onRestData}
            />
            <div ref="data_layout" style={style}>
                <Grid dataSource={data4} itemStyle={{margin: "0 15px 0 15px"}}/>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Result_mobile));
