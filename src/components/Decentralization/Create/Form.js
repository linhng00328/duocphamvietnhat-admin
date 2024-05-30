import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import ModalUpload from "./ModalUpload";
import * as Env from "../../../ultis/default";
import { isEmpty } from "../../../ultis/helpers";
import Table from "./List";
import * as decentralization from "../../../actions/decentralization";
import permission, { initialPermission } from "../../../ultis/permission";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initialPermission();
    this.initialTable = permission();
  }

  handleChangeValue = (checked, item) => {
    this.setState({ [item]: checked });
  };

  showListTable = (data, state) => {
    return (
      <Table
        handleChangeValue={this.handleChangeValue}
        data={data}
        state={state}
      />
    );
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    var { store_code } = this.props;
    e.preventDefault();
    var { name } = this.state;
    if (name == null || !isEmpty(name)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tiêu đề không được để trống",
        },
      });
      return;
    }
    this.props.createDecentralization(store_code, this.state);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  render() {
    console.log(this.state);
    var { name, description } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div class="form-group">
              <label for="group_name">Tên phân quyền</label>

              <input
                type="text"
                value={name}
                class="form-control"
                id="group_name"
                name="name"
                placeholder="Nhập tên phân quyền"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="group_name">Mô tả phân quyền</label>
              <input
                type="text"
                value={description}
                class="form-control"
                id="id_group"
                name="description"
                placeholder="Nhập mô tả"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            {this.showListTable(this.initialTable, this.state)}
          </div>

          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Tạo
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              type="button"
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
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    createDecentralization: (store_code, data) => {
      dispatch(decentralization.createDecentralization(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
