import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import InfoProduct from "../../../components/Product/Update/InfoProduct";
import ContentDetail from "../../../components/Product/Update/ContentDetail";
import * as blogAction from "../../../actions/blog";
import Video from "../../../components/Product/Update/Video";

import Attribute from "../../../components/Product/Update/Attribute";
import Distribute from "../../../components/Product/Update/Distribute";
import StoreImage from "../../../components/Product/Update/StoreImage";
import * as productAction from "../../../actions/product";
import * as CategoryPAction from "../../../actions/category_product";
import * as AttributeAction from "../../../actions/attribute_search";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import SeoOption from "../../../components/Product/Update/SeoOption";
import getChannel, { IKITECH, IKIPOS } from "../../../ultis/channel";
import {
  formatNumberV2,
  isEmpty,
  removeVietnameseTones,
} from "../../../ultis/helpers";
import Upload from "../../../components/Upload/index.js";
import Discount from "../../../components/Product/Create_C/Discount";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: "",
      disableDistribute: false,
      disableInventory: false,
      images: [],
      discountList: [],
    };
  }

  shouldComponentUpdate(nextProps) {
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var { product } = { ...nextProps };
      const images = product?.images?.map((image) => image?.image_url) || [];
      this.setImages(images);
      const product_retail_steps =
        product?.is_product_retail_step && product?.product_retail_steps
          ? product?.product_retail_steps?.map((item) => ({
              from: item.from_quantity,
              to: item.to_quantity,
              price: item.price ? formatNumberV2(item.price) : 0,
              errors: {
                from: "",
                to: "",
                price: "",
              },
            }))
          : [];
      this.setState({ discountList: product_retail_steps });
    }

    return true;
  }

  showDiscountList = () => {
    const { form, disableDistribute } = this.state;
    let isSamePrice = false;

    if (disableDistribute) {
      if (
        form?.list_distribute &&
        form?.list_distribute?.[0]?.element_distributes?.length > 0
      ) {
        if (
          form?.list_distribute?.[0]?.element_distributes?.length === 1 &&
          form?.list_distribute?.[0]?.element_distributes?.[0]
            .sub_element_distributes?.length < 2
        ) {
          if (
            Number(
              form?.list_distribute?.[0]?.element_distributes?.[0]?.price
            ) > 0
          ) {
            isSamePrice = true;
          } else {
            isSamePrice = false;
          }
        } else {
          if (
            form?.list_distribute?.[0]?.element_distributes[0]
              ?.sub_element_distributes?.length > 0
          ) {
            let priceSub = "";
            isSamePrice = true;
            form?.list_distribute?.[0]?.element_distributes.forEach(
              (element) => {
                element?.sub_element_distributes.forEach((subElement) => {
                  if (
                    !subElement.price ||
                    (priceSub && priceSub !== subElement.price)
                  ) {
                    isSamePrice = false;
                    return;
                  }
                  priceSub = subElement.price;
                });
              }
            );
          } else {
            let priceElement = "";
            isSamePrice = true;
            form?.list_distribute?.[0]?.element_distributes.forEach(
              (element) => {
                if (
                  !element.price ||
                  (priceElement && priceElement !== element.price)
                ) {
                  isSamePrice = false;
                  return;
                }
                priceElement = element.price;
              }
            );
          }
        }
      }
    }

    return disableDistribute
      ? isSamePrice
      : !disableDistribute && form?.price
      ? true
      : false;
  };

  checkDistribute = (status, _status) => {
    this.setState({ disableDistribute: status, disableInventory: _status });
  };

  componentDidMount() {
    var { store_code, productId } = this.props;
    this.props.fetchProductId(store_code, productId);
    this.props.fetchAllAttributeP(store_code);
    this.props.fetchAllCategoryP(store_code);
    this.props.fetchAllAttributeSearch(store_code);
    this.props.fetchAllBlog(store_code, 1);
  }

  setDiscountList = (discountList) => {
    this.setState({ discountList });
  };

  handleDataFromInfo = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.name = data.txtName;
      formdata.price = data.txtPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.import_price = data.txtImportPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.barcode = data.txtBarcode;
      formdata.status = data.txtStatus;
      formdata.point_for_agency = data.point_for_agency
        ?.toString()
        .replace(/,/g, "")
        .replace(/\./g, "");

      formdata.quantity_in_stock = data.txtQuantityInStock
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.percent_collaborator = data.txtPercentC;
      formdata.sku = data.sku;
      formdata.check_inventory = data.check_inventory;

      var categories = [];
      var category_children_ids = [];
      if (data.category_parent.length > 0) {
        categories = data.category_parent.map((categoryParent, index) => {
          return categoryParent.id;
        });
      }
      if (data.category_children_ids.length > 0) {
        category_children_ids = data.category_children_ids.map(
          (categoryChild, index) => {
            return categoryChild.id;
          }
        );
      }
      formdata.categories = categories;
      formdata.category_children_ids = category_children_ids;
      return { form: formdata };
    });
  };

  handleDataFromProductImg = (imgs) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.images = imgs;
      return { form: formdata };
    });
  };

  setImages = (images) => {
    this.setState({ images });
  };

  handleImageData = (data) => {
    this.handleDataFromProductImg([...data]);
    this.setImages(data);
  };

  handleDataFromDiscount = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.list_promotion = data;
      return { form: formdata };
    });
  };

  handleDataFromContent = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.content_for_collaborator = data.txtContentC;
      formdata.description = data.txtContent;
      formdata.seo_title = data.txtSeoTitle;
      formdata.seo_description = data.txtSeoDescription;

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
    var { store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    var form = { ...this.state.form };
    form.index_image_avatar = 0;
    form.point_for_agency = form.point_for_agency
      ?.toString()
      .replace(/,/g, "")
      .replace(/\./g, "");
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
                  const import_price =
                    element.import_price != null
                      ? element.import_price
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  const barcode =
                    element.barcode != null
                      ? removeVietnameseTones(element.barcode)
                      : 0;
                  const quantity_in_stock =
                    element.quantity_in_stock != null
                      ? element.quantity_in_stock
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  const cost_of_capital =
                    element.cost_of_capital != null
                      ? element.cost_of_capital
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0;
                  form.list_distribute[0].element_distributes[index].price =
                    price;
                  form.list_distribute[0].element_distributes[
                    index
                  ].import_price = import_price;
                  form.list_distribute[0].element_distributes[
                    index
                  ].cost_of_capital = cost_of_capital;
                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = quantity_in_stock;
                  form.list_distribute[0].element_distributes[index].barcode =
                    removeVietnameseTones(barcode);
                  form.list_distribute[0].element_distributes[index].stock =
                    quantity_in_stock;

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
                            const import_price =
                              _element.import_price != null
                                ? _element.import_price
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;
                            const cost_of_capital =
                              _element.cost_of_capital != null
                                ? _element.cost_of_capital
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;
                            const barcode =
                              _element.barcode != null
                                ? removeVietnameseTones(_element.barcode)
                                : 0;
                            const quantity_in_stock =
                              _element.quantity_in_stock != null
                                ? _element.quantity_in_stock
                                    .toString()
                                    .replace(/,/g, "")
                                    .replace(/\./g, "")
                                : 0;

                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price = price;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].import_price =
                              import_price;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].cost_of_capital =
                              cost_of_capital;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = quantity_in_stock;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].stock =
                              quantity_in_stock;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].barcode =
                              removeVietnameseTones(barcode);

                            console.log("sub element form", form);
                          } catch (error) {
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].import_price = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].cost_of_capital = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].stock = 0;
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = 0;
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
                  ].import_price = 0;
                  form.list_distribute[0].element_distributes[
                    index
                  ].cost_of_capital = 0;
                  form.list_distribute[0].element_distributes[index].stock = 0;
                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = 0;
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
    // this.props.postProduct(store_code, form)
    if (form.name == null || !isEmpty(form.name)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập tên sản phẩm",
        },
      });
      return;
    }

    if (form.barcode === form.sku && isEmpty(form.sku)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Barcode không thể trùng với mã SKU",
        },
      });
      return;
    }
    if (this.state.checkDistribute == false) {
      if (form.price == null || !isEmpty(form.price)) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập giá bán lẻ",
          },
        });
        return;
      }
      if (form.import_price == null || !isEmpty(form.import_price)) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập giá nhập",
          },
        });
        return;
      }
    }
    if (this.showDiscountList() && this.state.discountList?.length > 0) {
      let isError = false;
      this.state.discountList.forEach((element) => {
        const hasError = Object.values(element.errors).some(
          (error) => error != ""
        );

        if (!element.from || !element.to || !element.price || hasError) {
          isError = true;
          return;
        }
      });

      if (isError) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập đầy đủ trường trong mua nhiều giảm giá",
          },
        });
        return;
      }
    }

    var is_error = false;

    if (this.state.isError || is_error) {
      return;
    }
    if (this.state.checkDistribute == false) {
      delete form.list_distribute;
    }

    let product_retail_steps = [];

    if (this.showDiscountList() && this.state.discountList?.length > 0) {
      product_retail_steps = this.state.discountList.map((item) => ({
        from_quantity: item.from,
        to_quantity: item.to,
        price: item.price
          ? Number(item.price?.toString()?.replace(/[.,]/g, ""))
          : 0,
      }));
    }

    const formData = {
      ...form,
      is_product_retail_step: product_retail_steps.length > 0,
      product_retail_steps: product_retail_steps,
    };

    if (form.description && form.description?.includes("<iframe")) {
      const sunEditorContent = document.querySelector(".sun-editor-editable");
      if (sunEditorContent) {
        formData.description = sunEditorContent?.innerHTML;
      }
    }
    this.props.postProductV2(store_code, branch_id, formData);
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };
  onChangeQuantityStock = (total) => {
    this.setState({ total: total });
  };

  handleDataFromProductVideo = (video) => {
    console.log(video);
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.video_url = video;
      return { form: formdata };
    });
  };

  render() {
    var { store_code, productId } = this.props;
    var {
      category_product,
      attributeP,
      auth,
      product,
      isShowAttr,
      isCreate,
      isRemove,
      attribute_search,
    } = this.props;
    var { total, disableInventory, disableDistribute, discountList } =
      this.state;
    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            <h4 className="h4 title_content mb-0 text-gray-800">
              Thêm sản phẩm
            </h4>
          </h4>
        </div>
        <br></br>
        <div class="card mb-4">
          <div class="card-header title_content">Nhập thông tin sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-8">
                <div>
                  <InfoProduct
                    isCopy={true}
                    checkDistribute={this.checkDistribute}
                    total={total}
                    product={product}
                    store_code={store_code}
                    productId={productId}
                    handleDataFromInfo={this.handleDataFromInfo}
                    category_product={category_product}
                    attribute_search={attribute_search}
                  />
                </div>
              </div>

              <div
                class="col-lg-4"
                style={{ borderLeft: "0.5px solid #e6dfdf" }}
              >
                <div>
                  <Video
                    store_code={store_code}
                    product={product}
                    handleDataFromProductVideo={this.handleDataFromProductVideo}
                  />
                </div>
                <div>
                  <Upload
                    multiple
                    setFiles={this.handleImageData}
                    files={this.state.images}
                    images={this.state.images}
                    limit={13}
                    imageType="PRODUCT"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    class="btn btn-primary btn-sm"
                    onClick={this.postProduct}
                  >
                    <i class="fa fa-plus"></i> Tạo
                  </button>
                  <a
                    style={{ marginLeft: "10px" }}
                    onClick={this.goBack}
                    class={`btn btn-warning btn-sm color-white `}
                  >
                    <i class="fa fa-arrow-left"></i> Trở về
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          class={`card mb-4 ${
            typeof isShowAttr == "undefined" ||
            isShowAttr == false ||
            getChannel() == IKIPOS
              ? "hide"
              : ""
          }`}
        >
          <div class="card-header title_content">Thuộc tính sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div class="card-body" style={{ padding: "0.8rem" }}>
                    <Attribute
                      isCreate={isCreate}
                      isRemove={isRemove}
                      product={product}
                      handleDataFromAttribute={this.handleDataFromAttribute}
                      store_code={store_code}
                      attributeP={attributeP}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class={`card mb-4 ${
            this.state.disableDistribute == true ? "" : "hide"
          }`}
        >
          <div class="card-header title_content">Phân loại sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div class="card-body" style={{ padding: "0.8rem" }}>
                    <Distribute
                      disableDistribute={disableDistribute}
                      disableInventory={disableInventory}
                      onChangeQuantityStock={this.onChangeQuantityStock}
                      product={product}
                      handleDataFromDistribute={this.handleDataFromDistribute}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Discount
          priceDefault={this.state.form?.price}
          list_distribute={this.state.form?.list_distribute?.[0]}
          discountList={discountList}
          setDiscountList={this.setDiscountList}
          isShow={this.showDiscountList()}
        ></Discount>
        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-header title_content">Nội dung chi tiết</div>
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <ContentDetail
                  store_code={store_code}
                  product={product}
                  handleDataFromContent={this.handleDataFromContent}
                />
              </div>
            </div>
          </div>
        )}

        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-header title_content">Tối ưu SEO</div>
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <SeoOption
                  product={product}
                  handleDataFromContent={this.handleDataFromContent}
                />
              </div>
            </div>
          </div>
        )}
        <div class="card mb-4">
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                  class="btn btn-primary btn-sm"
                  onClick={this.postProduct}
                >
                  <i class="fa fa-plus"></i> Tạo
                </button>
                <a
                  className="color-white"
                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class={`btn btn-warning btn-sm color-white `}
                >
                  <i class="fa fa-arrow-left"></i> Trở về
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    attributeP: state.attributePReducers.attribute_product.allAttrbute,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    attribute_search:
      state.attributeSearchReducers.attribute_search.allAttribute,
    product: state.productReducers.product.productId,
    alert: state.productReducers.alert.alert_uid,
    blogs: state.blogReducers.blog.allBlog,
    currentBranch: state.branchReducers.branch.currentBranch,
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
    fetchAllAttributeSearch: (store_code, params) => {
      dispatch(AttributeAction.fetchAllAttributeSearch(store_code, params));
    },
    postProductV2: (store_code, branch_id, form) => {
      dispatch(productAction.postProductV2(store_code, branch_id, form));
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
    updateDistribute: (store_code, product, productId, branchId) => {
      dispatch(
        productAction.updateDistribute(store_code, product, productId, branchId)
      );
    },
    fetchAllBlog: (id, page) => {
      dispatch(blogAction.fetchAllBlog(id, page));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
