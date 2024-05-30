import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Types from "../../../constants/ActionType";
import { isPhone } from "../../../ultis/helpers";
class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_show_icon_hotline: null,
      phone_number_hotline: null,
      is_show_icon_email: null,
      email_contact: null,
      is_show_icon_facebook: null,
      id_facebook: null,
      is_show_icon_zalo: null,
      id_zalo: null,
      id_youtube: null,
      is_show_icon_youtube: null,
      id_tiktok: null,
      is_show_icon_tiktok: null,
      link_ministry_of_industry_and_trade: null,
      is_show_icon_ministry_of_industry_and_trade: null,
      content_ministry_of_industry_and_trade: null,
      contact_fanpage: null,
    };
  }

  componentDidMount() {
    var theme = this.props.theme;
    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        is_show_icon_hotline: theme.is_show_icon_hotline,
        phone_number_hotline:
          theme.phone_number_hotline == "null"
            ? null
            : theme.phone_number_hotline,
        is_show_icon_email: theme.is_show_icon_email,
        email_contact:
          theme.email_contact == "null" ? null : theme.email_contact,
        is_show_icon_facebook: theme.is_show_icon_facebook,
        id_facebook: theme.id_facebook == "null" ? null : theme.id_facebook,
        is_show_icon_zalo: theme.is_show_icon_zalo,
        id_zalo: theme.id_zalo == "null" ? null : theme.id_zalo,
        contact_fanpage: theme.contact_fanpage,
        is_show_icon_tiktok: theme.is_show_icon_tiktok,
        id_tiktok: theme.id_tiktok == "null" ? null : theme.id_tiktok,

        content_ministry_of_industry_and_trade:
          theme.content_ministry_of_industry_and_trade,

        id_youtube: theme.id_youtube == "null" ? null : theme.id_youtube,
        is_show_icon_youtube:
          theme.is_show_icon_youtube == "null"
            ? null
            : theme.is_show_icon_youtube,
        link_ministry_of_industry_and_trade:
          theme.link_ministry_of_industry_and_trade == "null"
            ? null
            : theme.link_ministry_of_industry_and_trade,
        is_show_icon_ministry_of_industry_and_trade:
          theme.is_show_icon_ministry_of_industry_and_trade == "null"
            ? null
            : theme.is_show_icon_ministry_of_industry_and_trade,
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onChangeStatus = (e) => {
    var target = e.target;
    var name = target.name;
    var checked = target.checked;
    this.setState({
      [name]: checked,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.tabId != this.props.tabId);
    if (
      !shallowEqual(nextProps.theme, this.props.them) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        is_show_icon_hotline: theme.is_show_icon_hotline,
        phone_number_hotline: theme.phone_number_hotline,
        // is_show_icon_email: theme.is_show_icon_email,
        // email_contact: theme.email_contact,
        contact_fanpage: theme.contact_fanpage,
        is_show_icon_facebook: theme.is_show_icon_facebook,
        id_facebook: theme.id_facebook,
        is_show_icon_zalo: theme.is_show_icon_zalo,
        id_zalo: theme.id_zalo,
        is_show_icon_tiktok: theme.is_show_icon_tiktok,
        id_tiktok: theme.id_tiktok,
        id_youtube: theme.id_youtube,
        is_show_icon_youtube: theme.is_show_icon_youtube,
        link_ministry_of_industry_and_trade:
          theme.link_ministry_of_industry_and_trade,
        is_show_icon_ministry_of_industry_and_trade:
          theme.is_show_icon_ministry_of_industry_and_trade,
        content_ministry_of_industry_and_trade:
          theme.content_ministry_of_industry_and_trade,
      });
    }
  }

  onSave = (e) => {
    e.preventDefault();
    var theme = this.state;

    var { store_code } = this.props;
    var form = { ...this.props.theme };

    form.is_show_icon_hotline = theme.is_show_icon_hotline;
    form.phone_number_hotline = theme.phone_number_hotline;
    // form.is_show_icon_email= theme.is_show_icon_email
    // form.email_contact= theme.email_contact
    form.is_show_icon_email = false;
    form.contact_fanpage = theme.contact_fanpage;
    form.email_contact = null;
    form.is_show_icon_facebook = theme.is_show_icon_facebook;
    form.id_facebook = theme.id_facebook;
    form.is_show_icon_zalo = theme.is_show_icon_zalo;
    form.id_zalo = theme.id_zalo;

    form.is_show_icon_tiktok = theme.is_show_icon_tiktok;
    form.id_tiktok = theme.id_tiktok;

    form.content_ministry_of_industry_and_trade =
      theme.content_ministry_of_industry_and_trade;
    form.id_youtube = theme.id_youtube;
    form.is_show_icon_youtube = theme.is_show_icon_youtube;
    form.link_ministry_of_industry_and_trade =
      theme.link_ministry_of_industry_and_trade;
    form.is_show_icon_ministry_of_industry_and_trade =
      theme.is_show_icon_ministry_of_industry_and_trade;

    this.props.updateTheme(store_code, form);
  };
  render() {
    var {
      is_show_icon_hotline,
      phone_number_hotline,
      is_show_icon_email,
      email_contact,
      is_show_icon_facebook,
      id_facebook,
      is_show_icon_zalo,
      id_zalo,
      id_tiktok,
      is_show_icon_tiktok,
      id_youtube,
      is_show_icon_youtube,
      link_ministry_of_industry_and_trade,
      is_show_icon_ministry_of_industry_and_trade,
      content_ministry_of_industry_and_trade,
      contact_fanpage,
    } = this.state;

    return (
      <div className="contact">
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div className="">
              <div className="form-group">
                <label htmlFor="name">Số điện thoại Hotline</label>
                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    type="tel"
                    name="phone_number_hotline"
                    value={phone_number_hotline}
                    placeholder="Nhập..."
                    onChange={this.onChange}
                    className="form-control"
                    id="txtName"
                    autoComplete="off"
                  />
                  <div class="form-check" style={{ margin: "auto 10px" }}>
                    <label class="form-check-label" for="gridCheck">
                      Hiển thị
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="is_show_icon_hotline"
                      checked={is_show_icon_hotline}
                      onChange={this.onChangeStatus}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">ID Fanpage FaceBook</label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    type="text"
                    name="id_facebook"
                    value={id_facebook}
                    placeholder="Nhập..."
                    onChange={this.onChange}
                    className="form-control"
                    id="txtName"
                    autoComplete="off"
                  />
                  <div class="form-check" style={{ margin: "auto 10px" }}>
                    <label class="form-check-label" for="gridCheck">
                      Hiển thị
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="is_show_icon_facebook"
                      checked={is_show_icon_facebook}
                      onChange={this.onChangeStatus}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Link Zalo</label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    type="text"
                    name="id_zalo"
                    value={id_zalo}
                    placeholder="Nhập..."
                    onChange={this.onChange}
                    className="form-control"
                    id="txtName"
                    autoComplete="off"
                  />
                  <div class="form-check" style={{ margin: "auto 10px" }}>
                    <label class="form-check-label" for="gridCheck">
                      Hiển thị
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="is_show_icon_zalo"
                      checked={is_show_icon_zalo}
                      onChange={this.onChangeStatus}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">ID Youtube</label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    type="text"
                    name="id_youtube"
                    value={id_youtube}
                    placeholder="Nhập..."
                    onChange={this.onChange}
                    className="form-control"
                    id="txtName"
                    autoComplete="off"
                  />
                  <div class="form-check" style={{ margin: "auto 10px" }}>
                    <label class="form-check-label" for="gridCheck">
                      Hiển thị
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="is_show_icon_youtube"
                      checked={is_show_icon_youtube}
                      onChange={this.onChangeStatus}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">ID Tiktok</label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    type="text"
                    name="id_tiktok"
                    value={id_tiktok}
                    placeholder="Nhập..."
                    onChange={this.onChange}
                    className="form-control"
                    id="txtName"
                    autoComplete="off"
                  />
                  <div class="form-check" style={{ margin: "auto 10px" }}>
                    <label class="form-check-label" for="gridCheck">
                      Hiển thị
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="is_show_icon_tiktok"
                      checked={is_show_icon_tiktok}
                      onChange={this.onChangeStatus}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Link đăng ký bộ công thương</label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    type="text"
                    name="link_ministry_of_industry_and_trade"
                    value={link_ministry_of_industry_and_trade}
                    placeholder="Vd: http://online.gov.vn/..."
                    onChange={this.onChange}
                    className="form-control"
                    id="txtName"
                    autoComplete="off"
                  />
                  <div class="form-check" style={{ margin: "auto 10px" }}>
                    <label class="form-check-label" for="gridCheck">
                      Hiển thị
                    </label>
                    <input
                      style={{ marginLeft: "10px" }}
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="is_show_icon_ministry_of_industry_and_trade"
                      checked={is_show_icon_ministry_of_industry_and_trade}
                      onChange={this.onChangeStatus}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Link Fanpage</label>
                <input
                  type="text"
                  name="contact_fanpage"
                  value={contact_fanpage}
                  placeholder="Vd: https://facebook.com/tenfanpage"
                  onChange={this.onChange}
                  className="form-control"
                  id="txtName"
                  autoComplete="off"
                />
              </div>
            </div>
            {/* <div className="col-6">
                          

                         
                        </div> */}
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info  btn-sm">
              <i class="fas fa-save"></i>
              &nbsp;&nbsp;Lưu
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
    showError: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Support);
