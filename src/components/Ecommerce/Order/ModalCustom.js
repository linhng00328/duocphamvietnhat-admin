import React, { Component } from "react";
import { connect } from "react-redux";
class ModalCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const {
      title = "",
      content = "",
      actionName = "Lưu",
      onClose = () => {},
      onSubmit = () => {},
      id = "",
      productName = "",
      children,
      error = "",
    } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id={id}
        data-keyboard="false"
        data-backdrop="static"
      >
        <div
          class="modal-dialog"
          role="document"
          style={{
            maxWidth: "550px",
          }}
        >
          <div class="modal-content">
            <div class="modal-header" style={{ backgroundColor: "#fafafa" }}>
              <h4
                class="modal-title"
                style={{
                  color: "#333",
                }}
              >
                {title}
              </h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div class="modal-body">
                <div className="alert alert-info">{content}</div>
                <p
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  <strong>Sản phẩm:</strong> {productName}
                </p>
                {error && <div class="alert alert-danger">{error}</div>}
                {children}
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-success">
                  {actionName}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={onClose}
                >
                  Đóng
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
  };
};
export default connect(null, mapDispatchToProps)(ModalCustom);
