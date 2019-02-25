import React from 'react';
import Item from "../../../../../components/properties/mobile/listItem/Item";
import select from "../img/31.png";
import common from "../../../../../utils/common";
import * as api from "../../../../../api/api";
import actions from "../../../../../action/action";


export default class Country extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentCountry: "France"
        }
    }

    componentDidMount() {
        const currentCountry = common.getCookie("Country");
        if (currentCountry) {
            this.setState({
                currentCountry
            })
        }
    }

    componentWillMount() {

        api.getCountry()
            .then(data => {
                console.log(data);
            }).catch(e => {
        });
    }


    onItemClick = (e) => {
        this.setState({
            currentCountry: e.name
        }, () => {
            common.setCookie("Country", e.name)
        })
    };

    render() {
        const data = [
            "France",
            "China",
            "Germany",
            "United States",
            "United Kingdom",
            "Belgium"
        ];
        return <div>
            {
                data.map(item => {
                    return <Item showIcon={false} actionKey={0} isShowLine={2} Message={item}
                                 customRight={<div>{this.state.currentCountry === item &&
                                 <img src={select} className={"right-size"}/>}</div>}
                                 onItemClick={this.onItemClick}/>
                })
            }
        </div>
    }
}
