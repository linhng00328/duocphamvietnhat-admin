import React, { Component } from "react";
import { formatNoD } from "../../../../ultis/helpers";

import * as themeAction from "../../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as billAction from "../../../../actions/bill";
import { getBranchId } from "../../../../ultis/branchUtils"
import * as Env from "../../../../ultis/default"
import {Link} from "react-router-dom"
import Pagination from "../../../../components/Bill/Pagination";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    componentDidMount() {
        var { customer, store_code } = this.props
        this.props.fetchAllBill(store_code, 1, getBranchId(), null, `&phone_number=${customer.phone_number}`);

    }



    showBills = (listBills) => {
        var result = null;
        var {store_code} = this.props
        if (typeof listBills == "undefined") {
            return result
        }
        if (listBills.length > 0) {
            result = listBills.map((bill, index) => {

                return (
                    <tr style={{cursor : "pointer"}}>
                        <td>{index+1}</td>
                        <td><Link to={`/order/detail/${store_code}/${bill.order_code}`} >{bill.order_code}</Link></td>

                        <td>
                            {formatNoD(bill.total_final)}
                        </td>
                        <td>
                            {bill.payment_status_name}
                        </td>

                        <td>
                            {bill.updated_at}
                        </td>

                    </tr>

                );
            });
        } else {
            return result;
        }
        return result;
    };


    render() {
        var { store_code, bills , customer } = this.props
        var listBills = bills.data
        return (
            <div className="support">
          
                <form role="form" >

                    <div class="box-body">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}>




                        </div>


                        <div className="form-group">
                            <label htmlFor="name">Danh sách</label>

                            <div class="table-responsive">
                                <table class="table table-hover table-border">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã đơn</th>
                                            <th>Số tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showBills(listBills)}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                            hasPhone  = {true}
                            phone = {customer.phone_number}
                              store_code={store_code}
                              bills={bills}
                            />
                        
                        </div>

                    </div>

                </form>


            </div>
        );

    }
}


const mapStateToProps = (state) => {
    return {

        customer: state.customerReducers.customer.customerID,
        bills: state.billReducers.bill.allBill,

        theme: state.themeReducers.theme,

    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateTheme: (store_code, theme) => {
            dispatch(themeAction.updateTheme(store_code, theme));
        },
        fetchTheme: (store_code) => {
            dispatch(themeAction.fetchTheme(store_code));
        },
        fetchAllBill: (id, page, branch_id, params, params_agency) => {
            dispatch(billAction.fetchAllBill(id, page, branch_id, params, params_agency));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);