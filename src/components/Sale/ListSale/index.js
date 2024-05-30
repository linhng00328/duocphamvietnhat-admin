import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import Table from "./Table";
import { getQueryParams, removeAscent } from "../../../ultis/helpers";
import * as staffAction from "../../../actions/staff";
import * as saleAction from "../../../actions/sale";
import { getBranchId } from "../../../ultis/branchUtils";
import SidebarShowStatisticalSale from "./SidebarShowStatisticalSale.";
import SiderbarCusReferPhone from "../../Agency/ListAgency/SiderbarCusReferPhone/index.js";
import SidebarShowCustomerOfSale from "./SidebarShowCustomerOfSale.js";

class ListSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      staffSearch: [],
      role: "sale",
      saleInfo: {},
      showCustomerOfSale: false,
      saleInfoStatistical: {},
      showStatisticalSale: false,
    };
  }

  componentDidMount() {
    const { store_code, fetchAllStaff } = this.props;
    const params = `branch_id=${getBranchId()}`;

    fetchAllStaff(store_code, null, params, null);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { staff } = this.props;
    const { role } = this.state;
    if (!shallowEqual(staff, nextProps.staff)) {
      let newStaffRole;
      if (role === "sale") {
        newStaffRole = nextProps.staff.filter(
          (staff) => staff.is_sale === true
        );
      } else {
        newStaffRole = nextProps.staff;
      }
      this.setState({
        staffSearch: newStaffRole,
      });
    }
    return true;
  }

  setSaleInfo = (saleInfo) => {
    this.setState({
      saleInfo,
    });
  };
  setShowCustomerOfSale = (isShowed) => {
    this.setState({
      showCustomerOfSale: isShowed,
    });
  };

  setSaleInfoStatistical = (info) => {
    this.setState({
      saleInfoStatistical: info,
    });
  };
  setShowStatisticalSale = (isShowed) => {
    this.setState({
      showStatisticalSale: isShowed,
    });
  };
  handleShowStatistical = (info) => {
    const { fetchStatisticalSaleForUser, store_code } = this.props;

    this.setSaleInfoStatistical(info);
    this.setShowStatisticalSale(true);
    fetchStatisticalSaleForUser(store_code, info.id);
  };

  onChangeSearch = (e) => {
    const { staff } = this.props;
    const { role } = this.state;
    const value = e.target.value;

    let newStaffSearchClone = JSON.parse(JSON.stringify(staff));
    let newStaffSearchSaleClone = staff.filter(
      (staff) => staff.is_sale === true
    );

    let newStaffSearch;
    if (role === "sale") {
      if (value === "") {
        newStaffSearch = newStaffSearchSaleClone;
      } else {
        newStaffSearch = newStaffSearchSaleClone.filter(
          (staff) =>
            removeAscent(staff.name.trim().toLowerCase()).includes(
              removeAscent(value.trim().toLowerCase())
            ) ||
            removeAscent(staff.username.trim().toLowerCase()).includes(
              removeAscent(value.trim().toLowerCase())
            ) ||
            removeAscent(staff.phone_number.trim().toLowerCase()).includes(
              removeAscent(value.trim().toLowerCase())
            )
        );
      }
    } else {
      if (value === "") {
        newStaffSearch = staff;
      } else {
        newStaffSearch = newStaffSearchClone.filter(
          (staff) =>
            removeAscent(staff.name.trim().toLowerCase()).includes(
              removeAscent(value.trim().toLowerCase())
            ) ||
            removeAscent(staff.username.trim().toLowerCase()).includes(
              removeAscent(value.trim().toLowerCase())
            ) ||
            removeAscent(staff.phone_number.trim().toLowerCase()).includes(
              removeAscent(value.trim().toLowerCase())
            )
        );
      }
    }

    this.setState({ searchValue: e.target.value, staffSearch: newStaffSearch });
  };
  onChangeRole = (e) => {
    const value = e.target.value;
    const { staff } = this.props;
    let newStaffRole;
    if (value === "sale") {
      newStaffRole = staff.filter((staff) => staff.is_sale === true);
    } else {
      newStaffRole = staff;
    }
    this.setState({ searchValue: "", role: value, staffSearch: newStaffRole });
  };

  render() {
    const {
      searchValue,
      page,
      staffSearch,
      role,
      saleInfo,
      showCustomerOfSale,
      saleInfoStatistical,
      showStatisticalSale,
    } = this.state;
    const { store_code } = this.props;
    return (
      <div>
        <div id="">
          <div
            class="row"
            style={{ "justify-content": "space-between", alignItems: "center" }}
          >
            <div>
              <div
                class=" mb-6"
                style={{ padding: "7px 20px", position: "relative" }}
              >
                <input
                  style={{
                    maxWidth: "400px",
                    minWidth: "300px",
                    paddingRight: "25px",
                  }}
                  autoComplete="off"
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm..."
                />
                <div
                  style={{
                    position: "absolute",
                    right: "30px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#cecece",
                  }}
                >
                  <i class="fa fa-search"></i>
                </div>
              </div>
            </div>
            <select
              name=""
              id="input"
              class="form-control"
              value={role}
              onChange={this.onChangeRole}
              style={{
                width: "auto",
              }}
            >
              <option value="sale">Sale</option>
              <option value="all">Tất cả</option>
            </select>
          </div>
          <div className="card-body">
            <Table
              store_code={store_code}
              data={staffSearch}
              page={page}
              searchValue={searchValue}
              role={role}
              setSaleInfo={this.setSaleInfo}
              setShowCustomerOfSale={this.setShowCustomerOfSale}
              handleShowStatistical={this.handleShowStatistical}
            />
          </div>
        </div>
        <SidebarShowCustomerOfSale
          store_code={store_code}
          showSidebar={showCustomerOfSale}
          setShowSidebar={this.setShowCustomerOfSale}
          saleInfo={saleInfo}
          setSaleInfo={this.setSaleInfo}
        ></SidebarShowCustomerOfSale>
        <SidebarShowStatisticalSale
          showSidebar={showStatisticalSale}
          setShowSidebar={this.setShowStatisticalSale}
          saleInfoStatistical={saleInfoStatistical}
          setSaleInfoStatistical={this.setSaleInfoStatistical}
        ></SidebarShowStatisticalSale>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.allStaff,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
    fetchStatisticalSaleForUser: (store_code, id) => {
      dispatch(saleAction.fetchStatisticalSaleForUser(store_code, id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListSale);
