import React from 'react'
import {withRouter} from 'react-router';
import style from "./Nav.useable.less";
import {Col, Row} from "antd";
import {connect} from "react-redux";
import home from './img/6.png';
import homeB from './img/6B.png';
import brand from './img/7.png';
import brandB from './img/7B.png';
import information from './img/8.png';
import informationB from './img/8B.png';
import my from './img/9.png';
import myB from './img/9B.png';
import * as PATH from "../../conts/path";

class Nav extends React.Component {
    componentWillMount() {
        style.use();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        style.unuse();
    }

    onChangeUrl = (key, e) => {
        this.setState({
            current: key
        }, () => {
            this.props.history.push(e);
        });

    };


    constructor(props) {
        super(props);

        this.state = {
            current: 0
        }
    }

    render() {
        let search = this.props.history.location;
        let {current} = this.state;
        switch (search.pathname) {
            case PATH.MY + "":
                if (current !== 3) {
                    this.setState({
                        current: 3
                    })
                }
                break;
            case  PATH.HOME:
                if (current !== 0) {
                    this.setState({
                        current: 0
                    })
                }
                break;
            case PATH.BRANDS:
                if (current !== 1) {
                    this.setState({
                        current: 1
                    })
                }
                break;
            case PATH.INFORMATION +"":
                if (current !== 2) {
                    this.setState({
                        current: 2
                    })
                }
                break;
            case PATH.DEFAULT:
                if (current !== 0) {
                    this.setState({
                        current: 0
                    })
                }
                break;
        }
        let data = [{
            xs: {
                xs: 6,
                offset: 0
            },
            sm: {
                sm: 6,
                offset: 0
            },
            md: {
                md: 6,
                offset: 0
            },
            lg: {
                lg: 6,
                offset: 0
            },
            xl: {
                xl: 6,
                offset: 0
            },
            xxl: {
                xxl: 6,
                offset: 0
            },
            content: <img className={"nav"} src={(current === 0 ? homeB : home)}/>,
            key: 0,
            url: PATH.HOME
        }, {
            xs: {
                xs: 6,
                offset: 0
            },
            sm: {
                sm: 6,
                offset: 0
            },
            md: {
                md: 6,
                offset: 0
            },
            lg: {
                lg: 6,
                offset: 0
            },
            xl: {
                xl: 6,
                offset: 0
            },
            xxl: {
                xxl: 6,
                offset: 0
            },
            content: <img className={"nav"} src={(current === 1 ? brandB : brand)}/>,
            key: 1,
            url: PATH.BRANDS
        }, {
            xs: {
                xs: 6,
                offset: 0
            },
            sm: {
                sm: 6,
                offset: 0
            },
            md: {
                md: 6,
                offset: 0
            },
            lg: {
                lg: 6,
                offset: 0
            },
            xl: {
                xl: 6,
                offset: 0
            },
            xxl: {
                xxl: 6,
                offset: 0
            },
            content: <img className={"nav"} src={(current === 2 ? informationB : information)}/>,
            key: 2,
            url: PATH.INFORMATION +""
        }, {
            xs: {
                xs: 6,
                offset: 0
            },
            sm: {
                sm: 6,
                offset: 0
            },
            md: {
                md: 6,
                offset: 0
            },
            lg: {
                lg: 6,
                offset: 0
            },
            xl: {
                xl: 6,
                offset: 0
            },
            xxl: {
                xxl: 6,
                offset: 0
            },
            content: <img className={"nav"} src={(current === 3 ? myB : my)}/>,
            key: 3,
            url: PATH.MY + ""
        }];
        return <div className={"nav-bottom"}>
            <Row>
                {
                    data.map((item, position) => {
                        return <Col
                            xs={{span: item.xs.xs, offset: item.xs.offset}}
                            sm={{span: item.sm.sm, offset: item.sm.offset}}
                            md={{span: item.md.md, offset: item.md.offset}}
                            lg={{span: item.lg.lg, offset: item.lg.offset}}
                            xl={{span: item.xl.xl, offset: item.xl.offset}}
                            xxl={{span: item.xxl.xxl, offset: item.xxl.offset}}
                            className={"bg-white bottom-height"} key={position}>
                            <div style={{width: "100%", height: "100%"}} onClick={(e) => {
                                this.onChangeUrl(item.key, item.url)
                            }}>
                                {item.content}
                            </div>
                        </Col>
                    })
                }

            </Row>

        </div>
    }

}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};

export default withRouter(connect(mapStateToProps)(Nav));
