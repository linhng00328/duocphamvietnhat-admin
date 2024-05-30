import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as billAction from "../../actions/bill";
import { shallowEqual } from "../../ultis/shallowEqual";
import ComponentA6Bill from "./ComponentA6Bill";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import history from "../../history";
import BillPos from "./BillPos";
// import './bill.css'
import * as dashboardAction from "../../actions/dashboard";
import * as branchAction from "../../actions/branch";
import * as notificationAction from "../../actions/notification";
import { useLocation } from "react-router-dom";

class PrintOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "show",
      isShow: false,
      loadingBranch: true,
      badges: props.badges,
    };
  }

  componentWillMount() {
    window.$("link[rel=stylesheet]").prop("disabled", true);
  }

  componentDidMount() {
    var { store_code, order_code, billId } = this.props.match.params;

    // window.$("link[rel=stylesheet]").prop("disabled", true);

    this.props.fetchBillId(store_code, order_code);

    window.addEventListener("afterprint", (event) => {
      //    var =  defaultHrefBack
      window.$("link[rel=stylesheet]").prop("disabled", false);

      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      if (params.defaultHrefBack) {
        var link = atob(params.defaultHrefBack);
        // console.log("link", link)
        history.push(link);
        //  window.location.href = link;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    var branch_id = nextProps.bill.branch_id;

    if (!shallowEqual(nextProps.bill, this.props.bill)) {
      var { store_code, order_code, billId } = nextProps.match.params;

      if (nextProps.location?.state?.badges == null) {
        this.props.fetchAllBadge(store_code, branch_id ?? 0);
      }
      if (nextProps.location?.state?.currentBranch == null) {
        nextProps.fetchBranchStore(store_code);
      } else {
        this.setState({
          selectedBranch: nextProps.location?.state?.currentBranch,
          loadingBranch: false,
        });
      }
    }

    if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {
      const selectedBranch = nextProps.branchStore.find(
        (branch) => branch.id == branch_id
      );
      this.props.changeBranch(selectedBranch);
      this.setState({
        selectedBranch: selectedBranch,
        loadingBranch: false,
      });
    }

    if (!shallowEqual(nextProps.badges, this.props.badges)) {
      this.setState({
        badges: nextProps.badges,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(this.state.isShow, nextState.isShow) &&
      nextState.isShow == true
    ) {
      this.onPrint();
    }

    if (this.state.isLoading != true) {
      this.setState({ isLoading: true });
    }

    return true;
  }

  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  onPrint = () => {
    window.print();
  };
  onLoaded = () => {
    if (this.state.isShow == false) {
      this.setState({
        isShow: true,
      });
    }
  };

  render() {
    var { store_code, order_code, billId } = this.props.match.params;
    var { bill, stores, currentBranch, badges } = this.props;
    var { badges } = this.state;

    if (
      bill == null ||
      bill.order_code == null ||
      badges == null ||
      badges.store_name == null ||
      this.state.loadingBranch == true
    ) {
      return <Loading />;
    }

    return (
      <div>
        <BillPos
          onLoaded={this.onLoaded}
          bill={bill}
          badges={badges}
          currentBranch={this.state.selectedBranch}
          ref={(el) => (this.componentRef = el)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
    bill: state.billReducers.bill.billID,
    currentBranch: state.branchReducers.branch.currentBranch,
    branchStore: state.storeReducers.store.branchStore,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBillId: (store_code, billId) => {
      dispatch(billAction.fetchBillId(store_code, billId));
    },
    fetchBranchStore: (store_code) => {
      dispatch(dashboardAction.fetchBranchStore(store_code));
    },
    changeBranch: (branchData) => {
      dispatch(branchAction.changeBranch(branchData));
    },
    fetchAllBadge: (store_code, branch_id) => {
      dispatch(notificationAction.fetchAllBadge(store_code, branch_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintOrderScreen);
