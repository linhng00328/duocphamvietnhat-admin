import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

// import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { shallowEqual } from "../../../../ultis/shallowEqual";

import moment from "moment";
// import ModalDetail from "../../components/RevenueExpenditures/ModalDetail";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.requestRemote, this.props.requestRemote) &&
      nextState.isLoading == false
    ) {
      this.setState({
        isLoading: true,
      });
    }
    return true;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!shallowEqual(this.props.datePrime, nextProps.datePrime)) {
  //     // {from: '2022-04-01', to: '2022-04-01'}

  //   }
  // }
  handleIsEndCallback = (event, store_code, name, id, status) => {
    this.props.handleIsEndCallback({
      name: name,
      id: id,
      status: status,
      store_code: store_code,
    });
    event.preventDefault();
  };

  showData = (listRequestRemote, per_page, current_page) => {
    var { store_code, branch_id, requestRemote } = this.props;

    var result = null;
    if (listRequestRemote.length > 0) {
      result = listRequestRemote?.map((data, index) => {
        return (
          <React.Fragment>
            <tr>
              <td>{per_page * (current_page - 1) + (index + 1)}</td>
              <td>{data.staff?.name ? data.staff.name : ""}</td>

              <td>
                {data.is_checkin ? (
                  <p style={{ color: " rgb(54 185 204)" }}>Checkin</p>
                ) : (
                  <p style={{ color: "rgb(231 74 59)" }}>Checkout</p>
                )}
              </td>
              <td>{moment(data?.time_check).format("DD-MM-YYYY HH:mm:ss")}</td>

              <td>{data?.reason ? data.reason : ""}</td>
              <td>
                {data.status === 1
                  ? "Chờ xử lý"
                  : data.status === 2
                  ? "Đã đồng ý"
                  : "Hủy"}
              </td>
              {data.status === 1 ? (
                <td>
                  <button
                    onClick={(e) =>
                      this.handleIsEndCallback(
                        e,
                        store_code,
                        data.staff.name,
                        data.id,
                        2
                      )
                    }
                    data-toggle="modal"
                    data-target="#isEndModal"
                    class={`btn btn-primary btn-sm mr-2`}
                  >
                    <i class="fa fa-thumbs-up"></i> Đồng ý
                  </button>
                  <button
                    onClick={(e) =>
                      this.handleIsEndCallback(
                        e,
                        store_code,
                        data.staff.name,
                        data.id,
                        3
                      )
                    }
                    data-toggle="modal"
                    data-target="#isEndModal"
                    class={`btn btn-danger btn-sm`}
                  >
                    <i class="fa fa-trash"></i> Hủy
                  </button>
                </td>
              ) : data.status === 2 ? (
                <td>
                  <button type="button" class="btn btn-success btn-sm">
                    <i class="fa fa-thumbs-up"></i> Đã đồng ý
                  </button>
                </td>
              ) : (
                <td>
                  <button type="button" class="btn btn-danger btn-sm">
                    <i class="fa fa-trash"></i> Đã hủy
                  </button>
                </td>
              )}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, branch_id, requestRemote } = this.props;

    // const branch_id = localStorage.getItem("branch_id");
    // var { statusOrder, statusPayment } = this.state;

    var listRequestRemote =
      typeof requestRemote.data == "undefined" ? [] : requestRemote.data;
    // console.log("asdasd" + this.props.statusPayment, statusPayment);
    return (
      <React.Fragment>
        <div class="table-responsive" style={{ minHeight: 370 }}>
          <table
            class="table table-bordered  "
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <tbody>
              <tr>
                <th style={{ fontWeight: "normal" }}>STT</th>
                <th style={{ fontWeight: "normal" }}>Tên nhân viên</th>
                <th style={{ fontWeight: "normal" }}>Vào/Tan ca</th>
                <td>Thời gian check</td>
                <td>Lý do</td>
                <td>Trạng thái</td>
                <td>Hành động</td>
              </tr>

              {this.showData(
                listRequestRemote,
                requestRemote.per_page,
                requestRemote.current_page
              )}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
