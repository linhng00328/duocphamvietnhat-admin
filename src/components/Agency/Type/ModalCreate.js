import React, { Component } from "react";
import * as agencyAction from "../../../actions/agency";
import { connect } from "react-redux";
import themeData from "../../../ultis/theme_data";
import { formatNumberV2 } from "../../../ultis/helpers";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      auto_set_value_import: 0,
      auto_set_value_share: 0,
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]:
        name === "auto_set_value_import" || name === "auto_set_value_share"
          ? formatNumberV2(value)
          : value,
    });
  };
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { txtName, auto_set_value_import, auto_set_value_share } = this.state;
    this.props.createAgencyType(this.props.store_code, {
      name: txtName,
      auto_set_value_import: auto_set_value_import
        ?.toString()
        .replace(/\./g, ""),
      auto_set_value_share: auto_set_value_share?.toString().replace(/\./g, ""),
    });
    this.setState({
      txtName: "",
      auto_set_value_import: 0,
      auto_set_value_share: 0,
    });
  };
  render() {
    var { txtName, auto_set_value_import, auto_set_value_share } = this.state;
    var { isAutoSetLevelAgency } = this.props;
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
                    placeholder="Nhập tên cấp đại lý..."
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
                  />
                </div>
                {isAutoSetLevelAgency && (
                  <>
                    <div class="form-group">
                      <label for="auto_set_value_import">
                        Doanh số nhập hàng
                      </label>
                      <input
                        required
                        type="text"
                        class="form-control"
                        placeholder="Nhập doanh số nhập hàng..."
                        autoComplete="off"
                        value={auto_set_value_import}
                        onChange={this.onChange}
                        name="auto_set_value_import"
                      />
                    </div>
                    <div class="form-group">
                      <label for="auto_set_value_share">
                        Doanh số hoa hồng
                      </label>
                      <input
                        required
                        type="text"
                        class="form-control"
                        placeholder="Nhập doanh số hoa hồng..."
                        autoComplete="off"
                        value={auto_set_value_share}
                        onChange={this.onChange}
                        name="auto_set_value_share"
                      />
                    </div>
                  </>
                )}
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
