import React from 'react';
import placeholder from '../../img/profile_placeholder.png'
import {Checkbox, DatePicker, Input} from "antd";
import style from "./Profile.useable.less";
import * as api from "../../../../api/api";
import moment from 'moment';
import {connect} from "react-redux";

const CheckboxGroup = Checkbox.Group;

const dateFormat = 'YYYY-MM-DD';
class Profile extends React.Component {


    componentWillMount() {
        style.use();
    }

    componentWillUnmount() {
        style.unuse();
    }

    componentDidMount() {
        api.getProfile()
            .then(data => {
                this.setState({
                    headPic: data.headPic,
                    username: data.userName,
                    email: data.email,
                    phone: data.phone,
                    sex: data.sex,
                    birthday: data.birthday
                })
            }).catch(e => {
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            headPic: "",
            username: "",
            email: "",
            phone: "",
            birthday: "",
            sex: "",
            file: null,
            isChange: false
        }
    }

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues[checkedValues.length - 1]);
        this.setState({sex: checkedValues[checkedValues.length - 1]});
    };

    onDateChange = (date, dateString) => {
        this.setState({birthday: dateString})
    };


    render() {
        const {headPic, username, email, phone, birthday, sex, isChange, file} = this.state;
        const {profile} = this.props.pageInfo.language.pc.my;
        const checkOptions = [
            {label: profile.gender.items[0], value: 'Male'},
            {label: profile.gender.items[1], value: 'Female'}
        ];
        return (
            <div className={"profile"}>
                <div className={"form"}>
                    <table style={{"border-collapse": "separate"}}>
                        <tr>
                            <td>{profile.photo}</td>
                            <td>
                                <div className={"profile-msg-margin"}>{!isChange ? <React.Fragment>
                                    <img className={"pic-holder"} src={!!headPic ? headPic : placeholder}/>
                                </React.Fragment> : <React.Fragment>
                                    <img onClick={() => {
                                        const dom = this.refs.file_upload;
                                        dom.click();
                                    }} className={"pic-holder"} src={!!headPic ? headPic : placeholder}/>
                                    <input ref={"file_upload"} type="file" onChange={(e) => {
                                        const f = e.target.files[0];
                                        console.log(f);
                                        const headPic = URL.createObjectURL(f);
                                        this.setState({headPic, file: f});
                                    }} className={"pic-input"}/></React.Fragment>}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>{profile.username}</td>
                            <td><div className={"profile-msg-margin"}>{!isChange ? <span>{username}</span> :
                                <div className={"change-input_layout"}><Input placeholder={"please enter username"}
                                                                              value={username} onChange={(e) => {
                                    this.setState({username: e.target.value})
                                }}/></div>}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>{profile.email}</td>
                            <td><div className={"profile-msg-margin"}>{email}</div></td>
                        </tr>
                        <tr>
                            <td>{profile.phone}</td>
                            <td><div className={"profile-msg-margin"}>{!isChange ? <span>{phone}</span> :
                                <div className={"change-input_layout"}><Input
                                    placeholder={"Please enter the phone number"} value={phone} onChange={(e) => {
                                    this.setState({phone: e.target.value})
                                }}/></div>}</div></td>
                        </tr>
                        <tr>
                            <td>{profile.gender.title}</td>
                            <td><div className={"profile-msg-margin"}>{!isChange ? sex :
                                <div className={"profile-check"}><CheckboxGroup onChange={this.onChange} options={checkOptions}
                                                                                value={!!sex ? [sex] : []}/></div>}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>{profile.birthday}</td>
                            <td><div className={"profile-msg-margin"}>{!isChange ? birthday :
                                <DatePicker onChange={this.onDateChange}
                                            defaultValue={birthday ? moment(birthday, dateFormat) : null}/>}</div></td>
                        </tr>
                    </table>
                </div>
                {!isChange ? <div onClick={() => {
                        this.setState({isChange: true})
                    }} className={"edit-btn"}>
                    {profile.edit}
                    </div> :
                    <div onClick={() => {
                        let formData = new FormData();
                        formData.append("userName", username);
                        formData.append("phone", phone || "");
                        formData.append("sex", sex || "");
                        formData.append("birthday", birthday || "");
                        formData.append("headPicFile", file);
                        api.updateUserParams(formData).then(data => {
                            this.setState({isChange: false})
                        }).catch(e => {

                        });
                    }} className={"submit-btn"}>
                        {profile.submit}
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {...state};
};


export default connect(mapStateToProps)(Profile);
