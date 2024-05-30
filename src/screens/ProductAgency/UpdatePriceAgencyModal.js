import React, { Component } from "react";
import * as productAction from "../../actions/product";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import themeData from "../../ultis/theme_data";
import { formatNumber } from "../../ultis/helpers";
import InfoProduct from "../../components/ProductAgency/Update/InfoProduct";
import Distribute from "../../components/ProductAgency/Update/Distribute";

class UpdatePriceAgencyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtNewPrice: "",
      id: "",
      form: {},
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (!isNaN(Number(_value))) {
      const price =
        _value != null
          ? _value.toString().replace(/,/g, "").replace(/\./g, "")
          : 0;

      value = new Intl.NumberFormat().format(price);
      this.setState({ [name]: value });
    }
  };

  onSave = (e) => {
    e.preventDefault();
    var { store_code, productId, agency_type_id, fetchAllProduct } = this.props;
    var form = { ...this.state.form };
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

    this.props.updateAgencyPrice(
      store_code,
      form,
      productId,
      null,
      null,
      false,
      () => {
        fetchAllProduct();
        window.$(".modal").modal("hide");
        this.onClose();
      }
    );
  };

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
  onClose = () => {
    this.props.setShowModalUpdatePriceAgency(false);
  };

  render() {
    var { product } = this.props;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalNewPriceAgeny"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh nhanh giá</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.onClose}
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                {(product.distributes?.length == 0 ||
                  product.distributes == null) && (
                  <div class="row">
                    <div class="col-lg-12">
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

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.onClose}
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Lưu
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
    alert: state.productReducers.alert.alert_uid,
    product: state.productReducers.product.product_agency_price_id,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgencyPrice: (
      store_code,
      product,
      productId,
      page,
      url,
      isNotReplace,
      onSuccess
    ) => {
      dispatch(
        productAction.updateAgencyPrice(
          store_code,
          product,
          productId,
          page,
          url,
          isNotReplace,
          onSuccess
        )
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePriceAgencyModal);
