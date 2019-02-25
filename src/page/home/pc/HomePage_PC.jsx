import React from 'react';
import Bottom from "../../../components/properties/pc/bottom/Bottom";
import style from "./HomePage_PC.useable.less";
import HomeBody from "../../../components/properties/pc/body/home/HomeBody";
import TitleBar from "../../../components/properties/pc/titlebar/TitleBar";
import * as api from "../../../api/api";

export default class HomePage_PC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            brands: [],
            actData: [],
            data: [],
            recommendPage: 1
        }
    }


    componentWillMount() {
        style.use();
    }


    componentWillUnmount() {
        style.unuse();
    }


    componentDidMount() {
        Promise.all([
            api.getBanners(),
            api.getRecommendBrands({
                isRecommend: 1,
                limit: 16
            }), api.getActivitys({
                limit: 5
            }), api.getProducts(window.innerWidth > 1440 ? 6 : 4, this.state.recommendPage, {isRecommend: 1})
        ])
            .then(data => {
                this.setState({banner: data[0], brands: data[1], actData: data[2], data: data[3].productDtoList});
            }).catch(e => {
        });
    }

    getRecommendData = (f) => {
        const {recommendPage} = this.state;
        this.setState({recommendPage: recommendPage === 1 && !f ? 1 : (f ? recommendPage + 1 : recommendPage - 1)}, () => {
            api.getProducts(window.innerWidth > 1440 ? 6 : 4, this.state.recommendPage, {isRecommend: 1})
                .then(data => {
                    this.setState({data: data.productDtoList})
                })
                .catch(e => {

                })
        });
    };


    render() {
        const {banner, brands, actData, data} = this.state;
        return <div className={"pc"}>
            <TitleBar page={"home"} dataSource={banner}/>
            <HomeBody brands={brands} actData={actData} recommendProducts={data} getRecommendData={this.getRecommendData}/>
        </div>
    }
}
