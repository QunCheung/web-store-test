import React from 'react';
import style from "./HomeBody.useable.less";
import {Card, Col, Icon, Row} from 'antd';
import leftArrow from './img/left.png'
import rightArrow from './img/right.png'
import * as api from "../../../../../api/api";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ProductItem from "../../item/ProductItem";
import * as PATH from "../../../../../conts/path";

const {Meta} = Card;

class HomeBody extends React.Component {
    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

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
        const innerWidth = window.innerWidth;
        const {recommendProducts, brands, actData, getRecommendData} = this.props;
        let home = null;
        try {
            home = this.props.pageInfo.language.pc.home
        }catch (e) {
            home = {
                featured_brand: "FEATURED BRANDS",
                recommend: "RECOMMEND",
                shop_collection: "SHOP THE COLLECTION",
                title: "HOME"
            }
        }
        return <div className={"home-body"}>
            <div className={"brands"}>
                <div className={"title"}>
                    {home.featured_brand}
                </div>
                <div className={"items"}>
                    <Row gutter={16}>
                        {brands && brands.map((item, index) => {
                            if (index >= 16) {
                                return <div/>
                            }
                            return <Col span={Number(24 / (this.props.brands.length / 2)).toFixed(0)}>
                                <img onClick={() => {
                                    this.props.history.push(PATH.PLACEHOLDER +'?page=/brand-id=' + item.id);
                                }} style={{
                                    cursor: "pointer",
                                    width: "166px",
                                    height: "166px",
                                    marginTop: (index > (this.props.brands.length / 2 - 1) ? 20 : 0)
                                }}
                                     src={item.showLogoPic}/>
                            </Col>

                        })}
                    </Row>
                </div>
            </div>
            <div className={"activitys"}>
                <Row gutter={10}>
                    {
                        actData && actData.map((item, index) => {
                            if (index > 1) {
                                return <Col span={8}>
                                    <div className={"act-item"}><img style={{width: "100%", height: 474, marginTop: 10}}
                                                                     src={item.publicizePic}/>
                                        <div className={"button-layout"}>
                                            <div className={"hover-button"} onClick={() => {
                                                this.props.history.push(PATH.ACTIVITY + '?id=' + item.id)
                                            }}>
                                                {home.shop_collection}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            }
                            return <Col span={12}>
                                <div className={"act-item"}>
                                    <img style={{width: "100%", height: 715}}
                                         src={item.publicizePic}/>
                                    <div className={"button-layout"}>
                                        <div className={"hover-button"} onClick={() => {
                                            this.props.history.push(PATH.ACTIVITY + '?id=' + item.id)
                                        }}>
                                            {home.shop_collection}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        })
                    }
                </Row>
            </div>
            <div className={"recommend"}>
                <div className={"title"}>
                    {home.recommend}
                </div>
                <div className={"recommend-product"}>
                    <Row>
                        <Col span={innerWidth > 1440 ? 1 : 2}>
                            <div onClick={() => {
                                getRecommendData(false)
                            }} className={"arrow"}>
                                <img src={leftArrow}/>
                            </div>
                        </Col>
                        <Col span={innerWidth > 1440 ? 22 : 20}>
                            <Row gutter={16}>
                                {recommendProducts && recommendProducts.map(item => {
                                    return <Col span={innerWidth > 1440 ? 4 : 6}>
                                        <div onClick={() => {
                                            this.props.history.push(PATH.PRODUCT+'?id=' + item.id)
                                        }}>
                                            <Card
                                                hoverable
                                                style={{height: 380}}
                                                cover={<img alt="example"
                                                            style={{height: 248, margin: "6px 6px 0 6px"}}
                                                            src={item.showPic}/>}
                                            >
                                                <div className={"type"}>
                                                    {item.brandName}
                                                </div>
                                                <div className={"name"}>
                                                    {item.productName}
                                                </div>
                                                <div className={"price-layout"}>
                                                <span
                                                    className={"price"}>{this.getCurrency(item.currency)}{item.defaultMarketPrice}</span>
                                                    {item.defaultMarketPrice !== item.defaultCostPrice &&
                                                    <span
                                                        className={"price-line"}>{this.getCurrency(item.currency)}{item.defaultCostPrice}</span>}
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>
                                })}
                            </Row>
                        </Col>
                        <Col span={innerWidth > 1440 ? 1 : 2}>
                            <div onClick={() => {
                                getRecommendData(true)
                            }} className={"arrow"}>
                                <img src={rightArrow}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    }

}


const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(HomeBody));
