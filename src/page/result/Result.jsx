import React from 'react'
import {connect} from "react-redux";
import PC from "./pc/Result_PC.jsx";
import Mobile from "./mobile/Result_mobile.jsx";

class Result extends React.Component {


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

export default connect(mapStateToProps)(Result);
