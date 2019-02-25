import React from 'react'
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import * as api from "../../../api/api";
import common from "../../../utils/common";
import style from "./InfomationItemPage.useable.less";
import * as PATH from "../../../conts/path";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class InformationItemPage extends React.Component {


    constructor(props) {
        super(props);
        const id = common.getQueryString('id');
        this.state = {
            id,
            data: {
                title: "",
                context: ""
            }
        };

        window.setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    componentDidMount() {
        this.getData();
    }

    getData = () => {
        api.getInformationDetail(this.state.id).then(data => {
            this.setState({data})
        }).catch(e => {

        });
    };


    render() {
        const {data, id} = this.state;
        let news = null;
        try
        {
            news = this.props.pageInfo.language.pc.news;
        }catch (e) {
            news = "";
        }
        data.context = data.context.replace("16px","2em");
        return <React.Fragment>
            <TitleBar
                Breads={[{name: news, path: PATH.INFORMATION +""}, {name: data.title, path: PATH.ITEM_DETAIL +"?id=" + id}]}/>
            <div className={"informationItem"}>
                <h1>{data.title}</h1>
                <div dangerouslySetInnerHTML={{__html: data.context}}/>
            </div>
        </React.Fragment>
    }
}
const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default withRouter(connect(mapStateToProps)(InformationItemPage));
