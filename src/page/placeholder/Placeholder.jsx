import React from 'react';
import TitleBar from "../../components/properties/pc/titlebar/TitleBar";
import Bottom from "../../components/properties/pc/bottom/Bottom";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Common from "../../utils/common";
import * as PATH from "../../conts/path";


class Placeholder extends React.Component {


    constructor(props) {
        super(props);
        const search = window.location.search;
        let queryString = Common.getQueryString("page", search);
        let page = "";
        let key = [];
        if (queryString) {
            console.log(queryString);
            const split = queryString.split("-");
            page = split[0];
            const arr = split[1].split(":");
            arr.forEach((item) => {
                const obj = item.split("=");
                key.push({key: obj[0], value: obj[1]})
            })
        }
        this.state = {
            page, key
        }
    }

    componentDidMount() {
        const key = this.state.key;
        let temp = "";
        key.forEach(s => {
            temp = temp + s.key + "=" + s.value + "&"
        });
        this.props.history.push(PATH.BASE_PATH + this.state.page + "?" + temp.substr(0, temp.length - 1));
    }

    render() {
        return (
            <React.Fragment>
                <TitleBar/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Placeholder));
