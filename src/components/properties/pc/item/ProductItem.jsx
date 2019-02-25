import React from 'react';
import style from './ProductItem.useable.less'
import {Card} from "antd";

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
            select: false,
            showDelImg: false
        }
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


    onRectMouseLeave = () => {
        const {showDelImg} = this.state;
        if (showDelImg) {
            this.setState({showDelImg: false})
        }
    };

    onRectMouseOver = () => {
        const {showDelImg} = this.state;
        if (!showDelImg) {
            this.setState({showDelImg: true})
        }
    };

    render() {
        const {productImg, productName, productMarketPrice, productCostPrice, onClick, currency, productId, brandName, hoverdom, bottomRightDom} = this.props;
        const {showDelImg} = this.state;
        return <React.Fragment>
            <div className={"card-layout"} onMouseOver={this.onRectMouseOver}
                 onMouseLeave={this.onRectMouseLeave}>
                <div className={"product-item"} onClick={onClick}>
                    <Card
                        hoverable
                        style={{width: 286, height: 460, margin: "19px 0 0 0"}}
                        cover={<img style={{height: 284, padding: 10}}
                                    src={productImg}/>}
                    >
                        <div className={"type"}>
                            {brandName}
                        </div>
                        <div className={"name"} dangerouslySetInnerHTML={{__html: productName}}>
                            {/*{productName}*/}
                        </div>
                        <div className={"price-layout"}>
                                                <span
                                                    className={"price"}>{this.getCurrency(currency)}{productMarketPrice}</span>
                            {productMarketPrice !== productCostPrice &&
                            <span
                                className={"price-line"}>{this.getCurrency(currency)}{productCostPrice}</span>}
                        </div>
                    </Card>
                </div>
                {bottomRightDom}
                {showDelImg && hoverdom}
            </div>
        </React.Fragment>
    }
}
