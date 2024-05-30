import moment from "moment";
import React, { Component } from "react";
import { filter_arr, formatNoD, format } from "../../ultis/helpers";
import Pagination from "./PaginationHistory";

class HistoryStock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showData = (listHistory) => {
    var result = null;
    if (typeof listHistory === "undefined") {
      return result;
    }
    if (listHistory.length > 0) {
      result = listHistory.map((data, index) => {
        const date = moment(data.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "YYYY-MM-DD"
        );
        return (
          <tr>
            <td>
              {(this.props.historyInventory.current_page - 1) * 20 + index + 1}
            </td>
            <td> {data.branch?.name}</td>
            <td>{formatNoD(data.stock)}</td>
            <td>{format(Number(data.cost_of_capital))}</td>

            <td>
              {data.change !== 0 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {data.change > 0 ? (
                    <i
                      class="fas fa-arrow-circle-up"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i
                      class="fas fa-arrow-circle-down"
                      style={{ color: "red" }}
                    ></i>
                  )}
                  <div style={{ marginLeft: "10px" }}>{data.change}</div>
                </div>
              )}
            </td>
            <td>{data.type_name}</td>
            <td>{date}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  render() {
    const { historyInventory, formData, store_code } = this.props;
    return (
      <div class="modal" id="historyStock">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <button
              type="button"
              style={{ textAlign: "end", margin: "10px" }}
              class="close"
              data-dismiss="modal"
            >
              &times;
            </button>
            <div
              class="title"
              style={{ padding: "0 1rem", fontWeight: "bold" }}
            >
              <div className="title-history"> Lịch sử kho</div>
            </div>
            <div
              class="modal-body"
              style={{
                height: "calc(80vh - 45px)",
              }}
            >
              <table
                class="table table-border "
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Chi nhánh</th>
                    <th>Số lượng kho</th>
                    <th>Giá vốn</th>

                    <th>Thay đổi</th>

                    <th>Loại thay đổi</th>

                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>{this.showData(historyInventory.data)}</tbody>
              </table>
            </div>
            <div
              class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Pagination
                style="float-fix"
                store_code={store_code}
                formData={formData}
                historyInventory={historyInventory}
              />
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    border: "1px solid",
                    marginRight: "10px",
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryStock;
