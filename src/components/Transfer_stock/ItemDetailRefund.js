import React, { Component } from 'react'
import { format , formatNoD } from '../../ultis/helpers'
import * as Env from "../../ultis/default"
import { filter_arr } from "../../ultis/helpers";
import { connect } from "react-redux";
import * as ImportAction from "../../actions/import_stock"
import { shallowEqual } from '../../ultis/shallowEqual';
class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refund: 0,
            list_refunds: [],
            quantity: 0,
            value: 0,
            total_value: 0,
            discount: 0
        };
        this.refund = 0;

    }

    getQuantity = (list_refund) => {
        var list_refund = list_refund;
        var quantity = 0
        list_refund.forEach(element => {
            if (element.check == true)
                quantity = element.quantity + quantity
        });
        return quantity
    }

    getPriceFromList = (id) => {
        var { listItems } = this.props;
        for (const element of listItems) {
            if (element.id == id) {
                return element.import_price
            }
        }
        return 0;
    }

    getValue = (list_refund) => {
        var list_refund = list_refund;
        var total = 0
        list_refund.forEach(element => {
            if (element.check == true)

                total = element.quantity * this.getPriceFromList(element.line_item_id)
        });
        return {
            value: total,
            total_value: total - this.props.discount
        }
    }


    componentDidMount() {
        var list_refunds = [...this.props.list_refund]
        var quantity = this.getQuantity(list_refunds)
        var itemImportStock = this.props.itemImportStock          

        var value = this.getValue(list_refunds).value;
        var total_value = this.getValue(list_refunds).total_value; 
        var discount = this.props.discount / itemImportStock.total_amount * value || 0

        this.setState({ list_refunds, quantity, total_value, discount, value })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.list_refund, this.props.list_refund)
        if (!shallowEqual(nextProps.list_refund, this.props.list_refund) || (this.props.random != nextProps.random)) {
            var itemImportStock = nextProps.itemImportStock          
              var list_refunds = [...nextProps.list_refund]
            var quantity = this.getQuantity(list_refunds)
            var value = this.getValue(list_refunds).value;
            var total_value = this.getValue(list_refunds).total_value;
            var discount = nextProps.discount / itemImportStock.total_amount * value || 0

            this.setState({ list_refunds, quantity, total_value, discount, value })

        }

        return true
    }


    post = () => {
        var list_refunds = [...this.state.list_refunds]
        var newArray = [];
        list_refunds.forEach(element => {
            if (element.check == true) {
                var item = element;
                delete item.check;
                newArray.push(element)
            }
        });
        var { id, store_code } = this.props;
        var data = {
            refund_line_items: newArray,
            // refund_money_paid: {
            //     amount_money: this.state.total_value, payment_method: 0
            // }
        }

        if (newArray.length > 0) {
            this.props.postRefund(id, data, store_code)
        }

    }

    render() {
        var { check } = this.props
        var { list_refund, quantity, total_value, discount, value } = this.state
        console.log(this.props.itemImportStock);
        return (
            <React.Fragment>
                <br></br>

                <div className='card'>
                    <div className='card-header py-3' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        Chi tiết hoàn trả
                    </div>
                    <div className='card-body'>
                        <div class="">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Tổng số lượng</div>
                                <div>{formatNoD(Number(quantity))}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Giá trị trả hàng</div>
                                <div>{format(Number(value))}</div>
                            </div>
                            {discount > 0 &&     <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Chiết khấu</div>
                                <div>-{format(Number(discount))}</div>
                            </div>}
                        

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Tổng giá trị hàng trả</div>
                                <div>{format(Number(value - discount))}</div>
                            </div>
                            <div style={{ display: "flex" }}>

                                <button onClick={this.post} style={{ "margin": "auto" }} type="button" class="btn btn-success">Thực hiện</button>
                            </div>
                        </div>





                    </div>


                </div>





            </React.Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        postRefund: (id, data, store_code) => {
            dispatch(ImportAction.postRefund(id, data, store_code))
        },

    }
}

export default connect(null, mapDispatchToProps)(ItemDetail)