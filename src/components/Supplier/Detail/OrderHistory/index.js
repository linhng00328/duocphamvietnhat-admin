import React, { Component } from "react";
import { formatNoD } from "../../../../ultis/helpers";

import * as themeAction from "../../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as billAction from "../../../../actions/bill";
import { getBranchId } from "../../../../ultis/branchUtils";
import * as Env from "../../../../ultis/default";
import { Link } from "react-router-dom";
import * as ImportAction from "../../../../actions/import_stock";
import Pagination from "./Pagination";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var { supplierID, store_code } = this.props;
    this.props.fetchAllImportStock(
      store_code,
      getBranchId(),
      1,
      `&supplier_id=${supplierID.id}`
    );
  }
  handleFetchAllListImportStock = (page) => {
    var { supplierID, store_code } = this.props;
    this.props.fetchAllImportStock(
      store_code,
      getBranchId(),
      page,
      `&supplier_id=${supplierID.id}`
    );
  };

  showBills = (listImport) => {
    var result = null;
    var { store_code, listImportStock: dataListImportStock } = this.props;
    if (typeof listImport == "undefined") {
      return result;
    }
    if (listImport.length > 0) {
      result = listImport.map((importStock, index) => {
        var status = importStock.status;
        var status_name =
          status == 0
            ? "Đã đặt hàng"
            : status == 1
            ? "Đã duyệt"
            : status == 2
            ? "Nhập kho"
            : status == 3
            ? "Hoàn thành"
            : status == 4
            ? "Đã hủy"
            : status == 6
            ? "Trả hàng"
            : null;
        return (
          <tr style={{ cursor: "pointer" }}>
            <td>{(dataListImportStock.current_page - 1) * 20 + index + 1}</td>
            <td>
              <Link
                to={`/import_stocks/detail/${store_code}/${importStock.id}`}
              >
                {importStock.code}
              </Link>
            </td>

            <td>{formatNoD(importStock.total_final)}</td>
            <td>{status_name}</td>

            <td>{importStock.updated_at}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, listImportStock } = this.props;
    var listImport = listImportStock.data;
    console.log(listImport);
    return (
      <div className="support">
        <form role="form">
          <div class="box-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>

            <div className="form-group">
              <label htmlFor="name">Danh sách</label>

              <div class="table-responsive">
                <table class="table table-hover table-border">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã đơn</th>
                      <th>Số tiền</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>{this.showBills(listImport)}</tbody>
                </table>
              </div>

              <Pagination
                listImportStock={listImportStock}
                handleFetchAllListImportStock={
                  this.handleFetchAllListImportStock
                }
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listImportStock: state.importStockReducers.import_reducer.listImportStock,
    bills: state.billReducers.bill.allBill,
    supplierID: state.storeReducers.store.supplierID,

    theme: state.themeReducers.theme,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
    fetchTheme: (store_code) => {
      dispatch(themeAction.fetchTheme(store_code));
    },
    fetchAllImportStock: (store_code, branch_id, page, params) => {
      dispatch(
        ImportAction.fetchAllImportStock(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
