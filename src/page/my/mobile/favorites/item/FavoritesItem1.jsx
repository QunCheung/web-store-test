import * as PATH from "../../../../../conts/path";

import React from 'react';
import Grid from "../../../../../components/properties/mobile/grid/Grid";
import change from '../../setting/img/change.png';
import unselect from '../img/UnSelectAll.png';
import select from '../img/SelectAll.png';
import unselect1 from '../img/28.png';
import select2 from '../img/27.png';
import style from './FaveitesItem.useable.less'
import deleteImg from '../img/29.png'
import deleteImg2 from '../img/30.png'
import ProductItem from "../../../../../components/properties/mobile/listItem/ProductItem";
import * as api from "../../../../../api/api";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import BaseComponent from "../../../../base/BaseComponent";

class FavoritesItem1 extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            changeEnable: false,
            selectAll: false,
            data: [],
            selectCount: 0,
            currentPage: 1,
            ids: []
        }
    }

    componentDidMount() {
        this.changeStatus();
        this.getData();
        const dom = this.refs.data_layout;
        dom.onscroll = (event) => {
            const clientHeight = event.target.clientHeight;
            const scrollHeight = event.target.scrollHeight;
            const scrollTop = event.target.scrollTop;
            const isBottom = (clientHeight + scrollTop === scrollHeight);
            if (isBottom) {
                this.setState({currentPage: this.state.currentPage + 1}, () => {
                    this.getData();
                });

            }
        }

    }

    getData = () => {
        api.getProductsCollections(16, this.state.currentPage).then(obj => {
            if (obj.productDtoList.length === 0 && this.state.current !== 1) {
                this.setState({currentPage: this.state.currentPage - 1});
                return;
            }
            const {data} = this.state;
            const concat = data.concat(obj.productDtoList);
            this.setState({data: concat});
        }).then(e => {

        });
    };

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    changeStatus = () => {
        const item1 = this.props.pageInfo.language.mobile.my.favorites.item1;
        this.props.onRightDom(true,
            <div onClick={this.changeEnableClick}>
                {this.state.changeEnable ? <div className={"complete-text"}>carry out</div> :
                    <img className={"toolbar-icon-size"} src={change}/>}
            </div>
        );
    };

    changeEnableClick = () => {
        const {changeEnable, ids} = this.state;
        this.setState({changeEnable: !changeEnable},
            () => {
                if (ids.length === 0) {
                    return;
                }
                api.delProductFavorites({productIdList: ids}).then(data => {
                    this.setState({currentPage: 1, selectCount: 0, data: []}, () => {
                        this.getData();
                    })
                }).catch(e => {

                });
                this.changeStatus();
            })

    };

    onDelete = () => {
        const {data} = this.state;
        let ids = [];
        const newData = [];
        data.forEach(item => {
            if (!!item.isSelect) {
                ids.push(item.id);
            }
            if (!item.isSelect) {
                newData.push(item)
            }
        });
        this.setState({data: newData, ids});
    };


    onProductItemClick = (e) => {
        // this.startPage("/product?id=" + e, false);
        this.startPage(PATH.PRODUCT+"?id=" + e, false);
    };


    render() {
        this.changeStatus();
        let data = this.state.data.map((item, index) => {
            return {
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
                    content: <ProductItem onClick={this.onProductItemClick}
                                          productId={item.id}
                                          hideCollection={true}
                                          customRight={!this.state.changeEnable ? <div/> : <img onClick={() => {
                                              const {data} = this.state;
                                              const obj = data[index];
                                              obj.isSelect = !obj.isSelect;
                                              let count = 0;
                                              data.forEach((obj) => {
                                                  if (!!obj.isSelect) {
                                                      count++;
                                                  }
                                              });
                                              this.setState({
                                                  data,
                                                  selectCount: count,
                                                  selectAll: count === data.length
                                              })

                                          }} className={"icon"} src={!!item.isSelect ? select2 : unselect1}/>}
                                          productImg={item.showPic}
                                          productName={item.productName} productMoney={item.defaultCostPrice}
                                          productCostMoney={item.defaultCostPrice}/>

                }
            }
        });


        return (
            <React.Fragment>
                <div ref={"data_layout"}>
                    <Grid dataSource={data} itemStyle={{margin: "0 15px 0 15px"}}/>
                </div>
                {this.state.changeEnable &&
                <div className={"item1"}><img onClick={() => {
                    const {data} = this.state;
                    const b = !this.state.selectAll;
                    if (b) {
                        data.forEach((obj) => {
                            obj.isSelect = true;
                        })
                    } else {
                        data.forEach((obj) => {
                            obj.isSelect = false;
                        })
                    }
                    this.setState({
                        selectAll: b,
                        data,
                        selectCount: b ? data.length : 0
                    });
                }} className={"select-item"} src={this.state.selectAll ? select : unselect}/>
                    <div className={"right-item"}>
                        {this.state.selectCount !== 0 && <div className={"inline num"}>{this.state.selectCount}</div>}
                        <div className={"inline"}>
                            <img className={"delete-img"} onClick={this.onDelete}
                                 src={this.state.data.find(n => n.isSelect === true) ? deleteImg2 : deleteImg}/>
                        </div>
                    </div>
                </div>}
            </React.Fragment>
        );
    }

}


const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(FavoritesItem1));
