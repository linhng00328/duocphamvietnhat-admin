import React, { Component } from "react";

import Form from "../../../../components/Promotion/Voucher/Create/Form";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";

import Alert from "../../../../components/Partials/Alert";
import * as productAction from "../../../../actions/product";
import * as voucherAction from "../../../../actions/voucher";
import * as CategoryPAction from "../../../../actions/category_product";
class Create extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllVoucher(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  render() {
    var { products, history, vouchers } = this.props;
    var { store_code, type } = this.props;
    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">Tạo Voucher</h4>
        </div>
        <br></br>

        <div class="card shadow mb-4">
          <div class="card-body">
            <section class="content">
              <div class="row">
                <div class="col-md-12 col-xs-12">
                  <div id="messages"></div>

                  <div class="box">
                    <Form
                      type={type}
                      store_code={store_code}
                      history={history}
                      products={products}
                      vouchers={vouchers}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    products: state.productReducers.product.allProduct,
    alert: state.voucherReducers.alert.alert_uid,
    vouchers: state.voucherReducers.voucher.allVoucher,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllVoucher: (store_code) => {
      dispatch(voucherAction.fetchAllVoucher(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);
