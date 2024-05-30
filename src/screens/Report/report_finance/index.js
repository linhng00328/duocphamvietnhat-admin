import React, { Component } from "react";
import { MomentInput } from "react-moment-input";
import Alert from "../../../components/Partials/Alert";
import Footer from "../../../components/Partials/Footer";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import General from "./General";
import * as Types from "../../../constants/ActionType";
import ChartFinance from "../../../components/Report/ChartFinance";
import NotAccess from "../../../components/Partials/NotAccess";
import { connect } from "react-redux";

class ReportFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profitToltal: "",
    };
  }
  handleCallbackProfit = (modal) => {
    this.setState({ profitToltal: modal });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.report_finance != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.report_finance;
      this.setState({ isLoading: true, isShow });
    }
  }
  render() {
    const { store_code } = this.props.match.params;
    const { profitToltal, isShow } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <General
                    store_code={store_code}
                    profitToltal={profitToltal}
                  />
                  <div className="card">
                    <div className="card-header py-3">
                      <h6 className="m-0 title_content font-weight-bold text-primary">
                        Báo cáo lợi nhuận
                      </h6>
                    </div>
                    <div className="card-body">
                      <ChartFinance
                        store_code={store_code}
                        handleCallbackProfit={this.handleCallbackProfit}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    permission: state.authReducers.permission.data,
  };
};

export default connect(mapStateToProps, null)(ReportFinance);
