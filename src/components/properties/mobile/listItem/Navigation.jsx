import React from 'react'
import {Affix, Col, Drawer, Icon, Input, Row, Tag} from "antd";
import style from './Navigation.useable.less'
import select2 from "../../../../page/my/mobile/favorites/img/27.png";
import input from "./img/JIAGE.png";
import sort from './img/sort.png'
import filter from './img/filter.png'

const {CheckableTag} = Tag;

export default class Navigation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {},
            queryData: []
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
        this.setState({data})
    };

    onResetData = () => {
        const {queryData} = this.state;
        queryData.forEach((item) => {
            item.data.forEach((obj) => {
                obj.isSelect = false
            })
        });
        this.setState({queryData})
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
        const data = {};
        data["STYLE"] = [
            {
                name: "MAN",
                isSelect: false
            },
            {
                name: "WOMAN",
                isSelect: false
            }];
        data["BRANDS"] = [
            {
                name: "NIKE",
                isSelect: false
            },
            {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }, {
                name: "Adidas",
                isSelect: false
            }];
        data["CLASSIFICATION"] = [
            {
                name: "Coat",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }, {
                name: "Skirt",
                isSelect: false
            }];
        this.setState({
            data
        })
    }


    onShowList = (index) => {
        const {data} = this.state;
        let items = data.STYLE;
        const man = items[0];
        const woman = items[1];
        let queryData = [];
        // 如果都等于false 或者都等于 true ，则全部查询
        if (man.isSelect === woman.isSelect) {
            queryData.push({
                title: "MEN",
                data: [
                    {
                        name: "Skirt",
                        isSelect: false
                    },
                    {
                        name: "Skirt",
                        isSelect: false
                    }, {
                        name: "Skirt",
                        isSelect: false
                    }
                ]
            }, {
                title: "WOMEN",
                data: [
                    {
                        name: "Skirt",
                        isSelect: false
                    },
                    {
                        name: "Skirt",
                        isSelect: false
                    }, {
                        name: "Skirt",
                        isSelect: false
                    }
                ]
            })
        } else if (man.isSelect) {
            queryData.push({
                title: "MEN",
                data: [{
                    name: "Skirt",
                    isSelect: false
                }, {
                    name: "Skirt",
                    isSelect: false
                }, {
                    name: "Skirt",
                    isSelect: false
                }]
            })
        } else {
            queryData.push({
                title: "WOMEN",
                data: [{
                    name: "Skirt",
                    isSelect: false
                }, {
                    name: "Skirt",
                    isSelect: false
                }, {
                    name: "Skirt",
                    isSelect: false
                }]
            })
        }
        this.setState({
            queryData
        })
    };

    render() {
        let innerWidth = window.innerWidth;
        let number = innerWidth * 0.75;
        let {data, queryData, visible} = this.state;
        const {onPriceClick, onComprehensiveClick} = this.props;
        return <React.Fragment>
            <div className={"navigation"}>
                <div style={{background: "#fff", padding: "0 30px"}}>
                    <Row>
                        <Col span={8}>
                            <div onClick={onComprehensiveClick} className={"filter-text"}>Relevance</div>
                        </Col>

                        <Col span={8}>
                            <div onClick={onPriceClick} className={"filter-text text-center"}>Price<img
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
                <Drawer
                    placement="right"
                    width={number}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}>
                    {
                        queryData.length > 0 && <div className={"all-page"}>
                            <div className={"title"}>ALL CATEGORIES</div>
                            {
                                queryData.map((item, position) => {
                                    return <div>
                                        <div className={"item-title"}>{item.title}</div>
                                        {
                                            item.data.map((obj, index) => {
                                                return <div>
                                                    <div onClick={() => {
                                                        let item = queryData[position];
                                                        let data = item.data[index];
                                                        data.isSelect = !data.isSelect;
                                                        this.setState({queryData})
                                                    }} className={"item"}>{obj.name}{obj.isSelect &&
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
                            Object.keys(data).map((key, index) => {
                                return <div className={"container"}>
                                    <div
                                        className={"key-text " + (index === 0 ? "key-text-margin-10" : "key-text-margin-20")}>
                                        {key}{index !== 0 && <span onClick={() => {
                                        this.onShowList(index)
                                    }} className={"text-all"}>All ></span>}
                                    </div>
                                    {
                                        data[key].map((obj, position) => {
                                            return <CheckableTag key={obj.name} closable={false}
                                                                 checked={obj.isSelect}
                                                                 onChange={() => {
                                                                     this.handleChange(key, obj, position);
                                                                 }}
                                            >
                                                {obj.name}
                                            </CheckableTag>
                                        })
                                    }
                                </div>
                            })
                        }
                        <div className={"key-text key-text-margin-20"}>
                            PRICE
                        </div>
                        <div className={"price"}>
                            <div>
                                <img className={"input-filter"} src={input}/>
                                <span style={{margin: 10}}>——</span>
                                <img className={"input-filter"} src={input}/>
                            </div>
                            <div className={"input-frame"}>
                                <input/>
                                <input className={"margin-left-120"}/>
                            </div>
                        </div>
                    </div>
                    }

                    <div className={"float-button"}>
                        <div onClick={queryData.length > 0 ? this.onResetData : this.onReset}
                             className={"button-style reset"}>
                            RESET
                        </div>
                        <div onClick={queryData.length > 0 ? this.onCloseData : this.onClose}
                             className={"button-style confirm"}>
                            CONFIRM
                        </div>
                    </div>
                </Drawer>
            </div>
        </React.Fragment>
    }
}
