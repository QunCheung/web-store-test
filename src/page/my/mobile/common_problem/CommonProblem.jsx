import React from 'react';
import Item from "../../../../components/properties/mobile/listItem/Item";

export default class CommonProblem extends React.Component {


    render() {
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push(<Item showIcon={false} actionKey={0} isShowLine={2} Message={"Question " + i}
                            bindpage={"order"} onItemClick={this.onItemClick}/>)
        }
        return <div>
            {data.map(item => item)}
        </div>
    }
}
