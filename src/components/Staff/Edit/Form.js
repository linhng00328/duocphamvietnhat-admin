import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import * as staffAction from "../../../actions/staff";
import { shallowEqual } from "../../../ultis/shallowEqual";
import ModalUpload from "./ModalUpload";
import * as Env from "../../../ultis/default";
import {
  isEmpty,
  isEmail,
  isPhone,
  formatNumber,
} from "../../../ultis/helpers";
import { getBranchId, getBranchName } from "../../../ultis/branchUtils";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phone_number: "",
      email: "",
      name: "",
      sex: 0,
      address: "",
      salary_one_hour: "",
      id_decentralization: "",
      password: "",
      decentralizationArr: [],
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value_text = target.value;
    var value = value_text;
    const _value = formatNumber(value);
    if (name == "salary_one_hour") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        value = value.toString().replace(/\./g, ",");
        if (value_text == "") {
          this.setState({ [name]: "" });
        } else {
          this.setState({ [name]: value });
        }
      }
    } else {
      this.setState({ [name]: value });
    }
  };

  componentWillMount() {
    var { staff, id, decentralization } = this.props;
    console.log(staff);
    this.getData(staff, id);
    this.setState({
      decentralizationArr: decentralization || [],
    });
  }

  componentWillReceiveProps(nextProps) {
    var { decentralizationArr } = this.state;
    var { decentralization } = nextProps;

    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      var { staff, id } = nextProps;
      this.getData(staff, id);
    }

    if (
      decentralizationArr.length == 0 ||
      shallowEqual(decentralization, this.props.decentralization)
    ) {
      this.setState({
        decentralizationArr: decentralization,
      });
    }
  }

  getData = (staff, id) => {
    if (staff.length > 0) {
      for (const item of staff) {
        if (item.id == id) {
          const salary_one_hour =
            item.salary_one_hour != null
              ? formatNumber(item.salary_one_hour)
              : "";
          var { store_code } = this.props;
          var _salary_one_hour =
            salary_one_hour == ""
              ? ""
              : new Intl.NumberFormat().format(salary_one_hour);
          this.setState({
            username: item.username.replace(`${store_code}_`, ""),
            phone_number: item.phone_number,
            email: item.email,
            name: item.name,
            sex: item.sex,
            address: item.address,
            salary_one_hour: _salary_one_hour,
            branch_id: item.branch_id,
            id_decentralization:
              typeof item.decentralization != "undefined" &&
              item.decentralization != null
                ? item.decentralization.id
                : null,
          });
        }
      }
    }
  };

  getNameBranch = () => {
    var { branchStore } = this.props;
    var result = null;
    if (branchStore && branchStore.length > 0) {
      result = branchStore.filter((branch) => branch.id == getBranchId());
    } else {
      result = [{}];
    }
    return result[0].name;
  };

  onSave = (e) => {
    var { store_code, id } = this.props;
    e.preventDefault();
    var {
      username,
      phone_number,
      email,
      name,
      sex,
      address,
      salary_one_hour,
      id_decentralization,
      password,
      branch_id,
    } = this.state;
    if (name == null || !isEmpty(name)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa nhập tên nhân viên",
        },
      });
      return;
    }
    if (username == null || !isEmpty(username)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa nhập tên đăng nhập",
        },
      });
      return;
    }
    if (isEmpty(email) && !isEmail(email)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Email không đúng format",
        },
      });
      return;
    }
    if (password.toString().replace(/ /g, "").length > 0) {
      if (password.toString().replace(/ /g, "").length < 6) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Mật khẩu phải từ 6 kí tự trở lên",
          },
        });
        return;
      }
    }

    if (!isPhone(phone_number)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Số điện thoại không hợp lệ",
        },
      });
      return;
    }

    this.props.updateStaff(
      id,
      {
        username: store_code + "_" + username,
        phone_number,
        email,
        name,
        sex,
        branch_id,
        address,
        salary_one_hour: formatNumber(salary_one_hour),
        id_decentralization,
        password:
          password == null || password.toString().replace(/ /g, "").length == 0
            ? null
            : password,
      },
      store_code
    );
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  showAllDecentralization = (data) => {
    var result = null;
    if (data.length > 0) {
      result = data.map((item, index) => {
        return <option value={item.id}>{item.name}</option>;
      });
    }
    return result;
  };

  render() {
    var {
      username,
      phone_number,
      email,
      name,
      sex,
      address,
      salary_one_hour,
      id_decentralization,
      decentralizationArr,
      password,
    } = this.state;
    var { store_code } = this.props;
    console.log(this.getNameBranch(), this.props.branchStore);
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Tên nhân viên</label>
              <input
                type="text"
                class="form-control"
                value={name}
                name="name"
                placeholder="Nhập tên nhân viên"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label for="product_name">Chi nhánh</label>
              <input
                disabled
                type="text"
                class="form-control"
                value={this.getNameBranch()}
                name="name"
                placeholder="Nhập tên nhân viên"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label for="product_name">Tên đăng nhập</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    {store_code + "_"}
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  onChange={this.onChange}
                  name="username"
                  value={username}
                  placeholder="Nhâp tên tài khoản"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Mật khẩu</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={password}
                name="password"
                placeholder="Nhập mật khẩu"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <div class="alert alert-info alert-dismissible" role="alert">
                Để trống trường mật khẩu nếu bạn không muốn thay đổi.
              </div>
            </div>
            <div class="form-group">
              <label for="product_name">Điện thoại</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={phone_number}
                name="phone_number"
                placeholder="Nhập SDT"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label for="product_name">Phân quyền</label>
              <select
                onChange={this.onChange}
                name="id_decentralization"
                value={id_decentralization}
                id="input"
                class="form-control"
                required="required"
              >
                <option value="" disabled>
                  --Vai trò--
                </option>
                {this.showAllDecentralization(decentralizationArr)}
              </select>
            </div>

            <div class="form-group">
              <label for="product_name">Giới tính</label>
              <select
                onChange={this.onChange}
                name="sex"
                value={sex}
                id="input"
                class="form-control"
                required="required"
              >
                <option value="1">Nam</option>
                <option value="2">Nữ</option>
                <option value="0">Không xác định</option>
              </select>
            </div>
            <div class="form-group">
              <label for="product_name">Địa chỉ</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={address}
                name="address"
                placeholder="Nhập địa chỉ"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            <div class="form-group">
              <label for="product_name">Email</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={email}
                name="email"
                placeholder="Nhập Email"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            {/* <div class="form-group">
              <label for="product_name">Lương theo giờ (VNĐ/H)</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={salary_one_hour}
                name="salary_one_hour"
                placeholder="Lương theo giờ"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div> */}
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Tạo
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
        <ModalUpload />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branchStore: state.storeReducers.store.branchStore,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

    updateStaff: (id, data, store_code) => {
      dispatch(staffAction.updateStaff(id, data, store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
