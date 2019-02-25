import React from 'react'
import {Carousel} from "antd";
import style from './SliderCarousel.useable.less'

export default class SliderCarousel extends React.Component {


    constructor(props) {
        super(props)
    }

    componentWillMount() {
        style.use();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        style.unuse();
    }


    render() {

        const {data} = this.props;

        return <React.Fragment>
            <Carousel autoplay>
                {
                    data.map((item, position) => {
                        return <img src={item.bannerPic} className={"img-bg"}/>
                    })
                }
            </Carousel>
        </React.Fragment>
    }
}
