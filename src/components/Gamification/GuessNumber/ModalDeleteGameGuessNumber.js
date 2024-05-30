import { PureComponent } from "react";
import themeData from "../../../ultis/theme_data";
import * as gamificationAction from "../../../actions/gamification";
import styled from "styled-components";
import { connect } from "react-redux";
import ModalCustom from "../../ModalCustom/ModalCustom";

const ModalDeleteGameGuessNumberStyles = styled.div`
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

class ModalDeleteGameGuessNumber extends PureComponent {
  handleCloseModalDeleteGameGuessNumber = (showModal) => {
    const { setIdGameGuessNumber, setOpenModalDeleteGameGuessNumber } =
      this.props;
    setOpenModalDeleteGameGuessNumber(showModal);
    setIdGameGuessNumber(null);
  };
  handleDeleteGameGuessNumber = () => {
    const { store_code, idGameGuessNumber, deleteGameGuessNumbers } =
      this.props;
    deleteGameGuessNumbers(store_code, idGameGuessNumber);
  };
  render() {
    const { openModalDeleteGameGuessNumber } = this.props;
    return (
      <ModalCustom
        title="Thông báo"
        openModal={openModalDeleteGameGuessNumber}
        setOpenModal={this.handleCloseModalDeleteGameGuessNumber}
        style={{
          height: "170px",
        }}
        styleHeader={{
          color: "#ffffff",
          backgroundColor: themeData().backgroundColor,
        }}
      >
        <ModalDeleteGameGuessNumberStyles>
          <div className="modal__main">
            <h4>Bạn có muốn xóa game này không?</h4>
            <div className="modal__footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={() =>
                  this.handleCloseModalDeleteGameGuessNumber(false)
                }
              >
                Đóng
              </button>
              <button
                type="submit"
                class="btn btn-warning"
                onClick={this.handleDeleteGameGuessNumber}
              >
                Xóa
              </button>
            </div>
          </div>
        </ModalDeleteGameGuessNumberStyles>
      </ModalCustom>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGameGuessNumbers: (store_code, idGameGuessNumbers) => {
      dispatch(
        gamificationAction.deleteGameGuessNumbers(
          store_code,
          idGameGuessNumbers
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalDeleteGameGuessNumber);
