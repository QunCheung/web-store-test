import React from 'react';
import Grid from "../../../../../components/properties/mobile/grid/Grid";
import b1 from "../../../../../components/properties/mobile/brand/img/1.png";
import b5 from "../../../../../components/properties/mobile/brand/img/5.png";
import b2 from "../../../../../components/properties/mobile/brand/img/2.png";
import b6 from "../../../../../components/properties/mobile/brand/img/6.png";
import b3 from "../../../../../components/properties/mobile/brand/img/3.png";
import b7 from "../../../../../components/properties/mobile/brand/img/7.png";
import b4 from "../../../../../components/properties/mobile/brand/img/4.png";
import b8 from "../../../../../components/properties/mobile/brand/img/8.png";
import * as PATH from "../../../../../conts/path";

export default class FavoritesItem3 extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            imgs: [
                {icon: b1, local: b5, title: "adidas", content: "The world's first sports brand"},
                {icon: b2, local: b6, title: "coach", content: "American high-end lifestyle fashion brand"},
                {icon: b3, local: b7, title: "DKNY", content: "Great tide card from New York"},
                {icon: b4, local: b8, title: "LouisVuitton", content: "Artistic symbol of fashion"},

            ]
        }
    }

    componentDidMount() {
        this.props.onRightDom(false, null);
    }

    render() {
        let rightItem = [];
        for (let i = 0; i < 30; i++) {
            let number = i % 4;
            let imgs = this.state.imgs;
            let img = imgs[number];
            rightItem.push({
                content: img.content,
                icon: img.icon,
                locale: img.local,
                title: img.title
            });
        }

        return (

            <React.Fragment>
                <div className={"item3"}>
                    {
                        rightItem.map((item, position) => {
                            return <div className={"item-container"} onClick={() => {
                                this.startPage(PATH.BRAND +"", false);
                            }}>
                                <img className={"icon-size"} src={item.icon}/>
                                <div className={"item-content-location kalinga-font"}>
                                    <span className={"text-bold"}>{item.title}</span>
                                    <br/>
                                    <div className={"item-top-margin"}>{item.content}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </React.Fragment>
        );
    }

}
