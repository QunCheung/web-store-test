import React from 'react'
import {connect} from "react-redux";
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import style from './ProductPage_PC.useable.less'
import Common from "../../../utils/common";
import * as api from "../../../api/api";
import {Button, Col, Icon, Row} from "antd";
import LOVE from "../../result/img/love.png";
import DARK_LOVE from "../../img/dark_love.png";
import up from '../img/top_arrow.png'
import down from '../img/bottom_arrow.png'
import * as PATH from "../../../conts/path";

class ProductPage extends React.Component {


    constructor(props) {
        super(props);
        const id = Common.getQueryString('id');
        this.state = {
            id,
            data: {
                productName: "",
                sellPoint: "",
                brandId: "",
                brandName: "",
                currency: "",
                collection: false,
                categoryDtoList: [],
                detail: [{
                    imgAlt: "",
                    imgs: [],
                    itemsDetail: [
                        {
                            marketPrice: "0"
                        }
                    ],

                }],
            },
            // 初始选中的颜色
            imgAlt: "",
            currentShowPic: "",
            currentShowImagesArrayNumber: 0,
            isShow: false,
            currentSize: ""
        };
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10)
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
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
                const parseData = this.parseData(data);
                this.setState({
                    data: parseData,
                    imgAlt: parseData.detail[0].imgAlt,
                    currentShowPic: parseData.detail[0].imgs[0],
                    currentSize: parseData.detail[0].itemsDetail[0].size
                })
            }).catch(e => {

        })
    };

    parseData = (data) => {
        const parseData = {
            productName: data.productName,
            sellPoint: data.sellPoint,
            brandId: data.brandId,
            brandName: data.brandName,
            currency: data.currency,
            collection: data.collection,
            categoryDtoList: data.categoryDtoList,
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

    onRectMouseLeave = () => {
        const {isShow} = this.state;
        if (isShow) {
            this.setState({isShow: false})
        }
    };

    onRectMouseOver = () => {
        const {isShow} = this.state;
        if (!isShow) {
            this.setState({isShow: true})
        }
    };


    onMinusOne = () => {
        const {currentShowImagesArrayNumber} = this.state;
        if (currentShowImagesArrayNumber === 0) {
            return;
        }
        this.setState({currentShowImagesArrayNumber: currentShowImagesArrayNumber - 1});
    };

    onAddOne = () => {
        const {currentShowImagesArrayNumber, data, imgAlt} = this.state;
        const sum = Number((data.detail.find(n => imgAlt === n.imgAlt).imgs.length / 4) + 0.5).toFixed(0);
        if (currentShowImagesArrayNumber === (sum - 1)) {
            return;
        }
        this.setState({currentShowImagesArrayNumber: currentShowImagesArrayNumber + 1});
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
        const {data, imgAlt, currentShowPic, currentShowImagesArrayNumber, isShow, currentSize, id} = this.state;
        const cloneData = $.extend(true, {}, data);
        const imgs = cloneData.detail.find(n => imgAlt === n.imgAlt).imgs;
        const Breads = [];
        if (data.categoryDtoList.length > 0) {
            const category = this.props.pageInfo.category;
            const oneCategory = category.find(n => n.categoryDto.id === data.categoryDtoList[0].id);
            const twoCategory = oneCategory.secondCategoryDtoList.find(n => n.categoryDto.id === data.categoryDtoList[1].id);
            const thirdCategory = twoCategory.thirdCategoryDtoList.find(n => n.categoryDto.id === data.categoryDtoList[2].id);
            const cookie = Common.getCookie("language");
            Breads[0] = {
                name: cookie === 'en' ? oneCategory.categoryDto.categoryEnglish : oneCategory.categoryDto.categoryName,
                path: PATH.PLACEHOLDER + '?page=/special-r=' + (cookie === 'en' ? oneCategory.categoryDto.categoryEnglish : oneCategory.categoryDto.categoryName)
            };
            Breads[1] = {
                name: cookie === 'en' ? twoCategory.categoryDto.categoryEnglish : twoCategory.categoryDto.categoryName,
                path: PATH.PLACEHOLDER + '?page=/special-r=' + (cookie === 'en' ? oneCategory.categoryDto.categoryEnglish : oneCategory.categoryDto.categoryName) +
                    ':p=' + (cookie === 'en' ? twoCategory.categoryDto.categoryEnglish : twoCategory.categoryDto.categoryName)
            };
            Breads[2] = {
                name: cookie === 'en' ? thirdCategory.categoryDto.categoryEnglish : thirdCategory.categoryDto.categoryName,
                path: PATH.PLACEHOLDER + '?page=/special-r=' + (cookie === 'en' ? oneCategory.categoryDto.categoryEnglish : oneCategory.categoryDto.categoryName) +
                    ':p=' + (cookie === 'en' ? twoCategory.categoryDto.categoryEnglish : twoCategory.categoryDto.categoryName) +
                    ':v=' + (cookie === 'en' ? thirdCategory.categoryDto.categoryEnglish : thirdCategory.categoryDto.categoryName)
            };
            Breads[3] = {name: data.brandName, path: PATH.PRODUCT + '?id=' + id}
        }
        const splice = imgs.splice(currentShowImagesArrayNumber * 4, 4);
        let product_detail = null;
        try {
            product_detail = this.props.pageInfo.language.pc.product_detail;
        } catch (e) {
            product_detail = {
                buy_button: "",
                color: "",
                pro_services: " ",
                product_detail: "",
                size: ""
            };

        }
        const sum = Number((data.detail.find(n => imgAlt === n.imgAlt).imgs.length / 4) + 0.5).toFixed(0);
        return <React.Fragment>
            <TitleBar Breads={Breads}/>
            <div className={"product-pc"}>
                <div className={"header-product"}>
                    <div className={"carousel-vertical-item-layout"}
                         onMouseOver={this.onRectMouseOver}
                         onMouseLeave={this.onRectMouseLeave}>
                        {
                            splice.map((url, index) => {
                                return <div onClick={() => {
                                    this.setState({currentShowPic: url})
                                }}
                                            className={"carousel-vertical-item " + (index !== 0 ? "margin-top-40" : "")}>
                                    <img src={url}/>
                                </div>
                            })
                        }
                        {
                            currentShowImagesArrayNumber !== 0 && isShow &&
                            <div className={"top-rect "} onClick={this.onMinusOne}>
                                <div className={"layout-group"}>
                                    <div className={"select-rect"}/>
                                    <div className={"img-up-layout"}>
                                        <img src={up}/>
                                    </div>
                                </div>


                            </div>
                        }

                        {
                            currentShowImagesArrayNumber !== (sum - 1) && isShow &&
                            <div className={"bottom-rect"} onClick={this.onAddOne}>
                                <div className={"layout-group"}>
                                    <div className={"select-rect"}/>
                                    <div className={"img-up-layout"}>
                                        <img src={down}/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={"carousel-img"}>
                        <img src={currentShowPic}/>
                    </div>
                    <div className={"product-params"}>
                        <div className={"brand"}>{data.brandName}</div>
                        <div className={"product-title"}>{data.productName}</div>
                        <div className={"money-layout"}>
                            <span
                                className={"money"}>{this.getCurrency(data.currency)}{Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].marketPrice).toFixed(2)}</span>
                            {Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].costPrice).toFixed(2) !== Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].marketPrice).toFixed(2) &&
                            <span
                                className={"line-money"}>{this.getCurrency(data.currency)}{Number(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail[0].costPrice).toFixed(2)}</span>}
                        </div>
                        <div className={"color-layout"}>
                            <div className={"color-text"}>{product_detail.color}</div>
                            <div className={"color-item"}>
                                <Row gutter={16}>
                                    {
                                        data.detail.map((item, index) => {
                                            return <Col span={3}>
                                                <div
                                                    className={(item.imgAlt === imgAlt) ? "product-color-layout-select" : "product-color-layout"}>
                                                    <img onClick={() => {
                                                        this.setState({
                                                            imgAlt: item.imgAlt,
                                                            currentShowPic: item.imgs[0],
                                                            currentSize: item.itemsDetail[0].size
                                                        });
                                                    }}
                                                         className={"product-color " + (index >= 8 ? "margin-top-10" : "")}
                                                         src={item.color}/>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
                        <div className={"size-layout"}>
                            <div className={"size-text"}>
                                {product_detail.size}
                            </div>
                            <div className={"size-item"}>
                                <Row gutter={8}>
                                    {
                                        data.detail.find(n => n.imgAlt === imgAlt).itemsDetail.map((item, index) => {
                                            return <Col span={4}>
                                                <div onClick={() => {
                                                    this.setState({currentSize: item.size})
                                                }}
                                                     className={(index >= 6 ? "margin-top-10" : "") + (item.size === currentSize ? " select-size" : " size-item-text")}>{item.size}</div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
                        <div
                            className={"provider-item"}>{data.brandName.toLocaleUpperCase()} {product_detail.pro_services}</div>
                        <div className={"button-click-detail"} onClick={() => {
                            api.createOrder({
                                brandId: data.brandId,
                                productId: Number(id),
                                productUrl: encodeURIComponent(data.detail.find(n => n.imgAlt === imgAlt).itemsDetail.find(n => n.size === currentSize).detailLink)
                            }).then(data => {
                                // window.location.href = data;
                                window.open(data);
                            }).catch(e => {

                            })
                        }}>
                            {product_detail.buy_button}
                        </div>
                        <img onClick={() => {
                            if (data.collection) {
                                api.delProductFavorites({productId: id}).then(data => {
                                    const oldData = this.state.data;
                                    oldData.collection = false;
                                    this.setState({data: oldData})
                                }).catch(e => {

                                })
                            } else {
                                api.addProductFavorites({productId: id}).then(data => {
                                    const oldData = this.state.data;
                                    oldData.collection = true;
                                    this.setState({data: oldData})
                                }).then(e => {

                                })
                            }
                        }} className={"love"} src={!data.collection ? LOVE : DARK_LOVE}/>
                    </div>
                </div>
                <div className={"product-detail-desc"}>
                    <div>
                        {product_detail.product_detail}
                    </div>
                    <div className={"sell-point"}>
                        {data.sellPoint}
                    </div>
                </div>
                <div className={"product-detail-imgs"}>
                    <Row gutter={8}>
                        {
                            data.detail.find(n => n.imgAlt === imgAlt).imgs.map((item) => {
                                return <Col span={12}>
                                    <img src={item}/>
                                </Col>
                            })
                        }
                    </Row>
                </div>
            </div>
        </React.Fragment>;
    }

}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(ProductPage);
