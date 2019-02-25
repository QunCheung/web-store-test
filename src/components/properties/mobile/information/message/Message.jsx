import React from 'react';
import Style from './Message.useable.less'


export default class Message extends React.Component {


    componentWillMount() {
        Style.use();
    }

    componentWillUnmount() {
        Style.unuse();
    }


    render() {
        const {title, content, img} = this.props;
        return <div>
            {title && <div className={"msg-title kalinga-font"}>{title}</div>}
            {content && <div className={"msg-content kalinga-font"}>{content}</div>}
            {img && <div className={"msg-img-div"}>
                <img className={"msg-item-img"} src={img}/>
            </div>}
        </div>
    }

}
