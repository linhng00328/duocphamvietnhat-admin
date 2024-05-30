import React, { Component } from "react";
import { connect } from "react-redux";
import InfoProduct from "../../../components/ProductAgency/Update/InfoProduct";
import Distribute from "../../../components/ProductAgency/Update/Distribute";
import * as productAction from "../../../actions/product";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import history from "../../../history";
import { getQueryParams } from "../../../ultis/helpers";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: "",
    };
  }

  componentDidMount() {
    var { store_code, productId, agency_type_id } = this.props;
    this.props.fetchProductAgencyPrice(store_code, productId, agency_type_id);
    this.props.fetchProductId(store_code, productId);
  }

  handleDataFromInfo = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.main_price = data.txtPrice
        .toString()
        .replace(/,/g, "")
        .replace(/\./g, "");

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
    var { store_code, productId, agency_type_id } = this.props;
    var form = { ...this.state.form };
    console.log(form.list_distribute);
    var list_distribute = [...form.list_distribute];
    var element_distributes_price = [];
    var sub_element_distributes_price = [];
    if (typeof list_distribute != "undefined") {
      list_distribute.forEach((item, index) => {
        item.element_distributes.forEach((_item) => {
          element_distributes_price.push({
            distribute_name: item.name,
            element_distribute: _item.name,
            price:
              _item.price != null
                ? _item.price.toString().replace(/,/g, "").replace(/\./g, "")
                : 0,
          });
          if (typeof _item.sub_element_distributes != "undefined") {
            if (_item.sub_element_distributes.length > 0) {
              _item.sub_element_distributes.forEach((element) => {
                sub_element_distributes_price.push({
                  distribute_name: item.name,
                  element_distribute: _item.name,
                  sub_element_distribute: element.name,
                  price:
                    element.price != null
                      ? element.price
                          .toString()
                          .replace(/,/g, "")
                          .replace(/\./g, "")
                      : 0,
                });
              });
            }
          }
        });
      });
    }

    form.element_distributes_price =
      element_distributes_price.length == 0 ? null : element_distributes_price;
    form.sub_element_distributes_price =
      sub_element_distributes_price.length == 0
        ? null
        : sub_element_distributes_price;
    delete form.list_distribute;
    form.agency_type_id = this.props.agency_type_id;
    console.log(form);
    var page = getQueryParams("page") ?? 0;
    var numPage = getQueryParams("limit") ?? 20;
    var search = getQueryParams("search") ?? "";
    var tabIndex = getQueryParams("tab-index") ?? 0;
    var category_ids = getQueryParams("category_ids") ?? "";
    var category_children_ids = getQueryParams("category_children_ids") ?? "";
    var url = `/product-agency/index/${store_code}/${agency_type_id}?tab-index=${tabIndex}&page=${page}&search=${search}&limit=${numPage}&category_ids=${category_ids}&category_children_ids=${category_children_ids}`;
    this.props.updateAgencyPrice(store_code, form, productId, null, url);
  };
  goBack = (e) => {
    var { store_code, productId, agency_type_id } = this.props;

    e.preventDefault();
    var page = getQueryParams("page") ?? 0;
    var numPage = getQueryParams("limit") ?? 20;
    var search = getQueryParams("search") ?? "";
    var category_ids = getQueryParams("category_ids") ?? "";
    var category_children_ids = getQueryParams("category_children_ids") ?? "";
    var tabIndex = getQueryParams("tab-index") ?? 0;

    var url = `/product-agency/index/${store_code}/${agency_type_id}?tab-index=${tabIndex}&page=${page}&search=${search}&limit=${numPage}&category_ids=${category_ids}&category_children_ids=${category_children_ids}`;
    history.replace(url);
  };
  onChangeQuantityStock = (total) => {
    this.setState({ total: total });
  };

  render() {
    var { product, itemProduct } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa giá sản phẩm: {itemProduct.name ?? null}
          </h4>
        </div>
        <br></br>
        <div class="card mb-4">
          <div class="card-header title_content">
            Nhập giá đại lý
            <span
              style={{
                display: "block",
                fontSize: "14px",
                color: "#514949",
                "font-weight": "400",
              }}
            >
              (Giá đại lý sẽ bằng giá gốc nếu các trường giá đại lý bị bỏ trống)
            </span>
          </div>

          <div class="card-body" style={{ padding: "0.8rem" }}>
            {(product.distributes?.length == 0 ||
              product.distributes == null) && (
              <div class="row">
                <div class="col-lg-6">
                  <div>
                    <InfoProduct
                      product={product}
                      handleDataFromInfo={this.handleDataFromInfo}
                    />
                  </div>
                </div>
              </div>
            )}

            <div class="" style={{ padding: "0 14px" }}>
              <div>
                <div class="row">
                  <div class="col-lg-12">
                    <div>
                      <div>
                        <Distribute
                          onChangeQuantityStock={this.onChangeQuantityStock}
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
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                  class="btn btn-primary btn-sm"
                  onClick={this.postProduct}
                >
                  <i class="fa fa-save"></i> Lưu
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class={`btn btn-warning btn-sm color-white `}
                >
                  <i class="fa fa-arrow-left"></i> Trở về
                </button>
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
    product: state.productReducers.product.product_agency_price_id,
    mainProduct: state.productReducers.product.productId,

    alert: state.productReducers.alert.alert_uid,
    itemProduct: state.productReducers.product.productId,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgencyPrice: (store_code, product, productId, page, url) => {
      dispatch(
        productAction.updateAgencyPrice(
          store_code,
          product,
          productId,
          page,
          url
        )
      );
    },
    fetchProductAgencyPrice: (store_code, productId, agency_type_id) => {
      dispatch(
        productAction.fetchProductAgencyPrice(
          store_code,
          productId,
          agency_type_id
        )
      );
    },
    fetchProductId: (store_code, productId) => {
      dispatch(productAction.fetchProductId(store_code, productId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
