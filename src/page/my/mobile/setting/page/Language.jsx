import React from 'react';
import Item from "../../../../../components/properties/mobile/listItem/Item";
import select from '../img/31.png'
import common from "../../../../../utils/common";
import * as api from "../../../../../api/api";
import actions from "../../../../../action/action";
import {connect} from "react-redux";

class Language extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            language: "en"
        }
    }

    componentDidMount() {
        const language = common.getCookie("language");
        if (language) {
            this.setState({
                language
            })
        }
    }

    onItemClick = (e) => {
        this.setState({
            language: e.page
        }, () => {
            common.setCookie("language", e.page);
            api.getLanguage()
                .then(data => {
                    this.props.dispatch(actions.renderPageLanguage(data));
                }).catch(e => {
            });
        })
    };


    render() {
        let data = [{title: "English", language: "en"}, {title: "简体中文", language: "ch"}];
        return <div>
            {
                data.map(item => {
                    return <Item showIcon={false} actionKey={0} isShowLine={2} Message={item.title}
                                 bindpage={item.language}
                                 customRight={<div>{this.state.language === item.language &&
                                 <img src={select} className={"right-size"}/>}</div>}
                                 onItemClick={this.onItemClick}/>
                })
            }
        </div>
    }

}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default connect(mapStateToProps)(Language);
