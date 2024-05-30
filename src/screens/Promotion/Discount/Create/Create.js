import React, { Component } from "react";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import Footer from "../../../../components/Partials/Footer";
import Form from "../../../../components/Promotion/Discount/Create/Form";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import Alert from "../../../../components/Partials/Alert";
import * as productAction from "../../../../actions/product";
import * as discountAction from "../../../../actions/discount";
import * as CategoryPAction from "../../../../actions/category_product";
class Create extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllDiscount(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  render() {
    var { discount, products, history, discounts } = this.props;
    var { store_code } = this.props;

    return (
      <div class="container-fluid">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Tạo chương trình
          </h4>
        </div>
        <br></br>
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
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
    products: state.productReducers.product.allProduct,
    alert: state.discountReducers.alert.alert_uid,
    discounts: state.discountReducers.discount.allDiscount,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(Create);
