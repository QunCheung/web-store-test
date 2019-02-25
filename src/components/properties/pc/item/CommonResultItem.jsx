import React from 'react'
import {connect} from "react-redux";
import Common from "../../../../utils/common";
import {Button, Card, Checkbox, Col, Icon, Input, Pagination, Row, Select, Slider, Tag} from "antd";
import style from "./CommonReusltItem.useable.less";
import {Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import LOVE from '../../../../page/img/love.png'
import DARK_LOVE from '../../../../page/img/dark_love.png'
import * as api from "../../../../api/api";
import {withRouter} from "react-router";
import ProductItem from "./ProductItem.jsx";
import * as PATH from "../../../../conts/path";


const regex = new RegExp(/^\d*$/);

class CommonResultItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            openKeys: ['sub1'],
            temp: 1,
            placeholder: "",
            tags: [],
            e: "",
            current: 1,
            hide:true,
            brandDataSource:""
        };
        this.currentPage = 1;
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    rootSubmenuKeys = [];
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


    onTagClose = (o) => {
        const {tags} = this.state;
        tags.splice(o, 1);
        this.setState({tags});
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
        });
    };


    render() {
        const {
            noBrand, dataSource,
            onPageChange, total, current, pageSize,
            range, onCheckChange,
            tags, onTagClose,
            setRangePrice, onSelectChange, selectValue, brandDataSource,onBrandChange
        } = this.props;
        let newArrivals = null;
        try {
            newArrivals = this.props.pageInfo.language.pc.new_arrivals;
        } catch (e) {
            newArrivals = {
                filter: {
                    men_women: "", brands: "", price: {
                        title: "",
                        from_to: ["", ""]
                    }, category: ""
                },
                sort_by: {
                    item: [
                        "",
                        "",
                        ""],
                    title: ""
                },
                title: ""
            }
        }
        const cookie = Common.getCookie("language");
        return <React.Fragment>
            <div className={"common-result-pc"}>
                <Row>
                    <Col span={7}>
                        <div className={"div-inline left"}>
                            <div className={"item"}>
                                <div className={"item-title"}>{newArrivals.filter.price.title}</div>
                                <Slider range onChange={(e) => {
                                    this.setState({e});
                                    setRangePrice(e);
                                }} value={[range.defminMarketPrice, range.defmaxMarketPrice]}
                                        max={range.maxMarketPrice} min={range.minMarketPrice}
                                        disabled={false}/>
                                <div className={"price-step"}>
                                    <span>{newArrivals.filter.price.from_to[0]} </span> <span
                                    style={{margin: "0 0 0 10px"}}>${range.defminMarketPrice}</span> <span
                                    style={{margin: "0 0 0 25px"}}>{newArrivals.filter.price.from_to[1]} </span> <span
                                    style={{margin: "0 0 0 10px"}}>${range.defmaxMarketPrice}</span></div>
                                {range.firstCategoryDtoList.length === 2 &&
                                <div>
                                    <div className={"filter-title margin-top-60"}>
                                        {newArrivals.filter.men_women}
                                    </div>
                                    <div className={"checked-container"}>
                                        <Checkbox>Men</Checkbox>
                                        <br/>
                                        <Checkbox>Women</Checkbox>
                                    </div>
                                </div>}
                                {range.brandDtoList.length > 1 &&
                                <div>
                                    <div className={"filter-title margin-top-60"}>
                                        {newArrivals.filter.brands}
                                    </div>
                                    <div className={"checked-container"}>
                                        {
                                            range.brandDtoList.map((item, index) => {
                                                return <React.Fragment>
                                                    <Checkbox checked={!!tags.find(n => n.name === item.brandName)}
                                                              onChange={(e) => {
                                                                  onCheckChange(e.target.checked, {
                                                                      name: item.brandName,
                                                                      type: "b"
                                                                  });
                                                                  this.onCheckChange(e.target.checked, {
                                                                      name: item.brandName,
                                                                      type: "b"
                                                                  })
                                                              }}>{item.brandName}</Checkbox>
                                                    {index !== range.brandDtoList.length - 1 && <br/>}
                                                </React.Fragment>
                                            })
                                        }
                                    </div>
                                </div>
                                }
                                {range.secondCategoryDtoList.length !== 0 &&
                                <div className={"filter-menu"}>
                                    <div className={"filter-title margin-top-60"}>
                                        {newArrivals.filter.category}
                                    </div>
                                    <Menu
                                        inlineIndent={0}
                                        mode="inline"
                                        openKeys={this.state.openKeys}
                                        onOpenChange={this.onOpenChange}
                                        style={{width: 256}}
                                    >
                                        {range.secondCategoryDtoList.map(item => {
                                            return <SubMenu
                                                key={cookie === 'en' ? item.categoryDto.categoryEnglish : item.categoryDto.categoryName}
                                                title={
                                                    <span>{cookie === 'en' ? item.categoryDto.categoryEnglish : item.categoryDto.categoryName}</span>}>
                                                {item.thirdCategoryDtoList.map(obj => (
                                                    <Menu.Item
                                                        key={cookie === 'en' ? obj.categoryDto.categoryEnglish : obj.categoryDto.categoryName}>
                                                        <Checkbox
                                                            checked={!!tags.find(n => n.name === (cookie === 'en' ? obj.categoryDto.categoryEnglish : obj.categoryDto.categoryName))}
                                                            onChange={(e) => {
                                                                onCheckChange(e.target.checked, {
                                                                    name: (cookie === 'en' ? obj.categoryDto.categoryEnglish : obj.categoryDto.categoryName),
                                                                    type: "c"
                                                                });
                                                                this.onCheckChange(e.target.checked, {
                                                                    name: (cookie === 'en' ? obj.categoryDto.categoryEnglish : obj.categoryDto.categoryName),
                                                                    type: "c"
                                                                })
                                                            }}>{cookie === 'en' ? obj.categoryDto.categoryEnglish : obj.categoryDto.categoryName}</Checkbox>
                                                    </Menu.Item>
                                                ))}
                                            </SubMenu>
                                        })}
                                    </Menu>
                                </div>
                                }
                            </div>

                        </div>
                    </Col>
                    <Col span={17}>
                        <div className={"div-inline right"}>
                            {!noBrand && <div className={"header"}>
                                <img className={"logo"} src={brandDataSource.showLogoPic}/>
                                <div className={"brand"}>
                                    <span className={"title"}>{brandDataSource.brandName}</span>
                                    <p className={"desc " + (this.state.hide ? "hide-desc" :"")}>{brandDataSource.brandDesc}</p>

                                </div>
                                <div onClick={()=>{
                                    this.setState({
                                        hide:!this.state.hide
                                    })
                                }} className={"desc-icon"}>
                                    <Icon className={"title-size"} type={this.state.hide ? "down" : "up"}/>
                                </div>
                                <img onClick={()=>{
                                    if (brandDataSource.collection) {
                                        api.delBrandFavorites({brandId: brandDataSource.id}).then(obj => {
                                            brandDataSource.collection = false;
                                            onBrandChange(brandDataSource)
                                            this.setState({brandDataSource:"aaaa"})
                                        }).then(e => {

                                        })

                                    } else {
                                        api.addBrandFavorites({brandId: brandDataSource.id}).then(obj => {
                                            brandDataSource.collection = true;
                                            onBrandChange(brandDataSource);
                                            this.setState({brandDataSource:"aaaa"})
                                        }).then(e => {

                                        })
                                    }
                                }} className={"love"} src={!brandDataSource.collection ? LOVE : DARK_LOVE}/>
                            </div>}
                            <div>
                                <div className={"tag-container"}>
                                    {
                                        tags.map((obj, index) => {
                                            return <Tag closable onClose={() => {
                                                onTagClose(index);
                                                this.onTagClose(index);
                                            }}>{obj.name}</Tag>
                                        })
                                    }
                                </div>
                                <div className={"sort"}>
                                    {newArrivals.sort_by.title}
                                    <Select value={selectValue} onChange={onSelectChange} style={{width: 165}}>
                                        <Option value="Relevance">{newArrivals.sort_by.item[0]}</Option>
                                        <Option value="asc">{newArrivals.sort_by.item[1]}</Option>
                                        <Option value="desc">{newArrivals.sort_by.item[2]}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className={"product"}>
                                <Row gutter={16}>
                                    {
                                        dataSource.map((item) => {
                                            return <Col span={8}>
                                                <ProductItem onClick={() => {
                                                    this.props.history.push(PATH.PRODUCT + '?id=' + item.id)
                                                }}
                                                             brandName={item.brandName}
                                                             productImg={item.showPic} productName={item.productName}
                                                             productMarketPrice={item.defaultMarketPrice}
                                                             productCostPrice={item.defaultCostPrice}
                                                             currency={item.currency}/>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </div>
                            <div className={"pagination"}>
                                <Button className={"item-right"} onClick={() => {
                                    onPageChange(Number(this.state.temp));
                                }}>Go</Button>
                                <Input className={"item-right"} type={"text"} value={this.state.temp} onChange={(e) => {
                                    if (regex.test(e.target.value)) {
                                        this.setState({temp: e.target.value})
                                    }

                                }}/>
                                <Pagination className={"item-right"} size={"small"}
                                            onChange={(page, pageSize) => {
                                                onPageChange(page, pageSize)
                                                this.onPageChange(page, pageSize)
                                            }}
                                            pageSize={pageSize}
                                            current={current}
                                            total={total}/>

                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        </React.Fragment>
    }

    onPageChange = (page, pageSize) => {
        this.setState({current: Number(page)});
    };
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(CommonResultItem));
