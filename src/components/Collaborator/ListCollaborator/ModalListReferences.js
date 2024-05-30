import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "./ModalListReferences/Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./ModalListReferences/Pagination";
class ModalListReferences extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    var { store_code } = this.props;
    if (this.props.referral_phone_number != nextProps.referral_phone_number) {
      this.props.fetchAllCustomer(
        store_code,
        1,
        null,
        nextProps.referral_phone_number
      );
    }
  }

  render() {
    var { store_code, customers, referral_phone_number } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalListReferences"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Danh sách giới thiệu</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            {customers == null ||
            customers.data == null ||
            customers.data.length == 0 ? (
              <center>
                {" "}
                <p>
                  <i>( Chưa giới thiệu khách hàng nào )</i>
                </p>{" "}
              </center>
            ) : (
              ""
            )}

            <Table customers={customers} />

            <div class="modal-footer">
              <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Pagination
                  store_code={store_code}
                  customers={customers}
                  referral_phone_number={referral_phone_number}
                />
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
    customers: state.customerReducers.customer.allCustomer,
    auth: state.authReducers.login.authentication,
    customer: state.customerReducers.customer.customerID,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (store_code, page, params, referral_phone_number) => {
      dispatch(
        customerAction.fetchAllCustomer(
          store_code,
          page,
          params,
          referral_phone_number
        )
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalListReferences);
