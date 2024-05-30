import { PureComponent } from "react";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";
import * as Types from "../../../constants/ActionType";
import history from "../../../history";
import { getQueryParams } from "../../../ultis/helpers";
import ModalHistorySpinWheel from "./ModalHistorySpinWheel";

const backgroundImages = [
  {
    url: "/images/background_spin_wheel.png",
    value: "assets/image_default/background_spin_wheel.png",
  },
  {
    url: "/images/background_doapp.png",
    value: "assets/image_default/background_doapp.png",
  },
  {
    url: "/images/background_image_game.png",
    value: "assets/image_default/background_image_game.png",
  },
  {
    url: "/images/background_game_image2.png",
    value: "assets/image_default/background_game_image2.png",
  },
];

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
      gameSpinWheelSelected: null,
    };
  }

  setGameSpinWheelSelected = (gameSpinWheelSelected) => {
    this.setState({ gameSpinWheelSelected });
  };

  handleShowModalDeleteGroupCustomer = (id) => {
    const { setOpenModalDeleteGameSpinWheel, setIdGameSpinWheel } = this.props;
    setOpenModalDeleteGameSpinWheel(true);
    setIdGameSpinWheel(id);
  };
  handleUpdateGameSpinWheels = (e, id) => {
    if (
      e.target.closest(".btn-delete") === null &&
      e.target.closest(".btn-history") === null
    ) {
      const { store_code } = this.props;
      const page = getQueryParams("page") || 1;
      history.push(`/game_spin_wheels/${store_code}/update/${id}?page=${page}`);
    }
  };
  handleShowImageDefault = (value) => {
    if (value) {
      const newImageDefault = backgroundImages.filter(
        (image) => image.value === value
      );
      console.log("Table ~ newImageDefault:", newImageDefault);
      return newImageDefault[0]?.url;
    }
    return "";
  };

  showData = (listGameSpinWheels) => {
    if (listGameSpinWheels?.data?.length > 0) {
      return listGameSpinWheels.data.map((game, index) => (
        <TableStyles
          className="hover-product"
          key={game.id}
          onClick={(e) => this.handleUpdateGameSpinWheels(e, game.id)}
        >
          <td>
            {(listGameSpinWheels.current_page - 1) *
              listGameSpinWheels.per_page +
              index +
              1}
          </td>
          <td>
            {game.type_background_image == Types.TYPE_IMAGE_DEFAULT ? (
              <img
                src={
                  game?.background_image_url
                    ? this.handleShowImageDefault(game?.background_image_url)
                    : "../images/notfound.png"
                }
                alt="image_game"
              />
            ) : (
              <img
                src={
                  game?.background_image_url
                    ? game?.background_image_url
                    : "../images/notfound.png"
                }
                alt="image_game"
              />
            )}
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
              <button
                className="btn btn-info btn-sm btn-history"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={() => this.setGameSpinWheelSelected(game)}
              >
                <i className="fa fa-history"></i>Lịch sử
              </button>
              <button
                className="btn btn-warning btn-sm"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={(e) => this.handleUpdateGameSpinWheels(e, game.id)}
              >
                <i className="fa fa-edit"></i>Sửa
              </button>
              <button
                className="btn btn-danger btn-sm btn-delete"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={() => this.handleShowModalDeleteGroupCustomer(game.id)}
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
    const { listGameSpinWheels, store_code } = this.props;
    const { gameSpinWheelSelected } = this.state;

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
              <th>Ảnh nền</th>
              <th>Tên</th>
              <th>Đối tượng</th>
              <th>Miêu tả</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showData(listGameSpinWheels)}</tbody>
        </table>
        {gameSpinWheelSelected ? (
          <ModalHistorySpinWheel
            store_code={store_code}
            gameSpinWheelSelected={gameSpinWheelSelected}
            setGameSpinWheelSelected={this.setGameSpinWheelSelected}
          ></ModalHistorySpinWheel>
        ) : null}
      </div>
    );
  }
}

export default Table;
