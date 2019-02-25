import React from 'react';
import {Breadcrumb} from 'antd';

export default class BreadcrumbItem extends React.Component {

    render() {
        const {identification} = this.props;
        return <React.Fragment>
            <Breadcrumb separator=">" style={{fontSize: 18, margin: 30}}>
                {
                    identification.map((item, index) => {
                        return <Breadcrumb.Item key={index} href="/">{item}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        </React.Fragment>
    }

}
