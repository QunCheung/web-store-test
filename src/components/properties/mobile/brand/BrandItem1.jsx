import React from 'react'
import BaseComponent from "../../../../page/base/BaseComponent";
import Grid from "../grid/Grid";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as PATH from "../../../../conts/path";

const regExp = new RegExp(/^[0-9]\d*\w*$/);

class BrandItem1 extends BaseComponent {


    constructor(props) {
        super(props);

        this.state = {
            data: [],
            title: [],
            header: "brand",
            currentTitle: "a"
        }
    }


    onScrollChange = (e) => {
        let scroll = window.scrollY - 358;
        let current = this.state.title[0];
        let {data, title} = this.state;
        let length = 0;
        for (let i = 0; i < title.length; i++) {
            let currentTitle = title[i];
            if (i === title.length - 1) {
                current = currentTitle;
                break;
            }
            let nextTitle = title[i + 1];
            let currentIndex = data.indexOf(currentTitle);
            let nextIndex = data.indexOf(nextTitle);
            let sum = nextIndex - (currentIndex + 1);
            length = length + sum * 100;
            let number = length + (i + 1) * 48;
            if (scroll < number) {
                current = currentTitle;
                break;
            }
        }
        this.setState({currentTitle: current})
    };


    componentDidMount() {
        window.addEventListener('scroll', this.onScrollChange);


    }

    componentWillMount() {
        this.setData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setData(nextProps);
    }

    setData(props) {
        const {brandSource} = props;
        let data = [];
        let title = [];
        let data2 = [];
        brandSource.forEach(item => {
            const s = item.brandName;
            let subStr = s.substr(0, 1);
            if (regExp.test(subStr)) {
                // 匹配上数字开头
                data2.push(s);
            } else {
                if (data.indexOf(subStr) === -1) {
                    //传入标题
                    data.push(subStr);
                }
                data.push(s);
                let number = title.indexOf(subStr);
                if (number === -1) {
                    title.push(s.substr(0, 1));
                }
            }
        });
        data.sort();
        title.sort();
        if (data2.length !== 0) {
            data.push("#");
            data2.forEach((item, index) => {
                data.push(item)
            });
            title.push("#");
        }
        this.setState({title, data}, () => {
            this.onScrollChange(null);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollChange)
    }

    render() {
        const {title, data} = this.state;
        let innerHeight = window.innerHeight;
        let top = innerHeight * 0.1;
        let number = innerHeight * 0.8 / title.length;
        return <React.Fragment>
            <div className={"item1"}>
                <div>
                    <Grid dataSource={this.props.dataSource} itemStyle={{margin: "0 19px 0"}}/>
                </div>
                <div>
                    {
                        data.map((item, position) => {
                            let find = title.find(obj => item === obj);
                            if (find) {
                                return <div className={"padding-left-30 list-item-1  kalinga-font"}
                                >{item.toLocaleUpperCase()}</div>
                            }
                            return <div className={"padding-left-30 list-item-2  kalinga-font"} onClick={(e) => {
                                const brand = this.props.brandSource.find(n => n.brandName === item);
                                this.startPage(PATH.BRAND +"?id=" + brand.id, false);
                            }}
                            >{item}</div>
                        })
                    }
                </div>

                <div className={"title"} style={{top: top, height: innerHeight * 0.8}}>
                    {
                        title.map((item, position) => {
                            return <div
                                style={{height: number, lineHeight: number + "px"}}
                                className={item === this.state.currentTitle ? "select-title" : ""}
                                onClick={() => {
                                    let find = data.findIndex(obj => obj === item);
                                    setTimeout(() => {
                                        window.scrollTo(0, find * 100 - position * 100 + position * 48 + 358);
                                    }, 10);
                                }}>
                                <div
                                    className={item === this.state.currentTitle ? "select-title-span" : ""}>{item.toLocaleUpperCase()}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    }

}


const mapStateToProps = state => {
    const {pageInfo, historyPage} = state;
    return {pageInfo, historyPage};
};

export default withRouter(connect(mapStateToProps)(BrandItem1));

