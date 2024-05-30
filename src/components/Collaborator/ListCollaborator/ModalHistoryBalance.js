import { Component } from "react";
import themeData from "../../../ultis/theme_data";
import styled from "styled-components";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import { formatNumberV2 } from "../../../ultis/helpers";
import moment from "moment";
import PaginationHistory from "./PaginationHistory";

const ModalHistoryBalanceStyles = styled.div`
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

class ModalHistoryBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { page } = this.state;
    this.handleHistoriesBalanceCollaborator(page);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { page } = this.state;
    if (page !== nextState.page) {
      this.handleHistoriesBalanceCollaborator(nextState.page);
    }

    return true;
  }

  handleHistoriesBalanceCollaborator = (page) => {
    const { historiesBalanceCollaborator, store_code, collaboratorSelected } =
      this.props;
    const queryString = `page=${page}`;
    historiesBalanceCollaborator(
      store_code,
      collaboratorSelected.id,
      queryString
    );
  };
  handleCloseModalDeleteOrder = () => {
    this.props.setCollaboratorSelected({});
  };
  convertDate = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return newDate;
  };
  setPage = (page) => {
    this.setState({ page });
  };
  render() {
    const { allHistoriesBalance } = this.props;

    const dataHistoriesBalance = allHistoriesBalance.data || [];
    return (
      <ModalHistoryBalanceStyles
        className="modal "
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "850px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                Lịch sử số dư
              </h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModalDeleteOrder}
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
              <table class="table table-border">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Số dư</th>
                    <th>Thay đổi giá</th>
                    <th>Ghi chú</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHistoriesBalance.length > 0 &&
                    dataHistoriesBalance.map((historyBalance, index) => (
                      <tr key={historyBalance.id}>
                        <td>
                          {(allHistoriesBalance.current_page - 1) *
                            allHistoriesBalance.per_page +
                            (index + 1)}
                        </td>
                        <td>
                          {formatNumberV2(historyBalance.current_balance)}
                        </td>
                        <td
                          style={{
                            color:
                              historyBalance.money < 0 ? "#e74c3c" : "#2ecc71",
                          }}
                        >
                          {historyBalance.money < 0
                            ? "-" + formatNumberV2(historyBalance.money)
                            : formatNumberV2(historyBalance.money)}
                        </td>
                        <td>{historyBalance.type_name}</td>
                        <td>{this.convertDate(historyBalance.created_at)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
              }}
            >
              <PaginationHistory
                allHistoriesBalance={this.props.allHistoriesBalance}
                setPage={this.setPage}
              ></PaginationHistory>
              <div
                className="btn btn-outline-danger"
                onClick={this.handleCloseModalDeleteOrder}
              >
                Hủy
              </div>
            </div>
          </div>
        </div>
      </ModalHistoryBalanceStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allHistoriesBalance:
      state.collaboratorReducers.collaborator.allHistoriesBalance,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    historiesBalanceCollaborator: (store_code, idCollaborator, queryString) => {
      dispatch(
        collaboratorAction.historiesBalanceCollaborator(
          store_code,
          idCollaborator,
          queryString
        )
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalHistoryBalance);
