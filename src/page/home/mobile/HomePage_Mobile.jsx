import React from 'react';
import {Component} from 'react';
import Grid from '../../../components/properties/mobile/grid/Grid.jsx'
import GridTitle from '../../../components/properties/mobile/title/GridTitle.jsx'
import ProductItem from '../../../components/properties/mobile/listItem/ProductItem.jsx'
import img1 from './img/8.png'
import img2 from './img/9.png'
import img3 from './img/10.png'
import style from './HomePage_Mobile.useable.less'
import Toolbar from "../../../components/properties/mobile/toolbar/ToolBar";
import * as PageAction from "../../../action/page_action.js";
import {connect} from "react-redux";
import SliderCarousel from "../../../components/properties/mobile/slider/SliderCarousel";
import {withRouter} from "react-router";
import * as api from "../../../api/api";
import logo from "../../img/logo.png";
import * as PATH from "../../../conts/path";

class HomePage_Mobile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            actData: [],
            banner: [],
            brands: []
        }
    }


    onSearchClick = () => {
        this.props.dispatch(PageAction.hideNav());
        this.props.history.push(PATH.SEARCH + "");
    };


    onProductItemClick = (e) => {
        this.props.dispatch(PageAction.hideNav());
        this.props.history.push(PATH.PRODUCT + "?id=" + e);
    };

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    componentDidMount() {
        Promise.all([
            api.getBanners(),
            api.getRecommendBrands({
                isRecommend: 1,
                limit: 9
            }), api.getActivitys({
                limit: 5
            }), api.getProducts(6, 1, {isRecommend: 1})])
            .then(data => {
                console.log(data);
                this.setState({banner: data[0], brands: data[1], actData: data[2], data: data[3].productDtoList || []});
            }).catch(e => {
        });

    }

    setCollection = (key, f) => {
        const {data} = this.state;
        const find = data.find(n => n.id === key);
        find.collection = f;
        this.setState({data})
    };


    render() {
        let data = this.state.brands.map((item, index) => {
            if (index >= 9) {
                return null;
            }
            return {
                xs: {
                    xs: 8,
                    offset: 0
                },
                sm: {
                    sm: 8,
                    offset: 0
                },
                md: {
                    md: 8,
                    offset: 0
                },
                lg: {
                    lg: 8,
                    offset: 0
                },
                xl: {
                    xl: 8,
                    offset: 0
                },
                xxl: {
                    xxl: 8,
                    offset: 0
                },
                data: {
                    content: <div style={{
                        width: "100%",
                        padding: "18px 18px 0 0",
                        height: "100%",
                    }} onClick={() => {
                        this.props.history.push(PATH.BRAND + '?id=' + item.id);
                        this.props.dispatch(PageAction.hideNav());
                    }}
                    ><img style={{
                        width: "212px",
                        height: "212px",
                        borderRadius: "20px"
                    }}
                          src={item.showLogoPic}/>
                    </div>
                }
            }
        });
        let data2 = [];
        this.state.actData.forEach((item, index) => {
            if (index < 3) {
                data2.push({
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
                        content:
                            <div style={{
                                width: "100%",
                                padding: "30px 30px 0 30px",
                                height: "100%",

                            }}><img onClick={() => {
                                this.props.history.push(PATH.ACTIVITY + '?id=' + item.id);
                                this.props.dispatch(PageAction.hideNav());
                            }} style={{
                                width: "690px",
                                height: "352px",
                                borderRadius: "10px"
                            }} src={item.publicizePic}/>

                            </div>
                    }
                })
            }
        });


        let data3 = [];
        for (let i = 0; i < 1; i++) {
            data3.push({
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
                        padding: "44px 0 30px",
                        height: "100%",
                    }}
                                  src={"http://116.62.237.10/sdk/img/home/" + (13) + ".png"}/>
                }
            })
        }
        let data4 = [];
        for (let j = 0; j < this.state.data.length; j++) {

            const item = this.state.data[j];
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
                        productCostMoney={item.defaultCostPrice}/>

                }
            })
        }
        let data5 = [];
        for (let i = 0; i < 0; i++) {
            data5.push({
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
                    content:
                        <div className={"item5"}>
                            <div className={"commodity-name margin-top-90"}>
                                common problem
                            </div>
                            <div className={"commodity-name margin-top-36"}>
                                Terms of use
                            </div>
                            <div className={"commodity-name margin-top-36"}>
                                About FS
                            </div>
                            <div className={"commodity-name margin-top-36"}>
                                Business Cooperation:xxx@xx.com
                            </div>
                            <div className={"commodity-name margin-top-36"}>
                                Social Media
                            </div>
                            <div className={"margin-top-36"}>
                                <img src={img1} className={"icon-size margin-right-30"}/>
                                <img src={img2} className={"icon-size"}/>
                                <img src={img3} className={"icon-size margin-left-30"}/>
                            </div>
                        </div>
                }
            })
        }
        const home = this.props.pageInfo.language.mobile.home;
        return <React.Fragment>
            <Toolbar title={<img src={logo}/>}
                     showRightIcon={true}
                     showLeftIcon={false}
                     onRightClick={this.onSearchClick}

            />
            <div style={{paddingBottom:88}}>
                <SliderCarousel data={this.state.banner}/>
                <GridTitle title={home.featured_brands}
                           className={"text-color-orange margin-top-60 text-title-size kalinga-font"}/>
                <Grid dataSource={data} itemStyle={{padding: "28px 21px 0px 39px"}}/>
                <GridTitle title={home.Sales}
                           className={"text-color-orange margin-top-60 text-title-size kalinga-font"}/>
                <Grid dataSource={data2} itemStyle={{padding: "4px 0 0 0"}}/>
                <GridTitle title={home.themes}
                           className={"text-color-orange margin-top-60 text-title-size kalinga-font"}/>
                <Grid dataSource={data3}/>
                <Grid dataSource={data4} itemStyle={{padding: "0 15px 0 15px"}}/>
                {/*<Grid dataSource={data5} itemStyle={{margin: "126px 0 88px 0"}}/>*/}
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};

// export default withRouter(connect(mapStateToProps)(HomePage_Mobile));
export default withRouter(connect(mapStateToProps)(HomePage_Mobile));
