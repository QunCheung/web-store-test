import React from 'react'
import {connect} from "react-redux";
import BaseComponent from "../../base/BaseComponent";
import style from './BrandListPage_PC.useable.less';
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import * as api from "../../../api/api";
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import {withRouter} from "react-router";
import * as PATH from "../../../conts/path";

const regExp = new RegExp(/^[0-9]\d*\w*$/);

class BrandListPage_PC extends BaseComponent {


    constructor(props) {
        super(props);

        this.state = {
            data: {},
            title: [],
            currentTitle: "",
            source: []
        }
    }

    componentWillMount() {
        style.use();
        api.getBrands()
            .then(data => {
                console.log(data);
                this.setData(data);
            })
            .catch(e => {
            });
    }

    setData = (brandSource) => {
        let data = {};
        let title = [];

        brandSource.forEach(item => {
            const keys = Object.keys(data);
            const s = item.brandName;
            let subStr = s.substr(0, 1);
            if (!data["ALL"]) {
                data["ALL"] = [];
            }
            data["ALL"].push(item);
            if (regExp.test(subStr)) {
                // 匹配上数字开头
                const find = keys.find(n => n === "#");
                if (!find) {
                    data["#"] = [];
                }
                data["#"].push(item);
            } else {
                const find = keys.find(n => n === subStr);
                if (!find) {
                    data[subStr] = [];
                }
                data[subStr].push(item);
                let number = title.indexOf(subStr);
                if (number === -1) {
                    title.push(subStr);
                }
            }
        });
        title.sort();
        const keys = Object.keys(data);
        const find = keys.find(n => n === "#");
        if (find) {
            title.push("#");
        }
        title.splice(0, 0, "ALL");
        console.log(data);
        console.log(title);
        this.setState({currentTitle: title[0], title, data, source: brandSource});
    };


    componentWillUnmount() {
        style.unuse();
    }

    render() {
        const {title, data, currentTitle, source} = this.state;
        let innerWidth = 1440;
        const sumWidth = innerWidth - innerWidth * 0.15;
        let number = sumWidth / title.length;
        const margin = number / 2 - 17;
        let brand = null;
        try {
            brand = this.props.pageInfo.language.pc.brand.title;
        } catch (e) {
            brand = "";
        }
        return <React.Fragment>
            <TitleBar Breads={[{name: brand, path: PATH.BRAND + "s"}]}/>
            <div className={"brands-pc"} style={{padding: "0 " + (innerWidth * 0.13) / 2 + "px"}}>
                {
                    title.map((item) => {
                        return <div style={{width: number}} className={"inline"}>
                            <div onClick={() => {
                                this.setState({currentTitle: item})
                            }} className={"items " + (currentTitle === item ? "select-text" : "")}
                                 style={{marginLeft: margin}}>{item}</div>
                        </div>
                    })
                }
                <div className={"items-data"}>
                    {
                        !!data[currentTitle] && data[currentTitle].map((item, index) => {

                            return <div
                                onClick={() => {
                                    const find = source.find(n => n.brandName === item.brandName);
                                    this.props.history.push(PATH.PLACEHOLDER + '?page=/brand-id=' + find.id);
                                }}
                                className={"data-item " + (index % 5 === 0 ? "" : "data-item-margin") + " " + (index > 5 ? "data-item-margin-top" : "")}>
                                <img src={item.showLogoPic}/></div>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const pageInfo = state.pageInfo;
    return {pageInfo};
};

export default withRouter(connect(mapStateToProps)(BrandListPage_PC));
