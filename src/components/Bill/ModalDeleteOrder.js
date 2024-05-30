import { Component } from "react";
import themeData from "../../ultis/theme_data";
import * as billAction from "../../actions/bill";
import styled from "styled-components";
import { connect, shallowEqual } from "react-redux";
import history from "../../history";

const ModalDeleteOrderStyles = styled.div`
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

class ModalDeleteOrder extends Component {
  handleCloseModalDeleteOrder = () => {
    this.props.setShowModalDeleteOrder(false);
    this.props.setOrderSelected(null);
  };
  handleDeleteOrder = (e) => {
    e.preventDefault();
    const { store_code, orderSelected } = this.props;
    this.props.deleteOrder(store_code, orderSelected.order_code);
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { store_code } = this.props;
    if (Object.entries(nextProps.statusDeleteOrder).length > 0) {
      const link = `/order/${store_code}`;
      history.push(link);
    }
    return true;
  }
  render() {
    const { orderSelected } = this.props;
    return (
      <ModalDeleteOrderStyles
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
                onClick={this.handleCloseModalDeleteOrder}
              >
                <span>&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleDeleteOrder}>
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div className="alert-remove"></div>
                Bạn có muốn xóa đơn hàng:{" "}
                <span
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {orderSelected.order_code}
                </span>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.handleCloseModalDeleteOrder}
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
      </ModalDeleteOrderStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    statusDeleteOrder: state.billReducers.bill.statusDeleteOrder,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (store_code, order_code) => {
      dispatch(billAction.deleteOrder(store_code, order_code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteOrder);
