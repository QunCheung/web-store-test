import React from 'react'
import Common from "../../../utils/common";
import Toolbar from "../../../components/properties/mobile/toolbar/ToolBar";
import {connect} from "react-redux";
import style from './ProductPage_mobile.useable.less'
import {Carousel, Icon} from "antd";
import Grid from "../../../components/properties/mobile/grid/Grid";
import BaseComponent from "../../base/BaseComponent";
import now from '../img/now.png'
import LOVE from '../img/product_love.png'
import DARK_LOVE from '../img/product_dark_love.png'
import * as api from "../../../api/api";
import logo from "../../img/logo.png";
import * as PATH from "../../../conts/path";

class ProductPage_mobile extends BaseComponent {


    constructor(props) {
        super(props);
        let queryString = Common.getQueryString("id");
        this.state = {
            id: queryString,
            data: {
                productName: "",
                sellPoint: "",
                brandId: "",
                currency: "",
                brandName: "",
                brandDesc: "",
                showLogoPic: "",
                detail: [{
                    imgs: [],
                    itemsDetail: [
                        {
                            marketPrice: "0"
                        }
                    ]
                }],
            },
            brand: {
                brandDesc: "",
                brandName: "",
                officialWebsite: "",
                showLogoPic: ""
            }
        };
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 10);
    }

    componentDidMount() {
        let cookie = Common.getCookie("history");
        let time = new Date().getTime();
        let value;
        if (cookie) {
            value = this.state.id + ':' + time + ':' + (time + 30 * 24 * 60 * 60 * 1000) + "-" + cookie;
        } else {
            value = this.state.id + ':' + time + ':' + (time + 30 * 24 * 60 * 60 * 1000);
        }
        Common.setCookie("history", value);
        this.getData();

    }

    getData = () => {
        api.getProductDetail(this.state.id)
            .then(data => {
                console.log(data);
                const parseData = this.parseData(data);
                this.setState({
                    data: parseData,
                    imgAlt: parseData.detail[0].imgAlt
                })
            }).catch(e => {
        })
    };

    parseData = (data) => {
        const parseData = {
            productName: data.productName,
            sellPoint: data.sellPoint,
            brandId: data.brandId,
            currency: data.currency,
            brandName: data.brandName,
            brandDesc: data.brandDesc,
            showLogoPic: data.showLogoPic,
            collection: data.collection,
            officialWebsite: data.officialWebsite,
            detail: []
        };
        data.productSpecsDtoList.forEach(item => {
            const spec = JSON.parse(item.spec);
            const size = spec.size;
            const color = spec.imgUrl;
            const imgAlt = spec.imgAlt;
            const find = parseData.detail.find(n => n.imgAlt === imgAlt);
            if (find) {
                find.itemsDetail.push({
                    size: size,
                    detailLink: item.detailLink,
                    costPrice: item.costPrice,
                    marketPrice: item.marketPrice
                });
            } else {
                let imgs = [];
                data.productDetailPictureDtoList.forEach(obj => {
                    const parse = JSON.parse(obj.spec);
                    const alt = parse.imgAlt;
                    if (alt === imgAlt) {
                        imgs.push(obj.imgUrl);
                    }
                });
                parseData.detail.push(
                    {
                        imgAlt: imgAlt,
                        color: color,
                        imgs: imgs,
                        itemsDetail: [{
                            size: size,
                            detailLink: item.detailLink,
                            costPrice: item.costPrice,
                            marketPrice: item.marketPrice
                        }]
                    }
                );
            }
        });
        return parseData;
    };

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    onSearchClick = () => {
        this.startPage(PATH.SEARCH + "", false);
    };

    getCurrency = (productCurrency) => {
        switch (productCurrency) {
            case "USD":
                return "$";
            case "EUR":
                return "€";
            case "CNY":
                return "¥";
            default:
                return "$";
        }
    };

    render() {
        const {data, imgAlt, brand, id} = this.state;
        let imgs = [];
        data.detail.find(n => n.imgAlt === imgAlt).imgs.forEach((item, i) => {
            imgs.push({
                xs: {
                    xs: 24,
                    offset: 0
                },
                sm: {
                    sm: 24,
                    offset: 0
                },
                md: {
                    md: 24,
                    offset: 0
                },
                lg: {
                    lg: 24,
                    offset: 0
                },
                xl: {
                    xl: 24,
                    offset: 0
                },
                xxl: {
                    xxl: 24,
                    offset: 0
                },
                data: {
                    content: <img style={{
                        width: "100%",
                        height: "100%",
                    }}
                                  src={item}/>
                }
            })
        });
        let productDetail = {
            buy_button: "",
            color: "：",
            product_detail: "",
            size: "",
            title: ""
        };
        try {
            productDetail = this.props.pageInfo.language.mobile.product_detail;
        } catch (e) {

        }
        return <div className={"product"}>
            <Toolbar
                title={<span className={"toolbar-title-size"}>{productDetail.title}</span>}
                showLeftIcon={true}
                showRightIcon={false}
                onRightClick={this.onSearchClick}
            />
            <div style={{paddingBottom: 88}}>
                <Carousel autoplay={true}>
                    {
                        data.detail.find(n => n.imgAlt === imgAlt).imgs.map((item, index) => {
                            return <div><img className={"slick-slide"} src={item}/></div>
                        })
                    }
                </Carousel>
                <div className={"header"}>
                    <div className={"kalinga-font name"}>
                        {data.productName}
                    </div>
                    <div className={"nexb-font money"}>
                        {this.getCurrency(data.currency)} {Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].marketPrice).toFixed(2)}
                        {Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].marketPrice).toFixed(2) !== Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].costPrice).toFixed(2) &&
                        <span
                            className={"nexb-font money-line"}> {this.getCurrency(data.currency)} {Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].costPrice).toFixed(2)} </span>}
                    </div>
                </div>
                <div className={"item-msg nexal-font"}>
                    <div className={"product-config-text-size"}>
                    <span> {productDetail.color}
                        {
                            data.detail.map((item) => {
                                return <img onClick={() => {
                                    this.setState({
                                        imgAlt: item.imgAlt
                                    });
                                }} className={"product-color"} src={item.color}/>
                            })
                        }
                    </span>
                        {/*<span className={"text-right margin-right-8"}>Main fabric : 100% wool</span>*/}
                    </div>
                    <div className={"product-config-text-size margin-top-20"}>
                        <span>{productDetail.size} {
                            data.detail.find(n => n.imgAlt === imgAlt).itemsDetail.map((item) => {
                                return <span className={"spacing"}>{item.size}</span>
                            })
                        }</span>
                    </div>
                    <div className={"product-msg-text-size"}>
                        {data.sellPoint}
                    </div>
                </div>
                <div className={"item-brand"} onClick={() => {
                    console.log(data.officialWebsite);
                    window.location.href = data.officialWebsite;
                }}>
                    <div className={"logo-div"}>
                        <img className={"logo"}
                             src={data.showLogoPic}/>
                    </div>
                    <div className={"brand-div"}>
                        <span
                            className={"margin-left-30 brand-msg-position kalinga-font brand-msg-size"}> {data.brandDesc}</span>
                    </div>
                    <div className={"click-div"}>
                        <Icon type="caret-right" className={"click-right"}/>
                    </div>
                </div>
                <div className={"item-product-details"}>
                    <div className={"nexb-font title"}>
                        {productDetail.product_detail}
                    </div>
                    <div className={"kalinga-font title"}>
                        {data.sellPoint}
                    </div>
                </div>
                <Grid dataSource={imgs}/>
            </div>
            <div className={"nav"}>
                <img onClick={() => {
                    if (data.collection) {
                        api.delProductFavorites({productId: id}).then(obj => {
                            data.collection = false;
                            this.setState({data});
                        }).catch(e => {

                        })
                    } else {
                        api.addProductFavorites({productId: id})
                            .then(obj => {
                                data.collection = true;
                                this.setState({data});
                            }).catch(e => {

                        })
                    }

                }} src={data.collection ? DARK_LOVE : LOVE}/>
                <div className={"buy_btn"} onClick={() => {
                    api.createOrder({
                        brandId: data.brandId,
                        productId: Number(id),
                        trackUrl: encodeURIComponent(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].detailLink)
                    }).then(data => {
                        window.location.href = data;
                    }).catch(e => {

                    });

                }}>{productDetail.buy_button}</div>
            </div>
        </div>
    }

}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(ProductPage_mobile);
