import React from 'react'
import BaseComponent from "../../../../page/base/BaseComponent";
import Grid from "../grid/Grid";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import b1 from './img/1.png'
import b2 from './img/2.png'
import b3 from './img/3.png'
import b4 from './img/4.png'
import b5 from './img/5.png'
import b6 from './img/6.png'
import b7 from './img/7.png'
import b8 from './img/8.png'
import * as PATH from "../../../../conts/path";

class BrandItem3 extends BaseComponent {


    constructor(props) {
        super(props);

        this.state = {
            imgs: [
                {icon: b1, local: b5, title: "adidas", content: "The world's first sports brand"},
                {icon: b2, local: b6, title: "coach", content: "American high-end lifestyle fashion brand"},
                {icon: b3, local: b7, title: "DKNY", content: "Great tide card from New York"},
                {icon: b4, local: b8, title: "LouisVuitton", content: "Artistic symbol of fashion"},

            ],
            items: []
        }
    }

    componentWillMount() {
        this.setData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setData(nextProps);
    }

    setData = (props) => {
        const {brandSource} = props;
        const items = brandSource.map(item => {
            return {
                id: item.id,
                brandDesc: item.brandDesc,
                brandName: item.brandName,
                logo: item.showLogoPic,
                country: item.country,
                link: item.officialWebsite
            }
        });
        console.log(items);
        this.setState({items})
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        const {items} = this.state;
        return <React.Fragment>
            <div className={"item3"}>
                {
                    items.map((item, position) => {
                        return <div className={"item-container"} onClick={() => {
                            this.startPage(PATH.BRAND +"?id=" + item.id, false);
                            // window.location.href = item.link;
                        }}>
                            <img className={"icon-size"} src={item.logo}/>
                            <div className={"item-content-location kalinga-font"}>
                                {/*<img className={"locale-size"} src={item.locale}/>*/}
                                <span className={"text-bold"}>{item.brandName}</span>
                                <br/>
                                <div className={"item-top-margin hide-message"}>{item.brandDesc}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </React.Fragment>
    }

}

const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};


export default withRouter(connect(mapStateToProps)(BrandItem3));

