import React, { Component } from "react";
import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import { compressed } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmpty } from "../../ultis/helpers";
import CurrencyInput from "react-currency-input-field";
import { AsyncPaginate } from "react-select-async-paginate";
import * as customerAction from "../../actions/customer";
import Select from "react-select";
import "./style.css";
import themeData from "../../ultis/theme_data";

class ModalExpenditures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_method: null,
      change_money: 0,
      type: null,
      recipient_group: null,
      recipient_references_id: null,

      allow_accounting: true,
      description: "",
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
    if (this.props.customer) {
      this.setState({
        recipient_group: this.state.listRecipientGroup[0],
        recipient_references_id: {
          value: this.props.customer.id,
          label: this.props.customer.name,
        },
      });
    }
    if (this.props.supplierID) {
      this.setState({
        recipient_group: this.state.listRecipientGroup[1],
        recipient_references_id: {
          value: this.props.supplierID.id,
          label: this.props.supplierID.name,
        },
      });
    }
    var staff = [...this.props.staff];
    // var supplier = [...this.props.supplier];
    // var customers = [...this.props.customers];

    if (staff?.length > 0) {
      options1 = staff.map((value, index) => {
        return {
          value: value.id,
          label: `${value.name}  (${value.phone_number})`,
        };
      });
      this.setState({ listStaff: options1 });
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
    if (
      !shallowEqual(
        nextProps.revenueExpenditures,
        this.props.revenueExpenditures
      )
    ) {
      window.$(".modal").modal("hide");

      this.setState({
        payment_method: null,
        change_money: 0,
        type: null,
        recipient_group: null,

        recipient_references_id: null,
        allow_accounting: true,
        description: "",
      });
    }
    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      var options1 = [];

      var staff = [...this.props.staff];

      if (staff?.length > 0) {
        options1 = staff.map((value, index) => {
          return {
            value: value.id,
            label: `${value.name}  (${value.phone_number})`,
          };
        });
        this.setState({ listStaff: options1 });
      }
    }
  }
  onChangeSelect1 = (selectValue) => {
    this.setState({ payment_method: selectValue });
  };
  onChangeSelect2 = (selectValue) => {
    this.setState({ type: selectValue });
  };
  onChangeSelect3 = (selectValue) => {
    this.setState({
      recipient_group: selectValue,
      recipient_references_id: null,
    });
  };
  onChangeSelect4 = (selectValue) => {
    this.setState({ recipient_references_id: selectValue });
  };
  onChangeSelect5 = (selectValue) => {
    this.setState({ recipient_references_id: selectValue });
  };
  loadOptions1 = async (search, loadedOptions, { page }) => {
    const { store_code } = this.props;
    const params = `&search=${search}`;
    const res = await this.props.fetchAllCustomer(store_code, page, params);

    return {
      options: this.props.customers.data.map((i) => {
        return { value: i.id, label: `${i.name}  (${i.phone_number})` };
      }),

      hasMore:
        this.props.customers.current_page !== this.props.customers.last_page,
      additional: {
        page: page + 1,
      },
    };
  };

  loadOptions2 = async (search, loadedOptions, { page }) => {
    const { store_code } = this.props;
    const params = `&search=${search}`;
    const res = await this.props.fetchAllSupplier(store_code, page, params);

    return {
      options: this.props.supplier.data.map((i) => {
        return { value: i.id, label: `${i.name}  (${i.phone})` };
      }),
      hasMore:
        this.props.supplier.current_page !== this.props.supplier.last_page,
      additional: {
        page: page + 1,
      },
    };
  };
  onSave = async (e) => {
    e.preventDefault();
    // window.$('.modal').modal('hide');
    const { is_revenue } = this.props;
    const {
      payment_method,
      change_money,
      type,
      recipient_group,
      recipient_references_id,
      allow_accounting,
      description,
    } = this.state;
    if (payment_method == null || typeof payment_method == undefined) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Hình thức thanh toán không được để trống",
        },
      });
      return;
    }
    if (change_money == null || !isEmpty(change_money)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Giá trị chi không được để trống",
        },
      });
      return;
    }

    if (type === null || typeof type === undefined) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Loại phiếu chi không được để trống",
        },
      });
      return;
    }
    if (recipient_group == null || typeof recipient_group === undefined) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhóm người nhận không được để trống",
        },
      });
      return;
    }
    if (
      (recipient_references_id == null && recipient_group.value !== 3) ||
      (typeof recipient_references_id === undefined &&
        recipient_group.value !== 3)
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Người nhận không được để trống",
        },
      });
      return;
    }

    var paymentMethodValue = payment_method.value;
    var typeValue = type.value;
    var recipientGroupValue = recipient_group.value;
    var recipientReferencesIdValue = recipient_references_id?.value
      ? recipient_references_id?.value
      : null;
    console.log({
      is_revenue,
      payment_method: paymentMethodValue,
      change_money,
      type: typeValue,
      recipient_group: recipientGroupValue,
      recipient_references_id: recipientReferencesIdValue,
      allow_accounting,
      description,
    });
    var funcModal = null;
    var getForId = null;
    if (this.props.notDate == true && this.props.customer) {
      getForId = true;
      var params = `&recipient_group=0&recipient_references_id=${this.props.customer.id}`;
      funcModal = function () {
        window.$(".modal").modal("hide");
      };
    } else if (this.props.notDate == true && this.props.supplierID) {
      getForId = true;
      funcModal = function () {
        window.$(".modal").modal("hide");
      };
      var params = `&recipient_group=1&recipient_references_id=${
        this.props.supplierID.id || 0
      }`;
    } else {
      getForId = false;
      funcModal = function () {
        window.$(".modal").modal("hide");
      };
      var params = `&search=${this.props.searchValue}&limit=${this.props.limit}&date_from=${this.props.datePrime.from}&date_to=${this.props.datePrime.to}`;
    }

    this.props.createRevenueExpenditures(
      this.props.store_code,
      this.props.branch_id,
      {
        is_revenue,
        payment_method: paymentMethodValue,
        change_money,
        type: typeValue,
        recipient_group: recipientGroupValue,
        recipient_references_id: recipientReferencesIdValue,
        allow_accounting,
        description,
      },
      params,
      funcModal,
      getForId == true ? this.props.getFor : null,
      this
    );
  };

  render() {
    const { is_revenue } = this.props;
    const {
      payment_method,
      change_money,
      type,
      recipient_group,
      recipient_references_id,
      allow_accounting,
      description,
      listStaff,

      listPaymentMethod,
      listType,
      listRecipientGroup,
    } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalExpenditures"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thêm phiếu chi</h4>

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
                <div class="form-group">
                  <label>Hình thức thanh toán</label>
                  <Select
                    isClearable
                    isSearchable
                    placeholder="-- Chọn hình thức thanh toán --"
                    value={payment_method}
                    options={listPaymentMethod}
                    name="paymentMethod"
                    onChange={this.onChangeSelect1}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="validationCustom01">Giá trị chi</label>

                  <CurrencyInput
                    intlConfig={{ locale: "vi-VN", currency: "VND" }}
                    id="input-example"
                    name="changeMoney"
                    className={`form-control`}
                    value={change_money || 0}
                    min={0}
                    allowDecimals={true}
                    step={1}
                    onValueChange={(value) => {
                      this.setState({
                        change_money: parseInt(value),
                      });
                    }}
                    placeholder="Please enter a number"
                  />
                </div>

                <div class="form-group">
                  <label>Loại phiếu chi</label>
                  <Select
                    isClearable
                    isSearchable
                    placeholder="-- Chọn loại phiếu chi --"
                    value={type}
                    options={listType}
                    name="listType"
                    onChange={this.onChangeSelect2}
                  />
                </div>
                <div class="form-group">
                  <label>Chọn nhóm người nhận</label>
                  <Select
                    isClearable
                    isSearchable
                    placeholder="-- Chọn nhóm người nhận --"
                    value={recipient_group}
                    options={listRecipientGroup}
                    name="recipientGroup"
                    onChange={this.onChangeSelect3}
                  />
                </div>
                {recipient_group?.value !== 3 && (
                  <div class="form-group">
                    {recipient_group?.value === 2 && (
                      <>
                        <label>Chọn người nhận</label>
                        <Select
                          isClearable
                          isSearchable
                          placeholder="-- Chọn người nhận --"
                          value={recipient_references_id}
                          options={listStaff}
                          name="recipientReferences"
                          onChange={this.onChangeSelect4}
                        />
                      </>
                    )}
                    {recipient_group?.value === 0 && (
                      <>
                        <label>Chọn người nhận</label>
                        <AsyncPaginate
                          placeholder="-- Chọn người nhận --"
                          value={recipient_references_id}
                          loadOptions={this.loadOptions1}
                          // loadOptions={this.loadOptions1}
                          name="recipientReferences1"
                          onChange={this.onChangeSelect4}
                          additional={{
                            page: 1,
                          }}
                          debounceTimeout={500}
                          isClearable
                          isSearchable
                        />
                      </>
                    )}
                    {recipient_group?.value === 1 && (
                      <>
                        <label>Chọn người nhận</label>
                        <AsyncPaginate
                          placeholder="-- Chọn người nhận --"
                          value={recipient_references_id}
                          loadOptions={this.loadOptions2}
                          // loadOptions={this.loadOptions1}
                          name="recipientReferences2"
                          onChange={this.onChangeSelect4}
                          additional={{
                            page: 1,
                          }}
                          debounceTimeout={500}
                          isClearable
                          isSearchable
                        />
                      </>
                    )}
                  </div>
                )}

                {recipient_group?.value === 3 && null}
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
                        Tính phiếu chi này vào báo cáo tài chính lỗ lãi
                      </p>
                    </div>
                    <div class="col-12 col-lg-3 p-0 d-flex align-items-center justify-content-end ">
                      <input
                        type="checkbox"
                        className="switchCustom"
                        // value={payment_method}
                        checked={allow_accounting === true ? true : false}
                        name="allowAccounting"
                        onChange={() => {
                          this.setState({
                            allow_accounting: !this.state.allow_accounting,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Mô tả</label>

                  <textarea
                    name="description"
                    onChange={this.onChange}
                    value={description}
                    id="input"
                    class="form-control"
                    rows="3"
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
                <button type="submit" class="btn btn-warning">
                  Tạo
                </button>
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
    // revenueExpenditures:
    //   state.revenueExpendituresReducers.revenueExpenditures
    //     .allRevenueExpenditures,

    customers: state.customerReducers.customer.allCustomer,
    supplier: state.storeReducers.store.supplier,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    createRevenueExpenditures: (
      id,
      branch_id,
      data,
      params,
      funcModal,
      getForId = null,
      _this
    ) => {
      dispatch(
        revenueExpendituresAction.createRevenueExpenditures(
          id,
          branch_id,
          data,
          params,
          funcModal,
          getForId,
          _this
        )
      );
    },
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchAllSupplier: (store_code, page, params) => {
      dispatch(
        revenueExpendituresAction.fetchAllSupplier(store_code, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalExpenditures);
