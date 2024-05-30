import React, { Component } from "react";

import Form from "../../../../components/Promotion/Combo/Edit/Form";
import * as Types from "../../../../constants/ActionType";

import Alert from "../../../../components/Partials/Alert";

import { connect } from "react-redux";

import * as comboAction from "../../../../actions/combo";
import * as productAction from "../../../../actions/product";
import * as CategoryPAction from "../../../../actions/category_product";
class Edit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { store_code, comboId } = this.props;
    this.props.fetchComboId(store_code, comboId);
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllCombo(store_code);
    this.props.fetchAllCategoryP(store_code);
  }

  render() {
    var { combo, products, history, combos } = this.props;
    var { store_code, comboId } = this.props;

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
                      comboId={comboId}
                      products={products}
                      combo={combo}
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
    combo: state.comboReducers.combo.comboId,
    products: state.productReducers.product.allProduct,
    combos: state.comboReducers.combo.allCombo,
    alert: state.comboReducers.alert.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchComboId: (store_code, comboId) => {
      dispatch(comboAction.fetchComboId(store_code, comboId));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllCombo: (store_code) => {
      dispatch(comboAction.fetchAllCombo(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
