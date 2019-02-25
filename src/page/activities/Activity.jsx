import React from 'react'
import PC from "./pc/Activity_PC.jsx";
import Mobile from './mobile/Activity_mobile.jsx';
import {connect} from "react-redux";

class Activity extends React.Component {
    constructor(props) {
        super(props)
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

export default connect(mapStateToProps)(Activity);
