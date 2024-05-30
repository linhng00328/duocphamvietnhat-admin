import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import CKEditor from "ckeditor4-react";
import * as Types from "../../../constants/ActionType";
import { isPhone, isEmpty } from "../../../ultis/helpers";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_address: "",
      contact_email: "",
      contact_phone_number: "",
      contact_time_work: "",
      contact_time_work: "",
      contact_individual_organization_name: "",
      contact_short_description: "",
      contact_business_registration_certificate: "",
      contact_info_bank: "",
      content_ministry_of_industry_and_trade: "",

      contact_fanpage: "",
      html_footer: "",
    };
  }

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ html_footer: data });
  };

  componentDidMount() {
    var theme = this.props.theme;
    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        contact_address: theme.contact_address,
        contact_email: theme.contact_email,
        contact_phone_number: theme.contact_phone_number,
        contact_time_work: theme.contact_time_work,
        contact_individual_organization_name:
          theme.contact_individual_organization_name,
        contact_short_description: theme.contact_short_description,
        contact_business_registration_certificate:
          theme.contact_business_registration_certificate,
        content_ministry_of_industry_and_trade:
          theme.content_ministry_of_industry_and_trade,
        contact_info_bank: theme.contact_info_bank,
        contact_fanpage: theme.contact_fanpage,
        html_footer: theme.html_footer,
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.tabId != this.props.tabId);
    if (
      !shallowEqual(nextProps.theme, this.props.them) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        contact_address: theme.contact_address,
        contact_email: theme.contact_email,
        contact_phone_number: theme.contact_phone_number,
        contact_time_work: theme.contact_time_work,
        contact_individual_organization_name:
          theme.contact_individual_organization_name,
        contact_short_description: theme.contact_short_description,
        contact_business_registration_certificate:
          theme.contact_business_registration_certificate,
        content_ministry_of_industry_and_trade:
          theme.content_ministry_of_industry_and_trade,
        contact_info_bank: theme.contact_info_bank,
        contact_fanpage: theme.contact_fanpage,
        html_footer: theme.html_footer,
      });
    }
  }

  onSave = (e) => {
    e.preventDefault();
    var theme = this.state;
    var { store_code } = this.props;
    var form = { ...this.props.theme };
    if (isEmpty(theme.contact_fanpage)) {
      var string = theme.contact_fanpage?.toString().replace(/ /g, "");
      console.log(string.slice(0, 7));
      if (
        string.slice(0, 8) !== "https://" &&
        string.slice(0, 7) !== "http://"
      ) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Link Fanpage không đúng định dạng!",
          },
        });
        return;
      }
    }
    form.contact_address = theme.contact_address;
    form.contact_email = theme.contact_email;
    form.contact_phone_number = theme.contact_phone_number;
    form.contact_time_work = theme.contact_time_work;
    form.contact_individual_organization_name =
      theme.contact_individual_organization_name;
    form.contact_short_description = theme.contact_short_description;
    form.contact_business_registration_certificate =
      theme.contact_business_registration_certificate;
    form.contact_info_bank = theme.contact_info_bank;
    form.content_ministry_of_industry_and_trade =
      theme.content_ministry_of_industry_and_trade;
    form.contact_fanpage = theme.contact_fanpage;
    form.html_footer = theme.html_footer;

    this.props.updateTheme(store_code, form);
  };
  render() {
    var {
      contact_address,
      contact_email,
      contact_phone_number,
      contact_time_work,
      contact_time_work,
      contact_individual_organization_name,
      contact_short_description,
      contact_business_registration_certificate,
      content_ministry_of_industry_and_trade,
      contact_info_bank,
      contact_fanpage,
      html_footer,
    } = this.state;
    return (
      <div className="support">
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>
            <div className="form-group">
              <label htmlFor="name">Địa chỉ</label>

              <textarea
                value={contact_address}
                onChange={this.onChange}
                name="contact_address"
                id="input"
                class="form-control"
                rows="4"
                required="required"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="name">Địa chỉ Email</label>
              <input
                type="email"
                name="contact_email"
                value={contact_email}
                placeholder="Nhập..."
                onChange={this.onChange}
                className="form-control"
                id="txtName"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Số điện thoại</label>
              <input
                type="tel"
                name="contact_phone_number"
                value={contact_phone_number}
                placeholder="Nhập..."
                onChange={this.onChange}
                className="form-control"
                id="txtName"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Thời gian làm việc</label>
              <input
                type="text"
                name="contact_time_work"
                value={contact_time_work}
                placeholder="Nhập..."
                onChange={this.onChange}
                className="form-control"
                id="txtName"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Tên cá nhân hoặc tổ chức</label>
              <textarea
                type="text"
                name="contact_individual_organization_name"
                value={contact_individual_organization_name}
                rows="4"
                placeholder="Nhập..."
                onChange={this.onChange}
                className="form-control"
                id="txtName"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Thông tin giấy đăng ký kinh doanh</label>
              <div class="form-group" style={{ display: "flex" }}>
                {/* <input type="tel" name="phone_number_hotline" value={phone_number_hotline} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />
                 */}

                <textarea
                  name="content_ministry_of_industry_and_trade"
                  id="input"
                  class="form-control"
                  rows="3"
                  onChange={this.onChange}
                  value={content_ministry_of_industry_and_trade}
                >
                  {content_ministry_of_industry_and_trade}
                </textarea>
              </div>
            </div>

            {/* <div className="form-group">
                            <label htmlFor="name">Link Fanpage</label>
                            <input type="text" name="contact_fanpage" value={contact_fanpage} placeholder="Vd: https://facebook.com/tenfanpage" onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />

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
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
