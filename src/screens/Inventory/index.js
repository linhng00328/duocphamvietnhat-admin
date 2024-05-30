import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../components/Partials/Alert";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as Types from "../../constants/ActionType";
import * as inventoryAction from "../../actions/inventory";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import Pagination from "../../components/Inventory/Pagination";
import moment from "moment";
import history from "../../history";
import NotAccess from "../../components/Partials/NotAccess";
import { getQueryParams } from "../../ultis/helpers";
import * as productAction from "../../actions/product";
import ListProduct from "./ListProduct";
import { confirmAlert } from "react-confirm-alert";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      status: getQueryParams("status") || "",
      fields: [
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Tên phân loại chính",
        "DS phân loại",
        "Tồn kho thực tế",
      ],
    };
    this.fileInputRef = React.createRef();
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const { page, searchValue, status } = this.state;

    const params = `&search=${searchValue}&status=${status}`;

    this.props.fetchAllInventory(store_code, branch_id, page, params);
    this.props.fetchAllProductV2(store_code, branch_id, 1, "");
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  setPage = (page) => {
    this.setState({ page });
  };
  searchData = (e) => {
    e.preventDefault();
    const { store_code } = this.props.match.params;
    const { status, searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    this.setState({
      page: 1,
    });
    history.push(
      `/inventory/index/${store_code}?page=1&search=${searchValue}&status=${status}`
    );
    const params = `&search=${searchValue}&status=${status}`;
    this.props.fetchAllInventory(store_code, branch_id, 1, params);
  };
  changePage = (store_code, order_code) => {
    const { page, searchValue, status } = this.state;
    history.push(
      `/inventory/detail/${store_code}/${order_code}?page=${page}&search=${searchValue}&status=${status}`
    );
  };
  onChangeStatus = (e) => {
    e.preventDefault();
    const { store_code } = this.props.match.params;
    const status = e.target.value;
    const { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");

    this.setState({ status: status });

    history.push(
      `/inventory/index/${store_code}?page=1&search=${searchValue}&status=${status}`
    );
    const params = `&search=${searchValue}&status=${status}`;
    this.props.fetchAllInventory(store_code, branch_id, 1, params);
  };

  componentWillReceiveProps(nextProps, nextState) {
    // if (this.state.paramDate != this.getParamDate() && this.state.paramDate.from != null) {
    //   this.setState({
    //     paramDate: this.getParamDate()
    //   })

    //   var { store_code } = this.props.match.params;
    //   const branch_id = getBranchId()
    //   var params_agency =
    //   this.state.agency_by_customer_id != null
    //     ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
    //     : null;
    //   this.props.fetchAllBill(store_code, 1, branch_id, this.getParamDate(), params_agency);
    // }

    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.inventory_tally_sheet != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.inventory_tally_sheet;

      this.setState({ isLoading: true, isShow });
    }
  }
  showData = (listInventory, store_code) => {
    const { sheetsInventory } = this.props;
    var result = null;
    if (listInventory) {
      result = listInventory.map((item, index) => {
        var time = moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "DD-MM-YYYY"
        );
        return (
          <tr
            className="hover-product"
            onClick={() => this.changePage(store_code, item.id)}
          >
            <td>{(sheetsInventory.current_page - 1) * 20 + index + 1}</td>
            <td>{item.code}</td>
            <td>{time}</td>
            <td>{item.reality_exist}</td>
            <td>{item.existing_branch}</td>
            <td>{item.deviant}</td>
            <td>
              {item.status === 0 ? (
                <div style={{ color: "green" }}>đã kiểm kho</div>
              ) : (
                <div style={{ color: "#ff6a00" }}>đã cân bằng</div>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  exportProducts = () => {
    const { store_code } = this.props.match.params;
    const { exportSheetInventory } = this.props;
    const branch_id = localStorage.getItem("branch_id");

    exportSheetInventory(store_code, branch_id, "");
  };

  onChangeExcel = (evt) => {
    const { showError, createInventorys } = this.props;
    const { store_code } = this.props.match.params;
    const { fields } = this.state;
    const branch_id = localStorage.getItem("branch_id");

    var f = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 2 });
      const xlsxFields = data[0];
      //Check Valid XLSX Field
      let isCheckedValidField = true;
      const lengthXlsxFields = Object.keys(xlsxFields).length;
      if (fields.length > lengthXlsxFields.length) isCheckedValidField = false;
      else {
        const arraysXlsxFields = Object.keys(xlsxFields);
        fields.forEach((element) => {
          if (!arraysXlsxFields.includes(element)) {
            isCheckedValidField = false;
            return;
          }
        });
      }
      if (!isCheckedValidField) {
        showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content:
              "Trường 'Mã sản phẩm', 'Tên sản phẩm', 'Tên phân loại chính', 'DS phân loại' và 'Tồn kho thực tế' không hợp lệ!",
          },
        });
        return;
      }

      //Filter Data
      const newListCustomers = [];
      for (var item of data) {
        const newCustomer = {};
        newCustomer["product_id"] = item["Mã sản phẩm"];
        newCustomer["name"] = item["Tên sản phẩm"];
        newCustomer["reality_exist"] = item["Tồn kho thực tế"]
          ? Number(item["Tồn kho thực tế"])
          : 0;
        newCustomer["distribute_name"] = item["Tên phân loại chính"]
          ? item["Tên phân loại chính"]
          : null;

        const classify = item["DS phân loại"]
          ? item["DS phân loại"].split(",")
          : null;

        newCustomer["element_distribute_name"] = classify ? classify[0] : null;
        newCustomer["sub_element_distribute_name"] = classify
          ? classify[1]
          : null;

        newListCustomers.push(newCustomer);
      }

      if (newListCustomers.length > 400) {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div
                className="custom-ui"
                style={{
                  width: "400px",
                  padding: "30px",
                  textAlign: "left",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 20px 75px rgba(0, 0, 0, 0.13)",
                  color: "#666",
                }}
              >
                <h3>Lưu ý</h3>
                <p>
                  Chỉ cho phép tối đa 400 sản phẩm mỗi lần import, vui lòng tách
                  nhiều file Excel để thực hiện !
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    columnGap: "20px",
                  }}
                >
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className="btn btn-primary"
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            );
          },
          buttons: [
            {
              label: "Đồng ý",
              onClick: () => alert("Click Yes"),
            },
          ],
        });

        return;
      }

      const dataImport = {
        note: "",
        tally_sheet_items: newListCustomers,
      };

      createInventorys(store_code, branch_id, dataImport);
    };
    document.getElementById("file-excel-import-sheet-inventory").value = null;
    reader.readAsBinaryString(f);
  };
  render() {
    const { store_code } = this.props.match.params;
    const { sheetsInventory, badges, products } = this.props;
    const { searchValue, isShow, status } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="title_content text-primary">
                      Phiếu kiểm kho
                    </h4>
                    <div>
                      <div
                        style={{ marginRight: "10px" }}
                        onClick={this.exportProducts}
                        className={`btn btn-success btn-icon-split btn-sm`}
                        // class={`btn btn-success btn-icon-split btn-sm  ${
                        //   _export == true ? "show" : "hide"
                        // }`}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-file-export"></i>
                        </span>
                        <span style={{ color: "white" }} class="text">
                          Export tất cả sản phẩm mẫu
                        </span>
                      </div>
                      <div
                        style={{ marginRight: "10px" }}
                        className={`btn btn-success btn-icon-split btn-sm`}
                        data-toggle="modal"
                        data-target="#showListProduct"
                        // class={`btn btn-success btn-icon-split btn-sm  ${
                        //   _export == true ? "show" : "hide"
                        // }`}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-file-export"></i>
                        </span>
                        <span style={{ color: "white" }} class="text">
                          Export sản phẩm được chọn mẫu
                        </span>
                      </div>
                      <button
                        onClick={() => this.fileInputRef?.current?.click()}
                        style={{ marginRight: "10px" }}
                        class={`btn btn-primary btn-icon-split btn-sm `}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-file-import"></i>
                        </span>
                        <span style={{ color: "white" }} class="text">
                          Import Excel
                        </span>
                      </button>
                      <input
                        ref={this.fileInputRef}
                        id="file-excel-import-sheet-inventory"
                        type="file"
                        name="name"
                        hidden
                        onChange={this.onChangeExcel}
                      />

                      <Link to={`/inventory/create/${store_code}`}>
                        <div class="btn btn-info btn-icon-split btn-sm show">
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text ">Tạo phiếu kiểm kho</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <br></br>
                  <div className="card">
                    <div
                      className="card-header py-3"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <form onSubmit={this.searchData}>
                        <div
                          class="input-group mb-6"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            style={{ maxWidth: "400px" }}
                            type="search"
                            name="txtSearch"
                            value={searchValue}
                            onChange={this.onChangeSearch}
                            class="form-control"
                            placeholder="Nhập mã phiếu"
                          />
                          <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">
                              <i class="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                      <select
                        name=""
                        id="input"
                        class="form-control"
                        value={status}
                        onChange={this.onChangeStatus}
                        style={{
                          width: "auto",
                        }}
                      >
                        <option value="">Tất cả</option>
                        <option value="0">Đã kiểm kho</option>
                        <option value="1">Đã cân bằng</option>
                      </select>
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
                              <th>Mã phiếu</th>
                              <th>Thời gian</th>
                              <th>Tồn thực tế</th>
                              <th>Tồn chi nhánh</th>
                              <th>Chênh lệch</th>
                              <th>Trạng thái</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.showData(sheetsInventory?.data, store_code)}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                        setPage={this.setPage}
                        searchValue={searchValue}
                        status={status}
                        store_code={store_code}
                        sheetsInventory={sheetsInventory}
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
        <ListProduct store_code={store_code} products={products} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sheetsInventory: state.inventoryReducers.inventory_reducer.sheetsInventory,
    badges: state.badgeReducers.allBadge,
    products: state.productReducers.product.allProduct,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllInventory: (store_code, branch_id, page, pagram) => {
      dispatch(
        inventoryAction.fetchAllInventory(store_code, branch_id, page, pagram)
      );
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    exportSheetInventory: (store_code, branch_id, params, data) => {
      dispatch(
        productAction.exportSheetInventory(store_code, branch_id, params, data)
      );
    },
    createInventorys: (store_code, branch_id, data) => {
      dispatch(inventoryAction.createInventorys(store_code, branch_id, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
