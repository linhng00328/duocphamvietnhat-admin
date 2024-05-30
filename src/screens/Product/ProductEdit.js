import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../Loading";
import InfoProduct from "../../components/Product/Update/InfoProduct";
import ContentDetail from "../../components/Product/Update/ContentDetail";
import Attribute from "../../components/Product/Update/Attribute";
import Distribute from "../../components/Product/Update/Distribute";
import StoreImage from "../../components/Product/Update/StoreImage";
import * as productAction from "../../actions/product";
import * as CategoryPAction from "../../actions/category_product";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: "",
    };
  }

  componentDidMount() {
    var { store_code, productId } = this.props.match.params;
    this.props.fetchProductId(store_code, productId);
    this.props.fetchAllAttributeP(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  handleDataFromInfo = (data) => {
    this.setState((prevState, props) => {
      console.log("data in edit", data);
      var formdata = { ...prevState.form };
      formdata.name = data.txtName;
      formdata.price = data.txtPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.barcode = data.txtBarcode;
      formdata.status = data.txtStatus;
      formdata.quantity_in_stock = data.txtQuantityInStock
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.percent_collaborator = data.txtPercentC;
      var categories = [];
      if (data.txtCategory.length > 0) {
        categories = data.txtCategory.map((category, index) => {
          return category.value;
        });
      }
      formdata.categories = categories;
      return { form: formdata };
    });
  };

  handleDataFromProductImg = (data) => {
    console.log(data);
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.images = data.listImgProduct;
      return { form: formdata };
    });
  };

  handleDataFromAvatarImg = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.index_image_avatar = data.avatar_product;
      return { form: formdata };
    });
  };

  handleDataFromContent = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.content_for_collaborator = data.txtContentC;
      formdata.description = data.txtContent;
      return { form: formdata };
    });
  };

  handleDataFromAttribute = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      var listAttribute = [];
      var item = {};
      var name = "";
      Object.entries(data).forEach(([key, attribute], index) => {
        Object.entries(attribute).forEach(([_key, attributeItem], _index) => {
          Object.entries(attributeItem).forEach(
            ([__key, _attributeItem], __index) => {
              if (__key === "name") {
                name = _attributeItem;
              } else {
                item = { name, value: _attributeItem };
              }
            }
          );
          listAttribute.push(item);
        });
      });
      formdata.list_attribute = listAttribute;

      return { form: formdata };
    });
  };

  handleDataFromDistribute = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.list_distribute = data;

      return { form: formdata };
    });
  };

  postProduct = () => {
    var { store_code, productId } = this.props.match.params;
    var form = { ...this.state.form };
    console.log(form);
    form.index_image_avatar = 0;
    if (typeof form.list_distribute != "undefined") {
      if (typeof form.list_distribute[0] != "undefined") {
        if (typeof form.list_distribute[0].element_distributes != "undefined") {
          if (form.list_distribute[0].element_distributes.length > 0) {
            form.list_distribute[0].element_distributes.forEach(
              (element, index) => {
                try {
                  console.log(element);
                  const price =
                    element.price != null
                      ? element.price
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  const barcode = element.barcode != null ? element.barcode : 0;
                  const quantity_in_stock =
                    element.quantity_in_stock != null &&
                    element.quantity_in_stock != ""
                      ? element.quantity_in_stock
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : null;
                  form.list_distribute[0].element_distributes[index].price =
                    price;
                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = quantity_in_stock;
                  console.log(
                    price,
                    form.list_distribute[0].element_distributes[index].price
                  );

                  console.log(form);
                  if (typeof element.sub_element_distributes != "undefined") {
                    if (element.sub_element_distributes.length > 0) {
                      element.sub_element_distributes.forEach(
                        (_element, _index) => {
                          try {
                            const price =
                              _element.price != null
                                ? _element.price
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;
                            const barcode =
                              _element.barcode != null
                                ? _element.barcode.toString()
                                : 0;
                            const quantity_in_stock =
                              _element.quantity_in_stock != null &&
                              _element.quantity_in_stock != ""
                                ? _element.quantity_in_stock
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : null;

                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price = price;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = quantity_in_stock;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].barcode = barcode;
                          } catch (error) {
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = null;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].barcode = "";
                          }
                        }
                      );
                    }
                  }
                } catch (error) {
                  console.log(error);
                  form.list_distribute[0].element_distributes[index].price = 0;
                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = null;
                  form.list_distribute[0].element_distributes[index].barcode =
                    "";
                }
              }
            );
          }
        }
      }
    }
    var total = this.state.total
      .toString()
      .replace(/,/g, "")
      .replace(/\./g, "");
    if (typeof form.list_distribute != "undefined") {
      form.quantity_in_stock =
        form.list_distribute.length > 0 ? total : form.quantity_in_stock;
    }
    console.log(form);
    var { page } = this.props.match.params;
    this.props.updateProduct(store_code, form, productId, page);
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };
  onChangeQuantityStock = (total) => {
    this.setState({ total: total });
  };

  render() {
    var { store_code } = this.props.match.params;
    var { category_product, attributeP, auth, product } = this.props;
    var { total } = this.state;
    console.log(total);
    if (auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />

                <div class="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Chỉnh sửa sản phẩm {product.name}
                    </h4>
                  </div>
                  <br></br>
                  <div class="card mb-4">
                    <div class="card-header title_content">
                      Nhập thông tin sản phẩm
                    </div>
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <div class="row">
                        <div class="col-lg-6">
                          <div>
                            <InfoProduct
                              total={total}
                              product={product}
                              handleDataFromInfo={this.handleDataFromInfo}
                              category_product={category_product}
                            />
                          </div>
                        </div>

                        <div
                          class="col-lg-6"
                          style={{ borderLeft: "0.5px solid #e6dfdf" }}
                        >
                          <div>
                            <StoreImage
                              handleDataFromAvatarImg={
                                this.handleDataFromAvatarImg
                              }
                              product={product}
                              handleDataFromProductImg={
                                this.handleDataFromProductImg
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-4">
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            onClick={this.postProduct}
                          >
                            <i class="fa fa-plus"></i>
                            Lưu thay đổi
                          </button>
                          <a
                            style={{ marginLeft: "10px" }}
                            onClick={this.goBack}
                            class="btn btn-warning btn-icon-split  btn-sm"
                          >
                            <span class="icon text-white-50">
                              <i class="fas fa-arrow-left"></i>
                            </span>
                            <span class="text"> Trở về</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-4">
                    <div class="card-header title_content">
                      Thuộc tính sản phẩm
                    </div>
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <div class="row">
                        <div class="col-lg-12">
                          <div>
                            <div
                              class="card-body"
                              style={{ padding: "0.8rem" }}
                            >
                              <Attribute
                                product={product}
                                handleDataFromAttribute={
                                  this.handleDataFromAttribute
                                }
                                store_code={store_code}
                                attributeP={attributeP}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card mb-4">
                    <div class="card-header title_content">
                      Phân loại sản phẩm
                    </div>
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <div class="row">
                        <div class="col-lg-12">
                          <div>
                            <div
                              class="card-body"
                              style={{ padding: "0.8rem" }}
                            >
                              <Distribute
                                onChangeQuantityStock={
                                  this.onChangeQuantityStock
                                }
                                product={product}
                                handleDataFromDistribute={
                                  this.handleDataFromDistribute
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-4">
                    <div class="card-header title_content">
                      Nội dung chi tiết
                    </div>
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <div class="row">
                        <ContentDetail
                          product={product}
                          handleDataFromContent={this.handleDataFromContent}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="card mb-4">
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            onClick={this.postProduct}
                          >
                            <i class="fa fa-plus"></i>
                            Lưu thay đổi
                          </button>
                          <a
                            style={{ marginLeft: "10px" }}
                            onClick={this.goBack}
                            class="btn btn-warning btn-icon-split  btn-sm"
                          >
                            <span class="icon text-white-50">
                              <i class="fas fa-arrow-left"></i>
                            </span>
                            <span class="text"> Trở về</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    attributeP: state.attributePReducers.attribute_product.allAttrbute,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    product: state.productReducers.product.productId,
    alert: state.productReducers.alert.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAttributeP: (store_code) => {
      dispatch(productAction.fetchAllAttributeP(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    postProduct: (store_code, product) => {
      dispatch(productAction.postProduct(store_code, product));
    },
    fetchProductId: (store_code, productId) => {
      dispatch(productAction.fetchProductId(store_code, productId));
    },
    updateProduct: (store_code, product, productId, page) => {
      dispatch(
        productAction.updateProduct(store_code, product, productId, page)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
