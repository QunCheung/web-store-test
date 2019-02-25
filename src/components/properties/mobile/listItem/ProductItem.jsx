import React from 'react';
import style from './ProductItem.useable.less'
import a from './img/7a.png'
import b from './img/7b.png'
import * as api from "../../../../api/api";
import imgB from "../../../../page/brand/detail/img/favorite1.png";
import imgA from "../../../../page/brand/detail/img/favorite0.png";

export default class ProductItem extends React.Component {


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    constructor(props) {
        super(props);
        this.state = {
            select: false
        }
    }

    render() {
        const {
            productImg, productName, productMoney, onClick,
            productId, productCostMoney,
            productCurrency, collection,
            setCollection
        } = this.props;
        let currency;
        switch (productCurrency) {
            case "USD":
                currency = "$";
                break;
            case "EUR":
                currency = "€";
                break;
            case "CNY":
                currency = "¥";
                break;
            default:
                currency = "$";
                break;
        }

        return <React.Fragment>
            <div>
                <div onClick={() => {
                    onClick(productId);
                }} className={"product"} style={{height: "100%", padding: "0 15px 15px 15px"}}>
                    <img style={{width: "330px", height: "440px"}}
                         src={productImg}/>
                    <div className={"commodity-name margin-top-22"}>
                        {productName}
                    </div>
                    <div className={"money-font margin-top-36"}>
                        {currency} {Number(productMoney).toFixed(2)}
                        {Number(productMoney).toFixed(2) !== Number(productCostMoney).toFixed(2) &&
                        <span
                            className={"money-line"}>{currency}{Number(productCostMoney).toFixed(2)} </span>}
                    </div>
                </div>
                {this.props.customRight && <div className={"collection"}>
                    {this.props.customRight}
                </div>
                }
                {!this.props.hideCollection &&
                <div className={"collection"} onClick={() => {
                    if (collection) {
                        api.delProductFavorites({productId: productId}).then(data => {
                            setCollection(productId, false);
                        }).catch(e => {

                        })
                    } else {
                        api.addProductFavorites({productId: productId}).then(data => {
                            setCollection(productId, true);
                        }).then(e => {

                        })
                    }
                }}>
                    <img style={{width: 40, height: 40}} src={collection ? imgB : imgA}/>
                </div>}
            </div>
        </React.Fragment>
    }
}
