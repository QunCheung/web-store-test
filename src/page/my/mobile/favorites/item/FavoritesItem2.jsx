import React from 'react';
import Grid from "../../../../../components/properties/mobile/grid/Grid";
import * as api from "../../../../../api/api";
import style from "./FaveitesItem.useable.less";
import select from "../img/SelectAll.png";
import unselect from "../img/UnSelectAll.png";
import deleteImg2 from "../img/30.png";
import deleteImg from "../img/29.png";
import change from "../../setting/img/change.png";
import select2 from "../img/27.png";
import unselect1 from "../img/28.png";
import ProductItem from "../../../../../components/properties/mobile/listItem/ProductItem";


export default class FavoritesItem2 extends React.Component {

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

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


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

    getData = () => {
        api.getBrandCollections(16, this.state.currentPage).then(obj => {
            if (obj.brandDtoList.length === 0 && this.state.current !== 1) {
                this.setState({currentPage: this.state.currentPage - 1});
                return;
            }
            const {data} = this.state;
            const concat = data.concat(obj.brandDtoList);
            this.setState({data: concat});
        }).then(e => {

        });
    };

    changeStatus = () => {
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
                api.delBrandFavorites({brandIdList: ids}).then(data => {
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


    render() {
        this.changeStatus();
        let dataSource = [];
        this.state.data.map((item,index) => {
            dataSource.push({
                xs: {
                    xs: 8,
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
                    content: <div className={"brand-item"} style={{
                        width: "100%",
                        padding: "15px 15px 15px 15px",
                        height: "100%",
                    }}
                    >
                        <img style={{
                        width: "212px",
                        height: "212px",
                    }}
                          src={item.showLogoPic}/>
                        <div className={"collection"}>
                            {!this.state.changeEnable ? <div/> : <img onClick={() => {
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
                        </div>
                    </div>
                }
            })
        });
        return (
            <React.Fragment>
                <div ref={"data_layout"}>
                    <Grid dataSource={dataSource} itemStyle={{margin: "0 15px 0 15px"}}/>
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
