import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { compressed } from "../../../ultis/helpers";
import { isEmpty } from "../../../ultis/helpers";
import * as Types from "../../../constants/ActionType";
import * as TransferAction from "../../../actions/transfer_stock";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
    };
  }

  componentDidMount() {
    this.setState({
      note: this.props.note,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.note != nextProps.note) {
      this.setState({
        note: nextProps.note,
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  onSave = (e) => {
    e.preventDefault();
    const { store_code, id, transfer_stock_items, to_branch_id } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    window.$(".modal").modal("hide");

    const formData = {
      note: this.state.note,
      to_branch_id: to_branch_id,

      transfer_stock_items: transfer_stock_items,
    };
    var redirect = false;
    this.props.updateTransferStock(
      store_code,
      branch_id,
      id,
      formData,
      redirect
    );
  };
  render() {
    var { note } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Chỉnh sửa ghi chú</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Ghi chú</label>
                  <input
                    type="text"
                    class="form-control"
                    id="note"
                    placeholder="Nhập ghi chú"
                    autoComplete="off"
                    value={note}
                    onChange={this.onChange}
                    name="note"
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
    showError: (error) => {
      dispatch(error);
    },

    updateTransferStock: (store_code, branch_id, id, data, redirect) => {
      dispatch(
        TransferAction.updateTransferStock(
          store_code,
          branch_id,
          id,
          data,
          redirect
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
