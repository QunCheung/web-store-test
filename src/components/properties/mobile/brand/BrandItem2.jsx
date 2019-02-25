import React from 'react'
import BaseComponent from "../../../../page/base/BaseComponent";
import Grid from "../grid/Grid";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import common from "../../../../utils/common";
import * as PATH from "../../../../conts/path";

class BrandItem2 extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            leftItem: [],
            rightItem: [],
            rightData: [],
            current: ""
        }
    }


    componentDidMount() {
        const {category} = this.props.pageInfo;
        console.log(category);
        const cookie = common.getCookie('language');

        const item1 = category[0].secondCategoryDtoList;
        const item2 = category[0].secondCategoryDtoList;
        let {leftItem, rightItem} = this.state;
        let product = [];
        item1.forEach(obj => {
            const categoryDto = obj.categoryDto;
            const name = cookie !== 'en' ? categoryDto.categoryName : categoryDto.categoryEnglish;
            if (product.indexOf(name) === -1) {
                product.push(name);
            }
        });
        item2.forEach(obj => {
            const categoryDto = obj.categoryDto;
            const name = cookie !== 'en' ? categoryDto.categoryName : categoryDto.categoryEnglish;
            if (product.indexOf(name) === -1) {
                product.push(name);
            }
        });
        let products = {};
        product.forEach(item => {
            const item1Category = item1.find(n => (cookie !== 'en' ? n.categoryDto.categoryName : n.categoryDto.categoryEnglish) === item);
            if (item1Category) {
                const thirdCategoryDtoList = item1Category.thirdCategoryDtoList;
                if (!products[item]) {
                    products[item] = []
                }
                thirdCategoryDtoList.forEach(obj => {
                    const find = products[item].find(n => (cookie !== 'en' ? n.categoryDto.categoryName : n.categoryDto.categoryEnglish) === (cookie !== 'en' ? obj.categoryDto.categoryName : obj.categoryDto.categoryEnglish));
                    if (!find) {
                        products[item].push(obj)
                    }
                });
            }

            const item2Category = item2.find(n => (cookie !== 'en' ? n.categoryDto.categoryName : n.categoryDto.categoryEnglish) === item);
            if (item2Category) {
                const thirdCategoryDtoList = item2Category.thirdCategoryDtoList;
                if (!products[item]) {
                    products[item] = []
                }
                thirdCategoryDtoList.forEach(obj => {
                    const find = products[item].find(n => (cookie !== 'en' ? n.categoryDto.categoryName : n.categoryDto.categoryEnglish) === (cookie !== 'en' ? obj.categoryDto.categoryName : obj.categoryDto.categoryEnglish));
                    if (!find) {
                        products[item].push(obj)
                    }
                });
            }
        });
        const arrays = this.getData(products, product[0]);
        this.setState({
            leftItem: product,
            rightItem: products,
            rightData: arrays,
            current: product[0]
        });
    }

    getData = (products, c) => {
        const rightItem = products;
        let arrays = [];
        const cookie = common.getCookie('language');
        rightItem[c].forEach(obj => {
            arrays.push({
                xs: {
                    xs: 24,
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
                        padding: "20px 0 2px 16px",
                        height: "260px",
                    }} onClick={() => {
                        this.startPage(PATH.RESULT + "?search=New Product", false)
                    }}
                    >
                        <div>
                            <img style={{
                                width: "174px",

                                height: "174px",
                            }}
                                 src={obj.categoryDto.showPic}/>
                        </div>
                        <div className={"item-right-text  kalinga-font"}>
                            {cookie !== 'en' ? obj.categoryDto.categoryName : obj.categoryDto.categoryEnglish}
                        </div>
                    </div>
                }
            })
        });
        return arrays;
    };

    render() {
        let height = window.innerHeight - 88 - 88;
        let width = window.innerWidth - 150;
        return <React.Fragment>
            <div className={"item2"}>
                <div style={{height: height}} className={"left-item item-float"}>
                    {
                        this.state.leftItem.map(obj =>
                            <div onClick={() => {
                                const data = this.getData(this.state.rightItem, obj);
                                this.setState({
                                    current: obj,
                                    rightData: data
                                });
                            }}
                                 className={"item-text kalinga-font " + (this.state.current === obj ? "item-select" : "")}>
                                {obj}
                            </div>
                        )
                    }
                </div>
                <div style={{overflowY: "scroll", height: height}}>
                    <Grid dataSource={this.state.rightData}
                          itemStyle={{width: width, textAlign: "center", padding: "0 30px 0 0", float: "left"}}/>
                </div>
            </div>
        </React.Fragment>
    }

}

const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default withRouter(connect(mapStateToProps)(BrandItem2));
