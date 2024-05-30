import { PureComponent } from "react";
import themeData from "../../../ultis/theme_data";
import * as gamificationAction from "../../../actions/gamification";
import * as Types from "../../../constants/ActionType";
import styled from "styled-components";
import { connect } from "react-redux";
import ModalCustom from "../../ModalCustom/ModalCustom";

const ModalDeleteGiftStyles = styled.div`
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

class ModalDeleteGift extends PureComponent {
  handleCloseModalDeleteGiftGame = (showModal) => {
    const { setOpen, setIdGift } = this.props;
    setIdGift(null);
    setOpen(showModal);
  };
  handleDeleteGiftGameSpinWheel = () => {
    const { store_code, idGift, deleteGiftGameSpinWheels, idGame, listGift } =
      this.props;
    if (listGift.length <= 2) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Không thể xóa chương trình có 2 phần thưởng",
        },
      });
      return;
    }
    deleteGiftGameSpinWheels(store_code, idGame, idGift);
  };
  render() {
    const { open } = this.props;
    return (
      <ModalCustom
        title="Thông báo"
        openModal={open}
        setOpenModal={this.handleCloseModalDeleteGiftGame}
        style={{
          height: "170px",
        }}
        styleHeader={{
          color: "#ffffff",
          backgroundColor: themeData().backgroundColor,
        }}
      >
        <ModalDeleteGiftStyles>
          <div className="modal__main">
            <h4>Bạn có muốn xóa phần thưởng này không?</h4>
            <div className="modal__footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={() => this.handleCloseModalDeleteGiftGame(false)}
              >
                Đóng
              </button>
              <button
                type="submit"
                class="btn btn-warning"
                onClick={this.handleDeleteGiftGameSpinWheel}
              >
                Xóa
              </button>
            </div>
          </div>
        </ModalDeleteGiftStyles>
      </ModalCustom>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    deleteGiftGameSpinWheels: (store_code, idGameSpinWheels, idGift) => {
      dispatch(
        gamificationAction.deleteGiftGameSpinWheels(
          store_code,
          idGameSpinWheels,
          idGift
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalDeleteGift);
