import React from 'react';
import ProductItem from "../../../../components/properties/pc/item/ProductItem";
import del from "../../img/del.png";
import style from "./Products.useable.less";
import {Button, Checkbox, Col, Pagination, Row} from "antd";
import * as api from "../../../../api/api";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as PATH from "../../../../conts/path";
import {Modal} from 'antd';
import EmptyView from "../../../../components/properties/pc/item/EmptyView";

const Confirm = Modal.confirm;

class Products extends React.Component {


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

    getData = () => {
        api.getProductsCollections(16, this.state.current).then(data => {
            if (data.productDtoList.length === 0 && this.state.current !== 1) {
                this.setState({current: this.state.current - 1});
                return;
            }
            this.setState({data: data.productDtoList, total: data.total});
        }).then(e => {

        })
    };
    onEdit = (e) => {
        this.setState({isEdit: !this.state.isEdit, lazyDel: []})
    };

    showDeleteConfirm = () => {
        const item1 = this.props.pageInfo.language.pc.my.favorites.item1;
        Confirm({
            title: item1.delete.alert,
            okText: item1.delete.yes,
            okType: 'danger',
            cancelText: item1.delete.no,
            maskClosable: false,
            centered: true,
            onOk: () => {
                console.log("ok");
                const {lazyDel} = this.state;
                const ids = [];
                lazyDel.forEach(item => {
                    ids.push(item.id);
                });
                api.delProductFavorites({productIdList: ids}).then(data => {
                    this.setState({currentPage: 1, data: [], total: 0}, () => {
                        this.getData();
                    })
                }).catch(e => {

                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    render() {
        const {data, current, total, isEdit, lazyDel} = this.state;
        let item1 = null;
        try {
            item1 = this.props.pageInfo.language.pc.my.favorites.item1;
        } catch (e) {
            item1 = {
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
            <div className={"products-pc"}>
                {data.length === 0 ? <EmptyView desc={item1.desc} button={item1.button}/> :
                    <div>
                        <div className={"del-layout"}>
                            {isEdit &&
                            <Checkbox checked={lazyDel.length === data.length && lazyDel.length !== 0}
                                      onChange={(e) => {
                                          let lazyDel = [];
                                          if (e.target.checked) {
                                              lazyDel = lazyDel.concat(data);
                                          }
                                          this.setState({lazyDel});
                                      }}>{item1.select_all}</Checkbox>}
                            {isEdit &&
                            <span onClick={this.showDeleteConfirm}><img src={del}/>{item1.delete.title}</span>}
                            <Button onClick={this.onEdit}>{isEdit ? item1.cancel : item1.edit}</Button>
                        </div>
                        <Row gutter={16}>
                            {
                                data.map((item) => {
                                    return <Col span={8}>
                                        <ProductItem onClick={() => {
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
                                                this.props.history.push(PATH.PRODUCT + '?id=' + item.id);
                                            }

                                        }}
                                                     brandName={item.brandName}
                                                     productImg={item.showPic} productName={item.productName}
                                                     productMarketPrice={item.defaultMarketPrice}
                                                     productCostPrice={item.defaultCostPrice}
                                                     currency={item.currency}
                                                     hoverdom={isEdit ? null : <div>
                                                         <img onClick={() => {
                                                             api.delProductFavorites({productId: item.id})
                                                                 .then(data => {
                                                                     this.getData();
                                                                 }).catch(e => {

                                                             })
                                                         }} className={"del-img"} src={del}/>
                                                     </div>}
                                                     bottomRightDom={isEdit ?
                                                         <Checkbox className={"del-img"}
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
                                                                   }}/> : null}
                                        />

                                    </Col>
                                })
                            }
                        </Row>
                        <div className={"pagination"}>
                            <Pagination size={"small"}
                                        pageSize={15}
                                        showQuickJumper
                                        current={current}
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


export default withRouter(connect(mapStateToProps)(Products));
