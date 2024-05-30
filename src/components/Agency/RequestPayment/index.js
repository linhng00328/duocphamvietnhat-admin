import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import Table from "./Table";
import ModalUpdate from "./ModalUpdate";
import ModalUpdateAll from "./ModalUpdateAll";

class RequestPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllRequestPayment(this.props.store_code);
  }
  handleChangeStatus = (name, data) => {
    this.setState({
      modal: {
        name: name,
        data: data,
      },
    });
  };
  render() {
    var { store_code, requestPayment, tabId, paramId, payment_request_solve } =
      this.props;
    var { modal } = this.state;

    console.log(requestPayment);
    return (
      <div id="wrapper">
        <div className="card-body">
          <Table
            paramId={paramId || null}
            handleChangeStatus={this.handleChangeStatus}
            tabId={tabId}
            store_code={store_code}
            requestPayment={requestPayment}
            payment_request_solve={payment_request_solve}
          />
        </div>
        <ModalUpdate modal={modal} store_code={store_code} />
        <ModalUpdateAll modal={modal} store_code={store_code} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requestPayment: state.agencyReducers.agency.allRequestPayment,
    auth: state.authReducers.login.authentication,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllRequestPayment: (store_code) => {
      dispatch(agencyAction.fetchAllRequestPayment(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestPayment);
