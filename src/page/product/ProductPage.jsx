import React from 'react'
import PC from "./pc/ProductPage_PC.jsx";
import Mobile from "./mobile/ProductPage_mobile.jsx";
import {connect} from "react-redux";


class ProductPage extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {
        let screen = this.props.pageInfo.screen;
        let dom = null;
        if (screen === 1) {
            dom = <PC/>
        } else {
            dom = <Mobile/>
        }
        return <div>{dom}</div>;
    }

}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(ProductPage);
