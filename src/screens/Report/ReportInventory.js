import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../components/Partials/Alert";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import ShowLoading from "../../components/Partials/ShowLoading";

import * as Types from "../../constants/ActionType";
import * as reportAction from "../../actions/report";
import * as Env from "../../ultis/default";
import { format } from "../../ultis/helpers";
import { MomentInput } from "react-moment-input";
import moment from "moment";
import General from "./General";
import Pagination from "./Pagination";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import { formatNoD } from "../../ultis/helpers";
import ShowData from "./ShowData";
import NotAccess from "../../components/Partials/NotAccess";

class ReportInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStart: "",
    };
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    const params = `branch_id=${branch_id}`;
    this.props.fetchAllReportInventory(
      store_code,
      branchIds,
      1,
      branch_ids ? "" : params
    );
    this.props.fetchImportExportStock(
      store_code,
      branchIds,
      1,
      branch_ids ? "" : params
    );

    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Chọn ngày";
    } catch (error) {}
  }
  handeOnload = (store_code) => {
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    const params = `branch_id=${branch_id}`;
    this.props.fetchAllReportInventory(
      store_code,
      branchIds,
      1,
      branch_ids ? "" : params
    );
    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Chọn ngày";
    } catch (error) {}
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.report_inventory;
      this.setState({ isLoading: true, isShow });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.txtStart !== nextState.txtStart) {
      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branchIds = branch_ids ? branch_ids : branch_id;

      const params = `date=${nextState.txtStart}${
        branch_ids ? "" : `&branch_id=${branch_id}`
      }`;
      const { store_code } = this.props.match.params;
      this.props.fetchAllReportInventory(store_code, branchIds, 1, params);
    }
    return true;
  }

  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    console.log("time", time);
    this.setState({
      txtStart: time,
    });
  };
  showDistribute = (listDistribute) => {
    var result = [];
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
      return result;
    }
    if (listDistribute[0].element_distributes) {
      listDistribute[0].element_distributes.map((element, _index) => {
        result.push(
          <tr class="explode" style={{ backgroundColor: "#f8f9fc" }}>
            <td colSpan={5}>
              <div className="show-distribute">
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-3" style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Phân loại: </label>
                    <div
                      className="name-distribute"
                      style={{ marginLeft: "20px" }}
                    >
                      {element.name}
                    </div>
                  </div>
                  <div className="col-3" style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Giá vốn: </label>
                    <div
                      className="price-distribute"
                      style={{ marginLeft: "20px" }}
                    >
                      {format(Number(element.cost_of_capital))}
                    </div>
                  </div>
                  <div className="col-3" style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Tồn kho: </label>
                    <div
                      className="quantity-distribute"
                      style={{ marginLeft: "20px" }}
                    >
                      {element.stock}
                    </div>
                  </div>
                  <div className="col-3" style={{ display: "flex" }}>
                    <label style={{ fontWeight: "bold" }}>Giá Nhập: </label>
                    <div
                      className="quantity-distribute"
                      style={{ marginLeft: "20px" }}
                    >
                      {format(Number(element.import_price))}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  showData = (products, per_page, current_page) => {
    var result = null;
    var { store_code } = this.props;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var status_name = data.status == 0 ? "Hiển thị" : "Đã ẩn";
        var status_stock =
          data.quantity_in_stock_with_distribute == 0
            ? -2
            : data.quantity_in_stock_with_distribute == -1
            ? -1
            : data.quantity_in_stock_with_distribute;

        if (status_stock == null) {
          status_stock = -1;
        }

        var status =
          data.status == 0
            ? "success"
            : data.status == -1
            ? "secondary"
            : data.status == 2
            ? "danger"
            : null;
        var discount =
          typeof data.product_discount == "undefined" ||
          data.product_discount == null
            ? 0
            : data.product_discount.discount_price;

        var product_discount = data.product_discount;

        return (
          <ShowData
            per_page={per_page}
            current_page={current_page}
            product_discount={product_discount}
            status={status}
            status_name={status_name}
            status_stock={status_stock}
            data={data}
            index={index}
            store_code={store_code}
            discount={discount}
          />
        );
      });
    } else {
      return result;
    }
    return result;
  };

  // showData = (listReportInven) => {
  //   var result = null
  //   if (listReportInven) {
  //     result = listReportInven.map((item, index) => {
  //       return (
  //         <>
  //           <tr className='show-data'>
  //             <td>{index + 1}</td>
  //             <td><img src={item.images.length > 0 ? item.images[0].image_url : Env.IMG_NOT_FOUND} alt='' width="65px" height="65px"></img></td>
  //             <td>{item.name}</td>
  //             <td>{item.main_stock.stock}</td>
  //             <td>{item.main_stock.cost_of_capital}</td>
  //             <td>{item.main_stock.import_price}</td>
  //           </tr>
  //           {this.showDistribute(item.distribute_stock)}
  //         </>
  //       )
  //     })
  //   } else {
  //     return result
  //   }
  //   return result
  // }

  render() {
    var { store_code } = this.props.match.params;
    const { reportInventory, reportImportExport } = this.props;
    const { total_stock, total_value_stock } = reportInventory;
    var { isShow } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} handeOnload={this.handeOnload} />

              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <General
                    reportImportExport={reportImportExport}
                    reportInventory={reportInventory}
                    store_code={store_code}
                  />
                  <div className="card">
                    <div
                      className="card-header py-3"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="stock-title text-primary">
                        <h4>Báo cáo tồn kho</h4>
                      </div>

                      <div className="label-value">
                        <p className="sale_user_label bold">
                          Giá trị tồn kho:{" "}
                          <span id="total_selected">
                            {formatNoD(total_value_stock?.toFixed(2))}
                          </span>
                        </p>
                        <p className="sale_user_label bold">
                          Số lượng tồn kho:{" "}
                          <span id="total_selected">
                            {formatNoD(total_stock)}
                          </span>
                        </p>
                      </div>

                      <div
                        class="form-group"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "100px",
                        }}
                      >
                        <label
                          for="product_name"
                          style={{ marginRight: "20px" }}
                        >
                          Thời gian
                        </label>
                        <MomentInput
                          placeholder="Chọn thời gian"
                          format="DD-MM-YYYY"
                          options={true}
                          enableInputClick={true}
                          monthSelect={true}
                          readOnly={true}
                          translations={{
                            DATE: "Ngày",
                            TIME: "Giờ",
                            SAVE: "Đóng",
                            HOURS: "Giờ",
                            MINUTES: "Phút",
                          }}
                          onSave={() => {}}
                          onChange={this.onChangeStart}
                        />
                      </div>
                    </div>
                    <div className="card-body">
                      <div class="table-responsive">
                        <table
                          class="table  "
                          id="dataTable"
                          width="100%"
                          cellspacing="0"
                        >
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Hình ảnh</th>
                              <th>Tên sản phẩm</th>
                              <th>Giá vốn</th>

                              <th>Số lượng tồn kho</th>
                              <th>Giá trị tồn</th>
                            </tr>
                          </thead>

                          <tbody>
                            {typeof reportInventory.data != "undefined" ? (
                              this.showData(
                                reportInventory.data,
                                reportInventory.per_page,
                                reportInventory.current_page
                              )
                            ) : (
                              <ShowLoading></ShowLoading>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <Pagination
                        store_code={store_code}
                        reportInventory={reportInventory}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportInventory: state.reportReducers.reportInventory,
    reportImportExport: state.reportReducers.reportImportExport,
    currentBranch: state.branchReducers.branch.currentBranch,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllReportInventory: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchAllReportInventory(
          store_code,
          branch_id,
          page,
          params
        )
      );
    },
    fetchImportExportStock: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchImportExportStock(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportInventory);
