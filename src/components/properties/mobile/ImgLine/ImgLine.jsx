import React from 'react'
import style from './ImgLine.useable.less'

export default class ImgLine extends React.Component {

    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    render() {
        return <div className={this.props.parentClass}>
            <img className={this.props.class}
                 src={this.props.src}/>
        </div>
    }

}