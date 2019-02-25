import React from 'react'
import style from "./BrandListPage_Mobile.useable.less";
import ToolBar from "../../../components/properties/mobile/toolbar/ToolBar";
import {Radio} from 'antd';
import BrandItem1 from "../../../components/properties/mobile/brand/BrandItem1.jsx";
import BrandItem2 from "../../../components/properties/mobile/brand/BrandItem2.jsx";
import BrandItem3 from "../../../components/properties/mobile/brand/BrandItem3.jsx";
import {connect} from "react-redux";
import BaseComponent from "../../base/BaseComponent";
import * as api from "../../../api/api";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";

class BrandListPage_Mobile extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            header: "brand",
            imgs: [],
            data: []
        }
    }


    componentWillMount() {
        style.use();
    }


    componentWillUnmount() {
        style.unuse();
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        api.getBrands()
            .then(data => {
                console.log(data);
                this.setState({data});
            })
            .catch(e => {

            });

        api.getRecommendBrands({
            isRecommend: 1,
            limit: 8
        }).then(data => {
            this.setState({imgs: data});
            console.log(data);
        }).catch(e => {

        });
    };


    handleSizeChange = (e) => {
        this.setState({header: e.target.value});
    };

    getBrandItem = () => {

        let data3 = [];
        this.state.imgs.forEach((item) => {
            data3.push({
                xs: {
                    xs: 24,
                    offset: 0
                },
                sm: {
                    sm: 6,
                    offset: 0
                },
                md: {
                    md: 6,
                    offset: 0
                },
                lg: {
                    lg: 6,
                    offset: 0
                },
                xl: {
                    xl: 6,
                    offset: 0
                },
                xxl: {
                    xxl: 6,
                    offset: 0
                },
                data: {
                    content: <div style={{
                        width: "100%",
                        margin: "22px 11px 0",
                        height: "100%",
                    }} onClick={() => {
                        this.startPage(PATH.BRAND +"?id="+item.id, false);
                    }}
                    ><img style={{
                        width: "156px",

                        height: "156px",
                    }}
                          src={item.showLogoPic}/>
                    </div>
                }
            })
        });
        const {header, data} = this.state;
        switch (header) {
            case "brand":
                return <BrandItem1 brandSource={data} dataSource={data3}/>;
            case "classification":
                return <BrandItem2/>;
            case "official_website":
                return <BrandItem3 brandSource={data}/>;
            default:
                return <BrandItem1 brandSource={data} dataSource={data3}/>;
        }
    };

    getTitleBar = () => {
        let header = this.state.header;
        let brands;
        try {
            brands = this.props.pageInfo.language.mobile.brands;
        } catch (e) {
            brands = {item1: "", item2: "", item3: ""}
        }
        return <div className={"brands-toolbar"}>
            <Radio.Group value={header} onChange={this.handleSizeChange}>
                <Radio.Button className={"radio-button-left " + ((header === "brand") ? "select-button" : "")}
                              value="brand">{brands.item1}</Radio.Button>
                <Radio.Button className={header === "classification" ? "select-button" : ""}
                              value="classification">{brands.item2}</Radio.Button>
                <Radio.Button
                    className={"radio-button-right " + ((header === "official_website") ? "select-button" : "")}
                    value="official_website">{brands.item3}</Radio.Button>
            </Radio.Group>
        </div>
    };

    render() {
        let dom = this.getBrandItem();
        return <div className={"brands"}>
            <ToolBar CustomItem={this.getTitleBar()}
            />
            {dom}
        </div>;
    }
}


const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default withRouter(connect(mapStateToProps)(BrandListPage_Mobile));
