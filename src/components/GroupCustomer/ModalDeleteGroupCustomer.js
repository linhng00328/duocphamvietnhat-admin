import { PureComponent } from "react";
import themeData from "../../ultis/theme_data";
import * as groupCustomerAction from "../../actions/group_customer";
import styled from "styled-components";
import { connect } from "react-redux";

const ModalDeleteGroupCustomerStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .modal-dialog {
    animation: popup 1s ease-in-out 1;
  }
  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    50% {
      opacity: 1;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

class ModalDeleteGroupCustomer extends PureComponent {
  handleCloseModalDeleteGroupCustomer = () => {
    this.props.setOpenModalDeleteGroupCustomer();
    this.props.setIdGroupCustomer(null);
  };
  handleDeleteGroupCustomer = (e) => {
    e.preventDefault();
    const { store_code, idGroupCustomer } = this.props;
    this.props.deleteGroupCustomer(
      store_code,
      idGroupCustomer,
      `page=${this.props.page}`
    );
    this.props.setOpenModalDeleteGroupCustomer();
    this.props.setIdGroupCustomer(null);
  };
  render() {
    return (
      <ModalDeleteGroupCustomerStyles
        className="modal "
        style={{
          display: "block",
        }}
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thông báo</h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModalDeleteGroupCustomer}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleDeleteGroupCustomer}>
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div className="alert-remove"></div>
                Bạn có muốn xóa nhóm khách hàng này
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.handleCloseModalDeleteGroupCustomer}
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalDeleteGroupCustomerStyles>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGroupCustomer: (store_code, idGroupCustomer, params) => {
      dispatch(
        groupCustomerAction.deleteGroupCustomer(
          store_code,
          idGroupCustomer,
          params
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalDeleteGroupCustomer);
