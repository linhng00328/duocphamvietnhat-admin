import React, { Component } from "react";
import Form from "../../../../components/Promotion/Discount/Edit/Form";
import * as Types from "../../../../constants/ActionType";
import Alert from "../../../../components/Partials/Alert";
import { connect } from "react-redux";
import * as discountAction from "../../../../actions/discount";
import * as productAction from "../../../../actions/product";
import * as CategoryPAction from "../../../../actions/category_product";
class Edit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { store_code, discountId } = this.props;
    this.props.fetchDiscountId(store_code, discountId);
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllDiscount(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  render() {
    var { discount, products, history, discounts } = this.props;
    var { store_code, discountId } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa chương trình
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
                    <Form
                      store_code={store_code}
                      history={history}
                      discountId={discountId}
                      products={products}
                      discount={discount}
                      discounts={discounts}
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
    discount: state.discountReducers.discount.discountId,
    products: state.productReducers.product.allProduct,
    discounts: state.discountReducers.discount.allDiscount,
    alert: state.discountReducers.alert.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDiscountId: (store_code, discountId) => {
      dispatch(discountAction.fetchDiscountId(store_code, discountId));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllDiscount: (store_code) => {
      dispatch(discountAction.fetchAllDiscount(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
