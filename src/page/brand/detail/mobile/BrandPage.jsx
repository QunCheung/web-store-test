import React from 'react'
import Toolbar from '../../../../components/properties/mobile/toolbar/ToolBar.jsx'
import style from "./BrandPage.useable.less";
import {Icon} from "antd";
import ImgLine from '../../../../components/properties/mobile/ImgLine/ImgLine.jsx';
import Grid from "../../../../components/properties/mobile/grid/Grid";
import ProductItem from "../../../../components/properties/mobile/listItem/ProductItem";
import {connect} from "react-redux";
import imgA from '../img/favorite0.png'
import imgB from '../img/favorite1.png'
import BaseComponent from "../../../base/BaseComponent";
import common from "../../../../utils/common";
import * as api from "../../../../api/api";
import Navigation from "../../../../components/properties/mobile/listItem/Navigation";
import logo from "../../../img/logo.png";
import {withRouter} from "react-router";
import * as PATH from "../../../../conts/path";
import ProductNavigation from "../../../../components/properties/mobile/listItem/ProductNavigation";

class BrandPage extends BaseComponent {

    componentWillMount() {
        style.use();


    }

    componentWillUnmount() {
        style.unuse();
    }


    constructor(props) {
        super(props);
        const id = common.getQueryString("id");
        this.state = {
            hide: true,
            like: false,
            id,
            data: {
                collection: false
            },
            products: [],
            affix: false,
            orderBy: [{name: 'order_num', order: true}],
            range: {
                STYLE: [],
                BRANDS: [],
                CLASSIFICATION: [{
                    thirdCategoryDtoList: []
                }]
            },
            sort: "Relevance",
            maxMarketPrice: "",
            minMarketPrice: ""
        };
        this.currentPage = 1;
    }

    getData = () => {
        api.getBrand({id: this.state.id})
            .then(data => {
                this.setState({data: data[0]}, () => {
                    this.getBrandProducts();
                })
            })
            .catch(e => {

            })

    };

    getBrandProducts = () => {
        const cookie = common.getCookie("language");
        let categoryName = "";
        const {range} = this.state;
        range.CLASSIFICATION.forEach((item) => {
            item.thirdCategoryDtoList.forEach(obj => {
                if (obj.categoryDto.isSelect) {
                    categoryName = categoryName + (cookie !== "en" ? obj.categoryDto.categoryName : obj.categoryDto.categoryEnglish) + ",";
                }
            })
        });
        if (categoryName.length > 0) {
            categoryName = categoryName.substr(0, categoryName.length - 1);
        }
        api.startSearch(20, this.currentPage === 0 ? 1 : this.currentPage, {
            queryStr: this.state.data.brandName,
            price: ((this.state.minMarketPrice === 0 && this.state.maxMarketPrice === 0) || (!this.state.minMarketPrice && !this.state.minMarketPrice)) ? "*-*" :
                this.state.minMarketPrice + "-" + this.state.maxMarketPrice,
            sort: this.state.sort === "Relevance" ? "" : this.state.sort,
            brandName: "", categoryName
        })
            .then(data => {
                if (data.length === 0 && this.currentPage !== 1) {
                    this.currentPage = this.currentPage - 1
                } else {
                    let oldData = this.state.products;
                    oldData = oldData.concat(data.productListDto.productDtoList);
                    this.setState({products: oldData, total: data.productListDto.total});
                }
            }).catch(e => {
            this.currentPage = this.currentPage - 1
        });
    };


    componentDidMount() {
        const dom = this.refs.data_layout;
        dom.onscroll = (event) => {
            const clientHeight = event.target.clientHeight;
            const scrollHeight = event.target.scrollHeight;
            const scrollTop = event.target.scrollTop;
            if (scrollTop >= 736 && !this.state.affix) {
                // 说明需要固钉
                this.setState({affix: true})
            } else if (scrollTop < 736 && this.state.affix) {
                this.setState({affix: false})
            }
            const isBottom = (clientHeight + scrollTop === scrollHeight);
            if (isBottom) {
                this.currentPage++;
                this.getBrandProducts();
            }
        };
        this.getInfo();
    }

    getInfo = () => {
        const {id} = this.state;
        api.getRange({search: id})
            .then(range => {
                range.defmaxMarketPrice = range.maxMarketPrice;
                range.defminMarketPrice = range.minMarketPrice;
                range = this.setRange(range);
                this.setState({range}, () => {
                    this.getData();
                });
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
        console.log(range);
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
            maxMarketPrice: "",
            minMarketPrice: ""
        })
    };

    onProductItemClick = (e) => {
        this.startPage(PATH.PRODUCT + "?id=" + e);
    };

    onSearchClick = () => {
        this.startPage(PATH.SEARCH + "");
    };

    setCollection = (key, f) => {
        const {products} = this.state;
        const find = products.find(n => n.id === key);
        find.collection = f;
        this.setState({products})
    };

    render() {
        const {products} = this.state;

        const items = products.map(item => {
            return {
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
                        productCostMoney={item.defaultCostPrice}/>
                }
            }
        });

        const {data} = this.state;
        const number = window.innerHeight - 88;
        const style = {
            overflowY: "auto",
            height: number
        };
        const style1 = {
            overflowY: "auto",
            height: number,
            paddingTop: 88
        };
        return <div className={"page-container"}>
            <Toolbar
                title={<img src={logo}/>}
                showRightIcon={true}
                showLeftIcon={true}
                onRightClick={this.onSearchClick}
            />
            <div ref="data_layout" style={this.state.affix ? style1 : style}>
                <ImgLine parentClass={"brand"} class={"hear-img"}
                         src={data.propagandaPic}/>
                <div className={"bg"}>
                    <img className={"brand-img-size"}
                         src={data.showLogoPic}/>
                    <span className={"title-size title-location  nexb-font"}>{data.brandName}</span>
                    <div>
                        <img onClick={() => {
                            if (data.collection) {
                                api.delBrandFavorites({brandId: data.id}).then(obj => {
                                    data.collection = false;
                                    this.setState({data})
                                }).then(e => {

                                })

                            } else {
                                api.addBrandFavorites({brandId: data.id}).then(obj => {
                                    data.collection = true;
                                    this.setState({data})
                                }).then(e => {

                                })
                            }

                        }} className={"brand-like-size brand-like-img"}
                             src={data.collection ? imgB : imgA}/>
                    </div>
                </div>

                <div className={"message message-location kalinga-font " + (this.state.hide ? "hide-message" : "")}>
                    {data.brandDesc}
                </div>
                <div style={{textAlign: "center", marginTop: 10}} onClick={() => {
                    this.setState({
                        hide: !this.state.hide
                    });
                }}>
                    <Icon className={"title-size"} type={this.state.hide ? "down" : "up"}/>
                </div>
                {/*<hr/>*/}
                {/*<img className={"hr-size"} src={hr}/>*/}
                <div className={this.state.affix ? "navigation-layout" : ""}>
                    <ProductNavigation
                        range={this.state.range} onChange={this.selectRange}
                        onComprehensiveClick={() => {
                            this.setState({
                                sort: "Relevance"
                            }, () => {
                                this.refs.data_layout.scrollTo(0, 0);
                                this.getBrandProducts();
                            });
                        }}
                        onPriceClick={() => {
                            this.setState({
                                sort: this.state.sort === "asc" ? "desc" : "asc"
                            }, () => {
                                this.refs.data_layout.scrollTo(0, 0);
                                this.getBrandProducts();
                            });
                        }}
                        maxPriceChange={(e) => {
                            this.setState({maxMarketPrice: e.target.value})
                        }}
                        minPriceChange={(e) => {
                            this.setState({minMarketPrice: e.target.value})
                        }}
                        minMarketPrice={this.state.minMarketPrice}
                        maxMarketPrice={this.state.maxMarketPrice}
                        onConfirmClick={() => {
                            this.refs.data_layout.scrollTo(0, 0);
                            this.getBrandProducts();
                        }}
                        onRestData={this.onRestData}
                    />
                </div>
                <Grid dataSource={items} itemStyle={{padding: "0 9px 0 9px", background: "#f6f6f6"}}/>
            </div>
        </div>
    }


}

const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default withRouter(connect(mapStateToProps)(BrandPage));
