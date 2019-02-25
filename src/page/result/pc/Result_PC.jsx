import React from 'react'
import {connect} from "react-redux";
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import Common from "../../../utils/common";
import * as api from "../../../api/api";
import {withRouter} from "react-router";
import CommonResultItem from "../../../components/properties/pc/item/CommonResultItem";


class Result_PC extends React.Component {


    constructor(props) {
        super(props);
        const search = window.location.search;
        let queryString = Common.getQueryString("search", search);
        this.state = {
            queryString,
            openKeys: ['sub1'],
            data: {
                productListDto: {productDtoList: []}
            },
            total: 0,
            current: 1,
            temp: 1,
            pageSize: 9,
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
            sort: "Relevance"
        };
        this.currentPage = 1;
    }

    componentDidMount() {
        this.getData();
        this.getInfo();
    }

    getInfo = () => {
        const {queryString} = this.state;
        api.getRange({search: queryString})
            .then(range => {
                range.defmaxMarketPrice = range.maxMarketPrice;
                range.defminMarketPrice = range.minMarketPrice;
                this.setState({range});
            })
            .catch(e => {

            })
    };


    getData = () => {
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
            queryStr: this.state.queryString,
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


    onPageChange = (page, pageSize) => {
        this.currentPage = page;
        this.setState({current: Number(page)}, () => {
            this.getData();
        });
    };


    onCheckChange = (c, n) => {
        const {tags} = this.state;
        if (c) {
            tags.push(n);
        } else if (tags.find(m => m.name === n.name)) {
            const number = tags.findIndex(m => m.name === n.name);
            console.log(number);
            tags.splice(number, 1);
        }
        this.setState({tags}, () => {
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


    onTagClose = (o) => {
        const {tags} = this.state;
        tags.splice(o, 1);
        this.currentPage = 1;
        this.setState({tags, current: 1}, () => {
            this.getData();
        });
    };

    render() {
        const {data, total, current, pageSize, range, tags} = this.state;
        let result = null;
        try {
            result = this.props.pageInfo.language.pc.result;
        } catch (e) {
            result = ["", ""]
        }
        return <React.Fragment>
            <TitleBar Breads={[{name: result[0] + this.state.queryString + result[1]}]}/>
            <CommonResultItem
                setRangePrice={this.setRangePrice}
                range={range}
                tags={tags}
                onBrandChange={this.onBrandChange}
                onTagClose={this.onTagClose}
                onCheckChange={this.onCheckChange}
                onPageChange={this.onPageChange}
                pageSize={pageSize}
                onSelectChange={this.onSelectChange}
                selectValue={this.state.sort}
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
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Result_PC));
