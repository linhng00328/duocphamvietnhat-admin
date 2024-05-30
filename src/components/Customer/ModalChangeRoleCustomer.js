import { PureComponent } from "react";
import themeData from "../../ultis/theme_data";
import * as customerAction from "../../actions/customer";
import styled from "styled-components";
import { connect } from "react-redux";

const ModalChangeRoleCustomerStyles = styled.div`
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

class ModalChangeRoleCustomer extends PureComponent {
  handleCloseModalChangeRoleCustomer = () => {
    this.props.setOpenShowModalChangeRole(false);
    this.props.setCustomerSelected(null);
    this.props.setTypeSaleCustomer(null);
    this.props.setTypeAgency(null);
    this.props.setShowListAgencies(false);
  };
  handleChangeRoleCustomer = (e) => {
    e.preventDefault();
    const { store_code, customerSelected, typeSaleCustomer, typeAgency } =
      this.props;
    if (typeAgency !== null) {
      this.props.changeTypeRoleCustomer(store_code, customerSelected.id, {
        sale_type: typeSaleCustomer,
        agency_type_id: typeAgency,
      });
      return;
    }
    this.props.changeTypeRoleCustomer(store_code, customerSelected.id, {
      sale_type: typeSaleCustomer,
    });
  };
  render() {
    return (
      <ModalChangeRoleCustomerStyles
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
                onClick={this.handleCloseModalChangeRoleCustomer}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleChangeRoleCustomer}>
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div className="alert-remove"></div>
                Bạn có muốn thay đổi vai trò của{" "}
                {this.props.customerSelected.is_collaborator === true
                  ? "Cộng tác viên"
                  : this.props.customerSelected.is_agency === true
                  ? "Đại lý"
                  : "Khách hàng"}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.handleCloseModalChangeRoleCustomer}
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalChangeRoleCustomerStyles>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTypeRoleCustomer: (store_code, idGroupCustomer, data) => {
      dispatch(
        customerAction.changeTypeRoleCustomer(store_code, idGroupCustomer, data)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalChangeRoleCustomer);
