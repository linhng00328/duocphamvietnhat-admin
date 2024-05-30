import { PureComponent } from "react";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";
import * as Types from "../../../constants/ActionType";
import history from "../../../history";
import { getQueryParams } from "../../../ultis/helpers";
import ModalHistoryGuessNumber from "./ModalHistoryGuessNumber";
import moment from "moment";

const TableStyles = styled.tr`
  img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
  }
`;

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameGuessNumberSelected: null,
    };
  }

  setGameGuessNumberSelected = (gameGuessNumberSelected) => {
    this.setState({ gameGuessNumberSelected });
  };
  handleShowModalDeleteGame = (id) => {
    const { setOpenModalDeleteGameGuessNumber, setIdGameGuessNumber } =
      this.props;
    setOpenModalDeleteGameGuessNumber(true);
    setIdGameGuessNumber(id);
  };
  handleUpdateGameGuessNumbers = (e, id) => {
    if (
      e.target.closest(".btn-delete") === null &&
      e.target.closest(".btn-history") === null
    ) {
      const { store_code } = this.props;
      const page = getQueryParams("page") || 1;
      history.push(
        `/game_guess_numbers/${store_code}/update/${id}?page=${page}`
      );
    }
  };

  handleShowInformationWinner = (game) => {
    const isCheckedFinalResultAnnounced = game.final_result_announced
      ? true
      : false;
    const timeEnd = moment(game.time_end).diff(moment());
    const isCheckedTimeEnd = timeEnd > 0 ? false : true;

    return isCheckedFinalResultAnnounced === true && isCheckedTimeEnd === true
      ? true
      : false;
  };

  showData = (listGameGuessNumbers) => {
    if (listGameGuessNumbers?.data?.length > 0) {
      return listGameGuessNumbers.data.map((game, index) => (
        <TableStyles
          className="hover-product"
          key={game.id}
          onClick={(e) => this.handleUpdateGameGuessNumbers(e, game.id)}
        >
          <td>
            {(listGameGuessNumbers.current_page - 1) *
              listGameGuessNumbers.per_page +
              index +
              1}
          </td>
          <td>
            {
              <img
                src={
                  game.images?.length > 0
                    ? game.images[0]
                    : "../images/notfound.png"
                }
                alt="image_game"
              />
            }
          </td>
          <td>{game.name}</td>
          <td>
            {game.apply_for === Types.GROUP_CUSTOMER_ALL
              ? "Tất cả"
              : game.apply_for === Types.GROUP_CUSTOMER_CTV
              ? "Cộng tác viên"
              : game.apply_for === Types.GROUP_CUSTOMER_AGENCY
              ? `Đại lý${
                  game.agency_type_id ? `(${game?.agency_type?.name})` : ""
                }`
              : game.apply_for === Types.GROUP_CUSTOMER_BY_CONDITION
              ? `Nhóm khách hàng${
                  game.group_customer_id
                    ? `(${game?.group_customer?.name})`
                    : ""
                }`
              : ""}
          </td>
          <td>{game.description}</td>
          <td>{getDDMMYYYHis(game.time_start)}</td>
          <td>{getDDMMYYYHis(game.time_end)}</td>
          <td>
            <div className="actions">
              {this.handleShowInformationWinner(game) ? (
                <button
                  className="btn btn-info btn-sm btn-history"
                  style={{ marginLeft: "10px", color: "white" }}
                  onClick={() => this.setGameGuessNumberSelected(game)}
                >
                  <i className="fa fa-history"></i>Lịch sử
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-secondary btn-sm btn-history"
                  style={{ marginLeft: "10px", color: "white", opacity: 0.5 }}
                  onClick={() => this.setGameGuessNumberSelected(game)}
                >
                  <i className="fa fa-history"></i>Lịch sử
                </button>
              )}

              <button
                className="btn btn-warning btn-sm"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={(e) => this.handleUpdateGameGuessNumbers(e, game.id)}
              >
                <i className="fa fa-edit"></i>Sửa
              </button>
              <button
                className="btn btn-danger btn-sm btn-delete"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={() => this.handleShowModalDeleteGame(game.id)}
              >
                <i className="fa fa-trash"></i> Xóa
              </button>
            </div>
          </td>
        </TableStyles>
      ));
    }
    return [];
  };

  render() {
    const { listGameGuessNumbers } = this.props;
    const { gameGuessNumberSelected } = this.state;
    return (
      <div class="table-responsive">
        <table
          className="table table-border "
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Đối tượng</th>
              <th>Miêu tả</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showData(listGameGuessNumbers)}</tbody>
        </table>
        {gameGuessNumberSelected ? (
          <ModalHistoryGuessNumber
            gameGuessNumberSelected={gameGuessNumberSelected}
            setGameGuessNumberSelected={this.setGameGuessNumberSelected}
          ></ModalHistoryGuessNumber>
        ) : null}
      </div>
    );
  }
}

export default Table;
