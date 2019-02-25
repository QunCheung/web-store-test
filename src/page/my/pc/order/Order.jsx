import React from 'react';
import placeholder from "../../img/placeholder.png";
import style from "./Order.useable.less";
import {Pagination} from "antd";
import EmptyView from "../../../../components/properties/pc/item/EmptyView";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import * as api from "../../../../api/api";


class Order extends React.Component {


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    constructor(props) {
        super(props);
        this.state = {
            totalData: [],
            current: 1,
            total: 0
        }
    }

    componentDidMount() {
        this.getData();
    }


    getData = () => {
        api.getOrder(5, this.state.current).then(data => {
            this.setState({total: data.total, totalData: data.orderDtoList})
        }).catch(e => {

        });
    };

    getCurrency = (productCurrency) => {
        switch (productCurrency) {
            case "USD":
                return "$";
            case "EUR":
                return "€";
            case "CNY":
                return "¥";
            default:
                return "$";
        }
    };



    render() {
        const {totalData} = this.state;

        let order = null;
        try {
            order = this.props.pageInfo.language.pc.my.order;
        } catch (e) {
            order = {
                button: "",
                desc: "",
                orderID: "",
                title: "",
                total: ""
            }
        }
        return (
            <div className={"order-pc"}>
                {totalData.length === 0 ? <EmptyView desc={order.desc} button={order.button}/> :
                    <div>
                        {
                            totalData.map(item => {
                                if (item.orderItemDtoList.length === 0) {
                                    return <div/>
                                }
                                return <div className={"order-item"}>
                                    <div className={"title"}>
                                        <span className={"left-title"}>{order.orderID}{item.orderSn}</span>
                                        <span>{item.brand}</span>
                                        <span className={"right-title"}>{item.orderTime}</span>
                                    </div>
                                    <table>
                                        <tbody>
                                        {item.orderItemDtoList.map((obj, index) => {
                                            return <tr className={index === 0 ? "" : "bottom-tr"}>
                                                <td className={"name-tr"}>{/*<img className={"order-item-img"}
                                                                               src={obj.img}/>*/}<span>{obj.productName}</span>
                                                </td>
                                                <td className={"number-tr"}><span>x{obj.productNumber}</span></td>
                                                <td className={"money-tr"}><span>{this.getCurrency(item.currency)}{obj.productAmount}</span></td>
                                                {index === 0 &&
                                                <td className={"total-tr"} rowSpan={item.orderItemDtoList.length}>
                                                    <div
                                                        style={{marginTop: 6}}
                                                        className={"total-text"}>{order.total}</div>
                                                    <span>{this.getCurrency(item.currency)}{item.ordersPrice}</span></td>}
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            })
                        }
                        <div className={"pagination-layout"}>
                            <Pagination size={"small"} onChange={(page, pageSize) => {
                                this.setState({current: Number(page)}, () => {
                                    this.getData();
                                });
                            }} showQuickJumper current={this.state.current} total={this.state.total}/>
                        </div>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(Order));
