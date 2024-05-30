import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import InfoProduct from "../../../components/Product/Update/InfoProduct";
import ContentDetail from "../../../components/Product/Update/ContentDetail";
import Video from "../../../components/Product/Update/Video";
import {
  formatNumberV2,
  getQueryParams,
  isEmpty,
} from "../../../ultis/helpers";

import * as blogAction from "../../../actions/blog";

import Attribute from "../../../components/Product/Update/Attribute";
import Distribute from "../../../components/Product/Update/Distribute";
import * as productAction from "../../../actions/product";
import * as CategoryPAction from "../../../actions/category_product";
import * as AttributeAction from "../../../actions/attribute_search";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import SeoOption from "../../../components/Product/Update/SeoOption";
import getChannel, { IKITECH, IKIPOS } from "../../../ultis/channel";
import history from "../../../history";
import Upload from "../../../components/Upload/index.js";
import Discount from "../../../components/Product/Update/Discount";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: "",
      disableDistribute: false,
      disableInventory: false,
      attributeSearch: [],
      images: [],
      discountList: [],
    };
  }

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
      formdata.import_price = data.txtImportPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");
      formdata.barcode = data.txtBarcode;
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
      return {
        form: formdata,
        attributeSearch: data.attribute_search_children_ids,
      };
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

      return { form: formdata };
    });
  };
  handleDataFromCustomizeSEO = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.seo_title = data.txtSeoTitle;
      formdata.seo_description = data.txtSeoDescription;
      formdata.meta_robots_index = data.meta_robots_index;
      formdata.meta_robots_follow = data.meta_robots_follow;
      formdata.canonical_url = data.canonical_url;
      formdata.product_url = data.product_url;

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
    var { store_code, productId } = this.props;
    var form = {
      ...this.state.form,
      import_price: Number(this.state.form?.import_price),
      price: Number(this.state.form?.price),
      quantity_in_stock: Number(this.state.form?.quantity_in_stock),
    };

    form.point_for_agency = form.point_for_agency
      ?.toString()
      .replace(/,/g, "")
      .replace(/\./g, "");
    form.index_image_avatar = 0;
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
                  const barcode =
                    element.barcode != null ? element.barcode.toString() : 0;

                  const quantity_in_stock =
                    element.quantity_in_stock != null
                      ? element.quantity_in_stock
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
                  form.list_distribute[0].element_distributes[index].price =
                    Number(price);
                  form.list_distribute[0].element_distributes[
                    index
                  ].import_price = Number(import_price);

                  form.list_distribute[0].element_distributes[
                    index
                  ].quantity_in_stock = Number(quantity_in_stock);
                  form.list_distribute[0].element_distributes[index].barcode =
                    barcode;
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
                                : "";
                            const quantity_in_stock =
                              _element.quantity_in_stock != null
                                ? _element.quantity_in_stock
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
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].import_price =
                              Number(import_price);
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[_index].price =
                              Number(price);
                            form.list_distribute[0].element_distributes[
                              index
                            ].sub_element_distributes[
                              _index
                            ].quantity_in_stock = Number(quantity_in_stock);
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

    var { page, currentBranch } = this.props;
    var list_distribute = form.list_distribute ?? [];

    if (list_distribute.length > 0) {
      list_distribute[0].element_distributes =
        list_distribute[0].element_distributes.map((ele) => {
          if (ele.id != null) {
            ele.is_edit = true;
          } else {
            ele.is_edit = false;
          }

          if (ele.id != null && ele.before_name == null) {
            ele.before_name = ele.name;
            ele.is_edit = true;
          }

          return ele;
        });
      list_distribute[0].element_distributes =
        list_distribute[0].element_distributes.map((ele) => {
          if (
            ele != null &&
            ele.sub_element_distributes != null &&
            ele.sub_element_distributes.length > 0
          ) {
            ele.sub_element_distributes = ele.sub_element_distributes.map(
              (sub) => {
                if (sub.id != null) {
                  sub.is_edit = true;
                } else {
                  sub.is_edit = false;
                }

                if (sub.id != null && sub.before_name == null) {
                  sub.before_name = sub.name;
                  sub.is_edit = true;
                }

                return sub;
              }
            );
          }
          return ele;
        });
    }

    var distributeData = {};
    form.list_distribute = null;

    distributeData = {
      has_distribute: false,
      has_sub: false,
    };

    if (
      list_distribute != null &&
      list_distribute.length > 0 &&
      list_distribute[0].element_distributes != null &&
      list_distribute[0].element_distributes.length > 0 &&
      this.state.disableDistribute == true
    ) {
      distributeData.has_distribute = true;
      distributeData.distribute_name = list_distribute[0].name;
      if (
        list_distribute[0].element_distributes[0] &&
        list_distribute[0].element_distributes[0].sub_element_distributes !=
          null &&
        list_distribute[0].element_distributes[0] &&
        list_distribute[0].element_distributes[0].sub_element_distributes
          .length > 0
      ) {
        distributeData.has_sub = true;
        distributeData.sub_element_distribute_name =
          list_distribute[0].sub_element_distribute_name;
      }
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

    distributeData.element_distributes =
      list_distribute.length > 0
        ? list_distribute[0].element_distributes
        : distributeData.element_distributes;

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

    const pageNum = getQueryParams("page") || 1;
    const limit = getQueryParams("limit") || 20;
    const search = getQueryParams("search") || "";
    const category_ids = getQueryParams("category_ids") || "";
    const category_children_ids = getQueryParams("category_children_ids") || "";
    const params = `&limit=${limit}${search ? `&search=${search}` : ""}${
      category_ids ? `&category_ids=${category_ids}` : ""
    }${
      category_children_ids
        ? `&category_children_ids=${category_children_ids}`
        : ""
    }`;

    this.props.updateDistribute(
      store_code,
      distributeData,
      productId,
      currentBranch?.id,
      formData,
      pageNum,
      params,
      () => {
        this.props.setUpAttributeSearch(store_code, productId, {
          list_attribute_search_childs: this.state.attributeSearch,
        });

        history.push(`/product/index/${store_code}?page=${pageNum}${params}`);
      }
    );
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };
  onChangeQuantityStock = (total) => {
    this.setState({ total: total });
  };

  checkHasAttribute = (element, arr) => {
    var check = false;
    for (const item of arr) {
      if (item == element) {
        check = true;
      }
    }
    return check;
  };

  afterAttribute = () => {
    var { attributeP, product } = this.props;
    if (product?.attributes?.length > 0) {
      var ListDistributeWithName = product?.attributes.map((data) => {
        return data.name;
      });
      var newListDistributeWithName = [...ListDistributeWithName];
      for (const item1 of attributeP) {
        if (this.checkHasAttribute(item1, ListDistributeWithName) == false) {
          newListDistributeWithName.push(item1);
        }
      }
      return newListDistributeWithName;
    } else {
      return attributeP;
    }
  };
  handleDataFromProductVideo = (video) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.video_url = video;
      return { form: formdata };
    });
  };

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

  render() {
    var { store_code, productId } = this.props;
    var {
      category_product,
      attribute_search,
      attributeP,
      auth,
      product,
      isShowAttr,
      isCreate,
      isRemove,
      update,
    } = this.props;
    var { total, disableInventory, disableDistribute, discountList } =
      this.state;

    var afterAttribute = this.afterAttribute();
    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa sản phẩm:&nbsp;{product.name}
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
                    store_code={store_code}
                    checkDistribute={this.checkDistribute}
                    total={total}
                    product={product}
                    handleDataFromInfo={this.handleDataFromInfo}
                    category_product={category_product}
                    attribute_search={attribute_search}
                    productId={productId}
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
                    form={this.state.form}
                    handleDataFromProductVideo={this.handleDataFromProductVideo}
                  />
                </div>
                <div style={{ paddingTop: 20 }}>
                  <label
                    for="txtName"
                    style={{
                      fontWeight: "750",
                    }}
                  >
                    Hình ảnh mô tả (Tối đa 13 ảnh)
                  </label>
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
        </div>
        {getChannel() == IKITECH && (
          <div class="card mb-4">
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {update ? (
                    <button
                      class="btn btn-primary btn-sm"
                      onClick={this.postProduct}
                    >
                      <i class="fa fa-plus"></i> Lưu thay đổi
                    </button>
                  ) : null}

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
                      attributeP={afterAttribute}
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
                {update ? (
                  <button
                    class="btn btn-primary btn-sm"
                    onClick={this.postProduct}
                  >
                    <i class="fa fa-plus"></i> Lưu thay đổi
                  </button>
                ) : null}

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
    updateDistribute: (
      store_code,
      product,
      productId,
      branchId,
      data,
      page,
      params,
      funcModal
    ) => {
      dispatch(
        productAction.updateDistribute(
          store_code,
          product,
          productId,
          branchId,
          data,
          page,
          params,
          funcModal
        )
      );
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchAllBlog: (id, page) => {
      dispatch(blogAction.fetchAllBlog(id, page));
    },
    setUpAttributeSearch: (store_code, id, form) => {
      dispatch(AttributeAction.setUpAttributeSearch(store_code, id, form));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
