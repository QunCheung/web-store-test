import React from 'react';
import common from "../../../../utils/common";
import style from "./Recently_Viewed.useable.less";
import * as api from "../../../../api/api";
import {Button, Card, Checkbox, Col, Pagination, Row} from "antd";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import del from '../../img/del.png'
import ProductItem from "../../../../components/properties/pc/item/ProductItem";
import {Modal} from 'antd';
import * as PATH from "../../../../conts/path";
import EmptyView from "../../../../components/properties/pc/item/EmptyView";

const Confirm = Modal.confirm;

class Recently_Viewed extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            changeEnable: false,
            data: {},
            isOk: false,
            ids: [],
            pageSize: 15,
            total: [],
            currentPage: 1,
            isEdit: false,
            lazyDel: []
        }
    }

    componentDidMount() {
        this.changeStatus();
        this.getHistory();

    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
        this.setHistory();
    }


    setHistory() {
        const {total} = this.state;
        let temp = "";
        total.forEach(obj => {
            temp = temp + obj + "-";
        });
        common.setCookie("history", temp.substr(0, temp.length - 1));
    }

    getHistory = () => {
        const cookie = common.getCookie("history");
        const arrays = cookie.split("-");
        for (let i = 0; i < arrays.length; i++) {
            let item = arrays[i].split(":");
            for (let j = i + 1; j < arrays.length; j++) {
                let obj = arrays[j].split(":");
                if (item[0] === obj[0]) {
                    arrays.splice(j, 1);
                }
            }
        }
        let tempCooke = "";
        arrays.forEach((obj) => {
            tempCooke = tempCooke + obj + "-";
        });
        common.setCookie("history", tempCooke.substr(0, tempCooke.length - 1));
        if (!tempCooke.substr(0, tempCooke.length - 1)) {
            return;
        }
        this.setState(
            {
                total: arrays
            },
            () => {
                this.getInfo();
            })
    };

    getInfo = () => {
        const {pageSize, currentPage, total} = this.state;
        if ((currentPage - 1) * pageSize > total.length) {
            return;
        }
        let length = 0;
        if (((currentPage - 1) * pageSize + pageSize) > total.length) {
            length = total.length;
        } else {
            length = ((currentPage - 1) * pageSize + pageSize);
        }
        let data = {};
        let temp = [];
        for (let i = (currentPage - 1) * pageSize; i < length; i++) {
            const obj = total[i];
            let split = obj.split(":");
            if (temp.indexOf(split[0]) !== -1) {
                break;
            }
            temp.push(split[0]);
            let format = this.formatDateTime(split[1]);
            if (!data[format]) {
                data[format] = []
            }
            data[format].push({
                key: split[0],
                browse_time: split[1],
                time_out: split[2]
            })
        }
        if (data) {
            const ids = [];
            let count = 0;
            Object.keys(data).forEach(item => {
                data[item].forEach((obj, position) => {
                    if (count !== pageSize) {
                        ids.push(obj.key);
                        count++;
                    }
                })
            });
            this.getData(ids, data);
        }
    };


    getData = (ids, items) => {
        api.getProductHistory(this.state.pageSize, 1, {
            ids: ids
        }).then(data => {
            Object.keys(items).forEach((item, index) => items[item].forEach(obj => {
                obj.data = data.find(n => n.id == obj.key);
            }));
            this.setState({data: items, ids});
        }).catch(e => {

        })
    };


    formatDateTime = (timeStamp) => {
        const date = new Date();
        date.setTime(timeStamp);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };


    onPageChange = (page, pageSize) => {
        this.setState({currentPage: page, lazyDel: []}, () => {
            this.getInfo();
        })
    };

    changeStatus = () => {

    };

    onEdit = (e) => {
        this.setState({isEdit: !this.state.isEdit, lazyDel: []})
    };

    showDeleteConfirm = () => {
        const recentlyViewed = this.props.pageInfo.language.pc.my.recently_viewed;
        Confirm({
            title: recentlyViewed.delete.alert,
            okText: recentlyViewed.delete.yes,
            okType: 'danger',
            cancelText: recentlyViewed.delete.no,
            maskClosable: false,
            centered: true,
            onOk: () => {
                const {lazyDel, total} = this.state;
                const newTotal = [];
                total.forEach(obj => {
                    const split = obj.split(":");
                    if (!lazyDel.find(id => id === split[0])) {
                        newTotal.push(obj);
                    }
                });
                this.setState({
                    total: newTotal,
                    lazyDel: []
                }, () => {
                    this.setHistory();
                    this.getHistory();
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    render() {
        const {data, pageSize, total, currentPage, isEdit, lazyDel, ids} = this.state;
        let recentlyViewed = null;
        try {
            recentlyViewed = this.props.pageInfo.language.pc.my.recently_viewed;
        } catch (e) {
            recentlyViewed = {
                button: "",
                cancel: "",
                delete: {no: "", alert: "", yes: "", title: ""},
                desc: "",
                edit: "",
                select_all: "",
                title: ""
            }
        }

        return (
            <div className={"history"}>
                {total.length === 0 ? <EmptyView desc={recentlyViewed.desc} button={recentlyViewed.button}/> :
                    <div>
                        <div className={"del-layout"}>
                            {isEdit &&
                            <Checkbox checked={lazyDel.length === ids.length && lazyDel.length !== 0} onChange={(e) => {
                                let lazyDel = [];
                                if (e.target.checked) {
                                    lazyDel = lazyDel.concat(ids);
                                }
                                this.setState({lazyDel});
                            }}>{recentlyViewed.select_all}</Checkbox>}
                            {isEdit &&
                            <span onClick={this.showDeleteConfirm}><img src={del}/>{recentlyViewed.delete.title}</span>}
                            <Button
                                onClick={this.onEdit}>{isEdit ? recentlyViewed.cancel : recentlyViewed.edit}</Button>
                        </div>
                        {
                            Object.keys(data).map((item, index) => {
                                if (data[item].length === 0) {
                                    return <div/>
                                }
                                return <React.Fragment>
                                    <div className={"title"}>{item}</div>
                                    <Row gutter={16}>
                                        {
                                            !!data[item] && data[item].map((obj, position) => {
                                                if (!obj.data) {
                                                    return <div/>
                                                }
                                                return <Col span={8}>
                                                    <ProductItem
                                                        onClick={() => {
                                                            if (isEdit) {
                                                                const {lazyDel} = this.state;
                                                                console.log(obj);
                                                                const find = lazyDel.findIndex(k => k == obj.key);
                                                                console.log(lazyDel);
                                                                if (find !== -1) {
                                                                    lazyDel.splice(find, 1)
                                                                } else {
                                                                    lazyDel.push(obj.key);
                                                                }
                                                                this.setState({lazyDel});
                                                            } else {
                                                                this.props.history.push(PATH.PRODUCT + '?id=' + obj.key);
                                                            }
                                                        }}
                                                        brandName={obj.data.brandName}
                                                        productImg={obj.data.showPic}
                                                        productName={obj.data.productName}
                                                        productMarketPrice={obj.data.defaultMarketPrice}
                                                        productCostPrice={obj.data.defaultCostPrice}
                                                        currency={obj.data.currency}
                                                        hoverdom={isEdit ? null : <div>
                                                            <img onClick={() => {
                                                                const {total} = this.state;
                                                                total.splice([total.indexOf(obj.key + ":" + obj.browse_time + ":" + obj.time_out)], 1);
                                                                this.setState({total}, () => {
                                                                    this.getInfo()
                                                                })
                                                            }} className={"del-img"} src={del}/>
                                                        </div>}
                                                        bottomRightDom={isEdit ?
                                                            <Checkbox className={"del-img"}
                                                                      checked={!!lazyDel.find(k => k === obj.key)}
                                                                      onChange={(e) => {
                                                                          const checked = e.target.checked;
                                                                          const {lazyDel} = this.state;
                                                                          console.log(lazyDel);
                                                                          if (checked) {
                                                                              lazyDel.push(obj.key);
                                                                          } else {

                                                                              const index = lazyDel.findIndex(k => k == obj.key);
                                                                              console.log(index);
                                                                              lazyDel.splice(index, 1);
                                                                          }
                                                                          this.setState({lazyDel});
                                                                      }}/> : null}
                                                    />
                                                </Col>
                                            })
                                        }
                                    </Row>
                                </React.Fragment>
                            })
                        }
                        <div className={"pagination"}>
                            <Pagination size={"small"} onChange={this.onPageChange}
                                        pageSize={pageSize}
                                        showQuickJumper
                                        current={currentPage}
                                        total={total.length}/>
                        </div>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Recently_Viewed));
