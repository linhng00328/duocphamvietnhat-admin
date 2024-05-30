import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import themeData from "../../../ultis/theme_data";

class UpdateNameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtNewName: "",
      id: "",
      product: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var product = nextProps.modal;

      this.setState({
        id: product.id,
        product: product,
        txtNewName: product.name,
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
  };

  onSave = (e) => {
    e.preventDefault();
    var { id, txtNewName } = this.state;
    window.$(".modal").modal("hide");

    var { store_code } = this.props;

    this.props.updateNameOneProduct(
      store_code,
      id,
      txtNewName == null ? "" : txtNewName
    );
  };

  handleDataFromDistribute = (data) => {
    console.log(data);
    this.setState((prevState, props) => {
      return { distribute: data[0] };
    });
  };

  render() {
    var { txtNewName, product } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalNewNameProduct"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh nhanh tên</h4>

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
                  <label for="product_name">Tên mới</label>

                  <textarea
                    className="form-control"
                    value={txtNewName}
                    onChange={this.onChange}
                    name="txtNewName"
                    rows={3}
                  ></textarea>
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
  return {};
};
export default connect(null, mapDispatchToProps)(UpdateNameModal);
