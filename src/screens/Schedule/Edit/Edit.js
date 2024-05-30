import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Schedule/Edit/Form";
import * as scheduleAction from "../../../actions/schedule";
import * as Types from "../../../constants/ActionType";

import { shallowEqual } from "../../../ultis/shallowEqual";
import Alert from "../../../components/Partials/Alert";
import * as productAction from "../../../actions/product";
import * as blogAction from "../../../actions/blog";
import * as categoryBAction from "../../../actions/category_blog";
import * as CategoryPAction from "../../../actions/category_product";
import * as Env from "../../../ultis/default"
class ScheduleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _product: "",
      _category_product: "",
      _category_blog: "",
      _blog: "",
      value_action: ""
    }
  }

  componentDidMount() {
    var {store_code } = this.props;
    this.props.fetchAllSchedule(store_code);
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.schedule, this.props.schedule)) {
      var { scheduleId, store_code } = this.props
      for (const item of nextProps.schedule) {
        if (item.id == Number(scheduleId)) {
          this.setState({ value_action: item.value_action })

          var type_action = item.type_action
          switch (type_action) {
            case "LINK":
              break;
            case "PRODUCT":
              this.props.fetchProductId(store_code, item.value_action);
              break;
            case "CATEGORY_PRODUCT":
              this.props.fetchAllCategoryP(store_code);
              break;
            case "POST":
              this.props.fetchBlogId(store_code, item.value_action);
              break;
            case "CATEGORY_POST":
              this.props.fetchAllCategoryB(this.props.store_code);
              break;
            default:
              break;
          }
        }
      }
    }
    if (!shallowEqual(nextProps.category_product, this.props.category_product)) {
      var { value_action } = this.state
      for (const item of nextProps.category_product) {
        if (item.id == value_action) {
          var img = item.image_url || Env.IMG_NOT_FOUND

          this.setState({
            _category_product: {
              name: item.name,
              img: img,
              id: item.id
            }
          })
        }
      }

    }
    if (!shallowEqual(nextProps.category_blog, this.props.category_blog)) {
      var { value_action } = this.state
      for (const item of nextProps.category_blog) {
        if (item.id == value_action) {
          var img = item.image_url || Env.IMG_NOT_FOUND
          this.setState({
            _category_blog: {
              name: item.title,
              img: img,
              id: item.id
            }
          })
        }
      }
    }
    if (!shallowEqual(nextProps.blog, this.props.blog)) {
      console.log(nextProps.blog, this.props.blog)
      var blog = nextProps.blog
      var img = blog.image_url || Env.IMG_NOT_FOUND
      this.setState({
        _blog: {
          name: blog.title,
          img: img,
          id: blog.id
        }
      })

    }
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var product = nextProps.product
      var img = product.images[0]?.image_url || Env.IMG_NOT_FOUND
      this.setState({
        _product: {
          name: product.name,
          img: img,
          id: product.id,
          price: product.price
        }
      })

    }

  }

  render() {
    var { scheduleId, store_code } = this.props;
    var { schedule, history } = this.props
    var { _product, _blog, _category_product, _category_blog } = this.state

      return (
       

              <div class="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                   Lên lịch thông báo
                  </h4>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                    <section class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div id="messages"></div>

                          <div class="box">
                            <Form              _category_blog={_category_blog}
                                    _category_product={_category_product}
                                    _blog={_blog}
                                    _product={_product} history={history} scheduleId={scheduleId} schedule={schedule} store_code={store_code} />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.scheduleReducers.schedule.allSchedule,
    auth: state.authReducers.login.authentication,
    alert: state.scheduleReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,
    category_blog: state.categoryBReducers.categoryBlog.allCategoryB,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    blog: state.blogReducers.blog.blogID,
    product: state.productReducers.product.productId,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllSchedule: (store_code) => {
      dispatch(scheduleAction.fetchAllSchedule(store_code));
    },
    fetchProductId: (store_code, productId) => {
      dispatch(productAction.fetchProductId(store_code, productId));
    },
    fetchAllCategoryB: (id) => {
      dispatch(categoryBAction.fetchAllCategoryB(id));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    fetchBlogId: (store_code, blogId) => {
      dispatch(blogAction.fetchBlogId(store_code, blogId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleEdit);
