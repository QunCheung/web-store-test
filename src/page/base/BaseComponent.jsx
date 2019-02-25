import React from 'react'
import action from "../../action/action";
import Common from "../../utils/common";

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    startPage = (url, show) => {
        if (show) {
            this.props.dispatch(action.showNav());
        } else {
            this.props.dispatch(action.hideNav());
        }
        this.props.dispatch(action.renderPageAction(Common.getCurrentUrl(this)));
        this.props.history.push(url);
    };
}

