import React from 'react'
import {Affix, Col, Drawer, Icon, Input, Row, Tag} from "antd";
import style from './ProductNavigation.useable.less'
import select2 from "../../../../page/my/mobile/favorites/img/27.png";
import input from "./img/JIAGE.png";
import sort from './img/sort.png'
import filter from './img/filter.png'
import common from "../../../../utils/common";
import connect from "react-redux/es/connect/connect";

const {CheckableTag} = Tag;

class ProductNavigation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {},
            queryData: [],
            pos: 0
        };
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    onClickFilter = (e) => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        const {onConfirmClick} = this.props;
        onConfirmClick();
        this.setState({
            visible: false,
            queryData: []
        });
    };

    onReset = () => {
        const {data} = this.state;
        Object.keys(data).forEach((item) => {
            data[item].forEach((obj) => {
                obj.isSelect = false
            })
        });
        const {onRestData} = this.props;
        this.setState({data}, () => {
            onRestData();
        })
    };


    handleChange = (keys, obj, index) => {
        let {data} = this.state;
        let item = data[keys][index];
        item.isSelect = !item.isSelect;
        this.setState({data})
    };

    onCloseData = () => {
        this.setState({
            queryData: []
        });
    };

    componentDidMount() {

    }


    onShowList = (index) => {
        const {range} = this.props;
        let queryData = [];
        if (index === 1) {
            queryData = range.BRANDS;
        } else {
            queryData = range.CLASSIFICATION;
        }
        // 如果都等于false 或者都等于 true ，则全部查询
        this.setState({
            queryData, pos: index
        })
    };

    render() {
        const cookie = common.getCookie("language");
        const {range, onChange} = this.props;
        const {onPriceClick, onComprehensiveClick, minPriceChange, maxPriceChange, onConfirmClick, minMarketPrice, maxMarketPrice} = this.props;
        let innerWidth = window.innerWidth;
        let number = innerWidth * 0.75;
        let {queryData, visible, pos} = this.state;
        let searchResult = null
        try {
            searchResult = this.props.pageInfo.language.mobile.search_result;
        } catch (e) {
            searchResult = {
                desc: "",
                filter: {
                    all: "",
                    brands: "",
                    category: "",
                    confirm: "",
                    men_women: "",
                    price: "",
                    reset: ""
                },
                price: "",
                relevance: "",
                title: ""
            }
        }
        return <React.Fragment>
            <div className={"navigation"}>
                <Affix offsetTop={88}>
                    <div style={{background: "#fff", padding: "0 30px"}}>
                        <Row>
                            <Col span={8}>
                                <div onClick={onComprehensiveClick}
                                     className={"filter-text"}>{searchResult.relevance}</div>
                            </Col>

                            <Col span={8}>
                                <div onClick={onPriceClick}
                                     className={"filter-text text-center"}>{searchResult.price}<img
                                    style={{width: 20}}
                                    src={sort}/>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div onClick={this.onClickFilter} className={"filter-text text-right"}>Filter<img
                                    style={{width: 20}} src={filter}/></div>
                            </Col>
                        </Row>
                    </div>
                </Affix>
                <Drawer
                    placement="right"
                    width={number}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}>
                    {
                        queryData.length > 0 && <div className={"all-page"}>
                            <div className={"title"}>{pos === 1 ? "ALL BRANDS" : "ALL CATEGORIES"}</div>
                            {
                                queryData.map((item, position) => {
                                    if (pos === 1) {
                                        return <div>
                                            <div>
                                                <div onClick={() => {
                                                    onChange(pos, position)
                                                }} className={"item"}>{item.brandName}{item.isSelect &&
                                                <img className={"icon"}
                                                     src={select2}/>}</div>

                                            </div>
                                        </div>
                                    }
                                    return <div>
                                        <div
                                            className={"item-title"}>{cookie !== "en" ? item.categoryDto.categoryName : item.categoryDto.categoryEnglish}</div>
                                        {
                                            item.thirdCategoryDtoList.map((obj, index) => {
                                                return <div>
                                                    <div onClick={() => {
                                                        onChange(pos, position, index)
                                                    }}
                                                         className={"item"}>{cookie !== "en" ? obj.categoryDto.categoryName : obj.categoryDto.categoryEnglish}{obj.categoryDto.isSelect &&
                                                    <img className={"icon"}
                                                         src={select2}/>}</div>

                                                </div>
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    }

                    {queryData.length === 0 &&
                    <div>
                        {
                            <div className={"container"}>
                                <div
                                    className={"key-text " + "key-text-margin-10"}>
                                    {searchResult.filter.men_women}
                                </div>
                                {
                                    range.STYLE.map((obj, position) => {
                                        return <CheckableTag
                                            key={cookie !== "en" ? obj.categoryName : obj.categoryEnglish}
                                            closable={false}
                                            checked={!!obj.isSelect}
                                            onChange={() => {
                                                onChange(0, position);
                                                // this.handleChange(searchResult.filter.men_women, obj, position);
                                            }}
                                        >
                                            {cookie !== "en" ? obj.categoryName : obj.categoryEnglish}
                                        </CheckableTag>
                                    })
                                }
                            </div>
                        }
                        {
                            <div className={"container"}>
                                <div
                                    className={"key-text " + "key-text-margin-10"}>
                                    {searchResult.filter.brands}{<span onClick={() => {
                                    this.onShowList(1)
                                }} className={"text-all"}>{searchResult.filter.all} ></span>}
                                </div>
                                {
                                    !!range.BRANDS &&
                                    range.BRANDS.map((obj, position) => {
                                        if (position >= 5) {
                                            return null;
                                        }
                                        return <CheckableTag
                                            key={obj.brandName}
                                            closable={false}
                                            checked={!!obj.isSelect}
                                            onChange={() => {
                                                onChange(1, position);
                                            }}
                                        >
                                            {obj.brandName}
                                        </CheckableTag>
                                    })
                                }
                            </div>
                        }
                        {
                            <div className={"container"}>
                                <div
                                    className={"key-text " + "key-text-margin-10"}>
                                    {searchResult.filter.category}{<span onClick={() => {
                                    this.onShowList(2)
                                }} className={"text-all"}>{searchResult.filter.all} ></span>}
                                </div>
                                {
                                    range.CLASSIFICATION.map((obj, position) => {
                                        return obj.thirdCategoryDtoList.map((item, index) => {
                                            if (index >= 5) {
                                                return null;
                                            }
                                            return <CheckableTag
                                                key={cookie !== "en" ? item.categoryDto.categoryName : item.categoryDto.categoryEnglish}
                                                closable={false}
                                                checked={!!item.categoryDto.isSelect}
                                                onChange={() => {
                                                    onChange(2, position, index);
                                                }}
                                            >
                                                {cookie !== "en" ? item.categoryDto.categoryName : item.categoryDto.categoryEnglish}
                                            </CheckableTag>
                                        })

                                    })
                                }
                            </div>
                        }

                        <div className={"container"}>
                            <div className={"key-text key-text-margin-20"}>
                                {searchResult.filter.price}
                            </div>
                            <div className={"price"}>
                                <div className={"input-frame"}>
                                    <input value={minMarketPrice} className={"margin-left-10"}
                                           onChange={minPriceChange}/>
                                    ~
                                    <input value={maxMarketPrice} onChange={maxPriceChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    <div className={"float-button"}>
                        <div onClick={this.onReset}
                             className={"button-style reset"}>
                            {searchResult.filter.reset}
                        </div>
                        <div onClick={queryData.length > 0 ? this.onCloseData : this.onClose}
                             className={"button-style confirm"}>
                            {searchResult.filter.confirm}
                        </div>
                    </div>
                </Drawer>
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(ProductNavigation);
