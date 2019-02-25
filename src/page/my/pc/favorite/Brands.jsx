import React from 'react';
import {Button, Checkbox, Col, Pagination, Row} from "antd";
import style from "./Brands.useable.less";
import del from "../../img/del.png";
import * as api from "../../../../api/api";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as PATH from "../../../../conts/path";
import {Modal} from 'antd';
import EmptyView from "../../../../components/properties/pc/item/EmptyView";

const Confirm = Modal.confirm;

class Brands extends React.Component {


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            current: 1,
            isEdit: false,
            lazyDel: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    onPageChange = (page, pageSize) => {
        this.setState({current: page}, () => {
            this.getData()
        })
    };


    getData = () => {
        api.getBrandCollections(16, this.state.current).then(data => {
            if (data.brandDtoList.length === 0 && this.state.current !== 1) {
                this.setState({current: this.state.current - 1});
                return;
            }
            this.setState({data: data.brandDtoList, total: data.total});
        }).then(e => {

        })
    };

    onEdit = (e) => {
        this.setState({isEdit: !this.state.isEdit, lazyDel: []})
    };


    showDeleteConfirm = () => {
        const item2 = this.props.pageInfo.language.pc.my.favorites.item2;
        Confirm({
            title: item2.delete.alert,
            okText: item2.delete.yes,
            okType: 'danger',
            cancelText: item2.delete.no,
            maskClosable: false,
            centered: true,
            onOk: () => {
                console.log("ok");
                const {lazyDel} = this.state;
                const ids = [];
                lazyDel.forEach(item => {
                    ids.push(item.id);
                });
                api.delBrandFavorites({brandIdList: ids})
                    .then(data => {
                        this.getData();
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    render() {
        const {data, total, isEdit, lazyDel} = this.state;
        let item2 = null;
        try {
            item2 = this.props.pageInfo.language.pc.my.favorites.item2;
        } catch (e) {
            item2 = {
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
            <div className={"brands-pc"}>
                {data.length === 0 ? <EmptyView desc={item2.desc} button={item2.button}/> : <div>
                    <div className={"del-layout"}>
                        {isEdit &&
                        <Checkbox checked={lazyDel.length === data.length && lazyDel.length !== 0} onChange={(e) => {
                            let lazyDel = [];
                            if (e.target.checked) {
                                lazyDel = lazyDel.concat(data);
                            }
                            this.setState({lazyDel});
                        }}>{item2.select_all}</Checkbox>}
                        {isEdit &&
                        <span onClick={this.showDeleteConfirm}><img src={del}/>{item2.delete.title}</span>}
                        <Button onClick={this.onEdit}>{isEdit ? item2.cancel : item2.edit}</Button>
                    </div>
                    <Row gutter={16}>
                        {
                            data.map((item, index) => {
                                return <Col span={6}>
                                    <div className={"data-item"}
                                         onMouseOver={() => {
                                             const {data} = this.state;
                                             const obj = data[index];
                                             if (obj.isShowDel) {
                                                 return;
                                             }
                                             obj.isShowDel = true;
                                             this.setState({data});
                                         }}
                                         onMouseLeave={() => {
                                             const {data} = this.state;
                                             const obj = data[index];
                                             if (!obj.isShowDel) {
                                                 return;
                                             }
                                             obj.isShowDel = false;
                                             this.setState({data});
                                         }}>
                                        <div onClick={() => {
                                            if (isEdit) {
                                                const {lazyDel} = this.state;
                                                const find = lazyDel.findIndex(k => k.id === item.id);
                                                console.log(find);
                                                if (find !== -1) {
                                                    lazyDel.splice(find, 1)
                                                } else {
                                                    lazyDel.push(item);
                                                }
                                                this.setState({lazyDel});
                                            } else {
                                                this.props.history.push(PATH.PLACEHOLDER + '?page=/brand-id=' + item.id);
                                            }
                                        }}>
                                            <img className={"brand-img"} src={item.showLogoPic}/>
                                            <div className={"brand-name"}>{item.brandName}</div>
                                        </div>
                                        {isEdit ? null : (!!item.isShowDel && <img onClick={() => {
                                            api.delBrandFavorites({brandId: item.id})
                                                .then(data => {
                                                    this.getData();
                                                })
                                        }} className={"del-img"} src={del}/>)}
                                        {isEdit && <Checkbox className={"del-img"}
                                                             checked={!!lazyDel.find(k => k.id === item.id)}
                                                             onChange={(e) => {
                                                                 const checked = e.target.checked;
                                                                 const {lazyDel} = this.state;
                                                                 console.log(lazyDel);
                                                                 if (checked) {
                                                                     lazyDel.push(item);
                                                                 } else {
                                                                     const index = lazyDel.findIndex(k => k.id === item.id);
                                                                     lazyDel.splice(index, 1);
                                                                 }
                                                                 this.setState({lazyDel});
                                                             }}/>}
                                    </div>
                                </Col>
                            })
                        }
                    </Row>
                    <div className={"pagination"}>
                        <Pagination size={"small"}
                                    pageSize={16}
                                    showQuickJumper
                                    onChange={this.onPageChange}
                                    current={this.state.current}
                                    total={total}/>
                    </div>
                </div>}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(Brands));
