import React from 'react'
import {connect} from "react-redux";
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import CommonResult from "../../result/pc/CommonResult";
import common from "../../../utils/common";
import * as api from "../../../api/api";
import CommonResultItem from "../../../components/properties/pc/item/CommonResultItem";
import * as PATH from "../../../conts/path";

class Activity_PC extends React.Component {
    constructor(props) {
        super(props);
        const id = common.getQueryString("id");
        this.state = {
            id,
            current: 1,
            total: 0,
            pageSize: 9,
            data: {
                title: "",
                productListDto: {
                    productDtoList: []
                }
            },
            range: {
                maxMarketPrice: 0,
                minMarketPrice: 0,
                brandDtoList: [],
                firstCategoryDtoList: [],
                secondCategoryDtoList: []
            },
            tags: []
        };

        window.setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10)
    }

    componentDidMount() {
        this.getData();
        this.getInfo();
    }

    getData = () => {
        api.getActivityDetail(this.state.id, this.state.pageSize, this.state.current)
            .then(data => {
                this.setState({data, total: data.productListDto.total});
            }).catch(e => {
        });
    };

    onPageChange = (page, pageSize) => {
        this.setState({current: Number(page)}, () => {
            this.getData();
        });
    };

    getInfo = () => {
        const {
            id
        } = this.state;
        api.getRange({search: id})
            .then(range => {
                this.setState({range});
            })
            .catch(e => {

            })
    };

    onCheckChange = (c, n) => {
        const {tags} = this.state;
        if (c) {
            tags.push(n);
        } else if (tags.find(m => m === n)) {
            const number = tags.indexOf(m => m === n);
            tags.splice(number, 1);
        }
        this.setState({tags}, () => {
        });
    };
    onTagClose = (o) => {
        const {tags} = this.state;
        tags.splice(o, 1);
        this.setState({tags});
    };


    render() {
        const {id, data, current, total, pageSize, range, tags} = this.state;
        return <React.Fragment>
            <TitleBar Breads={[{name: data.title, path: PATH.PLACEHOLDER +'?page=/activity-id=' + id}]}/>
            <CommonResultItem
                range={range}
                tags={tags}
                onTagClose={this.onTagClose}
                onCheckChange={this.onCheckChange}
                onPageChange={this.onPageChange}
                pageSize={pageSize}
                total={total}
                current={current}
                noBrand={true}
                dataSource={data.productListDto.productDtoList}/>
        </React.Fragment>;
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(Activity_PC);
