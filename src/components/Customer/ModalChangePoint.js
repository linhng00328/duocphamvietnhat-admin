import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as customerAction from "../../actions/customer";
import { formatNumberV2 } from "../../ultis/helpers";
import moment from "moment";

const ModalChangePointStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .formPoint {
    h5 {
      margin-bottom: 20px;
    }
    .item-point {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      &:first-of-type {
        margin-bottom: 15px;
      }
      label {
        margin-bottom: 0;
      }
      input {
        border: 1px solid #e3e6f0;
        padding: 8px 15px;
        border-radius: 4px;
      }
    }
  }
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

class ModalChangePoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPoint: "",
      coin: {
        point: "",
        reason: "",
      },
    };
  }

  handleCloseModalChangePoint = () => {
    this.props.setCustomerSelectedPoint({});
  };
  convertDate = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return newDate;
  };
  handleChangePoint = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { coin } = this.state;
    this.setState({
      coin: {
        ...coin,
        [name]: name === "point" ? formatNumberV2(value) : value,
      },
    });
  };
  handleSubmitChangePoint = (e) => {
    const { coin } = this.state;
    const { changePointForCustomer, store_code, customerSelectedPoint, isSub } =
      this.props;
    e.preventDefault();
    if (coin.point === "" || Number(coin.point) === 0) {
      this.setState({ errorPoint: "Vui lòng nhập số xu!" });
      return;
    }
    const newPoint = {
      ...coin,
      is_sub: isSub,
      point: Number(coin.point.toString().replace(/\./g, "")),
    };
    changePointForCustomer(store_code, customerSelectedPoint.id, newPoint);
  };

  render() {
    const { customerSelectedPoint, isSub } = this.props;
    return (
      <ModalChangePointStyles
        className="modal "
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "600px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                {isSub ? "Trừ xu" : "Cộng xu"}
              </h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModalChangePoint}
              >
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={this.handleSubmitChangePoint}
                className="formPoint"
              >
                <h5>
                  Số xu hiện tại:{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    {formatNumberV2(customerSelectedPoint.points)}{" "}
                  </span>
                </h5>
                <div className="item-point">
                  <label htmlFor="point">Xu</label>
                  <input
                    type="text"
                    id="point"
                    placeholder={`Nhập số xu ${
                      isSub ? "cần trừ..." : "cần cộng..."
                    }`}
                    name="point"
                    value={this.state.coin.point}
                    onChange={this.handleChangePoint}
                  />
                  {this.state.errorPoint !== "" ? (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#e74c3c",
                      }}
                    >
                      {this.state.errorPoint}
                    </div>
                  ) : null}
                </div>
                <div className="item-point">
                  <label htmlFor="reason">Lý do</label>
                  <input
                    type="text"
                    id="reason"
                    placeholder="Lý do..."
                    name="reason"
                    value={this.state.coin.reason}
                    onChange={this.handleChangePoint}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    columnGap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <button type="submit" className="btn btn-outline-primary">
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={this.handleCloseModalChangePoint}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ModalChangePointStyles>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePointForCustomer: (store_code, idCustomer, data) => {
      dispatch(
        customerAction.changePointForCustomer(store_code, idCustomer, data)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalChangePoint);
