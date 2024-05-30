import React, { Component } from "react";
import * as agencyAction from "../../../../actions/agency";
import { connect } from "react-redux";
import themeData from "../../../../ultis/theme_data";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
  };
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { txtName } = this.state;
    this.props.createAgencyType(this.props.store_code, {
      name: txtName,
    });
    this.setState({
      txtName: "",
    });
  };
  render() {
    var { txtName } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createType"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thêm cấp</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form onSubmit={this.onSave} role="form" action="#" method="post">
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên cấp đại lý</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    createAgencyType: (id, form) => {
      dispatch(agencyAction.createAgencyType(id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
