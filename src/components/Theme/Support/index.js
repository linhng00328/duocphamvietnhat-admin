import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import ListBlog from "./TableBlog";

import * as blogAction from "../../../actions/blog";
import * as Types from "../../../constants/ActionType";
class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id_help: null,
      post_id_contact: null,
      post_id_about: null,
      post_id_terms: null,
      post_id_return_policy: null,
      post_id_support_policy: null,
      post_id_privacy_policy: null,
      post_id_delivery_policy: null,
      post_id_participating: null,
      post_id_payment_policy: null,
      post_id_goods_inspecstion_policy: null,

      ID_post_id_help: null,
      ID_post_id_contact: null,
      ID_post_id_about: null,
      ID_post_id_terms: null,
      ID_post_id_return_policy: null,
      ID_post_id_support_policy: null,
      ID_post_id_privacy_policy: null,
      ID_post_id_delivery_policy: null,
      ID_post_id_participating: null,
      ID_post_id_payment_policy: null,
      ID_post_id_goods_inspecstion_policy: null,
      is_show_list_post_contact: false,
      type: "",
      isLoading: false,
    };
  }

  handleAddBlog = (blog) => {
    var { type } = this.state;
    this.setState({
      [type]: blog.name,
      ["ID_" + type]: blog.id,
    });
  };

  componentDidMount() {
    var { store_code } = this.props;
    var theme = this.props.theme;
    if (theme == null || theme == "" || typeof theme.store_id == "undefined") {
    } else {
      this.setState({
        ID_post_id_help: theme.post_id_help || "",
        ID_post_id_contact: theme.post_id_contact || "",
        ID_post_id_about: theme.post_id_about || "",
        ID_post_id_terms: theme.post_id_terms || "",
        ID_post_id_return_policy: theme.post_id_return_policy || "",
        ID_post_id_support_policy: theme.post_id_support_policy || "",
        ID_post_id_privacy_policy: theme.post_id_privacy_policy || "",
        ID_post_id_delivery_policy: theme.post_id_delivery_policy || "",
        ID_post_id_participating: theme.post_id_participating || "",
        ID_post_id_payment_policy: theme.post_id_payment_policy || "",
        ID_post_id_goods_inspecstion_policy:
          theme.post_id_goods_inspecstion_policy || "",
        is_show_list_post_contact: theme.is_show_list_post_contact,
      });

      if (theme.post_id_help != "" && theme.post_id_help != null)
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_help,
          type: Types.POST_ID_HELP,
        });

      if (theme.post_id_contact != "" && theme.post_id_contact != null)
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_contact,
          type: Types.POST_ID_CONTACT,
        });

      if (theme.post_id_about != "" && theme.post_id_about != null)
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_about,
          type: Types.POST_ID_ABOUT,
        });

      if (theme.post_id_terms != "" && theme.post_id_terms != null)
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_terms,
          type: Types.POST_ID_TERM,
        });

      if (
        theme.post_id_return_policy != "" &&
        theme.post_id_return_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_return_policy,
          type: Types.POST_ID_RETURN_POLICY,
        });

      if (
        theme.post_id_support_policy != "" &&
        theme.post_id_support_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_support_policy,
          type: Types.POST_ID_SUPPORT_POLICY,
        });

      if (
        theme.post_id_privacy_policy != "" &&
        theme.post_id_privacy_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_privacy_policy,
          type: Types.POST_ID_PRIVACY_POLICY,
        });

      if (
        theme.post_id_delivery_policy != "" &&
        theme.post_id_delivery_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_delivery_policy,
          type: Types.POST_ID_DELIVERY_POLICY,
        });

      if (
        theme.post_id_participating != "" &&
        theme.post_id_participating != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_participating,
          type: Types.POST_ID_PARTICIPATING,
        });

      if (
        theme.post_id_payment_policy != "" &&
        theme.post_id_payment_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_payment_policy,
          type: Types.POST_ID_PAYMENT_POLICY,
        });

      if (
        theme.post_id_goods_inspecstion_policy != "" &&
        theme.post_id_goods_inspecstion_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: theme.post_id_goods_inspecstion_policy,
          type: Types.POST_ID_GOODS_INSPECSTION_POLICY,
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
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      console.log(1);
      var theme = nextProps.theme;
      this.setState({
        ID_post_id_help: theme.post_id_help || "",
        ID_post_id_contact: theme.post_id_contact || "",
        ID_post_id_about: theme.post_id_about || "",
        ID_post_id_terms: theme.post_id_terms || "",
        ID_post_id_return_policy: theme.post_id_return_policy || "",
        ID_post_id_support_policy: theme.post_id_support_policy || "",
        ID_post_id_privacy_policy: theme.post_id_privacy_policy || "",
        ID_post_id_delivery_policy: theme.post_id_delivery_policy || "",
        ID_post_id_participating: theme.post_id_participating || "",
        ID_post_id_payment_policy: theme.post_id_payment_policy || "",
        ID_post_id_goods_inspecstion_policy:
          theme.post_id_goods_inspecstion_policy || "",
        is_show_list_post_contact: theme.is_show_list_post_contact,
        isLoading: true,
      });
    }
    if (
      !shallowEqual(nextProps.post_id_help, this.props.post_id_help) ||
      !shallowEqual(nextProps.post_id_contact, this.props.post_id_contact) ||
      !shallowEqual(nextProps.post_id_about, this.props.post_id_about) ||
      !shallowEqual(nextProps.post_id_terms, this.props.post_id_terms) ||
      !shallowEqual(
        nextProps.post_id_return_policy,
        this.props.post_id_return_policy
      ) ||
      !shallowEqual(
        nextProps.post_id_support_policy,
        this.props.post_id_support_policy
      ) ||
      !shallowEqual(
        nextProps.post_id_privacy_policy,
        this.props.post_id_privacy_policy
      ) ||
      !shallowEqual(
        nextProps.post_id_delivery_policy,
        this.props.post_id_delivery_policy
      ) ||
      !shallowEqual(
        nextProps.post_id_participating,
        this.props.post_id_participating
      ) ||
      !shallowEqual(
        nextProps.post_id_payment_policy,
        this.props.post_id_payment_policy
      ) ||
      !shallowEqual(
        nextProps.post_id_goods_inspecstion_policy,
        this.props.post_id_goods_inspecstion_policy
      )
    ) {
      this.setState({
        post_id_help: nextProps.post_id_help?.title || null,
        post_id_contact: nextProps.post_id_contact?.title || null,
        post_id_about: nextProps.post_id_about?.title || null,
        post_id_terms: nextProps.post_id_terms?.title || null,
        post_id_return_policy: nextProps.post_id_return_policy?.title || null,
        post_id_support_policy: nextProps.post_id_support_policy?.title || null,
        post_id_privacy_policy: nextProps.post_id_privacy_policy?.title || null,
        post_id_delivery_policy:
          nextProps.post_id_delivery_policy?.title || null,
        post_id_participating: nextProps.post_id_participating?.title || null,
        post_id_payment_policy: nextProps.post_id_payment_policy?.title || null,
        post_id_goods_inspecstion_policy:
          nextProps.post_id_goods_inspecstion_policy?.title || null,

        ID_post_id_help: nextProps.post_id_help?.id || null,
        ID_post_id_contact: nextProps.post_id_contact?.id || null,
        ID_post_id_about: nextProps.post_id_about?.id || null,
        ID_post_id_terms: nextProps.post_id_terms?.id || null,
        ID_post_id_return_policy: nextProps.post_id_return_policy?.id || null,
        ID_post_id_support_policy: nextProps.post_id_support_policy?.id || null,
        ID_post_id_privacy_policy: nextProps.post_id_privacy_policy?.id || null,
        ID_post_id_delivery_policy: nextProps.post_id_delivery_policy?.id || "",
        ID_post_id_participating: nextProps.post_id_participating?.id || "",
        ID_post_id_payment_policy: nextProps.post_id_payment_policy?.id || "",
        ID_post_id_goods_inspecstion_policy:
          nextProps.post_id_goods_inspecstion_policy?.id || "",
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isLoading == true) {
      var { store_code } = this.props;

      var {
        ID_post_id_help,
        ID_post_id_contact,
        ID_post_id_about,
        ID_post_id_terms,
        ID_post_id_return_policy,
        ID_post_id_support_policy,
        ID_post_id_privacy_policy,
        ID_post_id_delivery_policy,
        ID_post_id_participating,
        ID_post_id_payment_policy,
        ID_post_id_goods_inspecstion_policy,
      } = this.state;
      if (ID_post_id_help != "" && ID_post_id_help != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_help,
          type: Types.POST_ID_HELP,
        });

      if (ID_post_id_contact != "" && ID_post_id_contact != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_contact,
          type: Types.POST_ID_CONTACT,
        });

      if (ID_post_id_about != "" && ID_post_id_about != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_about,
          type: Types.POST_ID_ABOUT,
        });

      if (ID_post_id_terms != "" && ID_post_id_terms != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_terms,
          type: Types.POST_ID_TERM,
        });

      if (ID_post_id_return_policy != "" && ID_post_id_return_policy != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_return_policy,
          type: Types.POST_ID_RETURN_POLICY,
        });

      if (ID_post_id_support_policy != "" && ID_post_id_support_policy != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_support_policy,
          type: Types.POST_ID_SUPPORT_POLICY,
        });

      if (ID_post_id_privacy_policy != "" && ID_post_id_privacy_policy != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_privacy_policy,
          type: Types.POST_ID_PRIVACY_POLICY,
        });
      if (
        ID_post_id_delivery_policy != "" &&
        ID_post_id_delivery_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_delivery_policy,
          type: Types.POST_ID_DELIVERY_POLICY,
        });

      if (ID_post_id_participating != "" && ID_post_id_participating != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_participating,
          type: Types.POST_ID_PARTICIPATING,
        });

      if (ID_post_id_payment_policy != "" && ID_post_id_payment_policy != null)
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_payment_policy,
          type: Types.POST_ID_PAYMENT_POLICY,
        });

      if (
        ID_post_id_goods_inspecstion_policy != "" &&
        ID_post_id_goods_inspecstion_policy != null
      )
        this.props.fetchBlogId(store_code, {
          id: ID_post_id_goods_inspecstion_policy,
          type: Types.POST_ID_GOODS_INSPECSTION_POLICY,
        });

      this.setState({ isLoading: false });
    }
    return true;
  }
  fetchAllBlog = (type) => {
    this.setState({ type: type });
    this.props.fetchAllBlog(this.props.store_code);
  };
  onSave = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var theme = this.state;
    var form = { ...this.props.theme };

    form.post_id_help =
      theme.ID_post_id_help == "" ? null : theme.ID_post_id_help;
    form.post_id_contact =
      theme.ID_post_id_contact == "" ? null : theme.ID_post_id_contact;
    form.post_id_about =
      theme.ID_post_id_about == "" ? null : theme.ID_post_id_about;
    form.post_id_terms =
      theme.ID_post_id_terms == "" ? null : theme.ID_post_id_terms;
    form.post_id_return_policy =
      theme.ID_post_id_return_policy == ""
        ? null
        : theme.ID_post_id_return_policy;
    form.post_id_support_policy =
      theme.ID_post_id_support_policy == ""
        ? null
        : theme.ID_post_id_support_policy;
    form.post_id_privacy_policy =
      theme.ID_post_id_privacy_policy == ""
        ? null
        : theme.ID_post_id_privacy_policy;
    form.post_id_delivery_policy =
      theme.ID_post_id_delivery_policy == ""
        ? null
        : theme.ID_post_id_delivery_policy;

    form.post_id_participating =
      theme.ID_post_id_participating == ""
        ? null
        : theme.ID_post_id_participating;
    form.post_id_payment_policy =
      theme.ID_post_id_payment_policy == ""
        ? null
        : theme.ID_post_id_payment_policy;
    form.post_id_goods_inspecstion_policy =
      theme.ID_post_id_goods_inspecstion_policy == ""
        ? null
        : theme.ID_post_id_goods_inspecstion_policy;
    form.is_show_list_post_contact = theme.is_show_list_post_contact;
    console.log(form);
    this.props.updateTheme(store_code, form);
  };
  render() {
    var {
      post_id_help,
      post_id_contact,
      post_id_about,
      post_id_terms,
      post_id_return_policy,
      post_id_support_policy,
      post_id_privacy_policy,
      post_id_delivery_policy,
      post_id_participating,
      post_id_payment_policy,
      post_id_goods_inspecstion_policy,
      ID_post_id_help,
      ID_post_id_contact,
      ID_post_id_about,
      ID_post_id_terms,
      ID_post_id_return_policy,
      ID_post_id_support_policy,
      ID_post_id_privacy_policy,
      ID_post_id_delivery_policy,
      ID_post_id_participating,
      ID_post_id_payment_policy,
      ID_post_id_goods_inspecstion_policy,
      is_show_list_post_contact,
    } = this.state;

    var { blogs, store_code } = this.props;
    return (
      <div className="support-theme">
        <ListBlog
          handleAddBlog={this.handleAddBlog}
          store_code={store_code}
          blogs={blogs}
          per_page={blogs.per_page}
          current_page={blogs.current_page}
        />

        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>

            {/* <div class="right-inner-addon input-container">
                            <i class="fa fa-search"></i>
                            <input type="text"
                                class="form-control"
                                placeholder="Right icon" />
                        </div> */}
            <div
              className="row"
              style={{
                padding: "3px 0",
                justifyContent: "start",
                fontWeight: "500",
              }}
            >
              <>
                <label
                  className="title-price"
                  style={{
                    paddingLeft: 16,
                  }}
                >
                  {" "}
                  Hiển thị khung danh sách bài viết trên Footer
                </label>
                <form>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="switch2"
                      // name="example"
                      checked={is_show_list_post_contact}
                      onChange={(e) =>
                        this.setState({
                          is_show_list_post_contact: !is_show_list_post_contact,
                        })
                      }
                    />
                    <label class="custom-control-label" for="switch2"></label>
                  </div>
                </form>
              </>
            </div>

            <div className="form-group">
              <label htmlFor="name">Bài viết giới thiệu</label>

              <input value={ID_post_id_about} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_about")}
                  value={post_id_about}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Bài viết giúp đỡ</label>
              <input readOnly value={ID_post_id_help} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_help")}
                  value={post_id_help}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Bài viết tham gia</label>
              <input readOnly value={ID_post_id_participating} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_participating")}
                  value={post_id_participating}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Quy chế hoạt động website</label>
              <input value={ID_post_id_terms} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_terms")}
                  value={post_id_terms}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Chính sách đổi trả và hoàn tiền</label>
              <input value={ID_post_id_return_policy} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_return_policy")}
                  value={post_id_return_policy}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Chính sách bảo hành</label>
              <input value={ID_post_id_support_policy} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_support_policy")}
                  value={post_id_support_policy}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Chính sách bảo mật thông tin</label>
              <input value={ID_post_id_privacy_policy} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_privacy_policy")}
                  value={post_id_privacy_policy}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Chính sách vận chuyển và giao nhận</label>
              <input value={ID_post_id_delivery_policy} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_delivery_policy")}
                  value={post_id_delivery_policy}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Chính sách thanh toán</label>
              <input value={ID_post_id_payment_policy} type="hidden" />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() => this.fetchAllBlog("post_id_payment_policy")}
                  value={post_id_payment_policy}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Chính sách kiểm hàng</label>
              <input
                value={ID_post_id_goods_inspecstion_policy}
                type="hidden"
              />
              <div class="right-inner-addon input-container">
                <i class="fa fa-caret-down"></i>
                <input
                  readOnly
                  onClick={() =>
                    this.fetchAllBlog("post_id_goods_inspecstion_policy")
                  }
                  value={post_id_goods_inspecstion_policy}
                  data-toggle="modal"
                  data-target="#showListBlog"
                  type="text"
                  name="product_name"
                  class="form-control"
                  placeholder="Chọn bài viết..."
                />
              </div>
            </div>
            {/* <div className="form-group">
                            <label htmlFor="name">Bài viết liên hệ</label>
                            <input
                                value={ID_post_id_contact}


                                type="hidden"

                            />
                            <input
                                onClick={() => this.fetchAllBlog("post_id_contact")}
                                value={post_id_contact}

                                data-toggle="modal"
                                data-target="#showListBlog"
                                type="text"
                                name="product_name"
                                class="form-control"
                                placeholder="Chọn bài viết..."
                            />
                        </div>
                      */}
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
  return {
    blogs: state.blogReducers.blog.allBlog,
    post_id_help: state.themeReducers.post_id_help,
    post_id_contact: state.themeReducers.post_id_contact,
    post_id_about: state.themeReducers.post_id_about,
    post_id_terms: state.themeReducers.post_id_terms,
    post_id_return_policy: state.themeReducers.post_id_return_policy,
    post_id_support_policy: state.themeReducers.post_id_support_policy,
    post_id_privacy_policy: state.themeReducers.post_id_privacy_policy,
    post_id_delivery_policy: state.themeReducers.post_id_delivery_policy,
    post_id_participating: state.themeReducers.post_id_participating,
    post_id_payment_policy: state.themeReducers.post_id_payment_policy,
    post_id_goods_inspecstion_policy:
      state.themeReducers.post_id_goods_inspecstion_policy,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },

    fetchAllBlog: (id) => {
      dispatch(blogAction.fetchAllBlog(id));
    },
    fetchBlogId: (store_code, blog) => {
      dispatch(themeAction.fetchBlogId(store_code, blog));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Support);
