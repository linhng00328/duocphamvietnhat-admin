import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../../ultis/theme_data";
import * as agencyAction from "../../../actions/agency";
import Flatpickr from "react-flatpickr";
import moment from "moment";
class ModalAutoSetLevelAgencyAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_from: "",
      date_to: "",
    };
  }

  onSave = () => {
    const { onAutoSetLevelAgencyType } = this.props;
    const { date_from, date_to } = this.state;
    onAutoSetLevelAgencyType(
      date_from,
      date_to,
      () => {
        this.setState({
          date_from: "",
          date_to: "",
        });
      },
      "all"
    );
  };
  onchangeDateFrom = (from, to) => {
    const fromDate = from
      ? moment(from, "DD-MM-YYYY").format("DD-MM-YYYY")
      : "";
    const toDate = to ? moment(to, "DD-MM-YYYY").format("DD-MM-YYYY") : "";
    this.setState({
      date_from: fromDate ? fromDate : "",
      date_to: toDate ? toDate : "",
    });
  };
  onClose = () => {
    this.setState({
      date_from: "",
      date_to: "",
    });
  };
  render() {
    const { date_from, date_to } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="autoSetLevelAgencyAll"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>
                Tự động cập nhập cấp theo doanh số
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.onClose}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p
                style={{
                  fontSize: "16px",
                }}
              >
                Các cấp đại lý sẽ được đặt lại theo doanh số nhập hàng và hoa
                hồng đã được thiết lập
              </p>
              <div>
                <Flatpickr
                  data-enable-time
                  value={[
                    new Date(moment(date_from, "DD-MM-YYYY")),
                    new Date(moment(date_to, "DD-MM-YYYY")),
                  ]}
                  className="date_from"
                  placeholder="Chọn khoảng thời gian đối soát doanh số"
                  options={{
                    altInput: true,
                    dateFormat: "DD-MM-YYYY",
                    altFormat: "DD-MM-YYYY",
                    allowInput: true,
                    enableTime: false,
                    mode: "range",
                    parseDate: (datestr, format) => {
                      return moment(datestr, format, true).toDate();
                    },
                    formatDate: (date, format, locale) => {
                      // locale can also be used
                      return moment(date).format(format);
                    },
                  }}
                  onChange={([from, to]) => this.onchangeDateFrom(from, to)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={this.onClose}
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-warning"
                onClick={this.onSave}
                disabled={!date_from || !date_to}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAutoSetLevelAgencyAll;
