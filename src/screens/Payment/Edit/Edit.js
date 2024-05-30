import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Payment/Edit/Form";
import * as paymentAction from "../../../actions/payment";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType"

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAllPayment(store_code);
  }


  render() {
    var { paymentId, store_code } = this.props;
    var { payments, history } = this.props

      return (
     
                    <div class="container-fluid">
                      <Alert
                        type={Types.ALERT_UID_STATUS}
                        alert={this.props.alert}
                      />
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <h4 className="h4 title_content mb-0 text-gray-800">
                          Chỉnh sửa thanh toán
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
                                  <Form history={history} paymentId={paymentId} payments={payments} store_code={store_code} />
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
    payments: state.paymentReducers.payment.allPayment,
    auth: state.authReducers.login.authentication,
    alert: state.paymentReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,


  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllPayment: (store_code) => {
      dispatch(paymentAction.fetchAllPayment(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
