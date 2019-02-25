import React from 'react';

import emptyImg from '../img/empty.png';
import style from './EmptyView.useable.less'
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as PATH from "../../../../conts/path";

class EmptyView extends React.Component {

    componentWillMount(){
        style.use();
    }

    componentWillUnmount(){
        style.unuse();
    }
    render() {
        return (
            <React.Fragment>
                <div className={"empty_layout"}>
                    <img src={emptyImg}/>
                    <div className={"desc_text"}>
                        {this.props.desc}
                    </div>
                    <div className={"start_btn"} onClick={()=>{
                        this.props.history.push(PATH.DEFAULT)
                    }}>
                        {this.props.button}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default withRouter(connect(mapStateToProps)(EmptyView));

