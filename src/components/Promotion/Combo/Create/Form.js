import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as comboAction from "../../../../actions/combo";
import Table from "./Table";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import moment from "moment";
import Datetime from "react-datetime";
import ModalListProduct from "./ListProduct";
import CKEditor from "ckeditor4-react";
import ModalUpload from "../ModalUpload";
import * as Env from "../../../../ultis/default";
import MomentInput from "react-moment-input";
import { formatNumber } from "../../../../ultis/helpers";
import { isEmpty } from "../../../../ultis/helpers";
import getChannel, { IKIPOS, IKITECH } from "../../../../ultis/channel";
import * as AgencyAction from "../../../../actions/agency";
import * as groupCustomerAction from "../../../../actions/group_customer";
import { typeGroupCustomer } from "../../../../ultis/groupCustomer/typeGroupCustomer";
import Select from "react-select";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtStart: "",
      txtEnd: "",
      txtAmount: "",
      txtContent: "",
      txtDiscoutType: 0,
      txtValueDiscount: "",
      listProducts: [],
      image: "",
      saveListProducts: [],
      displayError: "hide",
      group_customer: 0,
      agency_type_id: null,
      group_type_id: null,
      group_customers: [Types.GROUP_CUSTOMER_ALL],
      agency_types: [],
      group_types: [],
    };
  }
  componentDidMount() {
    this.props.initialUpload();
    try {
      document.getElementsByClassName("r-input")[0].placeholder =
        "Chọn ngày và thời gian";
      document.getElementsByClassName("r-input")[1].placeholder =
        "Chọn ngày và thời gian";
    } catch (error) {}

    this.props.fetchAllAgencyType(this.props.store_code);
    this.props.fetchGroupCustomer(this.props.store_code);
  }
  setListProducts = (listProducts) => {
    this.setState({ listProducts });
  };
  onSaveProduct = () => {
    this.setState({ saveListProducts: [...this.state.listProducts] });
  };
  componentWillReceiveProps(nextProps) {
    const { group_type_id } = this.state;
    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
    if (group_type_id === null && nextProps.groupCustomer?.length > 0) {
      this.setState({
        group_type_id: -1,
        agency_type_id: -1,
      });
    }
  }

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    const { group_customers } = this.state;
    if (name == "txtAmount" || name == "txtValueDiscount") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        if (name == "txtValueDiscount" && this.state.txtDiscoutType == "1") {
          if (value.length < 3) {
            if (value == 0) {
              this.setState({ [name]: "" });
            } else {
              this.setState({ [name]: value });
            }
          }
        } else {
          if (value == 0) {
            this.setState({ [name]: "" });
          } else {
            this.setState({ [name]: value });
          }
        }
      }
    } else if (name == `group_customer_${value}`) {
      const valueNumber = Number(value);
      let new_group_customers = [];

      if (group_customers.includes(valueNumber)) {
        new_group_customers = group_customers.filter(
          (group) => group !== valueNumber
        );
      } else {
        new_group_customers = [...group_customers, valueNumber];
      }

      this.setState({ group_customers: new_group_customers });
    } else {
      this.setState({ [name]: value });
    }
  };
  onChangeType = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value, txtValueDiscount: "" });
  };
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state;
    if (e != "" && txtEnd != "") {
      if (
        !moment(e, "DD-MM-YYYY HH:mm").isBefore(
          moment(txtEnd, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        console.log("hidddeee");
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtStart: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtStart } = this.state;

    if (txtStart != "" && e != "") {
      if (
        !moment(txtStart, "DD-MM-YYYY HH:mm").isBefore(
          moment(e, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtEnd: time,
    });
  };

  checkStatus = (start_time) => {
    var now = moment().valueOf();
    var start_time = moment(start_time, "YYYY-MM-DD HH:mm:ss").valueOf();
    if (now < start_time) {
      return "0";
    } else {
      return "2";
    }
  };

  onSave = (e) => {
    e.preventDefault();
    if (this.state.displayError == "show") {
      return;
    }
    var state = this.state;

    if (state.txtValueDiscount == null || !isEmpty(state.txtValueDiscount)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn giá trị giảm giá",
        },
      });
      return;
    }
    var { store_code, comboId } = this.props;

    var listProducts = state.saveListProducts;
    var combo_products = [];
    listProducts.forEach((element, index) => {
      combo_products.push({
        quantity: element.quantity,
        product_id: element.product.id,
      });
    });
    var startTime = moment(state.txtStart, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var endTime = moment(state.txtEnd, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    var {
      group_customer,
      agency_type_id,
      group_type_id,
      group_customers,
      agency_types,
      group_types,
    } = this.state;
    var agency_type_name =
      this.props.types.filter((v) => v.id === parseInt(agency_type_id))?.[0]
        ?.name || null;
    const agency_types_convert = agency_types.map((agency) => ({
      id: agency.value,
      name: agency.label,
    }));
    const group_types_convert = group_types.map((group) => ({
      id: group.value,
      name: group.label,
    }));

    var form = {
      group_customer,
      agency_type_id,
      agency_type_name,
      group_type_id,
      amount:
        state.txtAmount == null
          ? state.txtAmount
          : formatNumber(state.txtAmount),
      value_discount:
        state.txtValueDiscount == null
          ? state.txtValueDiscount
          : formatNumber(state.txtValueDiscount),
      name: state.txtName,
      start_time: startTime == "Invalid date" ? null : startTime,
      end_time: endTime == "Invalid date" ? null : endTime,
      combo_products: combo_products,
      description: state.txtContent,
      image_url: state.image,
      discount_type: state.txtDiscoutType,
      set_limit_amount: true,
      group_customers,
      agency_types: agency_types_convert,
      group_types: group_types_convert,
    };
    var amount = form.amount;
    if (typeof amount == "undefined" || amount == null || !isEmpty(amount))
      form.set_limit_amount = false;
    this.props.createCombo(store_code, form, this.checkStatus(startTime));
  };

  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };

  handleAddProduct = (product, id, type, onSave) => {
    var products = [...this.state.listProducts];
    console.log(products);

    if (type == "remove") {
      if (products.length > 0) {
        products.forEach((item, index) => {
          if (item.product.id === id) {
            products.splice(index, 1);
          }
        });
      }
    } else {
      var checkExsit = true;
      products.forEach((item, index) => {
        if (item.product.id === product.id) {
          checkExsit = false;
          return;
        }
      });
      if (checkExsit == true) {
        var product = { quantity: 1, product: product };
        products.push(product);
      }
    }
    if (onSave == true)
      this.setState({ listProducts: products, saveListProducts: products });
    else this.setState({ listProducts: products });
  };

  handleChangeQuantity = (id, quantity, setIncrement = null) => {
    var products = [...this.state.listProducts];
    products.forEach((product, index) => {
      if (product.product.id == id) {
        if (setIncrement == 1) products[index].quantity = product.quantity + 1;
        else if (setIncrement == -1) {
          if (product.quantity == 1) {
          } else products[index].quantity = product.quantity - 1;
        } else products[index].quantity = quantity;
      }
    });
    this.setState({ listProducts: products, saveListProducts: products });
  };

  convertOptions = (opts) => {
    if (opts?.length > 0) {
      const newOptions = opts.reduce(
        (prevOption, currentOption) => [
          ...prevOption,
          {
            value: currentOption.id,
            label: currentOption.name,
          },
        ],
        []
      );
      return newOptions;
    }
    return [];
  };

  handleChangeAgency = (agency) => {
    this.setState({ agency_types: [...agency] });
  };
  handleChangeGroupCustomer = (group) => {
    this.setState({ group_types: [...group] });
  };

  render() {
    var {
      txtName,
      txtStart,
      txtEnd,
      txtAmount,
      listProducts,
      txtContent,
      txtDiscoutType,
      txtValueDiscount,
      image,
      displayError,
      saveListProducts,
      group_customer,
      agency_type_id,
      group_type_id,

      group_customers,
      agency_types,
      group_types,
    } = this.state;

    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;
    var { products, store_code, combos, types, groupCustomer } = this.props;
    var type_discount_default = txtDiscoutType == "0" ? "show" : "hide";
    var type_discount_percent = txtDiscoutType == "1" ? "show" : "hide";

    console.log(this.state);
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div class="box-body">
                {/* {
                  getChannel() == IKITECH && (
                    <React.Fragment>
                      <div class="form-group">
                        <label>Ảnh: &nbsp; </label>
                        <img src={`${image}`} width="150" height="150" />
                      </div>
                      <div class="form-group">
                        <div class="kv-avatar">
                          <div>
                            <button
                              type="button"
                              class="btn btn-primary btn-sm"
                              data-toggle="modal"
                              data-target="#uploadModalCombo"
                            >
                              <i class="fa fa-plus"></i> Upload ảnh
                            </button>
                          </div>
                        </div>
                      </div>

                    </React.Fragment>
                  )
                } */}
                <div class="form-group">
                  <label for="product_name">Tên chương trình</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    value={txtName}
                    name="txtName"
                    placeholder="Nhập tên chương trình"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Thời gian bắt đầu</label>
                  <MomentInput
                    min={moment()}
                    format="DD-MM-YYYY HH:mm"
                    options={true}
                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}
                    translations={{
                      DATE: "Ngày",
                      TIME: "Giờ",
                      SAVE: "Đóng",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={this.onChangeStart}
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Thời gian kết thúc</label>
                  <MomentInput
                    min={moment()}
                    format="DD-MM-YYYY HH:mm"
                    options={true}
                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}
                    translations={{
                      DATE: "Ngày",
                      TIME: "Giờ",
                      SAVE: "Đóng",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={this.onChangeEnd}
                  />
                </div>
                <div class={`alert alert-danger ${displayError}`} role="alert">
                  Thời gian kết thúc phải sau thời gian bắt đầu
                </div>
              </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div class="box-body">
                <div className="form-group discount-for">
                  <label htmlFor="group_customer">Áp dụng cho</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "15px",
                      flexWrap: "wrap",
                    }}
                    className=""
                  >
                    {typeGroupCustomer.map((group) => (
                      <label
                        key={group.id}
                        htmlFor={group.title}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "5px",
                        }}
                      >
                        <input
                          type="checkbox"
                          name={`group_customer_${group.value}`}
                          checked={
                            group_customers.includes(group.value) ? true : false
                          }
                          className="group_customer"
                          id={group.title}
                          value={group.value}
                          onChange={this.onChange}
                        />
                        {group.title}
                      </label>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {group_customers.includes(Types.GROUP_CUSTOMER_AGENCY) ? (
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            width: "80px",
                          }}
                        >
                          Đại lý
                        </div>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <Select
                            options={this.convertOptions(types)}
                            placeholder={"Chọn đại lý"}
                            value={agency_types}
                            onChange={this.handleChangeAgency}
                            isMulti={true}
                            noOptionsMessage={() => "Không tìm thấy kết quả"}
                          ></Select>
                        </div>
                      </label>
                    ) : // <select
                    //   onChange={this.onChange}
                    //   value={agency_type_id}
                    //   name="agency_type_id"
                    //   class="form-control"
                    // >
                    //   <option value={-1}>--- Chọn cấp đại lý ---</option>
                    //   <option value={0}>Tất cả</option>
                    //   {types.map((v) => {
                    //     return (
                    //       <option value={v.id} key={v.id}>
                    //         {v.name}
                    //       </option>
                    //     );
                    //   })}
                    // </select>
                    null}
                    {group_customers.includes(
                      Types.GROUP_CUSTOMER_BY_CONDITION
                    ) ? (
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            width: "80px",
                          }}
                        >
                          Nhóm KH
                        </div>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <Select
                            options={this.convertOptions(groupCustomer)}
                            placeholder={"Chọn nhóm khách hàng"}
                            value={group_types}
                            onChange={this.handleChangeGroupCustomer}
                            isMulti={true}
                            noOptionsMessage={() => "Không tìm thấy kết quả"}
                          ></Select>
                        </div>
                      </label>
                    ) : // <select
                    //   onChange={this.onChange}
                    //   value={group_type_id}
                    //   name="group_type_id"
                    //   class="form-control"
                    // >
                    //   <option value={-1}>--- Chọn nhóm khách hàng ---</option>
                    //   {groupCustomer.length > 0 &&
                    //     groupCustomer.map((group) => {
                    //       return (
                    //         <option value={group.id} key={group.id}>
                    //           {group.name}
                    //         </option>
                    //       );
                    //     })}
                    // </select>
                    null}
                  </div>
                </div>
                <div class="form-group">
                  <label for="product_name">Giới hạn Combo</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtAmount"
                    name="txtAmount"
                    value={txtAmount}
                    placeholder="Số lượng mã phiểu có thể sử dụng"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Loại giảm giá</label>

                  <select
                    value={txtDiscoutType}
                    name="txtDiscoutType"
                    id="input"
                    class="form-control"
                    onChange={this.onChangeType}
                  >
                    <option value="0">Giảm giá cố định</option>
                    <option value="1">Giảm giá theo %</option>
                  </select>
                </div>
                <div class={`form-group ${type_discount_default}`}>
                  <input
                    type="text"
                    class="form-control"
                    id="txtValueDiscount"
                    name="txtValueDiscount"
                    value={txtValueDiscount}
                    placeholder="Nhập giá trị bạn muốn giảm (đ)"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div>

                <div className={`${type_discount_percent}`}>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="txtValueDiscount"
                      name="txtValueDiscount"
                      value={txtValueDiscount}
                      placeholder="Nhập giá trị bạn muốn giảm (%)"
                      autoComplete="off"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div>
                <Table
                  handleChangeQuantity={this.handleChangeQuantity}
                  handleAddProduct={this.handleAddProduct}
                  products={saveListProducts}
                ></Table>
              </div>
              {/* {getChannel() == IKITECH &&
                <div class="form-group">
                  <label for="product_name">Ghi chú</label>
                  <CKEditor
                    data={txtContent}
                    onChange={this.onChangeDecription}
                  />
                </div>
              } */}
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="box-footer">
                <button type="submit" class="btn btn-info   btn-sm">
                  <i class="fas fa-plus"></i> Tạo
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class="btn btn-warning   btn-sm"
                >
                  <i class="fas fa-arrow-left"></i> Trở về
                </button>
              </div>
            </div>
          </div>
        </form>

        <ModalUpload />
        <ModalListProduct
          onSaveProduct={this.onSaveProduct}
          discounts={combos}
          handleAddProduct={this.handleAddProduct}
          listProducts={listProducts}
          store_code={store_code}
          products={products}
          setListProducts={this.setListProducts}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.comboImg.combo_img,
    types: state.agencyReducers.agency.allAgencyType,
    groupCustomer:
      state.groupCustomerReducers.group_customer.groupCustomer.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    createCombo: (store_code, form, status) => {
      dispatch(comboAction.createCombo(store_code, form, status));
    },
    initialUpload: () => {
      dispatch(comboAction.initialUpload());
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    fetchGroupCustomer: (store_code) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
