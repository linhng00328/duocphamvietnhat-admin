import React, { Component } from "react";
import * as productAction from "../../../../actions/product";
import { connect } from "react-redux";
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

    this.setState({
      [name]: value,
    });
  };
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var attribute = [...this.props.attribute];
    attribute.push(this.state.txtName);
    this.props.updateAttributeP(this.props.store_code, {
      list: attribute,
    });
    this.setState({ txtName: "" });
  };
  render() {
    var { txtName } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalCreateA"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm danh mục</h4>

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
                  <label for="product_name">Tên thuộc tính</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập tên danh mục"
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
                <button type="submit" class="btn btn-info">
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

const mapStateToProps = (state) => {
  return {
    attributeP: state.attributePReducers.attribute_product.allAttrbute,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAttributeP: (store_code, attribute) => {
      dispatch(productAction.updateAttributeP(store_code, attribute));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);
