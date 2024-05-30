import React, { Component } from "react";
import * as mobileCheckinAction from "../../../../actions/mobile_checkin";

import { connect } from "react-redux";
import * as helper from "../../../../ultis/helpers";
import * as Types from "../../../../constants/ActionType";
import { compressed } from "../../../../ultis/helpers";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import { isEmpty } from "../../../../ultis/helpers";
import themeData from "../../../../ultis/theme_data";

class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.request_mobile_id, this.props.request_mobile_id)
    ) {
      window.$(".modal").modal("hide");
      const { request_mobile_id, store_code, branch_id } = nextProps;
      this.props.fetchStaffMobileCheckin(
        store_code,
        branch_id,
        request_mobile_id
      );
    }
  }
  showData = (listMobileCheckin) => {
    var result = null;
    if (listMobileCheckin.length > 0) {
      result = listMobileCheckin?.map((data, index) => {
        return (
          <React.Fragment>
            <tr>
              <td>{data.id}</td>
              <td>{this.props.staff_name}</td>
              <td>{data.name}</td>
              <td>{data.status === 0 ? "Chờ duyệt" : "Đã duyệt"}</td>
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
    const { staffMobileCheckin, request_mobile_id, staff_name } = this.props;

    var listMobileCheckin =
      typeof staffMobileCheckin == "undefined" ? [] : staffMobileCheckin;
    return (
      <div
        class="modal fade modalDetail"
        tabindex="-1"
        role="dialog"
        id="modalDetail"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
          <h4 class="modal-title">Danh sách thiết bị của {staff_name}</h4>


              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div class="table-responsive " style={{ minHeight: 300 }}>
                <table
                  class="table table-border "
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <tbody>
                    <tr style={{ textAlign: "center", fontWeight: "normal" }}>
                      <th style={{ textAlign: "center", fontWeight: "normal" }}>
                        Id thiết bị
                      </th>
                      <th style={{ textAlign: "center", fontWeight: "normal" }}>
                        Tên nhân viên
                      </th>
                      <td>Tên thiết bị</td>

                      <td>Trạng thái</td>
                    </tr>

                    {this.showData(listMobileCheckin)}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Đóng
              </button>
              {/* <button type="submit" class="btn btn-info">
                        Tạo
                      </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staffMobileCheckin:
      state.mobileCheckinReducers.mobileCheckin.allStaffMobileCheckin,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    fetchStaffMobileCheckin: (store_code, branch_id, request_mobile_id) => {
      dispatch(
        mobileCheckinAction.fetchStaffMobileCheckin(
          store_code,
          branch_id,
          request_mobile_id
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail);
