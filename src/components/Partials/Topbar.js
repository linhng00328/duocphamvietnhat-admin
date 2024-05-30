import React, { Component } from "react";
import * as profileAction from "../../actions/profile";
import * as branchAction from "../../actions/branch";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as userLocalApi from "../../data/local/user";
import * as dashboardAction from "../../actions/dashboard";
import history from "../../history";
import * as Env from "../../ultis/default";
import Notification from "./Notification";
import * as helper from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import {
  getBranchId,
  setBranchId,
  getBranchName,
  setBranchName,
  setStoreCode,
  getStoreCode,
  setBranchIds,
  getBranchIds,
} from "../../ultis/branchUtils";
import { Redirect } from "react-router-dom";
import * as notificationAction from "../../actions/notification";
class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadNotification: "",
      txtBranch: "",
      listBranchSelected: [],
    };
  }

  componentDidMount() {
    this.props.fetchBranchStore(this.props.store_code);

    if (
      getStoreCode() == "" ||
      getStoreCode() == null ||
      getStoreCode() == "undefined" ||
      typeof getStoreCode() == "undefined"
    ) {
      setStoreCode(this.props.store_code);
      // return;
    }

    this.props.fetchAllBadge(this.props.store_code);

    if (!this.props.isExistUser) this.props.fetchUserId();
    if (!this.props.isExsitStore) {
      this.props.fetchAllStore();
      this.props.fetchBranchStore(this.props.store_code);
    }
    const branchId = getBranchId();
    this.setState({ txtBranch: branchId });
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {
      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branch_name = getBranchName();

      if (nextProps.branchStore != null && nextProps.branchStore.length > 0) {
        if (branch_ids) {
          this.setState({ txtBranch: branch_ids });
          setBranchName("Tất cả chi nhánh");
          setBranchIds(
            branch_ids === null || branch_ids === undefined ? "" : branch_ids
          );
        } else {
          if (branch_id != null) {
            const selectedBranch = nextProps.branchStore.find(
              (branch) => branch.id == branch_id
            );

            if (selectedBranch == null) {
              const value = nextProps.branchStore[0]?.id;
              const name = nextProps.branchStore[0]?.name;

              this.setState({ txtBranch: value });
              this.props.changeBranch(nextProps.branchStore[0]);
              setBranchId(value);
              setBranchName(name);
            } else {
              setBranchName(selectedBranch.name);
              this.props.changeBranch(selectedBranch);
            }
          } else {
            const value = nextProps.branchStore[0]?.id;
            const name = nextProps.branchStore[0]?.name;

            this.props.changeBranch(nextProps.branchStore[0]);
            setBranchId(value);
            setBranchName(name);

            this.setState({ txtBranch: value });
          }
        }
      }
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.add_revenue != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.store_info;
      this.setState({ isLoading: true, isShow });
    }
  }

  logout = () => {
    setBranchIds("");
    userLocalApi.removeToken();
    history.push("/login");
  };

  getListBranchIds = () => {
    var { branchStore } = this.props;
    if (branchStore.length > 0) {
      const branchIds = branchStore.map((branch) => branch.id).join(",");
      return branchIds;
    }
    return "";
  };

  onChange = (e) => {
    var value = e.target.value;
    if (value === "all") {
      const branchIds = this.getListBranchIds();
      setBranchIds(branchIds);
    } else {
      setBranchId(value);
      setBranchIds("");
      var branchStore =
        typeof this.props.branchStore == "undefined"
          ? []
          : this.props.branchStore;

      const selectedBranch = branchStore.find((branch) => branch.id == value);
      this.props.changeBranch(selectedBranch);
    }
    this.setState({ txtBranch: value });

    const pathName = window.location.pathname;
    const isListBranches = value === "all";
    helper.handleReloadBranch(isListBranches, pathName);
  };
  showData = (stores) => {
    var result = null;
    var store_code =
      typeof this.props.store_code != "undefined"
        ? this.props.store_code
        : null;
    if (stores.length > 0) {
      result = stores.map((data, index) => {
        var selected = data.store_code === store_code ? true : false;
        return (
          <option
            value={data.id}
            key={index}
            selected={selected}
            data-branch-type="(CN mặc định)"
            className={
              data.is_default_order_online == true
                ? "active-branch-default"
                : ""
            }
          >
            {data.name}{" "}
            {data.is_default_order_online == true ? "(Mặc định)" : ""}
          </option>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  getNameBranch = (stores) => {
    var result = "";
    if (stores && stores.length > 0) {
      var item = stores.filter(
        (store) => store.store_code == this.props.store_code
      );
      result = item.length > 0 ? item[0].name : "";
    }

    return result;
  };

  showNotification = (
    isNotification,
    isLoadNotification,
    store_code,
    disable
  ) => {
    if (isNotification == "show")
      return (
        <Notification
          isLoadNotification={isLoadNotification}
          store_code={store_code}
          disable={disable}
          branchId={this.state.txtBranch}
        />
      );
  };

  getNameSelected() {
    const { listBranchSelected } = this.state;
    var name = "";
    if (listBranchSelected.length > 0) {
      name += listBranchSelected.reduce((prevBranch, currentBranch, index) => {
        return (
          prevBranch +
          `${
            index === listBranchSelected.length - 1
              ? currentBranch?.name
              : `${currentBranch?.name}, `
          }`
        );
      }, "");
    }

    return name;
  }
  handleCheckedBranch = (idBranch) => {
    const { listBranchSelected } = this.state;
    if (listBranchSelected?.length > 0) {
      const checked = listBranchSelected
        .map((branch) => branch?.id)
        .includes(idBranch);
      return checked;
    }
    return false;
  };

  handleChangeBranch = (branch) => {
    const { listBranchSelected } = this.state;
    var newListBranchSelected = [];

    const isExisted = listBranchSelected.map((c) => c?.id).includes(branch?.id);
    if (isExisted) {
      newListBranchSelected = listBranchSelected.filter(
        (c) => c?.id !== branch.id
      );
    } else {
      newListBranchSelected = [...listBranchSelected, branch];
    }

    this.setState({
      listBranchSelected: newListBranchSelected,
    });
  };

  render() {
    var chooseStore = this.props.isHome ? "hide" : "show";
    var { user, store_code, stores, store, branchStore, badges } = this.props;
    var { isLoadNotification, txtBranch, isShow } = this.state;
    var stores = typeof stores == "undefined" ? [] : stores;
    var branchStore = typeof branchStore == "undefined" ? [] : branchStore;
    var name =
      typeof user.name == "undefined" || user.name == "" || user.name == null
        ? "Unknown"
        : user.name;
    var image =
      typeof user.avatar_image == "undefined" ||
      user.avatar_image == "" ||
      user.avatar_image == null
        ? Env.IMG_NOT_AVATAR
        : user.avatar_image;
    var disable = typeof this.props.isHome == "undefined" ? "show" : "hide";
    const branchIds = getBranchIds();

    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand navbar-light bg-white topbar static-top ">
            <div
              style={{ margin: "auto" }}
              className={`nav-item dropdown no-arrow mx-1 ${chooseStore}`}
            >
              <select
                id="input"
                className="form-control border-input"
                name="store"
                value={txtBranch}
                onChange={this.onChange}
              >
                <option value="" disabled>
                  -- Chọn chi nhánh --
                </option>
                {!badges.is_staff && branchStore?.length > 1 && (
                  <option
                    value="all"
                    style={{
                      color: "rgb(231, 74, 59)",
                    }}
                  >
                    Tất cả chi nhánh
                  </option>
                )}

                {this.showData(branchStore)}
              </select>
            </div>
            {/* <div className="categories__content">
              <div
                id="accordion"
                style={{
                  width: "300px",
                  position: "relative",
                }}
              >
                <div
                  className="wrap_category input-group"
                  style={{ display: "flex" }}
                  data-toggle="collapse"
                  data-target="#collapseBranches"
                  aria-expanded="false"
                  aria-controls="collapseBranches"
                >
                  <input
                    readOnly
                    type="text"
                    class="form-control"
                    placeholder="--Chọn chi nhánh--"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingRight: "55px",
                      position: "relative",
                      backgroundColor: "transparent",
                    }}
                    value={this.getNameSelected()}
                  ></input>
                  <button
                    class="btn  btn-accordion-collapse collapsed input-group-text"
                    id="headingOne"
                    style={{
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                    }}
                  >
                    <i
                      className={
                        this.state.icon
                          ? "fa fa-caret-down"
                          : "fa fa-caret-down"
                      }
                    ></i>
                  </button>
                </div>
                <div
                  id="collapseBranches"
                  className="collapse"
                  ariaLabelledby="headingOne"
                  dataParent="#accordion"
                  style={{
                    position: "absolute",
                    width: "100%",
                    left: "0",
                    top: "100%",
                    zIndex: "10",
                    background: "#fff",
                    boxShadow: "1px 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      margin: "5px 0",
                      height: "235px",
                      overflowY: "auto",
                    }}
                    class="list-group"
                  >
                    {branchStore?.length > 0 ? (
                      branchStore.map((branch, index) => (
                        <li
                          class=""
                          style={{
                            cursor: "pointer",
                            paddingTop: "5px",
                            paddingLeft: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            id={branch.id}
                            style={{
                              marginRight: "10px",
                              width: "30px",
                              height: "15px",
                              flexShrink: "0",
                            }}
                            checked={this.handleCheckedBranch(branch.id)}
                            onChange={() => this.handleChangeBranch(branch)}
                          />
                          <label
                            htmlFor={branch.name}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              marginBottom: "0",
                            }}
                            title={branch.name}
                          >
                            {branch.name}
                          </label>
                        </li>
                      ))
                    ) : (
                      <div
                        style={{
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                      >
                        Không có kết quả !
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div> */}

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow d-sm-none">
                <div
                  className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>

              <li className="nav-item dropdown no-arrow">
                {typeof isShow == "undefined" ? (
                  <div></div>
                ) : isShow == true ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      alignContent: "center",
                    }}
                  >
                    {badges != null && badges.domain_customer != null && (
                      <div>
                        <i
                          class="fas fa-globe"
                          style={{
                            marginRight: "10px",
                            marginTop: "23px",
                            fontSize: "20px",
                            color: "rgb(12 124 236)",
                          }}
                        ></i>
                        Web mua hàng:
                        <a
                          style={{ marginRight: 15, marginLeft: 5 }}
                          href={
                            "https://" +
                            badges.domain_customer
                              .replace("https://", "")
                              .replace("http://", "")
                          }
                          target="_blank"
                        >
                          {badges.domain_customer
                            .replace("https://", "")
                            .replace("http://", "")}
                        </a>
                      </div>
                    )}

                    {/* <Link className="show-store" to={`/home`}>
                      <i
                        class="fas fa-store"
                        style={{
                          marginRight: "10px",
                          marginTop: "23px",
                          fontSize: "20px",
                          color: "#ec0c38",
                        }}
                      ></i>
                      {stores?.length > 0 && this.getNameBranch(stores)}
                    </Link> */}
                  </div>
                ) : (
                  <a className="show-store">
                    <i
                      class="fas fa-store"
                      style={{
                        marginRight: "10px",
                        marginTop: "23px",
                        fontSize: "20px",
                        color: "#ec0c38",
                      }}
                    ></i>
                    {stores?.length > 0 && this.getNameBranch(stores)}
                  </a>
                )}{" "}
              </li>

              <div className="topbar-divider d-none d-sm-block"></div>

              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {name}
                  </span>
                  <img
                    className="img-profile rounded-circle"
                    src={`${image}`}
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <Link
                    className={`dropdown-item ${disable}`}
                    to={`/profile/${store_code}`}
                  >
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Thông tin
                  </Link>

                  <div className={`dropdown-divider ${disable}`}></div>
                  <a
                    onClick={this.logout}
                    className="dropdown-item"
                    href="/#"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Đăng xuất
                  </a>
                </div>
              </li>
              {this.showNotification(
                chooseStore,
                isLoadNotification,
                store_code,
                disable
              )}
            </ul>
          </nav>
          {branchIds ? (
            <div
              className="mb-4 shadow"
              style={{
                paddingLeft: "20px",
                backgroundColor: "#fff",
                color: "#e74a3b",
                paddingBottom: "10px",
              }}
            >
              Bạn đang quản lý tất cả chi nhánh, một vài chức năng sẽ bị ẩn đi
            </div>
          ) : (
            <div
              style={{
                marginBottom: "10px",
              }}
            ></div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user.userID,
    stores: state.storeReducers.store.allStore,
    store: state.storeReducers.store.storeID,
    branchStore: state.storeReducers.store.branchStore,
    currentBranch: state.branchReducers.branch.currentBranch,
    permission: state.authReducers.permission.data,
    badges: state.badgeReducers.allBadge,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchUserId: () => {
      dispatch(profileAction.fetchUserId());
    },
    fetchAllStore: () => {
      dispatch(dashboardAction.fetchAllStore());
    },
    fetchBranchStore: (store_code) => {
      dispatch(dashboardAction.fetchBranchStore(store_code));
    },
    changeBranch: (branchData) => {
      dispatch(branchAction.changeBranch(branchData));
    },
    fetchAllBadge: (store_code) => {
      dispatch(notificationAction.fetchAllBadge(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
