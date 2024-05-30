import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../../../components/Partials/Alert";
import Footer from "../../../../components/Partials/Footer";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import * as Types from "../../../../constants/ActionType";
import * as reportAction from "../../../../actions/report";
import { MomentInput } from "react-moment-input";
import moment from "moment";
import ProfitTotal from "./ProfitTotal";
import { format } from "../../../../ultis/helpers";
import { getBranchId } from "../../../../ultis/branchUtils";
import history from "../../../../history";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { getQueryParams } from "../../../../ultis/helpers";

class ReportProfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtStart: "",
      txtEnd: "",
      time_from: "",
      time_to: "",
    };
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    var from = getQueryParams("from");
    var to = getQueryParams("to");
    var date_from = getQueryParams("date_from");
    var date_to = getQueryParams("date_to");
    var params = `branch_id=${branch_id}`;

    if (from && to) {
      params =
        params +
        `&date_from=${moment(from, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )}&date_to=${moment(to, "DD-MM-YYYY").format("YYYY-MM-DD")}`;
      this.setState({
        time_from: moment(from, "DD-MM-YYYY").format("YYYY-MM-DD"),
        time_to: moment(to, "DD-MM-YYYY").format("YYYY-MM-DD"),
      });
    } else if (date_from && date_to) {
      params += `&date_from=${date_from}&date_to=${date_to}`;
      this.setState({
        time_from: date_from,
        time_to: date_to,
      });
    } else {
      params =
        params +
        `&date_from=${moment().format("YYYY-MM-DD")}&date_to=${moment().format(
          "YYYY-MM-DD"
        )}`;
      this.setState({
        time_from: moment().format("YYYY-MM-DD"),
        time_to: moment().format("YYYY-MM-DD"),
      });
    }

    this.props.fetchReportProfit(store_code, branch_id, params);
    try {
      document.getElementsByClassName("r-input")[0].placeholder = "Chọn ngày";
      document.getElementsByClassName("r-input")[1].placeholder = "Chọn ngày";
    } catch (error) {}
  }

  handleFindItem = () => {
    const branch_id = getBranchId();
    const params = `date_from=${this.state.txtStart}&date_to=${this.state.txtEnd}&branch_id=${branch_id}`;
    const { store_code } = this.props.match.params;
    this.props.fetchReportProfit(store_code, branch_id, params);
  };

  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.setState({
      txtStart: time,
    });
  };
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      from = null;
      to = null;
    }

    const branch_id = getBranchId();
    var params = `branch_id=${branch_id}`;
    const { store_code } = this.props.match.params;
    if ((from, to)) {
      params = `&date_from=${from}&date_to=${to}`;
    }

    this.props.fetchReportProfit(store_code, branch_id, params);
    this.setState({ time_from: from, time_to: to });
  };
  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.setState({
      txtEnd: time,
    });
  };
  goBack = () => {
    history.goBack();
  };

  render() {
    var { time_from, time_to } = this.state;
    var { store_code } = this.props.match.params;
    const reportProfit = this.props.reportProfit;

    const reportProfitData = [
      {
        id: 1,
        step: 0,
        title: "I. Doanh thu bán hàng(1 + 2 + 3 - 4 - 5 - 6 - 7)",
        value: format(Number(reportProfit.sales_revenue)),
      },
      {
        id: 2,
        step: 1,
        title: "1. Tiền hàng thực bán (1a - 1b)",
        value: format(
          Number(reportProfit.money_sales) - Number(reportProfit.money_back)
        ),
      },
      {
        id: 3,
        step: 2,
        title: "a. Tiền hàng bán ra",
        value: format(Number(reportProfit.money_sales)),
      },
      {
        id: 4,
        step: 2,
        title: "b. Tiền hàng trả lại",
        value: format(Number(reportProfit.money_back)),
      },
      {
        id: 5,
        step: 1,
        title: "2. Thuế VAT",
        value: format(Number(reportProfit.tax_vat)),
      },
      {
        id: 6,
        step: 1,
        title: "3. Phí giao hàng thu của khách",
        value: format(Number(reportProfit.customer_delivery_fee)),
      },
      {
        id: 7,
        step: 1,
        title: "4. Chiết khấu",
        value: format(Number(reportProfit.discount)),
      },
      {
        id: 18,
        step: 1,
        title: "5. Giảm giá sản phẩm",
        value: format(Number(reportProfit.product_discount)),
      },
      {
        id: 19,
        step: 1,
        title: "6. Giảm giá Combo",
        value: format(Number(reportProfit.combo)),
      },
      {
        id: 20,
        step: 1,
        title: "7. Giảm giá Voucher",
        value: format(Number(reportProfit.voucher)),
      },
      // {
      //   id: 21,
      //   step: 1,
      //   title: "8. Chiết khấu đơn hàng",
      //   value: format(Number(reportProfit.discount)),
      // },
      {
        id: 8,
        step: 0,
        title: "II. Chi phí bán hàng (1 + 2 + 3)",
        value: format(Number(reportProfit.selling_expenses)),
      },
      {
        id: 9,
        step: 1,
        title: "1. Chi phí giá vốn hàng hóa",
        value: format(Number(reportProfit.cost_of_sales)),
      },
      {
        id: 10,
        step: 1,
        title: "2. Thanh toán bằng xu",
        value: format(Number(reportProfit.pay_with_points)),
      },
      {
        id: 11,
        step: 1,
        title: "3. Phí giao hàng trả đối tác",
        value: format(Number(reportProfit.partner_delivery_fee)),
      },
      {
        id: 12,
        step: 0,
        title: "III. Thu nhập khác",
        value: format(Number(reportProfit.other_income)),
      },
      {
        id: 13,
        step: 1,
        title: "1. Phiếu thu khác hạch toán kết quả kinh doanh",
        value: format(Number(reportProfit.other_income)),
      },
      // {
      //   id: 14,
      //   step: 1,
      //   title: "2. Phí khách trả hàng",
      //   value: format(Number(reportProfit.customer_return)),
      // },
      {
        id: 15,
        step: 0,
        title: "IV. Chi phí khác",
        value: format(Number(reportProfit.other_costs)),
      },
      {
        id: 16,
        step: 1,
        title: "1. Phiếu chi khác hạch toán kết quả kinh doanh",
        value: format(Number(reportProfit.other_costs)),
      },
      {
        id: 17,
        step: 0,
        title: "Lợi nhuận (I + III - II - IV)",
        value: format(Number(reportProfit.profit)),
        isTotal: true,
      },
    ];
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div
                  className="stock-title text-success"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Báo cáo lãi lỗ</h4>
                  <button
                    style={{ marginBottom: "10px" }}
                    type="button"
                    onClick={this.goBack}
                    class="btn btn-warning  btn-sm"
                  >
                    <i class="fas fa-arrow-left"></i>&nbsp;Quay lại
                  </button>
                </div>

                <ProfitTotal reportProfit={reportProfit} />
                <div className="card">
                  <div className="card-header py-3">
                    <div className="wap-header" style={{ display: "flex" }}>
                      <DateRangePickerComponent
                        value={[
                          new Date(moment(time_from, "YYYY-MM-DD")),
                          new Date(moment(time_to, "YYYY-MM-DD")),
                        ]}
                        id="daterangepicker"
                        placeholder="Khoảng thời gian..."
                        format="dd/MM/yyyy"
                        onChange={this.onchangeDateFromTo}
                      />
                      {/* <div class="form-group" style={{ display: "flex", alignItems: "center" }}>
                                                
                                                <label for="product_name" style={{ marginRight: "20px" }}>Ngày bắt đầu</label>
                                                <MomentInput
                                                    placeholder="Chọn thời gian"
                                                    format="DD-MM-YYYY"
                                                    options={true}
                                                    enableInputClick={true}
                                                    monthSelect={true}
                                                    readOnly={true}
                                                    translations={
                                                        { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                                                    }
                                                    onSave={() => { }}
                                                    onChange={this.onChangeStart}
                                                />
                                            </div>
                                            <div class="form-group" style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                                                <label for="product_name" style={{ marginRight: "20px" }}>Ngày kết thúc</label>
                                                <MomentInput
                                                    placeholder="Chọn thời gian"
                                                    format="DD-MM-YYYY"
                                                    options={true}
                                                    enableInputClick={true}
                                                    monthSelect={true}
                                                    readOnly={true}
                                                    translations={
                                                        { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                                                    }
                                                    onSave={() => { }}
                                                    onChange={this.onChangeEnd}
                                                />
                                            </div> */}
                      {/* <button className='btn btn-primary btn-sm' style={{ marginLeft: "20px", marginBottom: "10px" }} onClick={this.handleFindItem}>Tìm kiếm</button> */}
                    </div>
                  </div>
                  {/* <div className="card-body info-report">
                    <div className="row">
                      <div className="col-6">
                        <div
                          class="form-group"
                          style={{ fontSize: "15px", borderRight: "1px solid" }}
                        >
                          <div
                            class="info-badge  badge-report"
                            style={{ width: "95%" }}
                          >
                            <p
                              class="title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "500",
                              }}
                            >
                              <p> Doanh thu bán hàng (1): </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.sales_revenue))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Tiền hàng bán ra: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.money_sales))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Tiền hàng trả lại: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.money_back))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Thuế VAT: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.tax_vat))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Phí giao hàng thu của khách: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(
                                    Number(reportProfit.customer_delivery_fee)
                                  )}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Chiết khấu: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.discount))}
                                </span>
                              </span>
                            </p>

                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Giảm giá sản phẩm: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(
                                    Number(reportProfit.product_discount)
                                  )}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Giảm giá Combo: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.combo))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Giảm giá Voucher: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.voucher))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Chiết khấu đơn hàng: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.discount))}
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group" style={{ fontSize: "15px" }}>
                          <div class="info-badge  badge-report">
                            <p
                              class="title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "500",
                              }}
                            >
                              <p> Chi phí bán hàng (2): </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.cost_of_sales))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Giá vốn hàng hóa: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(
                                    Number(reportProfit.selling_expenses)
                                  )}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Thanh toán bằng điểm: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.pay_with_points))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Phí giao hàng trả đối tác: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(
                                    Number(reportProfit.partner_delivery_fee)
                                  )}
                                </span>
                              </span>
                            </p>
                            <p
                              class="title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "500",
                              }}
                            >
                              <p> Thu nhập khác (3): </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.other_costs))}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Phiếu thu tự tạo: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(
                                    Number(reportProfit.revenue_auto_create)
                                  )}
                                </span>
                              </span>
                            </p>
                            <p
                              class=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p> Phí khách hàng trả: </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.customer_return))}
                                </span>
                              </span>
                            </p>
                            <p
                              class="title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "500",
                              }}
                            >
                              <p> Chi phí khác (4): </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.other_costs))}
                                </span>
                              </span>
                            </p>

                            <p
                              class="title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "500",
                              }}
                            >
                              <p> Lợi nhuận (1-2+3-4): </p>
                              <span id="user_tel">
                                <span className="total-final">
                                  {format(Number(reportProfit.profit))}
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="card-body info-report">
                    <table class="table table-striped">
                      <thead
                        style={{
                          backgroundColor: "#0462a5",
                          color: "white",
                        }}
                      >
                        <tr>
                          <th scope="col">Chỉ tiêu báo cáo</th>
                          <th scope="col">Chi phí</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportProfitData.map((data) => (
                          <tr key={data.id}>
                            {data.step === 0 ? (
                              <th
                                scope="row"
                                style={{
                                  color: data.isTotal ? "#119f9f" : "initial",
                                }}
                              >
                                {data.title}
                              </th>
                            ) : (
                              <td
                                style={{
                                  paddingLeft: `calc(25px * ${data.step})`,
                                }}
                              >
                                {data.title}
                              </td>
                            )}

                            <td
                              style={{
                                color: data.isTotal ? "#119f9f" : "initial",
                              }}
                            >
                              {data.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reportProfit: state.reportReducers.reportProfit,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportProfit: (store_code, branch_id, params) => {
      dispatch(reportAction.fetchReportProfit(store_code, branch_id, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportProfit);
