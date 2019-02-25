import React from 'react';
import {Component} from 'react';
import Mobile from './mobile/HomePage_Mobile.jsx'
import PC from './pc/HomePage_PC.jsx'
import {connect} from "react-redux";

class HomePage extends Component {
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
        return <div>{dom}</div>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};

export default connect(mapStateToProps)(HomePage);
