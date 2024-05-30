import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as SettingAction from "../../actions/notification";

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked_switch3: false,
            checked_switch2: false,
            stock: 0,
            email_send_to_customer : ""
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value,
        });
    }

    handleUpdate = () => {
        const { store_code } = this.props
        const formData = {
            noti_near_out_stock: this.state.checked_switch2,
            allow_semi_negative: this.state.checked_switch3,
            noti_stock_count_near: this.state.stock,
            email_send_to_customer : this.state.email_send_to_customer
        }
        this.props.updateGeneralSetting(store_code, formData)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.generalSetting !== this.props.generalSetting) {
            console.log('helllo')
            this.setState({
                checked_switch3: nextProps.generalSetting.allow_semi_negative,
                checked_switch2: nextProps.generalSetting.noti_near_out_stock,
                stock: nextProps.generalSetting.noti_stock_count_near,
                email_send_to_customer : nextProps.generalSetting.email_send_to_customer
            })
        }
        if (
            this.state.isLoading != true &&
            typeof nextProps.permission.branch_list != "undefined"
          ) {
            var permissions = nextProps.permission;
      
            var isShow = permissions.config_setting;
            this.setState({ isLoading: true, isShow });
          }
    }

    componentDidMount() {
        const { store_code } = this.props
        this.props.fetchAllGeneralSetting(store_code,)
    }

    render() {
        const { store_code } = this.props
        var {email_send_to_customer} = this.state
        return (
            <div className="">
                 <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <div class="form-group" style={{ display: "flex" }}>
                                <input style={{ maxWidth: "500px" }} type="tel" name="email_send_to_customer" value={email_send_to_customer} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />


                            </div>

                        </div>

            <button
                class="btn btn-primary btn-sm"
                onClick={this.handleUpdate}
            >
                <i class="fa fa-save"></i> Lưu
            </button>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        generalSetting: state.notificationReducers.generalSetting,
        permission: state.authReducers.permission.data,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllGeneralSetting: (store_code) => {
            dispatch(SettingAction.fetchAllGeneralSetting(store_code));
        },
        updateGeneralSetting: (store_code, data) => {
            dispatch(SettingAction.updateGeneralSetting(store_code, data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting)