import React from 'react';
import {Component} from 'react';
import {Provider} from 'react-redux';
import {LocaleProvider} from 'antd';
import zhcn from 'antd/lib/locale-provider/zh_CN';
import AppRoute from "./AppRoute";

$.ajaxSetup({
    cache: true
});
export default class App extends Component {

    render() {
        return (
            <LocaleProvider locale={zhcn}>
                <Provider store={this.props.store}>
                    <AppRoute store={this.props.store}/>
                </Provider>
            </LocaleProvider>
        );
    }
}
