import React from 'react';
import Item from "../../../../../components/properties/mobile/listItem/Item";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";

class Policies extends React.Component {

    onItemClick = (e) => {
        this.props.onChangeProps(e);
    };


    constructor(props) {
        super(props);

    }

    render() {

        const policies = this.props.pageInfo.language.mobile.my.settings.policies;
        return <div>
            <Item showIcon={false} actionKey={0} isShowLine={2} Message={policies.item[0]}
                  bindpage={"about"}
                  onItemClick={this.onItemClick}/>
            <Item showIcon={false} actionKey={0} isShowLine={2} Message={policies.item[1]}
                  bindpage={"about"}
                  onItemClick={this.onItemClick}/>
        </div>
    }

}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Policies));
