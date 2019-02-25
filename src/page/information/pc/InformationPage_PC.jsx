import React from 'react'
import {connect} from "react-redux";
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import * as api from "../../../api/api";
import style from "./Information_PC.useable.less";
import {Col, Row} from "antd";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";

class InformationPage_PC extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            pageSize: 3
        }
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
        api.getInformation(this.state.pageSize, this.state.currentPage).then(data => {
            let oldData = this.state.data;
            oldData = oldData.concat(data);
            this.setState({data: oldData})
        }).catch(e => {

        });
    };


    formatDateTime = (timeStamp) => {
        const date = new Date();
        date.setTime(timeStamp);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    loadMore = () => {
        this.setState({currentPage: this.state.currentPage + 1}, () => {
            this.getData();
        })
    };


    render() {
        const {data} = this.state;
        let news = null;
        try
        {
            news = this.props.pageInfo.language.pc.news;
        }catch (e) {
            news = "";
        }
        return <React.Fragment>
            <TitleBar Breads={[{name: news, path: PATH.INFORMATION +""}]}/>
            <div className={"information"}>
                <Row>
                    {
                        data.map((item, index) => {
                            if (index % 2 === 0) {
                                return <React.Fragment>
                                    <Col span={24}>
                                        <div className={"information-item"} onClick={() => {
                                            this.props.history.push(PATH.ITEM_DETAIL +"?id=" + item.id)
                                        }}>
                                            <Row gutter={24}>
                                                <Col span={12}>
                                                    <div className={"information-title"}>
                                                        {!!item.title ? item.title : "标题"}
                                                    </div>
                                                    <div className={"information-time"}>
                                                        {this.formatDateTime(item.createTime)}
                                                    </div>
                                                    <div className={"desc"}>
                                                        <div>{item.informationDesc}</div>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <img className={"information-img"} src={item.publicizePic}/>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </React.Fragment>
                            }
                            return <React.Fragment>
                                <Col span={24}>
                                    <div className={"information-item"} onClick={() => {
                                        this.props.history.push(PATH.ITEM_DETAIL +"?id=" + item.id)
                                    }}>
                                        <Row gutter={24}>
                                            <Col span={12}>
                                                <div>
                                                    <img className={"information-img"} src={item.publicizePic}/>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className={"information-title"}>
                                                    {!!item.title ? item.title : "标题"}
                                                </div>
                                                <div className={"information-time"}>
                                                    {this.formatDateTime(item.createTime)}
                                                </div>
                                                <div className={"desc"}>
                                                    <div>{item.informationDesc}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </React.Fragment>
                        })
                    }
                </Row>
                <div className={"more-layout"}>
                    <div onClick={this.loadMore} className={"more"}>More</div>
                </div>
            </div>

        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};


export default withRouter(connect(mapStateToProps)(InformationPage_PC));
