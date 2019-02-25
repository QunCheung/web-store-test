import React from 'react'
import style from './Order.useable.less'
import placeholder from '../../img/placeholder.png'
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import * as api from "../../../../api/api";
import Grid from "../../../../components/properties/mobile/grid/Grid";

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
            data: [],
            total: 0,
            current: 0
        }
    }

    componentDidMount() {


        api.getOrder(5, 1).then(data => {
            this.setState({data: data.orderDtoList})
        }).catch(e => {

        });

    }

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
        let order = {
            desc: "",
            orderID: "",
            title: "",
            total: ""
        }

        try {
            order = this.props.pageInfo.language.mobile.my.order;
        } catch (e) {

        }
        return <div className={"order"}>
            {this.state.data.length === 0 ? <Grid dataSource={[]} itemStyle={{margin: "0 15px 0 15px"}}/> :
                this.state.data.map((item, index) => {
                    return <div className={"item " + (index !== 0 ? "margin-top-30" : "")}>
                        <div className={"nexal-font order-time"}>
                            <span>{order.orderID}{item.orderSn}</span>
                            <span className={"text-right"}>{item.orderTime}</span>
                        </div>
                        <div className={"line"}/>
                        <div className={"brand-name  nexal-font"}>
                            {item.brand}
                        </div>
                        {item.orderItemDtoList.map((obj, position) => {
                            return <div className={"content " + (position !== 0 ? "margin-top-30" : "")}>
                                {/*<div className={"inline"}>*/}
                                {/*<img className={"img"} src={placeholder}/>*/}
                                {/*</div>*/}
                                <div className={"inline content-text kalinga-font display-table"}>
                                    <div className={"display-cell-center"}>
                                        <div className={"product-name"}>
                                            <span> {obj.productName}</span>
                                        </div>

                                        <div className={"text-right nexal-font num-or-price"}>
                                            <div
                                                className={"money"}> {this.getCurrency(item.currency)}{obj.productAmount}</div>
                                            <div className={"text-right"}> x{obj.productNumber}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        })}
                        <div className={"total-text"}>
                            {order.total} {this.getCurrency(item.currency)}{item.ordersPrice}
                        </div>
                    </div>
                })

            }
        </div>
    }
}

const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(Order));
