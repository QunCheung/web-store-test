import React from 'react'
import {Component} from 'react'
import {Col, Row} from "antd";
import NoResultFind from './img/NoResultFind.png'
import Style from './Grid.useable.less'

export default class Grid extends Component {


    componentWillMount() {
        Style.use();
    }

    componentWillUnmount() {
        Style.unuse();
    }

    constructor(props) {
        super(props);
    }


    render() {

        return <React.Fragment>
            {this.props.dataSource.length === 0 && <div style={{
                marginTop: "50%",
                marginBottom: "50%",
                textAlign: "center"
            }}>
                <img style={{width: 307, height: 260}}
                     src={NoResultFind}/>
                <div className={"grid"}><span>No Result Found</span></div>
            </div>}
            {this.props.dataSource &&
            <div style={this.props.itemStyle}>
                <Row align={"middle"} justify={"center"}>
                    {
                        this.props.dataSource.map((item, position) => {

                            return item ? <Col key={position}
                                               xs={{span: item.xs.xs, offset: item.xs.offset}}
                                               sm={{span: item.sm.sm, offset: item.sm.offset}}
                                               md={{span: item.md.md, offset: item.md.offset}}
                                               lg={{span: item.lg.lg, offset: item.lg.offset}}
                                               xl={{span: item.xl.xl, offset: item.xl.offset}}
                                               xxl={{span: item.xxl.xxl, offset: item.xxl.offset}}
                            >{item.data.content}</Col> : <div/>
                        })
                    }
                </Row></div>}
        </React.Fragment>
    }

}
