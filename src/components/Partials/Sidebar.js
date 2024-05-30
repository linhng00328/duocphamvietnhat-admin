import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { menu } from "../../ultis/menu";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";
import * as customerAction from "../../actions/customer_sales";
import { handleReloadBranch } from "../../ultis/helpers";
import { getBranchIds } from "../../ultis/branchUtils";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const location = window.location.pathname;
    for (const item of menu[0]?.link) {
      var exsit = false;
      if (item.open) {
        if (item.ExcludeSetOpenKey?.length > 0) {
          for (const element of item.ExcludeSetOpenKey) {
            if (location.includes(element)) {
              exsit = true;
            }
          }
        }
        if (exsit == true) continue;

        if (item.setOpenKey?.length > 0) {
          for (const element of item.setOpenKey) {
            if (location.includes(element)) {
              if (
                window.$(`.${item.open}-collapse`).attr("aria-expanded") ==
                "false"
              ) {
                window.$(`.${item.open}-collapse`).trigger("click");
                return;
              }
            }
          }
        }
      }
    }
  }

  submit = () => {
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
            <p>Chức năng này chỉ sử dụng khi chọn duy nhất 1 chi nhánh !</p>
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
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  setActiveLocation = (location) => {
    return location.includes("/create")
      ? location.replace("/create", "")
      : location.includes("/edit")
      ? location.replace("/edit", "")
      : location.includes("/detail")
      ? location.replace("/detail", "")
      : location;
  };

  MenuLink_3 = (link) => {
    var result = null;
    if (link.length > 0) {
      var _class = this.props.permission;
      var {
        total_status_0,
        total_status_1,
        total_status_2,
        total_status_3,
        total,
      } = this.props.customers;
      result = link.map((link, index) => {
        if (link.children) {
          return (
            <>
              <div
                key={index}
                className={`collapse-item   ${
                  _class[link.class] == true ||
                  typeof link.class == "undefined" ||
                  link.class == null
                    ? "show"
                    : "hide"
                }`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{link.name}</span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  <i class="fa fa-angle-down"></i>
                </span>
              </div>
              {link.children?.map((itemChild, index) => (
                <Route
                  key={index}
                  index={index}
                  path={itemChild.to}
                  exact={itemChild.exact}
                  children={({ match }) => {
                    const location = window.location.pathname;
                    const newLocation = this.setActiveLocation(location);
                    // const isActive = newLocation.includes(link.to + "/");
                    var isActive = false;
                    var name = itemChild.name;

                    if (itemChild.params) {
                      isActive =
                        newLocation.includes(
                          itemChild.to + "/" + this.props.store_code
                        ) &&
                        itemChild.params ==
                          `?status=${this.props.currentParams}`;
                      var param = itemChild.params.replace("?status=", "");
                      if (param == "") {
                        name =
                          name +
                          ` (${
                            total_status_0 +
                            total_status_1 +
                            total_status_2 +
                            total_status_3
                          })`;
                      }
                      if (param == "0") {
                        name = name + ` (${total_status_0})`;
                      }
                      if (param == "1") {
                        name = name + ` (${total_status_1})`;
                      }
                      if (param == "2") {
                        name = name + ` (${total_status_2})`;
                      }
                      if (param == "3") {
                        name = name + ` (${total_status_3})`;
                      }
                    } else {
                      isActive = newLocation.includes(itemChild.to + "/");
                    }
                    var active = isActive ? "active-col" : "";

                    // var _class = this.props.permission
                    return (
                      <Link
                        className={`collapse-item  ${active} ${
                          _class[itemChild.class] == true ||
                          typeof itemChild.class == "undefined" ||
                          itemChild.class == null
                            ? "show"
                            : "hide"
                        }`}
                        to={
                          itemChild.to +
                          "/" +
                          this.props.store_code +
                          (itemChild.params || "")
                        }
                        style={{
                          paddingLeft: "1.6rem",
                        }}
                      >
                        {name}
                      </Link>
                    );
                  }}
                />
              ))}
            </>
          );
        } else {
          const branch_ids = getBranchIds() ? true : false;
          const isPermission =
            branch_ids === false ||
            (branch_ids === true && link.isShowWhenManyBranch === true)
              ? true
              : false;
          return (
            <Route
              key={index}
              index={index}
              path={link.to}
              exact={link.exact}
              children={({ match }) => {
                const location = window.location.pathname;
                const newLocation = this.setActiveLocation(location);
                // const isActive = newLocation.includes(link.to + "/");
                var isActive = false;
                var name = link.name;

                if (link.params) {
                  isActive =
                    newLocation.includes(
                      link.to + "/" + this.props.store_code
                    ) && link.params == `?status=${this.props.currentParams}`;
                  var param = link.params.replace("?status=", "");
                  if (param == "") {
                    name =
                      name +
                      ` (${
                        total_status_0 +
                        total_status_1 +
                        total_status_2 +
                        total_status_3
                      })`;
                  }
                  if (param == "0") {
                    name = name + ` (${total_status_0})`;
                  }
                  if (param == "1") {
                    name = name + ` (${total_status_1})`;
                  }
                  if (param == "2") {
                    name = name + ` (${total_status_2})`;
                  }
                  if (param == "3") {
                    name = name + ` (${total_status_3})`;
                  }
                } else {
                  isActive = newLocation.includes(link.to + "/");
                }
                var active = isActive ? "active-col" : "";

                // var _class = this.props.permission
                return (
                  <>
                    {isPermission ? (
                      <Link
                        className={`collapse-item  ${active} ${
                          _class[link.class] == true ||
                          typeof link.class == "undefined" ||
                          link.class == null || link.display == "show"
                            ? "show"
                            : "hide"
                        }`}
                        to={
                          link.to +
                          "/" +
                          this.props.store_code +
                          (link.params || "")
                        }
                      >
                        {name}
                      </Link>
                    ) : (
                      <a
                        className={`collapse-item  ${active} ${
                          _class[link.class] == true ||
                          typeof link.class == "undefined" ||
                          link.class == null
                            ? "show"
                            : "hide"
                        }`}
                        onClick={this.submit}
                      >
                        {name}
                      </a>
                    )}
                  </>
                );
              }}
            />
          );
        }
      });
    }
    return result;
  };

  activeCollapes = (links, localtion) => {
    for (const link of links) {
      if (localtion.includes(link.to + "/" + this.props.store_code)) {
        return true;
      }
    }
    return false;
  };
  MenuLink_2 = (link) => {
    var result = null;
    if (link?.length > 0) {
      var _class = this.props.permission;

      result = link.map((link, index) => {
        const branch_ids = getBranchIds() ? true : false;
        const isPermission =
          branch_ids === false ||
          (branch_ids === true && link.isShowWhenManyBranch === true)
            ? true
            : false;

        if (typeof link.children !== "undefined") {
          const location = window.location.pathname;
          const newLocation = this.setActiveLocation(location);

          const isActive = this.activeCollapes(link.children, newLocation);
          var active = isActive ? "active" : "";
          var disableHeading =
            this.checkDisplayTitle(link.children) == false ? "show" : "hide";

          return (
            <React.Fragment>
              <li
                className={`nav-item ${active} ${disableHeading} `}
                key={index}
                style={{
                  display: isPermission ? "block" : "none",
                }}
              >
                <a
                  className={`nav-link collapsed ${link.open}-collapse`}
                  href="#"
                  data-toggle="collapse"
                  data-target={`#collapse_${index}`}
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ padding: "0.75rem" }}
                >
                  <i className={link.icon}></i>
                  <span>{link.name}</span>
                </a>
                <div
                  id={`collapse_${index}`}
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{link.name}</h6>
                    {this.MenuLink_3(link.children)}
                  </div>
                </div>
              </li>
            </React.Fragment>
          );
        }
        return (
          <Route
            index={index}
            path={link.to}
            exact={link.exact}
            children={({ match }) => {
              const location = window.location.pathname;
              const newLocation = this.setActiveLocation(location);
              const isActive = newLocation.includes(
                link.to + "/" + this.props.store_code
              );
              var active = isActive ? "active" : "";
              var displayWithTabItem = this.displayItemWithGroup(
                link.itemHasTabName,
                link
              );
              return (
                <li
                  className={`nav-item   ${active} ${displayWithTabItem}  ${
                    _class[link.class] == true ||
                    (link.class == "isVip" && this.props.user?.is_vip) ||
                    typeof link.class == "undefined" ||
                    link.class == null ||
                    displayWithTabItem == "show"
                      ? "show"
                      : "hide"
                  }`}
                  style={{
                    display: isPermission ? "block" : "none",
                  }}
                >
                  <Link
                    className="nav-link"
                    to={link.to + "/" + this.props.store_code}
                    style={{ padding: "0.75rem" }}
                  >
                    <i className={`fas fa-fw ${link.icon} `}></i>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            }}
          />
        );
      });
    }
    return result;
  };

  displayItemWithGroup = (item, link) => {
    var _class = this.props.permission;
    if (typeof link.class != "undefined") {
      if (Array.isArray(link.class)) {
        var check = true;
        for (const data of link.class) {
          if (_class[data] == true) {
            check = false;
          }
        }
        console.log(check);
        var result = check == false ? "show" : "hide";

        return result;
      }
    }
    if (typeof _class.collaborator_config == "undefined") {
      return "hide";
    }
    if (item == "collaborator") {
      if (
        _class.collaborator_config == false &&
        _class.collaborator_list == false &&
        _class.collaborator_payment_request_list == false &&
        _class.collaborator_payment_request_history == false
      ) {
        return "hide";
      }
      return "show";
    }
  };

  checkDisplayTitle = (link) => {
    var result = true;
    var _class = this.props.permission;
    if (link?.length > 0) {
      for (const item of link) {
        if (item.isVip == true) {
          // return this.props.badges.config_user_vip == null ||
          //   typeof this.props.badges.config_user_vip == "undefined"
          //   ? true
          //   : false;
          return this.props.user.is_vip ? false : true;
        }
        if (typeof item.class == "undefined" || item.class == null) {
          return false;
        } else if (Array.isArray(item.class)) {
          for (const data of item.class) {
            var check = true;
            if (_class[data] == true) {
              check = false;
            }
          }
          return check;
        } else {
          if (_class[item.class] == true) {
            return false;
          }
        }
      }
    }
    return result;
  };
  MenuLink_1 = (title, link, index) => {
    var disableHeading =
      this.checkDisplayTitle(link) == false ? "show" : "hide";
    const branch_ids = getBranchIds() ? true : false;
    return (
      <React.Fragment>
        <div
          className={`sidebar-heading ${disableHeading}`}
          key={index}
          style={{
            display: link.hasLinkShowWhenManyBranch === true ? "block" : "none",
          }}
        >
          {title}
        </div>
        {this.MenuLink_2(link)}
        <hr
          class={`sidebar-divider ${disableHeading}`}
          style={{
            display:
              link.hasLinkShowWhenManyBranch === true || branch_ids === false
                ? "block"
                : "none",
          }}
        />
      </React.Fragment>
    );
  };

  showMenus = (menu) => {
    var result = null;
    if (menu.length > 0) {
      result = menu.map((menu, index) => {
        return this.MenuLink_1(menu.title, menu.link, index);
      });
    }
    return result;
  };
  componentDidMount() {
    window.loadScript();
    var { customers, store_code } = this.props;
    if (typeof customers.total === "undefined") {
      this.props.fetchAllCustomerSale(store_code, 1);
    }
  }
  render() {
    var { badges, stores, permission } = this.props;
    return (
      <div className="col-2 col-2-nav">
        <ul
          className="navbar-nav navbar-main sidebar sidebar-dark accordion"
          style={{
            overflowX: "hidden",
            backgroundColor: themeData().backgroundColor,
          }}
          id="accordionSidebar"
        >
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to={`/dashboard/${this.props.store_code}`}
          >
            {/* <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div> */}
            <div class="sidebar-brand-icon ">
              <img
                width="80%"
                src={
                  badges?.config_user_vip?.url_logo_small_image != null
                    ? badges?.config_user_vip?.url_logo_small_image
                    : themeData().logoTab
                }
                className="img-responsive"
                alt="logo_image"
              />
            </div>
            <div className="sidebar-brand-text">
              <img
                width="80%"
                src={
                  badges?.config_user_vip?.url_logo_image != null
                    ? badges?.config_user_vip?.url_logo_image
                    : themeData().logo
                }
                className="img-responsive"
                alt="logo_text"
              />
            </div>
          </Link>
          {stores?.length > 0 && this.showMenus(menu)}

          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stores: state.storeReducers.store.allStore,
    permission: state.authReducers.permission.data,
    isLoadPermission: state.authReducers.permission.isLoadPermission,
    badges: state.badgeReducers.allBadge,
    customers: state.customerSaleReducers.customer_sales.allCustomer,
    user: state.userReducers.user.userID,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    loadPermission: (data) => {
      dispatch(data);
    },
    fetchAllCustomerSale: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomerSale(id, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
