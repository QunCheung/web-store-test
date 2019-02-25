import React from 'react'
import {connect} from "react-redux";
import {Button, Card, Checkbox, Col, Input, Pagination, Row, Select, Slider, Tag} from "antd";
import style from "./BrandPage.useable.less";
import {Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import LOVE from '../../../img/love.png'
import DARK_LOVE from '../../../img/dark_love.png'
import * as api from "../../../../api/api.js";
import {withRouter} from "react-router";
import TitleBar from "../../../../components/properties/pc/titlebar/TitleBar";
import ProductItem from "../../../../components/properties/pc/item/ProductItem";
import Bottom from "../../../../components/properties/pc/bottom/Bottom";
import Common from "../../../../utils/common";
import CommonResultItem from "../../../../components/properties/pc/item/CommonResultItem";
import * as PATH from "../../../../conts/path";

const regex = new RegExp(/^\d*$/);

class BrandPage extends React.Component {


    constructor(props) {
        super(props);
        const search = window.location.search;
        let id = Common.getQueryString("id", search);
        this.state = {
            id,
            openKeys: ['sub1'],
            data: {
                productListDto: {productDtoList: []}
            },
            brandData: {
                brandName: "",
                brandDesc: "",
                showLogoPic: "",
                collection: false
            },
            current: 1,
            temp: 1,
            total: 0,
            range: {
                maxMarketPrice: 0,
                minMarketPrice: 0,
                brandDtoList: [],
                firstCategoryDtoList: [],
                secondCategoryDtoList: [],
                defmaxMarketPrice: 0,
                defminMarketPrice: 0
            },
            tags: [],
            pageSize: 9,
            sort: "Relevance"
        };
        this.currentPage = 1;
        window.setTimeout(() => {
            window.scrollTo(0, 0)
        }, 10)
    }

    componentDidMount() {
        this.getData();
        this.getInfo();
    }


    getData = () => {
        api.getBrand({id: this.state.id})
            .then(data => {
                this.setState({brandData: data[0]}, () => {
                    this.getBrandProducts()
                })
            })
            .catch(e => {

            })

    };

    getBrandProducts = () => {
        const {tags} = this.state;
        let brandName = "";
        let categoryName = "";
        tags.forEach((obj) => {
            if (obj.type === "b") {
                brandName = brandName + obj.name + ",";
            } else {
                categoryName = categoryName + obj.name + ",";
            }
        });
        if (brandName.length > 0) {
            brandName = brandName.substr(0, brandName.length - 1);
        }
        if (categoryName.length > 0) {
            categoryName = categoryName.substr(0, categoryName.length - 1);
        }
        api.startSearch(this.state.pageSize, this.currentPage, {
            queryStr: this.state.brandData.brandName,
            price: this.state.range.defminMarketPrice === 0 && this.state.range.defmaxMarketPrice === 0 ? "*-*" :
                this.state.range.defminMarketPrice + "-" + this.state.range.defmaxMarketPrice,
            sort: this.state.sort === "Relevance" ? "" : this.state.sort,
            brandName, categoryName
        })
            .then(data => {
                if (data.length === 0 && this.currentPage !== 1) {
                    this.currentPage--;
                } else {
                    this.setState({data: data, total: data.productListDto.total});
                }
            }).catch(e => {
            this.currentPage--
        });
    };

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    onPageChange = (page, pageSize) => {
        this.currentPage = page;
        this.setState({current: Number(page)}, () => {
            this.getData();
        });

    };


    getInfo = () => {
        const {id} = this.state;
        api.getRange({search: id})
            .then(range => {
                range.defmaxMarketPrice = range.maxMarketPrice;
                range.defminMarketPrice = range.minMarketPrice;
                this.setState({range});
            })
            .catch(e => {

            })
    };

    onCheckChange = (c, n) => {
        const {tags} = this.state;
        if (c) {
            tags.push(n);
        } else if (tags.find(m => m.name === n.name)) {
            const number = tags.findIndex(m => m.name === n.name);
            tags.splice(number, 1);
        }
        this.setState({tags}, () => {
            this.getData();
        });
    };

    onTagClose = (o) => {
        const {tags} = this.state;
        tags.splice(o, 1);
        this.currentPage = 1;
        this.setState({tags, current: 1}, () => {
            this.getData();
        });
    };

    setRangePrice = (e) => {
        const {range} = this.state;
        range.defmaxMarketPrice = e[1];
        range.defminMarketPrice = e[0];
        this.currentPage = 1;
        this.setState({range, current: 1}, () => {
            this.getData();
        });
    };


    render() {
        const {data, total, brandData, id, current, range, tags} = this.state;
        let brand = null;
        try {
            brand = this.props.pageInfo.language.pc.brand.title;
        } catch (e) {
            brand = "";
        }
        return <React.Fragment>
            <TitleBar
                Breads={[{name: brand, path: PATH.BRANDS}, {
                    name: brandData.brandName,
                    path: PATH.BRAND + '?id=' + id
                }]}/>
            <CommonResultItem
                setRangePrice={this.setRangePrice}
                range={range}
                tags={tags}
                onBrandChange={this.onBrandChange}
                onTagClose={this.onTagClose}
                onCheckChange={this.onCheckChange}
                onPageChange={this.onPageChange}
                onSelectChange={this.onSelectChange}
                selectValue={this.state.sort}
                pageSize={9}
                total={total} current={current}
                noBrand={!data.brandDto} brandDataSource={data.brandDto}
                dataSource={data.productListDto.productDtoList}/>
        </React.Fragment>
    }

    onBrandChange = (s) => {
        const {data} = this.state;
        data.brandDto = s;
        this.setState({data})
    };

    onSelectChange = (e) => {
        this.setState({sort: e}, () => {
            this.getData();
        })
    }
}

const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default connect(mapStateToProps)(BrandPage);
