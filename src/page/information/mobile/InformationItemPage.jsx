import React from 'react'
import ToolBar from '../../../components/properties/mobile/toolbar/ToolBar.jsx'
import * as api from "../../../api/api";
import common from "../../../utils/common";
import style from './InfomationItemPage_mobile.useable.less'

export default class InformationPage extends React.Component {


    constructor(props) {
        super(props);
        const id = common.getQueryString('id');
        this.state = {
            id,
            data: {
                context: "",
                title: ""
            }
        }
    }


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }


    componentDidMount() {
        this.getData();
    }

    getData = () => {
        api.getInformationDetail(this.state.id).then(data => {
            this.setState({data})
        }).catch(e => {

        });
    };

    render() {
        const {data} = this.state;
        data.context = data.context.replace("16px","2em");
        // let lastIndexOf = data.context.lastIndexOf("font-size");
        // while (true){
        //     data.context.
        // }


        return <div className={"Information-item-page"} style={{paddingBottom: 88}}>
            <ToolBar title={<span className={"toolbar-title-size"}>{data.title}</span>} showRightIcon={false}
                     showLeftIcon={true}/>
            <div className={"informationItem"}>
                <div dangerouslySetInnerHTML={{__html: data.context}}/>
            </div>
        </div>
    }
}
