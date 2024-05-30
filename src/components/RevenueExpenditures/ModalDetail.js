import React, { Component } from "react";
import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import { compressed } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmpty } from "../../ultis/helpers";
import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import "./style.css";
import themeData from "../../ultis/theme_data";
import { Link } from "react-router-dom";
import history from "../../history";
class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPaymentMethod: [
        {
          value: 0,
          label: "Tiền mặt",
        },
        {
          value: 1,
          label: "Quẹt thẻ",
        },
        {
          value: 2,
          label: "Cod",
        },
        {
          value: 3,
          label: "Chuyển khoản",
        },
      ],
      listType: [
        {
          value: 0,
          label: "Thanh toán cho đơn hàng",
        },
        {
          value: 1,
          label: "Thu nhập khác",
        },
        {
          value: 2,
          label: "Tiền thưởng",
        },
        {
          value: 3,
          label: "Khởi tạo kho",
        },
        {
          value: 4,
          label: "Cho thuê tài sản",
        },
        {
          value: 5,
          label: "Nhượng bán thanh lý tài sản",
        },
        {
          value: 6,
          label: "Thu nợ khách hàng",
        },
        {
          value: 10,
          label: "Chi phí khác",
        },
        {
          value: 17,
          label: "Thanh toán cho đơn nhập hàng",
        },
        {
          value: 11,
          label: "Chi phí sản phẩm",
        },
        {
          value: 12,
          label: "Chi phí nguyên vật liệu",
        },
        {
          value: 13,
          label: "Chi phí sinh hoạt",
        },
        {
          value: 14,
          label: "Chi phí nhân công",
        },
        {
          value: 15,
          label: "Chi phí bán hàng",
        },
        {
          value: 16,
          label: "Chi phí quản lý cửa hàng",
        },
      ],
      listRecipientGroup: [
        {
          value: 0,
          label: "Nhóm khách hàng",
        },
        {
          value: 1,
          label: "Nhóm nhà cung cấp",
        },
        {
          value: 2,
          label: "Nhóm nhân viên",
        },
        {
          value: 3,
          label: "Đối tượng khác",
        },
      ],
      listStaff: [],
    };
  }

  componentDidMount() {
    var options1 = [];

    var staff = [...this.props.staff];

    if (staff.length > 0) {
      options1 = staff.map((value, index) => {
        return {
          value: value.id,
          label: value.name,
        };
      });
      this.setState({ listStaff: options1 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(
        nextProps.revenue_expenditure_id,
        this.props.revenue_expenditure_id
      )
    ) {
      window.$(".modal").modal("hide");
      const { revenue_expenditure_id, store_code, branch_id } = nextProps;
      this.props.fetchRevenueExpendituresById(
        store_code,
        branch_id,
        revenue_expenditure_id
      );
      if (!shallowEqual(nextProps.staff, this.props.staff)) {
        var options1 = [];

        var staff = [...this.props.staff];

        if (staff.length > 0) {
          options1 = staff.map((value, index) => {
            return {
              value: value.id,

              label: `${value.name} + ${value.phone_number}`,
            };
          });
          this.setState({ listStaff: options1 });
        }
      }
    }
  }

  render() {
    const { revenueExpendituresDetail, revenue_expenditure_id, store_code } =
      this.props;
    var action_create =
      revenueExpendituresDetail.action_create == 9 ||
      revenueExpendituresDetail.action_create == 5 ||
      revenueExpendituresDetail.action_create == 6 ||
      revenueExpendituresDetail.action_create == 7 ||
      revenueExpendituresDetail.action_create == 8 ||
      revenueExpendituresDetail.action_create == 10 ||
      revenueExpendituresDetail.action_create == 11
        ? true
        : false;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalDetail"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">{revenueExpendituresDetail?.code}</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="createForm"
            >
              <div class="modal-body">
                {action_create === true && (
                  <div class="" >
                    <label style={{ cursor: "pointer" }}>
                      {" "}
                      <a
                      style={{color : "green" ,fontWeight : 500 }}
                          onClick={()=>{
                            window.$(".modal").modal("hide");

                            history.push(
                              action_create
                              ? `/order/detail/${store_code}/${revenueExpendituresDetail.references_value}`
                              : "#"
                            )
                          }}
                      >
                        Mã đơn hàng:{" "}
                        #{revenueExpendituresDetail.references_value}
                      </a>
                    </label>
                  </div>
                )}

                <div class="form-group">
                  <label>Hình thức thanh toán</label>

                  <input
                    type="text"
                    class="inputModal"
                    disabled
                    value={
                      this.state.listPaymentMethod.find((x) => {
                        return (
                          x.value === revenueExpendituresDetail?.payment_method
                        );
                      })?.label
                    }
                  ></input>
                </div>
                <div class="form-group">
                  <label htmlFor="validationCustom01">
                    {revenueExpendituresDetail?.is_revenue
                      ? "Giá trị thu"
                      : "Giá trị chi"}
                  </label>

                  <CurrencyInput
                    intlConfig={{ locale: "vi-VN", currency: "VND" }}
                    id="input-example"
                    name="changeMoney"
                    className={`form-control`}
                    value={revenueExpendituresDetail?.change_money || 0}
                    min={0}
                    allowDecimals={true}
                    step={1}
                    disabled
                  />
                </div>

                <div class="form-group">
                  <label>
                    {" "}
                    {revenueExpendituresDetail?.is_revenue
                      ? "Loại phiếu thu"
                      : "Loại phiếu chi"}
                  </label>

                  <input
                    type="text"
                    class="inputModal"
                    disabled
                    value={
                      this.state.listType.find((x) => {
                        return x.value === revenueExpendituresDetail?.type;
                      })?.label
                    }
                  ></input>
                </div>
                <div class="form-group">
                  <label>Nhóm người nộp</label>

                  <input
                    type="text"
                    class="inputModal"
                    disabled
                    value={
                      this.state.listRecipientGroup.find((x) => {
                        return (
                          x.value === revenueExpendituresDetail?.recipient_group
                        );
                      })?.label
                    }
                  ></input>
                </div>
                {revenueExpendituresDetail?.recipient_group !== 3 && (
                  <div class="form-group">
                    <label>Người nộp</label>

                    <input
                      type="text"
                      class="inputModal"
                      disabled
                      value={
                        revenueExpendituresDetail?.recipient_group === 0
                          ? revenueExpendituresDetail?.customer.name
                          : revenueExpendituresDetail?.recipient_group === 1
                          ? revenueExpendituresDetail?.supplier.name
                          : revenueExpendituresDetail?.recipient_group === 2
                          ? this.state.listStaff.find((x) => {
                              return (
                                x.value ===
                                revenueExpendituresDetail?.recipient_references_id
                              );
                            })?.label
                          : null
                      }
                    ></input>
                  </div>
                )}
                {revenueExpendituresDetail?.recipient_group?.value === 3 &&
                  null}
                <div class="form-group">
                  <div
                    class="container d-flex  align-items-center justify-content-between mb-0"
                    style={{ marginTop: 0 }}
                  >
                    <div class="col-12 col-lg-9 p-0">
                      <p style={{ fontWeight: "bold", marginBottom: 0 }}>
                        Hạch toán kết quả kinh doanh
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        {revenueExpendituresDetail?.is_revenue
                          ? "Tính phiếu thu này vào báo cáo tài chính lỗ lãi"
                          : "Tính phiếu chi này vào báo cáo tài chính lỗ lãi"}
                      </p>
                    </div>
                    <div class="col-12 col-lg-3 p-0 d-flex align-items-center justify-content-end ">
                      <input
                        type="checkbox"
                        className="switchCustom"
                        // value={payment_method}
                        checked={revenueExpendituresDetail?.allow_accounting}
                        name="allowAccounting"
                        disabled
                        // onChange={() => {
                        //   this.setState({
                        //     allow_accounting: !this.state.allow_accounting,
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Ngày ghi nhận</label>

                  <input
                    type="text"
                    class="inputModal"
                    disabled
                    value={revenueExpendituresDetail?.created_at}
                  ></input>
                </div>
                <div class="form-group">
                  <label>Mô tả</label>

                  <textarea
                    name="description"
                    // onChange={this.onChange}
                    value={revenueExpendituresDetail?.description}
                    id="input"
                    class="form-control"
                    rows="3"
                    disabled
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                {/* <button type="submit" class="btn btn-info">
                        Tạo
                      </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    revenueExpendituresDetail:
      state.revenueExpendituresReducers.revenueExpenditures
        .revenueExpendituresDetail,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    fetchRevenueExpendituresById: (
      store_code,
      branch_id,
      revenue_expenditure_id
    ) => {
      dispatch(
        revenueExpendituresAction.fetchRevenueExpendituresById(
          store_code,
          branch_id,
          revenue_expenditure_id
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail);
