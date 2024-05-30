import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as action from "../actions/index";
import { getBranchId, setBranchId, setBranchName, getBranchName } from "../ultis/branchUtils";
import { shallowEqual } from "../ultis/shallowEqual";
import * as dashboardAction from "../actions/dashboard";
import * as branchAction from "../actions/branch"
import { getStoreId, setStoreId } from "../ultis/store";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_code: ""
    }

  }
  componentDidMount() {
    this.props.fetchAllStore();

  }

  componentWillReceiveProps(nextProps, nextState) {


    if (!shallowEqual(nextProps.stores, this.props.stores)) {

      const store_id = getStoreId();

      var stores = nextProps.stores
      if (stores.isApi) {
        var listStore = typeof stores.data == "undefined" ? [] : stores.data;
        if (listStore?.length > 0) {

          if (store_id != null) {
            const selectedStrore = stores.data.find(
              (store) => store.id == store_id
            );
            if (selectedStrore == null) {
              var store_code = stores.data[0].store_code;
              this.setState({
                store_code: store_code
              })
              setStoreId(stores.data[0].id)
              this.props.fetchBranchStore(store_code);
            } else {

              var store_code = selectedStrore.store_code;

              this.setState({
                store_code: store_code
              })
              this.props.fetchBranchStore(store_code);
            }
          } else {
            var store_code = stores.data[0].store_code;
            this.setState({
              store_code: store_code
            })
            setStoreId(stores.data[0].id)
            this.props.fetchBranchStore(store_code);
          }


        } else {
          return <Redirect to="/dashboard/duocphamnhatban" />;
        }
      }


    }

    if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {
      const branch_id = getBranchId();
      const branch_name = getBranchName();

      if (nextProps.branchStore != null && nextProps.branchStore.length > 0) {
        if (branch_id != null && branch_name != null) {
          const selectedBranch = nextProps.branchStore.find(
            (branch) => branch.id == branch_id
          );
          if (selectedBranch == null) {
            const value = nextProps.branchStore[0]?.id;
            const name = nextProps.branchStore[0]?.name;

            this.props.changeBranch(nextProps.branchStore[0]);
            setBranchId(value)
            setBranchName(name)



          } else {
            this.props.changeBranch(selectedBranch);
          }

        } else {
          const value = nextProps.branchStore[0]?.id;
          const name = nextProps.branchStore[0]?.name;

          this.props.changeBranch(nextProps.branchStore[0]);
          setBranchId(value)
          setBranchName(name)

        }
      }

    }
  }

  render() {
    var { stores } = this.props;
    console.log(this.props.loadingBranch, this.props.currentBranch, stores.store_code, getBranchId(), stores)
    if (this.props.auth) {
      if (stores != null && stores.data?.length == 0) {
        return <Redirect to={`/dashboard/duocphamnhatban`} />;
      }

      if (this.props.loadingBranch == false &&
        stores != null &&
        this.props.currentBranch != null &&
        this.props.currentBranch.id != null && stores != null &&
        typeof stores.store_code != null &&
        getBranchId() != null && getBranchName() != null &&
        this.state.store_code != null &&
        typeof getBranchId() != "undefined") {
        return <Redirect to={`/dashboard/${this.state.store_code}`} />;
      } if (stores != null && stores.length == 0 && this.props.loadingBranch == false) {
        return <Redirect to={`/dashboard/duocphamnhatban`} />;
      }
      else {
        return <Loading />;

      }

    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    }
    else
      if (this.props.loadingBranch == true) {
        return <Loading />;
      } else {
        return <Loading />;
      }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    stores: state.storeReducers.store.allStore,
    branchStore: state.storeReducers.store.branchStore,
    loadingBranch: state.storeReducers.store.loadingBranch,
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStore: () => {
      dispatch(action.fetchAllStore());
    },
    fetchBranchStore: (store_code) => {
      dispatch(dashboardAction.fetchBranchStore(store_code))
    },
    changeBranch: (branchData) => {
      dispatch(branchAction.changeBranch(branchData))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
