import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../";
import * as productAction from "../../actions/product";
import { connect } from "react-redux";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";

class General extends Component {
  constructor(props) {
    super(props);
  }

  getProduct = (is_near_out_of_stock) => {
    var params = "";
    if (is_near_out_of_stock) {
      params = params + `&is_near_out_of_stock=true`;
      this.props?.paramNearStock(true);
      this.props.passIsNearStock(true);
    } else {
      this.props?.paramNearStock(false);
      this.props.passIsNearStock(false);
    }
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchAllProductV2(this.props.store_code, branchIds, 1, params);
  };

  render() {
    var { products, badges, store } = this.props;

    var total_stoking =
      typeof store.total_products == "undefined" ? 0 : store.total_products;
    var total_out_of_stock =
      typeof badges.total_product_or_discount_nearly_out_stock == "undefined"
        ? 0
        : badges.total_product_or_discount_nearly_out_stock;
    // var total_hide = typeof products.total_hide == "undefined" ? 0 : products.total_hide

    console.log(badges, store);
    return (
      <div className="row" style={{ marginBottom: "20px" }}>
        <div
          className="col-xl-6 col-md-6 mb-6"
          onClick={() => this.getProduct()}
        >
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body set-padding ">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className=" font-weight-bold text-primary text-uppercase mb-1">
                    Tất cả sản phẩm
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {total_stoking}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-boxes fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-xl-6 col-md-6 mb-6"
          onClick={() => this.getProduct(true)}
        >
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body set-padding ">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className=" font-weight-bold text-danger text-uppercase mb-1">
                    Sắp hết hàng
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {this.props.countProductNearlyOutStock || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-boxes fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(General);
