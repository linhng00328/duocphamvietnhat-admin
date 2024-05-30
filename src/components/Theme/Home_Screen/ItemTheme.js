import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import styled from "styled-components";
import { getBranchId } from "../../../ultis/branchUtils";
import * as notificationAction from "../../../actions/notification";
const ItemThemeStyles = styled.div`
  .card {
    border: none;
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    .card__content {
      img {
        border-radius: 0% !important;
      }
      .theme__title {
        width: 100%;
        text-align: left;
        padding: 10px;
        position: relative;
        border-top: 1px solid rgba(0, 0, 0, 0.07);
        background-color: #fafafa;
        font-weight: 600;
        white-space: nowrap;
        .theme__title-actived {
          position: absolute;
          padding: 0 10px;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #2c3e50;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease-in;
          & > span {
            white-space: pre-wrap;
          }
          .theme__title__btnActive {
            padding: 4px 10px;
            background-color: #2980b9;
            border-radius: 5px;
          }
        }
      }
      .btnTheme {
        button,
        .btnViewWeb {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          border: none !important;
        }
      }
    }
  }
`;

class ItemTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_page_type: null,
      show_button: false,
    };
  }
  componentDidMount = () => {
    const branch_id = getBranchId();
    this.props.fetchAllBadge(this.props.store_code, branch_id);
  };
  onChangeShowButton = (value) => {
    this.setState({
      show_button: value,
    });
  };

  chooseTheme = (dataTheme) => {
    this.props.chooseTheme(dataTheme);
  };

  checkExsitItem = (index, _isVip, isVip, list_id_theme) => {
    console.log(index, _isVip, isVip, list_id_theme);
    if (_isVip == true) {
      if (isVip == true) {
        var bool = false;
        if (list_id_theme == null) {
          return false;
        }
        for (const item of list_id_theme) {
          if (item == index) {
            bool = true;
          }
        }
        return bool;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  handleShowDetailTheme = (infoDetails) => {
    this.props.setShowModalDetailsTheme(true);
    this.props.setInfoDetailsTheme(infoDetails);
  };

  render() {
    var { home_page_type, v } = this.props;
    var { show_button } = this.state;
    var isVip =
      typeof this.props.badges.config_user_vip == "undefined" ||
      this.props.badges.config_user_vip == null
        ? false
        : true;
    var list_id_theme =
      typeof this.props.badges.config_user_vip == "undefined" ||
      this.props.badges.config_user_vip != null
        ? this.props.badges.config_user_vip.list_id_theme_vip
        : [];

    return (
      <ItemThemeStyles
        onMouseEnter={() => {
          this.onChangeShowButton(true);
        }}
        onMouseLeave={() => {
          this.onChangeShowButton(false);
        }}
        class={`form-group col-xs-3 col-lg-3 col-md-3 col-sm-3 ${
          this.checkExsitItem(v.index, v.isVip, isVip, list_id_theme) == true
            ? ""
            : "hide"
        }`}
      >
        <div class="card" style={{ padding: 0 }}>
          <div
            className="card__content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              margin: "auto",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              style={{
                display: "block",
                objectFit: "cover",
                objectPosition: "top",
              }}
              alt={v.name}
              src={v.themeTop}
              width="100%"
              height={200}
              loading="lazy"
              onMouseEnter={() => {
                this.onChangeShowButton(true);
              }}
              onMouseLeave={() => {
                this.onChangeShowButton(false);
              }}
            />
            <div
              class="kv-avatar"
              onMouseEnter={() => {
                this.onChangeShowButton(true);
              }}
              onMouseLeave={() => {
                this.onChangeShowButton(false);
              }}
              style={{
                position: "absolute",
              }}
            >
              {show_button == true && (
                <div style={{ display: "flex " }} className="btnTheme">
                  <button
                    onClick={() => this.chooseTheme(v)}
                    style={{ margin: "10px auto" }}
                    type="button"
                    className={`btn  btn-sm ${
                      home_page_type !== v.index ? "show" : "hide"
                    }`}
                  >
                    Chọn
                  </button>
                  &nbsp;&nbsp;
                  <a href={v.demo_link} target="_blank">
                    {" "}
                    <button
                      style={{ margin: "10px auto" }}
                      type="button"
                      className={`btn  btn-sm ${
                        home_page_type !== v.index ? "show" : "hide"
                      }`}
                    >
                      Xem demo
                    </button>{" "}
                  </a>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => this.handleShowDetailTheme(v)}
                    style={{ margin: "10px auto" }}
                    type="button"
                    className={`btn  btn-sm ${
                      home_page_type !== v.index ? "show" : "hide"
                    }`}
                  >
                    Xem chi tiết
                  </button>
                  <a
                    href={this.props.badges.domain_customer}
                    target="_blank"
                    style={{ margin: "10px auto" }}
                    type="button"
                    className={`btnViewWeb btn btn-secondary btn-sm ${
                      home_page_type === v.index ? "show" : "hide"
                    }`}
                  >
                    Xem Website
                  </a>
                </div>
              )}
            </div>
            <div className="theme__title">
              <span>{v.name}</span>
              <div
                className="theme__title-actived"
                style={{
                  top: home_page_type === v.index ? "0" : "100%",
                }}
              >
                <span>Đã chọn: {v.name}</span>
                <a
                  onClick={this.props.goBack}
                  className="theme__title__btnActive"
                >
                  <span>Tùy chỉnh</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ItemThemeStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
    fetchAllBadge: (store_code, branch_id) => {
      dispatch(notificationAction.fetchAllBadge(store_code, branch_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemTheme);
