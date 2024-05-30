import React, { Component } from "react";

import Form from "../../../../components/Promotion/BonusProduct/Create/Form";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";

import Alert from "../../../../components/Partials/Alert";
import * as productAction from "../../../../actions/product";
import * as bonusProductAction from "../../../../actions/bonus_product";
import * as CategoryPAction from "../../../../actions/category_product";

class Create extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllProductV2(store_code, branch_id, 1, null);
    this.props.fetchAllBonusProduct(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  render() {
    var { products, history, combos } = this.props;
    var { store_code } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Tạo chương trình thưởng sản phẩm
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
                      products={products}
                      combos={combos}
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
    alert: state.comboReducers.alert.alert_uid,
    combos: state.bonusProductReducers.bonusProduct.allBonusProduct,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchAllBonusProduct: (store_code) => {
      dispatch(bonusProductAction.fetchAllBonusProduct(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);
