import React, { Component } from "react";
import { connect } from "react-redux";
import * as scheduleAction from "../../../actions/schedule";
import ListProduct from "../TableProduct";
import ListCProduct from "../TableC_Product";
import ListCBlog from "../TableC_Blog";
import * as productAction from "../../../actions/product";

import * as popupAction from "../../../actions/popup";
import ModalUpload from "../ModalUpload";
import ListBlog from "../TableBlog";
import Datetime from "react-datetime";
import moment from "moment";
import MomentInput from "react-moment-input";
import * as blogAction from "../../../actions/blog";
import * as categoryBAction from "../../../actions/category_blog";
import * as CategoryPAction from "../../../actions/category_product";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { isEmail, isEmpty, isPhone } from "../../../ultis/helpers";
import * as AgencyAction from "../../../actions/agency";
import * as groupCustomerAction from "../../../actions/group_customer";
import * as Types from "../../../constants/ActionType";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_of_month: 1,
      day_of_week: 0,
      description: "",
      group_customer: "0",
      status: 0,
      time_of_day: "00:00",
      time_run: moment(),
      time_run_near: "",
      title: "",
      type_schedule: "0",
      group_customer: 0,
      agency_type_id: null,
      type_action: "",
      product: "",
      category: "",
      blog: "",
      categoryBlog: "",
      link_url: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllAgencyType(this.props.store_code);
    this.props.fetchGroupCustomer(this.props.store_code);
  }

  componentWillReceiveProps(nextProps) {
    var { schedule } = this.props;
    if (!shallowEqual(nextProps.schedule, schedule)) {
      var link_url = "";

      nextProps.schedule.forEach((item) => {
        if (item.id == Number(nextProps.scheduleId)) {
          if (item.type_action == "LINK") {
            link_url = item.value_action;
          }
          this.setState({
            day_of_month: item.day_of_month,
            day_of_week: item.day_of_week,
            description: item.description,
            group_customer: item.group_customer,
            time_of_day: item.time_of_day,
            agency_type_id: item.agency_type_id,
            group_type_id: item.group_type_id,
            agency_type_name: item.agency_type_name,
            time_run: moment(item.time_run, "YYYY-MM-DD HH:mm:ss").format(
              "DD-MM-YYYY HH:mm:ss"
            ),
            time_run_near: item.time_run_near,
            title: item.title,
            type_schedule: item.type_schedule,
            type_action: item.type_action,
            link_url: link_url,
          });
        }
      });
    }
    if (
      !shallowEqual(
        nextProps._category_product,
        this.props._category_product
      ) ||
      !shallowEqual(nextProps._category_blog, this.props._category_blog) ||
      !shallowEqual(nextProps._product, this.props._product) ||
      !shallowEqual(nextProps._blog, this.props._blog)
    ) {
      var { type_action } = this.state;
      console.log(type_action, "heeeeeeeeeeeeeeeee");

      if (type_action != "") {
        switch (type_action) {
          case "PRODUCT":
            this.setState({ product: nextProps._product });
            break;
          case "POST":
            this.setState({ blog: nextProps._blog });
            break;
          case "CATEGORY_PRODUCT":
            this.setState({ category: nextProps._category_product });
            break;
          case "CATEGORY_POST":
            this.setState({ categoryBlog: nextProps._category_blog });
            break;
          default:
            break;
        }
      }
    }

    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  onChange = (e) => {
    var { value, name } = e.target;
    if (name == "type_schedule") {
      this.setState({
        [name]: value,
        time_of_day: "00:00",
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  showAllDayofMonth = () => {
    var numDays = moment().daysInMonth();
    var result = [];
    if (numDays > 0) {
      for (let index = 1; index < numDays + 1; index++) {
        result.push(<option value={index}>{index}</option>);
      }

      return result;
    } else {
      return null;
    }
  };

  fetchAllProduct = () => {
    this.props.fetchAllProduct(this.props.store_code);
  };
  fetchAllBlog = () => {
    this.props.fetchAllBlog(this.props.store_code);
  };
  fetchAllCProduct = () => {
    this.props.fetchAllCategoryP(this.props.store_code);
  };
  fetchAllCBlog = () => {
    this.props.fetchAllCategoryB(this.props.store_code);
  };
  handleAddProduct = (product) => {
    this.setState({
      product,
    });
  };

  handleAddCProduct = (category) => {
    this.setState({
      category,
    });
  };
  handleAddCBlog = (categoryBlog) => {
    this.setState({
      categoryBlog,
    });
  };
  handleAddBlog = (blog) => {
    this.setState({
      blog,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var {
      type_schedule,
      day_of_month,
      day_of_week,
      description,
      group_customer,
      status,
      time_of_day,
      time_run,
      time_run_near,
      title,
      type_schedule,
      type_action,
      image,
      link_url,
      product,
      category,
      blog,
      categoryBlog,
    } = this.state;
    var value_action = "";
    if (type_action == "LINK") value_action = link_url;
    else if (type_action == "PRODUCT") value_action = product.id;
    else if (type_action == "CATEGORY_PRODUCT") value_action = category.id;
    else if (type_action == "POST") value_action = blog.id;
    else if (type_action == "CATEGORY_POST") value_action = categoryBlog.id;
    else {
    }
    var { group_customer, agency_type_id, group_type_id } = this.state;
    var agency_type_name =
      this.props.types.filter((v) => v.id === parseInt(agency_type_id))?.[0]
        ?.name || null;
    var form = {
      group_customer,
      agency_type_id,
      agency_type_name,
      type_schedule,
      group_type_id,
      day_of_month,
      day_of_week,
      description,
      status,
      time_of_day,
      time_run:
        time_run != "" && time_run != null
          ? moment(time_run, "DD-MM-YYYY HH:mm:ss").format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : null,
      time_run_near,
      title,
      type_action: type_action,
      value_action: value_action,
    };
    if (
      this.state.title == null ||
      !isEmpty(this.state.title) ||
      !isEmpty(this.state.description)
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ thông tin tiêu đề và mô tả",
        },
      });
      return;
    }
    if (Number(type_schedule) == 0) {
      console.log("dadsasdasdadasd");
      form.time_of_day = null;
      form.day_of_week = null;
      form.day_of_month = null;
      form.time_run_near = null;
    } else if (Number(type_schedule) == 1) {
      form.time_run = null;
      form.day_of_week = null;
      form.day_of_month = null;
      form.time_run_near = null;
    } else if (Number(type_schedule) == 2) {
      form.time_run = null;
      form.day_of_month = null;
      form.time_run_near = null;
    } else {
      form.time_run = null;
      form.day_of_week = null;
      form.time_run_near = null;
    }
    var { scheduleId, store_code } = this.props;
    this.props.updateSchedule(scheduleId, form, store_code);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  onChangeDate = (e, name) => {
    console.log(
      `name:: ${name}, e:: ${moment(e, "DD-MM-YYYY HH:mm:ss").format(
        "DD-MM-YYYY HH:mm:ss"
      )}`
    );
    var time = "";
    switch (name) {
      case "time_run":
        time = moment(e, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
        break;
      case "time_of_day":
        time = moment(e, "HH:mm:ss").format("HH:mm:ss");
        break;
      default:
        break;
    }

    this.setState({
      [name]: time,
    });
  };
  render() {
    var {
      type_schedule,
      day_of_month,
      day_of_week,
      description,
      group_customer,
      time_of_day,
      time_run,
      title,
      agency_type_id,
      group_type_id,
    } = this.state;

    var { type_action, product, category, blog, categoryBlog, link_url } =
      this.state;
    var {
      store_code,
      products,
      category_product,
      blogs,
      category_blog,
      groupCustomer,
    } = this.props;

    var disable_oneDay = type_schedule == "0" ? "show" : "hide";
    var disable_everyDay = type_schedule == "1" ? "show" : "hide";
    var disable_everyWeek = type_schedule == "2" ? "show" : "hide";
    var disable_everyMonth = type_schedule == "3" ? "show" : "hide";
    var { types } = this.props;

    var disable_link = type_action == "LINK" ? "show" : "hide";
    var disable_post = type_action == "POST" ? "show" : "hide";
    var disable_category_post =
      type_action == "CATEGORY_POST" ? "show" : "hide";
    var disable_product = type_action == "PRODUCT" ? "show" : "hide";
    var disable_category_product =
      type_action == "CATEGORY_PRODUCT" ? "show" : "hide";
    var showProduct = product != "" ? "show" : "hide";
    var showCProduct = category != "" ? "show" : "hide";
    var showBlog = blog != "" ? "show" : "hide";
    var showCblog = categoryBlog != "" ? "show" : "hide";

    console.log(products, product);

    return (
      <React.Fragment>
        <ListProduct
          handleAddProduct={this.handleAddProduct}
          store_code={store_code}
          products={products}
        />
        <ListCProduct
          handleAddCProduct={this.handleAddCProduct}
          store_code={store_code}
          categories={category_product}
        />
        <ListCBlog
          handleAddCBlog={this.handleAddCBlog}
          store_code={store_code}
          category_blog={category_blog}
        />
        <ListBlog
          handleAddBlog={this.handleAddBlog}
          store_code={store_code}
          blogs={blogs}
        />
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Tiêu đề</label>
              <input
                type="text"
                class="form-control"
                id="txtTitle"
                value={title}
                name="title"
                placeholder="Nhập tiêu đề"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Mô tả</label>
              <textarea
                type="text"
                class="form-control"
                id="description"
                value={description}
                name="description"
                placeholder="Nhập mô tả"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Gửi tới</label>

              <select
                name="group_customer"
                onChange={this.onChange}
                id="input"
                class="form-control"
                value={group_customer}
              >
                <option value="0">Tất cả</option>
                <option value="1">Khách hàng có ngày sinh nhật</option>
                <option value="2">Đại lý</option>
                <option value="3">Cộng tác viên</option>
                <option value="4">Nhóm khách hàng</option>
              </select>
              {group_customer == 2 && (
                <select
                  onChange={this.onChange}
                  value={agency_type_id}
                  name="agency_type_id"
                  class="form-control"
                  style={{ marginTop: "10px" }}
                >
                  <option value={-1}>--- Chọn cấp đại lý ---</option>
                  <option value={0}>Tất cả</option>
                  {types.map((v) => {
                    return <option value={v.id}>{v.name}</option>;
                  })}
                </select>
              )}
              {group_customer == 4 && (
                <select
                  onChange={this.onChange}
                  value={group_type_id}
                  name="group_type_id"
                  class="form-control"
                  style={{ marginTop: "10px" }}
                >
                  <option value={-1}>--- Chọn nhóm khách hàng ---</option>
                  {groupCustomer.length > 0 &&
                    groupCustomer.map((group) => {
                      return (
                        <option value={group.id} key={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                </select>
              )}
            </div>

            <div class="form-group">
              <label for="product_name">Kiểu thông báo</label>

              <select
                name="type_schedule"
                value={type_schedule}
                id="input"
                class="form-control"
                onChange={this.onChange}
              >
                <option value="0">Một lần</option>

                <option value="1">Hàng ngày</option>
                <option value="2">Hàng tuần</option>
                <option value="3">Hàng tháng</option>
              </select>
            </div>

            <div className={disable_oneDay}>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={
                      time_run == "Invalid date"
                        ? moment()
                        : moment(time_run, "DD-MM-YYYY HH:mm")
                    }
                    format="DD-MM-YYYY HH:mm"
                    options={true}
                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}
                    translations={{
                      DATE: "Ngày",
                      TIME: "Giờ",
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_run")}
                  />
                </div>
              </div>
            </div>
            <div className={disable_everyDay}>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_of_day, "HH:mm")}
                    format="HH:mm"
                    options={false}
                    enableInputClick={true}
                    readOnly={true}
                    tab={1}
                    translations={{
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  />
                </div>
              </div>
            </div>

            <div className={disable_everyWeek}>
              <div class="form-group">
                <label for="product_name">Chọn ngày</label>

                <select
                  name="day_of_week"
                  value={day_of_week}
                  onChange={this.onChange}
                  id="input"
                  class="form-control"
                >
                  <option value="0">Thứ 2</option>
                  <option value="1">Thứ 3</option>
                  <option value="2">Thứ 4</option>
                  <option value="3">Thứ 5</option>
                  <option value="4">Thứ 6</option>
                  <option value="5">Thứ 7</option>
                  <option value="6">Chủ Nhật</option>
                </select>
              </div>

              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_of_day, "HH:mm")}
                    format="HH:mm"
                    options={false}
                    enableInputClick={true}
                    readOnly={true}
                    tab={1}
                    translations={{
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  />
                </div>
              </div>
            </div>
            <div className={disable_everyMonth}>
              <div class="form-group">
                <label for="product_name">Chọn ngày</label>

                <select
                  name="day_of_month"
                  value={day_of_month}
                  onChange={this.onChange}
                  id="input"
                  class="form-control"
                >
                  {this.showAllDayofMonth()}
                </select>
              </div>
              <div class="form-group">
                <label for="product_name">Thời gian thông báo trong ngày</label>
                <div className="set-top-moment">
                  <MomentInput
                    value={moment(time_of_day, "HH:mm")}
                    format="HH:mm"
                    options={false}
                    enableInputClick={true}
                    readOnly={true}
                    tab={1}
                    translations={{
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={() => {}}
                    onChange={(e) => this.onChangeDate(e, "time_of_day")}
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Chọn loại chuyển hướng</label>

              <select
                value={type_action}
                name="type_action"
                id="input"
                class="form-control"
                onChange={this.onChange}
              >
                <option value="LINK">Website</option>
                <option value="PRODUCT">Sản phẩm</option>
                <option value="CATEGORY_PRODUCT">Danh mục sản phẩm</option>
                <option value="POST">Bài viết</option>
                <option value="CATEGORY_POST">Danh mục bài viết</option>
              </select>
            </div>
            <div class={`form-group ${disable_link}`}>
              <label htmlFor="name">Địa chỉ website</label>

              <input
                value={link_url}
                type="text"
                class="form-control"
                name="link_url"
                onChange={this.onChange}
                placeholder="Nhập đỉa chỉ web ( http:// )"
              />
            </div>

            <div className="support-theme">
              <div class={`form-group ${disable_product}`}>
                <label>Chọn Sản phẩm</label>

                <div class="right-inner-addon input-container">
                  <i class="fa fa-caret-down"></i>
                  <input
                    readOnly
                    data-toggle="modal"
                    data-target="#showListProduct"
                    onClick={this.fetchAllProduct}
                    style={{ background: "white" }}
                    type="text"
                    name="product_name"
                    placeholder="Chọn sản phẩm..."
                    class="form-control"
                    value={product.name}
                  />
                </div>

                <br></br>
                <div class={`media ${showProduct}`} id="product_preview">
                  <img width="100px" height="120px" src={product.img} alt="" />
                  <div class="media-body" style={{ marginLeft: "10px" }}>
                    {/* <h5 style={{ fontSize: "18px" }} class="mt-0 h3">{product.name} </h5> */}
                    {/* <p>{format(Number(product.price))}</p> */}
                  </div>
                </div>
              </div>
              <div class={`form-group ${disable_category_product}`}>
                <label>Chọn Danh mục sản phẩm</label>
                <div class="right-inner-addon input-container">
                  <i class="fa fa-caret-down"></i>
                  <input
                    readOnly
                    onClick={this.fetchAllCProduct}
                    value={category.name}
                    data-toggle="modal"
                    data-target="#showListCProduct"
                    type="text"
                    name="product_name"
                    class="form-control"
                    placeholder="Chọn danh mục..."
                  />
                </div>

                <br></br>
                <div class={`media ${showCProduct}`} id="product_preview">
                  <img width="100px" height="120px" src={category.img} alt="" />
                  {/* <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">{category.name} </h5>
                </div> */}
                </div>
              </div>
              <div class={`form-group ${disable_post}`}>
                <label>Chọn Bài viết</label>
                <div class="right-inner-addon input-container">
                  <i class="fa fa-caret-down"></i>
                  <input
                    onClick={this.fetchAllBlog}
                    value={blog.name}
                    readOnly
                    data-toggle="modal"
                    data-target="#showListBlog"
                    type="text"
                    name="product_name"
                    class="form-control"
                    placeholder="Chọn bài viết..."
                  />
                </div>

                <br></br>
                <div class={`media ${showBlog}`} id="product_preview">
                  <img width="100px" height="120px" src={blog.img} alt="" />
                  {/* <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">{blog.name} </h5>
                </div> */}
                </div>
              </div>

              <div class={`form-group ${disable_category_post}`}>
                <label>Chọn danh mục bài viết</label>
                <div class="right-inner-addon input-container">
                  <i class="fa fa-caret-down"></i>
                  <input
                    onClick={this.fetchAllBlog}
                    value={blog.name}
                    readOnly
                    data-toggle="modal"
                    data-target="#showListCBlog"
                    type="text"
                    name="product_name"
                    class="form-control"
                    placeholder="Chọn danh mục..."
                  />
                </div>

                <br></br>
                <div class={`media ${showCblog}`} id="product_preview">
                  <img
                    width="100px"
                    height="120px"
                    src={categoryBlog.img}
                    alt=""
                  />
                  {/* <div class="media-body" style={{ marginLeft: "10px" }}>
                  <h5 style={{ fontSize: "18px" }} class="mt-0 h3">{categoryBlog.name} </h5>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Lưu
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    types: state.agencyReducers.agency.allAgencyType,
    category_blog: state.categoryBReducers.categoryBlog.allCategoryB,
    products: state.productReducers.product.allProduct,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    blogs: state.blogReducers.blog.allBlog,
    groupCustomer:
      state.groupCustomerReducers.group_customer.groupCustomer.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateSchedule: (id, data, store_code) => {
      dispatch(scheduleAction.updateSchedule(id, data, store_code));
    },
    showError: (error) => {
      dispatch(error);
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    fetchAllCategoryB: (id) => {
      dispatch(categoryBAction.fetchAllCategoryB(id));
    },
    fetchAllBlog: (id) => {
      dispatch(blogAction.fetchAllBlog(id));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    fetchGroupCustomer: (store_code) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
