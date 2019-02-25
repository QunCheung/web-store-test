import React from 'react';
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import CommonResultItem from "../../../components/properties/pc/item/CommonResultItem";
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import Common from "../../../utils/common";
import * as api from "../../../api/api";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as PATH from "../../../conts/path";


class CommonResult extends React.Component {

    constructor(props) {
        super(props);
        const search = window.location.search;
        let r = Common.getQueryString("r", search);
        let p = Common.getQueryString("p", search);
        let v = Common.getQueryString("v", search);
        this.state = {
            r,
            p,
            v,
            data: {
                productListDto:{productDtoList:[]}
            },
            pageSize: 9,
            current: 1,
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
            sort: "Relevance"
        };
    }

    componentDidMount() {
        this.getData();
        this.getInfo();
    }


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
            brandName= brandName.substr(0, brandName.length - 1);
        }
        if (categoryName.length > 0) {
            categoryName = categoryName.substr(0, categoryName.length - 1);
        }
        let queryString = null;
        const {
            r,
            p,
            v
        } = this.state;
        if (v) {
            queryString = v;
        } else if (p) {
            queryString = p;
        } else {
            queryString = r;
        }

        api.startSearch(this.state.pageSize, this.state.current, {
            queryStr: queryString,
            price:this.state.range.defminMarketPrice === 0 && this.state.range.defmaxMarketPrice === 0 ? "*-*":
                this.state.range.defminMarketPrice + "-" + this.state.range.defmaxMarketPrice,
            sort: this.state.sort === "Relevance" ? "" : this.state.sort,
            brandName, categoryName
        })
            .then(data => {
                if (data.length === 0 && this.currentPage !== 1) {
                    this.setState({current: this.state.current - 1})
                } else {
                    this.setState({data: data, total: data.productListDto.total});
                }
            }).catch(e => {
            this.setState({current: this.state.current - 1});
        });
    };


    onPageChange = (page, pageSize) => {
        this.setState({current: Number(page)}, () => {
            this.getData();
        });
    };

    getInfo = () => {
        const {
            r,
            p,
            v
        } = this.state;
        let queryString = "";
        if (v) {
            queryString = v;
        } else if (p) {
            queryString = p;
        } else {
            queryString = r;
        }

        api.getRange({search: queryString})
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
            console.log(number);
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
        this.setState({tags,current:1},()=>{
            this.getData();
        });
    };

    setRangePrice = (e) => {
        const {range} = this.state;
        range.defmaxMarketPrice = e[1];
        range.defminMarketPrice = e[0];
        this.currentPage = 1;
        this.setState({range,current:1},()=>{
            this.getData();
        });
    };

    render() {
        const {r, p, v, data, pageSize, current, total, range, tags} = this.state;
        const Breads = [];
        const pc = this.props.pageInfo.language.pc;
        let root = null;
        try {
            root = pc[r.toLocaleLowerCase()].title;
        } catch (e) {
            root = r
        }
        if (r) {
            Breads.push({name: root, path: PATH.PLACEHOLDER + '?page=/special-r=' + r})
        }
        if (p) {
            Breads.push({name: p, path: PATH.PLACEHOLDER + '?page=/special-r=' + r + ':p=' + p})
        }
        if (v) {
            Breads.push({name: v, path: PATH.PLACEHOLDER + '?page=/special-r=' + r + ':p=' + p + ':v=' + v})
        }
        return <React.Fragment>
            <TitleBar Breads={Breads}/>
            <CommonResultItem
                setRangePrice={this.setRangePrice}
                range={range}
                tags={tags}
                onTagClose={this.onTagClose}
                onCheckChange={this.onCheckChange}
                onPageChange={this.onPageChange}
                onSelectChange={this.onSelectChange}
                selectValue={this.state.sort}
                pageSize={pageSize}
                total={total} current={current}
                noBrand={!data.brandDto} dataSource={data.productListDto.productDtoList} brandDataSource={data.brandDto}/>
        </React.Fragment>

    }
    onSelectChange = (e) => {
        this.setState({sort: e}, () => {
            this.getData();
        })
    }

}


const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(CommonResult));
