import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";
import * as Types from "../../../constants/ActionType";
import { Link } from "react-router-dom";

const ModalHistorySpinWheelStyles = styled.div`
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

class ModalHistorySpinWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCloseModalDelete = () => {
    this.props.setGameSpinWheelSelected(null);
  };
  convertDate = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return newDate;
  };
  setPage = (page) => {
    this.setState({ page });
  };
  render() {
    const { gameSpinWheelSelected, store_code } = this.props;
    console.log("🚀 ~ gameSpinWheelSelected:", gameSpinWheelSelected);

    return (
      <ModalHistorySpinWheelStyles
        className="modal"
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "1000px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                Lịch sử quay thưởng
              </h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModalDelete}
              >
                <span>&times;</span>
              </button>
            </div>
            <div
              class="modal-body-content"
              style={{
                height: "75vh",
                overflow: "auto",
                padding: "1rem",
              }}
            >
              <div className="form-group">
                <table class="table table-border">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên KH quay thưởng</th>
                      <th>Số điện thoại</th>
                      <th>Tên phần thưởng</th>
                      <th>Loại thưởng</th>
                      <th>Quà thưởng</th>
                      <th>Thời gian quay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameSpinWheelSelected?.final_result_announced?.length >
                      0 &&
                      gameSpinWheelSelected?.final_result_announced.map(
                        (result, index) => (
                          <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.customer_name}</td>
                            <td>{result.customer_phone_number}</td>
                            <td>{result.name_gift}</td>
                            <td>
                              {result.type_gift === Types.GIFT_IS_COIN
                                ? "Tặng xu"
                                : result.type_gift === Types.GIFT_IS_ITEM
                                ? "Tặng sản phẩm"
                                : result.type_gift === Types.GIFT_IS_LUCKY_AFTER
                                ? "Chúc bạn may mắn"
                                : result.type_gift === Types.GIFT_IS_LOST_TURN
                                ? "Mất lượt"
                                : result.type_gift === Types.GIFT_IS_TEXT
                                ? "Tùy chọn"
                                : null}
                            </td>
                            <td>
                              {result.type_gift === Types.GIFT_IS_COIN ? (
                                result.amount_coin_change
                              ) : result.type_gift === Types.GIFT_IS_ITEM ? (
                                <Link
                                  to={`/product/edit/${store_code}/${result.value_gift}`}
                                >
                                  {result?.product?.name}
                                </Link>
                              ) : result.type_gift ===
                                Types.GIFT_IS_LUCKY_AFTER ? (
                                "Chúc bạn may mắn"
                              ) : result.type_gift ===
                                Types.GIFT_IS_LOST_TURN ? (
                                "Mất lượt"
                              ) : result.type_gift === Types.GIFT_IS_TEXT ? (
                                result.text
                              ) : null}
                            </td>
                            <td>{result.created_at}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ModalHistorySpinWheelStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalHistorySpinWheel);
