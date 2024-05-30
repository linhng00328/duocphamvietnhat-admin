import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";
import * as Env from "../../../ultis/default";

const ModalHistoryGuessNumberStyles = styled.div`
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

class ModalHistoryGuessNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCloseModalDelete = () => {
    this.props.setGameGuessNumberSelected(null);
  };
  convertDate = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return newDate;
  };
  setPage = (page) => {
    this.setState({ page });
  };
  render() {
    const { gameGuessNumberSelected } = this.props;

    return (
      <ModalHistoryGuessNumberStyles
        className="modal"
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "870px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                Lịch sử trúng thưởng
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
              {gameGuessNumberSelected?.final_result_announced?.customer_win
                ?.length > 0 ? (
                <div className="form-group">
                  <label for="txtDescription">
                    Thông tin người trúng tuyển
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <img
                        src={
                          gameGuessNumberSelected?.final_result_announced
                            ?.customer_win[0].avatar_image ?? Env.IMG_NOT_FOUND
                        }
                        alt={
                          gameGuessNumberSelected?.final_result_announced
                            ?.customer_win[0].name
                        }
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div>
                      <h5
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        Tên người trúng giải:{" "}
                        {
                          gameGuessNumberSelected?.final_result_announced
                            ?.customer_win[0].name
                        }
                      </h5>
                      <p
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Số điện thoại:{" "}
                        {
                          gameGuessNumberSelected?.final_result_announced
                            ?.customer_win[0].phone_number
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="form-group">
                <label for="txtDescription">
                  Danh sách người dự đoán kết quả đúng
                </label>
                <table class="table table-border">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên</th>
                      <th>Số điện thoại</th>
                      <th>Thời gian dự đoán</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameGuessNumberSelected?.final_result_announced
                      ?.customer_win?.length > 0 &&
                      gameGuessNumberSelected?.final_result_announced?.customer_win.map(
                        (customer_win, index) => (
                          <tr
                            key={customer_win.id}
                            style={{
                              background:
                                index === 0 ? "#ff00004a" : "transparent",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{customer_win.name}</td>
                            <td>{customer_win.phone_number}</td>
                            <td>{customer_win.created_at}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ModalHistoryGuessNumberStyles>
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
)(ModalHistoryGuessNumber);
