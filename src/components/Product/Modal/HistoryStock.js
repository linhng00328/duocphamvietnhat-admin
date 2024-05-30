import moment from "moment";
import React, { Component } from "react";
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
            <td> {index + 1}</td>
            <td>{data.stock}</td>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px", width: "50%" }}>
                  {data.change}
                </div>
                {data.change > 0 ? (
                  <i class="fas fa-arrow-circle-up"></i>
                ) : (
                  <i class="fas fa-arrow-circle-down"></i>
                )}
              </div>
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
    const { historyInventory } = this.props;
    return (
      <div class="modal" id="historyStock">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <button
              type="button"
              style={{
                textAlign: "end",
                marginRight: "10px",
                fontSize: "28px",
              }}
              class="close"
              data-dismiss="modal"
            >
              &times;
            </button>
            <div
              class="title"
              style={{ padding: "0 1rem", fontWeight: "bold" }}
            >
              <div className="title-history">Lịch sử kho</div>
            </div>
            <div class="modal-body">
              <table
                class="table table-border "
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>STT</th>

                    <th>Số lượng kho</th>

                    <th>Thay đổi</th>

                    <th>Loại thay đổi</th>

                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>{this.showData(historyInventory.data)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryStock;
