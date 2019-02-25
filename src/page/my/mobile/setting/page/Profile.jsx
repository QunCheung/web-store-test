import React from 'react'
import {Icon, Upload, message, Input} from "antd";
import style from './Profile.useable.less'
import placeholder from '../../../img/profile_placeholder.png'
import Item from '../../../../../components/properties/mobile/listItem/Item';
import change from '../img/change.png'
import changeSex from '../img/changsex.png'
import complete from '../img/complete.png'
import Picker from 'pickerjs/dist/picker.min.js'
import './picker.less'
import 'pickerjs/dist/picker.common.js'
import * as api from "../../../../../api/api";
import * as userAction from "../../../../../action/user_action.js";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Common from "../../../../../utils/common";


const regexPhone = new RegExp(/^[0-9]*$/);

class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            form: [
                {
                    name: "Username:",
                    value: "",
                    enable: true,
                    type: 0,
                    mold: "text"
                }, {
                    name: "Email:",
                    value: "12342@qq.com",
                    enable: false,
                    type: 1
                }, {
                    name: "Phone:",
                    value: "",
                    enable: true,
                    type: 0,
                    mold: "number"
                }, {
                    name: "Gender:",
                    value: "male",
                    enable: true,
                    type: 2
                }, {
                    name: "Birthday:",
                    value: "",
                    type: 3
                }
            ],
            oldForm: null,
            file: null,
            isChange: false
        }
    }


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
        this.picket.destroy()
    }

    componentDidMount() {
        api.getProfile()
            .then(data => {
                const {form} = this.state;
                form.forEach((item, index) => {
                    switch (index) {
                        case 0:
                            item.value = data.userName;
                            break;
                        case 1:
                            item.value = data.email;
                            break;
                        case 2:
                            item.value = data.phone;
                            break;
                        case 3:
                            item.value = data.sex;
                            break;
                        case 4:
                            item.value = data.birthday;
                            break;
                    }
                });
                this.setState({
                    headPic: data.headPic,
                    form,
                    oldForm: $.extend(true, [], form)
                })
            }).catch(e => {
        });

        this.picket = new Picker(document.getElementById('birthday'), {
            format: 'YYYY-MM-DD',
            rows: 5,
            text: {
                title: '请选择生日',
            },
            hide: this.onStateChanged
        });


    }

    onStateChanged = (e) => {
        const value = e.target.value;
        const {form} = this.state;
        const index = form.findIndex(n => n.name === "Birthday:");
        const item = form[index];
        item.value = value;
        this.setState({
            form
        })
    };

    onItemClick = (e) => {
        this.props.onChangeProps(e);
    };

    getFormType = (e) => {
        switch (e.type) {
            case 0:
                return <img onClick={() => {
                    const {form, oldForm} = this.state;
                    const index = form.findIndex(n => n.name === e.name);
                    const item = form[index];
                    item.enable = !item.enable;
                    if (item.enable) {

                        oldForm[index].value = item.value;
                        console.log(oldForm);
                    }
                    this.setState({
                        form,
                        oldForm
                    }, () => {
                        if (item.enable) {
                            this.updateUserParams();
                        }
                    })
                }} className={"change-icon"} src={e.enable ? change : complete}/>;
            case 1:
                return null;
            case 2:
                return <img className={"change-sex-icon"} src={changeSex}/>;
        }
    };

    onInputChange = (value, index) => {
        const {form} = this.state;
        const item = form[index];
        // 限制数字输入
        if ((item.type === 0 && item.mold === "number" && !regexPhone.test(value)) || (index === 2 && value.length > 11)) {
            return;
        }
        item.value = value;
        this.setState({
            form
        })
    };

    updateUserParams = () => {
        const {oldForm, file} = this.state;
        let formData = new FormData();
        formData.append("userName", oldForm[0].value || "");
        formData.append("phone", oldForm[2].value || "");
        formData.append("sex", oldForm[3].value || "");
        formData.append("birthday", oldForm[4].value || "");
        formData.append("headPicFile", file);
        api.updateUserParams(formData).then(data => {
            this.props.dispatch(userAction.renderUserLoginStatusAction(data));
        }).catch(e => {

        });
    };

    render() {

        const {headPic, form} = this.state;
        const profile = this.props.pageInfo.language.mobile.my.settings.profile;
        try {
            const deepClone = Common.deepClone(form);
            deepClone[0].name = profile.username;
            deepClone[1].name = profile.email;
            deepClone[2].name = profile.phone;
            deepClone[3].name = profile.gender.title;
            deepClone[4].name = profile.birthday.title;
            if (JSON.stringify(form) !== JSON.stringify(deepClone)) {
                this.setState({form: deepClone})
            }
        } catch (e) {

        }
        return (
            <div className={"profile"}>
                <div className={"photo"}>
                    <div className={"upload-text kalinga-font"}>{profile.photo}</div>
                    <div className={"upload-div"}>
                        <img onClick={() => {
                            const dom = this.refs.file_upload;
                            dom.click();
                        }} className={"upload-file"} src={!!headPic ? headPic : placeholder}/>
                        <input ref={"file_upload"} type="file" onChange={(e) => {
                            const f = e.target.files[0];
                            const headPic = URL.createObjectURL(f);
                            this.setState({headPic, file: f}, () => {
                                this.updateUserParams();
                            });
                        }} className={"pic-input"}/>
                    </div>
                </div>
                <div className={"form-table"}>
                    <table>
                        <tbody>
                        {
                            this.state.form.map((item, index) => {
                                let dom = this.getFormType(item);
                                if (item.type === 2) {
                                    return <tr key={index}>
                                        <td>{item.name}</td>
                                        <td><span onClick={() => {
                                            const {form} = this.state;
                                            const find = form.find(n => n.name === item.name);
                                            find.value = find.value === "Male" ? "Famale" : "Male";
                                            this.setState({form}, () => {
                                                this.updateUserParams();
                                            });
                                        }}>{item.value}
                                            {dom}</span></td>
                                    </tr>
                                } else if (item.type === 3) {
                                    return <tr key={index}>
                                        <td>{item.name}</td>
                                        <td><input id={"birthday"} onClick={() => {
                                            this.picket.show();
                                        }} onChange={(e) => {
                                            this.onInputChange(e.target.value, index);
                                        }} className="form-control js-date-picker"
                                                   value={item.value}/>
                                        </td>
                                    </tr>
                                }
                                return <tr key={index}>
                                    <td>{item.name}</td>
                                    <td><input value={item.value} type={item.type === 3 ? "date" : "text"}
                                               onChange={(e) => {
                                                   this.onInputChange(e.target.value, index);
                                               }} disabled={item.enable}/></td>
                                    {dom && <td>{dom}</td>}
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <Item showIcon={false}
                      actionKey={0}
                      isShowLine={2}
                      Message={profile.change_pwd.title}
                      bindpage={"change_password"}
                      onItemClick={this.onItemClick}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {...state};
};

export default withRouter(connect(mapStateToProps)(Profile));
