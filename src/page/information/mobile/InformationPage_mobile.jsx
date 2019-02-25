import React from 'react'
import ToolBar from '../../../components/properties/mobile/toolbar/ToolBar.jsx'
import BaseComponent from "../../base/BaseComponent";
import {connect} from "react-redux";
import style from './Information_mobile.useable.less'
import * as api from "../../../api/api";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";

class InformationPage extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            pageSize: 3
        }
        window.setTimeout(()=>{
            window.scrollTo(0,0)
        },10);
    }


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    componentDidMount() {
        this.getData();
        const dom = this.refs.data_layout;
        dom.onscroll = (event) => {
            const clientHeight = event.target.clientHeight;
            const scrollHeight = event.target.scrollHeight;
            const scrollTop = event.target.scrollTop;
            const isBottom = (clientHeight + scrollTop === scrollHeight);
            if (isBottom) {

                this.setState({
                    currentPage: this.state.currentPage
                }, () => {
                    this.getData();
                });

            }
        }
    }

    getData = () => {
        api.getInformation(this.state.pageSize, this.state.currentPage).then(data => {
            console.log(data);
            let oldData = this.state.data;
            oldData = oldData.concat(data);
            this.setState({data: oldData})
        }).catch(e => {

        });
    };


    render() {
        const {data} = this.state;
        let news = "";
        try {
            news = this.props.pageInfo.language.mobile.news;
        } catch (e) {

        }
        const number = window.innerHeight - 88 - 88;
        const style = {
            overflowY: "auto",
            height: number,
            paddingBottom: 80
        };
        return <div className={"information"}>
            <ToolBar title={<span className={"toolbar-title-size"}>{news}</span>} showRightIcon={false}
                     showLeftIcon={false}/>
            <div ref="data_layout" style={style}>
                {
                    data.map((item, index) => {
                        return <div style={{marginTop: index > 0 ? 40 : 0}} onClick={() => {
                            this.startPage(PATH.ITEM_DETAIL + "?id=" + item.id, false)
                        }}>
                            <img style={{
                                width: "100%",
                                height: "100%",
                                marginBottom: 20
                            }}
                                 src={item.publicizePic}/>
                            <div className={"desc-title kalinga-font"}>{!item.title ? "标题" : item.title}</div>
                            <div style={{padding: "0 40px"}} className={"title kalinga-font"}>
                                {item.informationDesc}
                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default withRouter(connect(mapStateToProps)(InformationPage));
