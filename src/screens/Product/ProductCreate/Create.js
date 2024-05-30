import React, { Component } from "react";

import { connect } from "react-redux";

import InfoProduct from "../../../components/Product/Create/InfoProduct";
import ContentDetail from "../../../components/Product/Create/ContentDetail";
import Attribute from "../../../components/Product/Create/Attribute";
import Distribute from "../../../components/Product/Create/Distribute";
import Video from "../../../components/Product/Create/Video";

import * as productAction from "../../../actions/product";
import * as CategoryPAction from "../../../actions/category_product";
import * as AttributeAction from "../../../actions/attribute_search";
import * as Types from "../../../constants/ActionType";
import * as blogAction from "../../../actions/blog";

import Alert from "../../../components/Partials/Alert";
import SeoOption from "../../../components/Product/Create/SeoOption";
import getChannel, { IKITECH, IKIPOS } from "../../../ultis/channel";
import { isEmpty, removeVietnameseTones } from "../../../ultis/helpers";
import Upload from "../../../components/Upload/index.js";
import Discount from "../../../components/Product/Create/Discount";
class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: "",
      isError: false,
      disableDistribute: false,
      disableInventory: false,
      attributeSearch: [],
      images: [],
      discountList: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllAttributeP(this.props.store_code);
    this.props.fetchAllCategoryP(this.props.store_code);
    this.props.fetchAllAttributeSearch(this.props.store_code);
    this.props.fetchAllBlog(this.props.store_code, 1);
  }

  setDiscountList = (discountList) => {
    this.setState({ discountList });
  };

  handleDataFromInfo = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.name = data.txtName;
      formdata.shelf_position = data.txtPosition;
      formdata.price = data.txtPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.money_amount_collaborator = data.money_amount_collaborator
        ?.toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.type_share_collaborator_number =
        data.type_share_collaborator_number;
      formdata.weight = data.txtWeight
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.barcode = removeVietnameseTones(data.txtBarcode);
      formdata.status = data.txtStatus;
      formdata.quantity_in_stock = data.txtQuantityInStock
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.point_for_agency = data.point_for_agency
        ?.toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.percent_collaborator = data.txtPercentC;
      formdata.sku = data.sku;
      formdata.is_medicine = data.is_medicine;
      formdata.check_inventory = data.check_inventory;
      formdata.main_cost_of_capital = data.txtCostOfCapital
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.main_stock = data.txtQuantityInStock
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.import_price = data.txtImportPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      var attribute_search_children_ids = [];
      if (data?.attribute_search_children_ids?.length > 0) {
        attribute_search_children_ids = data.attribute_search_children_ids.map(
          (attributeSearchParent, index) => {
            return attributeSearchParent.id;
          }
        );
      }

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
      return { form: formdata, attributeSearch: attribute_search_children_ids };
    });
  };

  checkDistribute = (status, _status) => {
    this.setState({ disableDistribute: status, disableInventory: _status });
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

    if (form?.list_distribute?.length > 0) {
      let isErrorEmpty = false;
      const skuDuplicate = [];
      if (
        form?.list_distribute[0].element_distributes?.[0]
          ?.sub_element_distributes?.length > 0
      ) {
        form?.list_distribute[0].element_distributes.forEach((element) => {
          element.sub_element_distributes.forEach((subElement) => {
            if (!subElement.sku) {
              isErrorEmpty = true;
              return;
            }
            skuDuplicate.push(subElement.sku);
          });
          if (isErrorEmpty) {
            return;
          }
        });
      } else if (form?.list_distribute[0].element_distributes?.length > 0) {
        form?.list_distribute[0].element_distributes.forEach((element) => {
          if (!element.sku) {
            isErrorEmpty = true;
            return;
          }
          skuDuplicate.push(element.sku);
        });
      }

      if (isErrorEmpty) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập đầy đủ mã sku",
          },
        });
        return;
      }

      const isErrorDuplicate =
        skuDuplicate.length > 0
          ? skuDuplicate.some(
              (value, index, seft) => seft.indexOf(value) !== index
            )
          : false;

      if (isErrorDuplicate) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Vui lòng nhập mã sku khác nhau",
          },
        });
        return;
      }
    }

    if (form.weight == "") {
      form.weight = 100;
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

    this.props.postProductV2(store_code, branch_id, formData, (id) => {
      this.props.setUpAttributeSearch(store_code, id, {
        list_attribute_search_childs: this.state.attributeSearch,
      });
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
  onChangeQuantityStock = (total) => {
    this.setState({ total: total });
  };
  handleDataFromProductImg = (imgs) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.images = imgs;
      return { form: formdata };
    });
  };

  handleDataFromProductVideo = (video) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.video_url = video;
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
  handleDataFromCustomizeSEO = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.seo_description = data.txtSeoDescription;
      formdata.seo_title = data.txtSeoTitle;
      formdata.meta_robots_index = data.meta_robots_index;
      formdata.meta_robots_follow = data.meta_robots_follow;
      formdata.canonical_url = data.canonical_url;
      formdata.product_url = data.product_url;
      return { form: formdata };
    });
  };

  handleDataFromDiscount = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.list_promotion = data;
      return { form: formdata };
    });
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };

  setImages = (images) => {
    this.setState({ images });
  };

  handleImageData = (data) => {
    this.handleDataFromProductImg([...data]);
    this.setImages(data);
  };
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
  render() {
    var { store_code } = this.props;
    var {
      category_product,
      attributeP,
      auth,
      isShowAttr,
      isCreate,
      isRemove,
      attribute_search,
    } = this.props;
    var { total, disableInventory, disableDistribute, discountList } =
      this.state;
    console.log("data::: ", this.state.form);
    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">Thêm sản phẩm</h4>
        </div>
        <br></br>
        <div class="card mb-4">
          <div class="card-header title_content">Nhập thông tin sản phẩm</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-8">
                <div>
                  <InfoProduct
                    badges={this.props.badges}
                    store_code={store_code}
                    checkDistribute={this.checkDistribute}
                    total={total}
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
                    handleDataFromProductVideo={this.handleDataFromProductVideo}
                  />
                </div>
                <div style={{ paddingTop: 20, width: "100%" }}>
                  <label
                    htmlFor="txt-name"
                    style={{
                      fontWeight: "750",
                    }}
                  >
                    Hình ảnh mô tả (Tối đa 13 ảnh)
                  </label>
                  <div style={{ width: "100%" }}>
                    <Upload
                      multiple
                      setFiles={this.handleImageData}
                      files={this.state.images}
                      images={""}
                      limit={13}
                      imageType="PRODUCT"
                    />
                  </div>
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
        {disableDistribute && (
          <div class="card mb-4">
            <div class="card-header title_content">Phân loại sản phẩm </div>
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <div class="col-lg-12">
                  <div>
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <Distribute
                        disableDistribute={disableDistribute}
                        disableInventory={disableInventory}
                        onChangeQuantityStock={this.onChangeQuantityStock}
                        handleDataFromDistribute={this.handleDataFromDistribute}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  handleDataFromContent={this.handleDataFromCustomizeSEO}
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
    auth: state.authReducers.login.authentication,
    attributeP: state.attributePReducers.attribute_product.allAttrbute,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    attribute_search:
      state.attributeSearchReducers.attribute_search.allAttribute,
    alert: state.productReducers.alert.alert_uid,
    badges: state.badgeReducers.allBadge,

    blogs: state.blogReducers.blog.allBlog,

    // state : state
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
    setUpAttributeSearch: (store_code, id, form) => {
      dispatch(AttributeAction.setUpAttributeSearch(store_code, id, form));
    },
    postProduct: (store_code, product) => {
      dispatch(productAction.postProduct(store_code, product));
    },
    postProductV2: (store_code, branch_id, form, funcModal) => {
      dispatch(
        productAction.postProductV2(store_code, branch_id, form, funcModal)
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);
