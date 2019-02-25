import React from 'react';
import change from "../setting/img/change.png";
import common from "../../../../utils/common";
import style from "./Recently_Viewed.useable.less";
import deleteImg from "../favorites/img/29.png";
import * as api from "../../../../api/api";
import * as PATH from "../../../../conts/path";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";


class Recently_Viewed extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            changeEnable: false,
            data: {},
            isOk: false
        }
    }

    componentDidMount() {
        this.changeStatus();
        this.getHistory();

    }

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
        if (this.state.isOk) {
            const {data} = this.state;
            let temp = "";
            Object.keys(data).forEach((item) => {
                data[item].forEach((obj) => {
                    temp = temp + obj.key + ":" + obj.browse_time + ":" + obj.time_out + "-";
                })
            });
            temp = temp.substr(0, temp.length - 1);
            common.setCookie("history", temp);
        }
    }


    getHistory = () => {
        const cookie = common.getCookie("history");
        const arrays = cookie.split("-");
        let data = {};
        for (let i = 0; i < arrays.length; i++) {
            let item = arrays[i].split(":");
            for (let j = i + 1; j < arrays.length; j++) {
                let obj = arrays[j].split(":");
                if (item[0] === obj[0]) {
                    arrays.splice(j, 1);
                }
            }
        }
        let tempCooke = "";
        arrays.forEach((obj) => {
            tempCooke = tempCooke + obj + "-";
        });
        common.setCookie("history", tempCooke.substr(0, tempCooke.length - 1));
        if (!tempCooke.substr(0, tempCooke.length - 1)) {
            return;
        }
        arrays.forEach((obj) => {
            let split = obj.split(":");
            let format = this.formatDateTime(split[1]);
            if (!data[format]) {
                data[format] = []
            }
            data[format].push({
                key: split[0],
                browse_time: split[1],
                time_out: split[2]
            })
        });
        console.log(`data等于`, data);
        if (data) {
            let ids = [];
            Object.keys(data).forEach(item => {
                data[item].forEach((obj, position) => {
                    ids.push(obj.key)
                })
            });

            this.getData(ids, data);
        }
    };

    getData = (ids, items) => {
        api.getProductHistory(ids.length, 1, {
            ids: ids
        }).then(data => {
            Object.keys(items).forEach((item, index) => items[item].forEach(obj => {
                obj.data = data.find(n => n.id == obj.key);
            }));
            this.setState({data: items});
        }).catch(e => {

        })
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


    changeStatus = () => {
        this.props.onRightDom(true,
            <div onClick={this.changeEnableClick}>
                {this.state.changeEnable ? <div className={"complete-text"}>carry out</div> :
                    <img className={"toolbar-icon-size"} src={change}/>}
            </div>
        );
    };

    changeEnableClick = () => {
        const {changeEnable} = this.state;
        this.setState({
            changeEnable: !changeEnable,
            isOk: changeEnable
        }, () => {
            this.changeStatus();
        })
    };

    onDelete = (item, index, position) => {
        let {data} = this.state;
        data[item].splice(position, 1);
        this.setState({data})
    };
    getCurrency = (productCurrency) => {
        switch (productCurrency) {
            case "USD":
                return "$";
            case "EUR":
                return "€";
            case "CNY":
                return "¥";
            default:
                return "$";
        }
    };


    render() {
        const {data} = this.state;
        return (
            <div>
                {
                    Object.keys(data).map((item, index) => {
                        if (data[item].length === 0) {
                            return <div/>
                        }
                        return <div className={"history"}>
                            <div className={"title"}>{item}</div>
                            {
                                !!data[item] && data[item].map((obj, position) => {
                                    return <div className={"item"} onClick={()=>{
                                        this.props.history.push(PATH.PRODUCT+'?' +obj.id)
                                    }}>
                                        <img className={"img"}
                                             src={obj.data.showPic}/>
                                        <div className={"item-msg"}>
                                            <span className={"container"}>
                                                <span className={"name"}>{obj.data.productName}</span>
                                                <br/>
                                                <span
                                                    className={"money"}>{this.getCurrency(obj.data.currency)}{obj.data.defaultMarketPrice}</span></span>

                                        </div>
                                        {this.state.changeEnable &&
                                        <img className={"delete-img"} onClick={() => {
                                            this.onDelete(item, index, position);
                                        }}
                                             src={deleteImg}/>}
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {...state};
};


export default withRouter(connect(mapStateToProps)(Recently_Viewed));
