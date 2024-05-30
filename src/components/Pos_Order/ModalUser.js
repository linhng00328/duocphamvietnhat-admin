import React, { Component } from "react";
import Validator from "../../ultis/validator";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      errors: {},
    };

    const requiredWith = (value, field, state) => state[field] && value;
    const rules = [
      {
        field: "txtName",
        method: "isEmpty",
        validWhen: false,
        message: "Tên không được để trống.",
      },
      {
        field: "txtPhone",
        method: "isLength",
        args: [{ min: 10 }],
        validWhen: true,
        message: "Số điện thoại không hợp lệ.",
      },
    ];
    this.validator = new Validator(rules);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleAddUser = () => {
    this.props.handleCallbackUser({
      name: this.state.txtName,
      phone_number: this.state.txtPhone,
      email: this.state.txtEmail,
    });
    this.setState({ txtName: "", txtPhone: "", txtEmail: "" });
  };
  handleClear = () => {
    this.setState({ txtName: "", txtPhone: "", txtEmail: "" });
  };
  handleSubmit = (e) => {
    const errors = this.validator.validate(this.state);
    this.setState({
      errors: errors,
    });

    if (Object.keys(errors).length === 0) {
      this.handleAddUser();
      window.$(".modal").modal("hide");
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div class="modal" id="modalUser">
          <div class="modal-dialog">
            <div class="modal-content">
              <form>
                <div
                  className="model-header-modal"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 15px",
                  }}
                >
                  <p class="" style={{ margin: "0px", fontWeight: "bold" }}>
                    Thêm khách hàng
                  </p>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="product_name">Tên</label>
                    <input
                      type="text"
                      class="form-control"
                      name="txtName"
                      placeholder="Nhập tên"
                      value={this.state.txtName}
                      autoComplete="off"
                      onChange={this.onChange}
                    />
                    {errors.txtName && (
                      <div className="validation" style={{ display: "block" }}>
                        {errors.txtName}
                      </div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="product_name">Số điện thoại</label>
                    <input
                      type="text"
                      class="form-control"
                      name="txtPhone"
                      placeholder="Nhập số điện thoại"
                      value={this.state.txtPhone}
                      autoComplete="off"
                      onChange={this.onChange}
                    />
                    {errors.txtPhone && (
                      <div className="validation" style={{ display: "block" }}>
                        {errors.txtPhone}
                      </div>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="product_name">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      name="txtEmail"
                      placeholder="Nhập email"
                      value={this.state.txtEmail}
                      autoComplete="off"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.handleClear}
                  >
                    Thoát
                  </button>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={this.handleSubmit}
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalUser;
