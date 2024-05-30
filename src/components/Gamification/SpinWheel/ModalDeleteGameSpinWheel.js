import { PureComponent } from "react";
import themeData from "../../../ultis/theme_data";
import * as gamificationAction from "../../../actions/gamification";
import styled from "styled-components";
import { connect } from "react-redux";
import ModalCustom from "../../ModalCustom/ModalCustom";

const ModalDeleteGameSpinWheelStyles = styled.div`
  height: 100%;
  .modal__main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4 {
      font-size: 16px;
      color: black;
      padding: 1rem 10px;
      border-bottom: 1px solid #e3e6f0;
    }
    .modal__footer {
      display: flex;
      justify-content: flex-end;
      column-gap: 10px;
      padding-right: 10px;
      margin-bottom: 1rem;
    }
  }
`;

class ModalDeleteGameSpinWheel extends PureComponent {
  handleCloseModalDeleteGameSpinWheel = (showModal) => {
    const { setIdGameSpinWheel, setOpenModalDeleteGameSpinWheel } = this.props;
    setOpenModalDeleteGameSpinWheel(showModal);
    setIdGameSpinWheel(null);
  };
  handleDeleteGameSpinWheel = () => {
    const { store_code, idGameSpinWheel, deleteGameSpinWheels } = this.props;
    deleteGameSpinWheels(store_code, idGameSpinWheel);
  };
  render() {
    const { openModalDeleteGameSpinWheel } = this.props;
    return (
      <ModalCustom
        title="Thông báo"
        openModal={openModalDeleteGameSpinWheel}
        setOpenModal={this.handleCloseModalDeleteGameSpinWheel}
        style={{
          height: "170px",
        }}
        styleHeader={{
          color: "#ffffff",
          backgroundColor: themeData().backgroundColor,
        }}
      >
        <ModalDeleteGameSpinWheelStyles>
          <div className="modal__main">
            <h4>Bạn có muốn xóa game này không?</h4>
            <div className="modal__footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={() => this.handleCloseModalDeleteGameSpinWheel(false)}
              >
                Đóng
              </button>
              <button
                type="submit"
                class="btn btn-warning"
                onClick={this.handleDeleteGameSpinWheel}
              >
                Xóa
              </button>
            </div>
          </div>
        </ModalDeleteGameSpinWheelStyles>
      </ModalCustom>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGameSpinWheels: (store_code, idGameSpinWheels) => {
      dispatch(
        gamificationAction.deleteGameSpinWheels(store_code, idGameSpinWheels)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalDeleteGameSpinWheel);
