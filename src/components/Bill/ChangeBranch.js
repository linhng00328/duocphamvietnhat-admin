import { data } from "jquery";
import React, { Component } from "react";
import * as billAction from "../../actions/bill"
import { connect } from "react-redux";
import ChooseShipper from "./ChooseShipper";
import { shallowEqual } from "../../ultis/shallowEqual";
import ModalChangeBranch from "./ModalChangeBranch";

class ChangeBranch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txtBranch: props.branch_id,
        };
    }


    showData = (stores) => {
        var result = null;
        var store_code =
            typeof this.props.store_code != "undefined"
                ? this.props.store_code
                : null;
        if (stores.length > 0) {
            result = stores.map((data, index) => {
                var selected = data.store_code === store_code ? true : false;
                return (
                    // <option value={data.id} key={index} selected={selected}>
                    //     {data.name}
                    // </option>
                       <option value={data.id} key={index} selected={selected} data-branch-type = "(CN mặc định)" className={data.is_default_order_online == true ? "active-branch-default" : ""}>
                       {data.name}      {data.is_default_order_online == true ? "(Mặc định)" : ""} 
                     </option>
                );
            });
        } else {
            return result;
        }
        return result;
    };

    changeStatus = (statusCode, name) => {
        this.props.handleUpdateStatusOrder({ order_status_code: statusCode, statusName: name })
    }

    sendOrderToDelivery = () => {
        var { bill, order_code, store_code } = this.props

        this.props.sendOrderToDelivery(null, store_code, bill.id, order_code);
    }

    componentDidMount() {

        this.setState({
            txtBranch: this.props.branch_id,
        });

    }

    componentWillReceiveProps(nextProps, nextState) {
        if (
            !shallowEqual(nextProps.bill, this.props.bill)
        ) {
            this.setState({
                txtBranch: nextProps.bill.branch_id,
            });
        }
    }


    onChange = (e) => {

        var value = e.target.value;

        var branchStore =
            typeof this.props.branchStore == "undefined"
                ? []
                : this.props.branchStore;

        const selectedBranch = branchStore.find((branch) => branch.id == value);
        this.setState({
            nameBranch: selectedBranch?.name,
            txtBranch: selectedBranch?.id
        });

        window.$('#modalChangeBranch').modal('show');
    }

    changeBranch = (branch_id) => {

        var { bill, store_code } = this.props

        this.props.updateOrder({
            branch_id: branch_id
        }, store_code, bill.order_code)
    }

    render() {
        var { bill } = this.props

        var { branchStore } = this.props;

        var { txtBranch, nameBranch } = this.state;

        var branchStore = typeof branchStore == "undefined" ? [] : branchStore;

        return (
            <div>
                <div className="box box-warning cart_wrapper mb0">

                    <div class="card-header py-3"><h6 class="m-0 title_content font-weight-bold text-primary">Điều chuyển chi nhánh</h6></div>

                    <div
                        className="box-body table-responsive pt0"
                    >

                        <div
                            style={{ margin: "auto" }}
                            className={`nav-item dropdown no-arrow mx-1`}
                        >
                            <select
                                id="input"
                                className="form-control border-input"
                                name="store"
                                value={txtBranch}
                                onChange={this.onChange}
                            >
                                <option value="" disabled>-- Chọn chi nhánh --</option>
                                {this.showData(branchStore)}
                            </select>
                        </div>

                        <p class="text-justify text-center" style={{
                            fontSize: 13,
                            marginTop: 13
                        }}>   Chuyển đơn hàng sang chi nhánh khác</p>

                    </div>
                </div>
                <ModalChangeBranch branch_id={this.state.txtBranch} nameBranch={nameBranch} changeBranch={this.changeBranch} />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {

        branchStore: state.storeReducers.store.branchStore,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateOrder: (data, store_code, order_code) => {
            dispatch(billAction.updateOrder(data, store_code, order_code));
        },

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeBranch);