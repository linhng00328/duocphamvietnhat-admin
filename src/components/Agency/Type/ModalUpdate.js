import React, { Component } from "react";
import * as agencyAction from "../../../actions/agency";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { connect } from "react-redux";
import themeData from "../../../ultis/theme_data";
import { formatNumberV2 } from "../../../ultis/helpers";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      auto_set_value_import: 0,
      auto_set_value_share: 0,
      id: "",
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
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var type = nextProps.modal;
      this.setState({
        txtName: type.name,
        id: type.id,
        auto_set_value_import: type.auto_set_value_import
          ? formatNumberV2(type.auto_set_value_import)
          : 0,
        auto_set_value_share: type.auto_set_value_share
          ? formatNumberV2(type.auto_set_value_share)
          : 0,
      });
    }
  }

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    const { txtName, id, auto_set_value_import, auto_set_value_share } =
      this.state;
    const data = {
      name: txtName,
      auto_set_value_import: auto_set_value_import
        ?.toString()
        .replace(/\./g, ""),
      auto_set_value_share: auto_set_value_share?.toString().replace(/\./g, ""),
    };
    this.props.updateAgencyType(this.props.store_code, id, data);
  };
  render() {
    var { txtName, auto_set_value_import, auto_set_value_share } = this.state;
    const { isAutoSetLevelAgency, setModalUpdate } = this.props;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateType"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh sửa cấp</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={() => setModalUpdate({})}
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
                  onClick={() => setModalUpdate({})}
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Lưu
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
    updateAgencyType: (store_code, id, form) => {
      dispatch(agencyAction.updateAgencyType(store_code, id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
