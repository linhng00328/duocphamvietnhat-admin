import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

// import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { shallowEqual } from "../../../../ultis/shallowEqual";

import moment from "moment";
// import ModalDetail from "../../components/RevenueExpenditures/ModalDetail";
import ModalDetail from "./ModalDetail";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      idModalShow: null,
      staffName: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.requestMobile, this.props.requestMobile) &&
      nextState.isLoading == false
    ) {
      this.setState({
        isLoading: true,
      });
    }
    return true;
  }
  handleIsEndCallback = (event, store_code, name, id , status) => {
    window.$(".modalDetail").modal("hide");
    window.$("#modalDetail").removeClass("in");
    window.$(".modal-backdrop").remove();
    window.$("#modalDetail").hide();
    this.props.handleIsEndCallback({
      name: name,
      id: id,
      store_code: store_code,
      status : status,
    });
    event.preventDefault();
  };
  showData = (listRequestMobile) => {
    var { store_code, branch_id, requestMobile } = this.props;

    var result = null;
    if (listRequestMobile.length > 0) {
      result = listRequestMobile?.map((data, index) => {
        return (
          <React.Fragment>
            <tr>
              <td>{data.device_id}</td>
              <td
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#modalDetail"
                onClick={() =>
                  this.setState({
                    idModalShow: data.staff_id,
                    staffName: data.staff?.name,
                  })
                }
              >
                {data.staff?.name ? data.staff.name : ""}
              </td>
              <td>{data.name}</td>
              <td>{data.status === 0 ? "Chờ duyệt" : "Đã duyệt"}</td>
              {data.status === 0 ? (
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      window.$(".modalDetail").modal("hide");
                      window.$("#modalDetail").removeClass("in");
                      window.$(".modal-backdrop").remove();
                      window.$("#modalDetail").hide();
                      this.handleIsEndCallback(
                        e,
                        store_code,
                        data.name,
                        data.id, 1
                      );
                    }}
                    data-toggle="modal"
                    data-target="#isEndModal"
                    class={`btn btn-primary btn-sm`}
                  >
                    <i class="fa fa-check"></i> Phê duyệt
                  </button>
                  <button
                  style = {{marginLeft : "15px"}}
                    type="button"
                    onClick={(e) => {
                      window.$(".modalDetail").modal("hide");
                      window.$("#modalDetail").removeClass("in");
                      window.$(".modal-backdrop").remove();
                      window.$("#modalDetail").hide();
                      this.handleIsEndCallback(
                        e,
                        store_code,
                        data.name,
                        data.id , 2
                      );
                    }}
                    data-toggle="modal"
                    data-target="#isEndModal"
                    class={`btn btn-danger btn-sm`}
                  >
                    <i class="fa fa-times"></i> Hủy
                  </button>
                </td>
              ) : (
                <td>
                  <button type="button" class="btn btn-success btn-sm">
                    <i class="fa fa-clock-o"></i> Đã phê duyệt
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
    var { store_code, branch_id, requestMobile } = this.props;

    // const branch_id = localStorage.getItem("branch_id");
    // var { statusOrder, statusPayment } = this.state;

    var listRequestMobile =
      typeof requestMobile == "undefined" ? [] : requestMobile;
    // console.log("asdasd" + this.props.statusPayment, statusPayment);
    return (
      <React.Fragment>
        <div class="table-responsive " style={{ minHeight: 300 }}>
          <table
            class="table table-border "
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <tbody>
              <tr style={{ fontWeight: "normal" }}>
                <th style={{ fontWeight: "normal" }}>Id thiết bị</th>
                <th style={{ fontWeight: "normal" }}>Tên nhân viên</th>
                <td>Tên điện thoại</td>

                <td>Trạng thái</td>
                <td>Hành động</td>
              </tr>

              {this.showData(listRequestMobile)}
            </tbody>
          </table>
          <ModalDetail
            store_code={store_code}
            branch_id={branch_id}
            request_mobile_id={this.state.idModalShow}
            staff_name={this.state.staffName}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
