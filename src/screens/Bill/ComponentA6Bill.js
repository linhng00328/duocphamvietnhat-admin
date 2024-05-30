import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { filter_arr, format } from "../../ultis/helpers";
import './BillA6.css'
export default class ComponentA6Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var stores = this.props.stores
        var bill = this.props.bill;

        (stores ?? []).forEach((element, index) => {
            if (element.store_code == this.props.store_code) {
                this.setState({
                    user_name: stores[index].user.name,
                    store_name: stores[index].name,
                    user_phone: stores[index].user.phone_number,
                    logo_url: stores[index].logo_url
                });
            }
        });


        if (
            bill != null
        )
            this.setState({
                customer_name: bill.customer_address.name,
                customer_address: bill.customer_address.address_detail + ", " + bill.customer_address.wards_name + ", " + bill.customer_address.district_name + ", " + bill.customer_address.province_name,
                customer_phone: bill.customer_address.phone,
                order_code: bill.order_code,
                order_date: bill.created_at,
                total_final: bill.total_final,

            });
    }

    componentWillReceiveProps(nextProps) {
        if (
            !shallowEqual(this.props.stores, nextProps.stores) ||
            typeof this.state.user_name == "undefined"
        ) {
            var stores = nextProps.stores;
            (stores ?? []).forEach((element, index) => {
                if (element.store_code == this.props.store_code) {
                    this.setState({
                        user_name: stores[index].user.name,
                        store_name: stores[index].name,
                        user_phone: stores[index].user.phone_number,
                        logo_url: stores[index].logo_url
                    });
                }
            });
        }
        if (
            !shallowEqual(this.props.bill, nextProps.bill) ||
            typeof this.state.customer_name == "undefined"
        ) {
            var bill = nextProps.bill;
            if (
                typeof bill.customer_address != "undefined" &&
                bill.customer_address != null
            )
                this.setState({
                    customer_name: bill.customer_address.name,
                    customer_address: bill.customer_address.address_detail + ", " + bill.customer_address.wards_name + ", " + bill.customer_address.district_name + ", " + bill.customer_address.province_name,
                    customer_phone: bill.customer_address.phone,
                    order_code: bill.order_code,
                    order_date: bill.created_at,
                    total_final: bill.total_final,

                });
        }
    }

    showListProduct = () => {
        var arr = [];
        var bill = this.props.bill;
        if (
            typeof bill.line_items_at_time == "undefined" ||
            bill.line_items_at_time == null
        ) {
            return null;
        }
        bill.line_items_at_time.forEach((element, index) => {
            arr.push(
                <tr>
                    <td style={{ textAlign: "start" }}>{element.name} </td>
                    <td>{element.quantity}</td>
                    <td style={{ textAlign: "end" }}>{format((element.before_price || element.before_discount_price) * element.quantity)}</td>
                </tr>
            );
        });


        return arr;
    };

    showBonusAgency = () => {

        var bill = this.props.bill;
        var { bonus_agency_history } = bill
        var { reward_value, reward_name } = bonus_agency_history

        var arr = [];
        arr.push(
            <tr>
                <td>{reward_name}</td>
                <td style={{ textAlign: "end" }}>{format(reward_value)}</td>
            </tr>
        );


        return arr;
    };


    render() {
        var state = this.state;
        var { bill, badges } = this.props;
        var total_product =
            Array.isArray(bill.line_items_at_time) == true
                ? bill.line_items_at_time.length
                : 0;
        var store_address = ""
        
        return (
            <div className="bill-A6">

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {
                        state.logo_url == null || state.logo_url ?
                            <b style={{
                                padding: 25
                            }}>
                                {(state.store_name ?? "").toUpperCase()}
                            </b>
                            :
                            <img
                                height={100}
                                width={100}
                                src={state.logo_url}></img>
                    }


                </div>

                <center>

                    <p>   Địa chỉ: {store_address}</p>
                    <p> Số điện thoại: {state.user_phone}</p>
                    <p style={{
                        marginTop: 20
                    }}>
                        <b style={{ fontSize: 17 }}>HÓA ĐƠN BÁN HÀNG</b></p>
                    <p>Số HD: {state.order_code}</p>

                    <p>{state.order_date}</p>
                </center>


                <div class="">

                    <p class="" id="sale_user_name">
                        <span style={{ fontWeight: "500" }}>Tên: {state.customer_name}</span>
                    </p>
                    <p class="" id="info">
                        <span>Địa chỉ: </span> {state.customer_address}
                    </p>
                    <p class="" id="info">
                        <span>SĐT: </span> {state.customer_phone}
                    </p>
                </div>



                <div className="row">
                    <div class="col-12">
                        <p className="order_code" style={{
                            width: "100%"
                        }}>
                            Nội dung đơn hàng : (Tổng SL sản phẩm: {total_product})
                        </p>

                        <table class="table table-hover">
                            <thead>
                                <tr>

                                    <th>Đơn giá</th>
                                    <th>SL</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>{this.showListProduct()}</tbody>
                        </table>
                    </div>
                </div>

                <hr style={{
                    width: "100%"
                }} />

                <div className="bill-price">
                    <div className="bill-price-left">
                        Tổng tiền hàng
                    </div>
                    <div className="bill-price-right">
                        {format(bill.total_after_discount)}
                    </div>

                </div>


                <div className="bill-price bill-price-non-bold">
                    <div className="bill-price-left">
                        Phí vận chuyển
                    </div>
                    <div className="bill-price-right">
                        +{format(bill.total_shipping_fee || 0)}
                    </div>

                </div>
                <div className="bill-price bill-price-non-bold">
                    <div className="bill-price-left">
                        Giảm giá, Voucher, Combo
                    </div>
                    <div className="bill-price-right">
                        -{format((bill.product_discount_amount || 0) + (bill.voucher_discount_amount || 0) + (bill.combo_discount_amount || 0))}
                    </div>

                </div>

                {
                    bill.bonus_agency_history != null &&

                    <div className="bill-price bill-price-non-bold">
                        <div className="bill-price-left">
                            Thưởng cho đại lý
                            <p>({bill.bonus_agency_history.reward_name})</p>
                        </div>
                        <div className="bill-price-right">
                            {format(bill.bonus_agency_history.reward_value ?? 0)}
                        </div>

                    </div>


                }
                <hr style={{
                    width: "100%",
                    marginTop: 10
                }} />

                <div className="bill-price">
                    <div className="bill-price-left">
                        Tổng thanh toán
                    </div>
                    <div className="bill-price-right">
                        {format((bill.total_final || 0))}
                    </div>

                </div>


            </div>
        );
    }
}
