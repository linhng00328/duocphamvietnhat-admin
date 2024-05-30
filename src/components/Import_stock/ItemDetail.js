import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
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
            list_refunds: []
        };
        this.refund = 0;

    }

    getRefund = (list_items) => {
      
                    return this.refund = list_items.total_refund || 0;
          
        


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.check != nextProps.check && this.state.list_refunds.length == 0) {
            if (nextProps.check == true) {
                var list_items = filter_arr(nextProps.listItems);
                var array = []
                list_items && list_items.forEach(element => {
                    array.push({
                        line_item_id: element.id,
                        quantity: element.quantity - element.total_refund,
                        check: false
                    })
                });
                this.setState({ list_refunds: [...array] })
            }
            else {
            }
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextState.list_refunds, this.state.list_refunds)) {
            console.log(nextState.list_refunds ,"Daaaaaaa")
            // this.props.getRefund(nextState.list_refunds)
        }
        return true
    }

    getNumQuantity = (item) => {

        // this.refund = element.total_refund;
        return Number(item.quantity) - Number(item.total_refund);



    }


    getCanQuantity = (item) => {

        if (this.state.list_refunds.length > 0) {
            var list_refunds = [...this.state.list_refunds];
            var line_item_id = item.id;
            for (const element of list_refunds) {
                if (element.line_item_id == line_item_id) {
                    return element.quantity
                }
            }
        }
        else {
            return Number(item.quantity) - Number(item.total_refund);

        }
        return 1;
    }

    check = (e, id) => {
        var list_refunds = [...this.state.list_refunds];

        for (var element of list_refunds) {
            if (element.line_item_id == id) {
                element.check = e.target.checked
            }
        }
        this.setState({ list_refunds: [...list_refunds] })
        this.props.getRefund(list_refunds)

    }

    getLineItemId = (product_id) => {
        var list_items = filter_arr(this.props.bill.line_items);

        for (const element of list_items) {
            if (element.product.id == product_id) {
                return element.id
            }
        }
        return null
    }

    onChangeInputQuantity = (e, id, max = 1) => {
        var list_refunds = [...this.state.list_refunds];
        var value = Number(e.target.value)
        for (var element of list_refunds) {
            if (element.line_item_id == id) {

                if (e.target.value == "") {
                    element.quantity = 0
                }
                else if (value > max || value < 1 || !Number.isInteger(value)) {
                    return;
                }
                else

                    element.quantity = value

            }
        }
        this.props.getRefund(list_refunds)

        this.setState({ list_refunds: [...list_refunds] })
    }


    changeQuantity = (type, id, max = 1) => {
        var list_refunds = [...this.state.list_refunds];
        if (type == "INCREASE") {

            for (var element of list_refunds) {
                if (element.line_item_id == id) {
                    console.log(element, max)
                    if (element.quantity + 1 > max) {
                        return;
                    }
                    element.quantity = element.quantity + 1

                }
            }
        }
        else {

            for (var element of list_refunds) {
                if (element.line_item_id == id) {
                    console.log(" da vaoaaa")

                    if (element.quantity - 1 <= 0) {
                        return;
                    }
                    element.quantity = element.quantity - 1

                }
            }
        }
        this.props.getRefund(list_refunds)
        this.setState({ list_refunds: [...list_refunds] })

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
            refund_line_items: newArray
        }

        if (newArray.length > 0) {
            this.props.postRefund(id, data, store_code)
        }

    }
    render() {
        const { listItem, check, status, listItems, index } = this.props
        console.log(status, check, this.getNumQuantity(listItem))
        return (
            <React.Fragment>
                <div className='item_detail' style={{ borderBottom: "1px solid #8080808c" }}>
                    <div className='' style={{ display: "flex", padding: "10px" }}>
                        {check == true && status == 2 && this.getNumQuantity(listItem) > 0 && (
                            <div class="checkbox" style={{
                                marginRight: "10px", marginRight: "10px",
                                alignSelf: "center"
                            }}>
                                <label>
                                    <input style={{ width: "16px", height: "16px" }} type="checkbox" onChange={(e) => this.check(e, listItem.id)} />

                                </label>
                            </div>
                        )}
                        <img src={listItem.product.images.length > 0 ? listItem.product.images[0].image_url : Env.IMG_NOT_FOUND} alt='' width="60px" height="60px" style={{ width: "16%" }}></img>
                        <div className='wrap-name' style={{ marginLeft: "10px", width: "77%" }} >
                            <div style={{ display: "flex" }}>
                                <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Tên:</div>
                                <div className='name-order'>{listItem.product.name}</div>
                            </div>
                            {listItem.element_distribute_name || listItem.sub_element_distribute_name ?
                                <div style={{ display: "flex" }}>
                                    <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Phân loại:</div>
                                    <div className='name-order'>{listItem.element_distribute_name ? `${listItem.element_distribute_name} ` : ""}{listItem.sub_element_distribute_name ? `${listItem.sub_element_distribute_name}` : ""}</div>
                                </div> : ""
                            }

                            <div className='wrap-iventory' style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex" }}>
                                    <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Đơn giá:</div>
                                    <div style={{ marginLeft: "5px", fontWeight: "bold", color: "red" }}>{format(Number(listItem.import_price))}</div>
                                </div>
                                {/* <div style={{ marginLeft: "5px", color: "red" }}>{format(Number(listItem.import_price * listItem.quantity))}</div> */}
                            </div>
                            {
                                this.getRefund(listItem) >0 && (
                                    <div>
                                        <p class=" bold sale_user_label" style={{ color: "red" }}>
                                            Đã hoàn tiền số lượng:
                                            <span id="total_selected">x{this.refund}</span>
                                        </p>
                                    </div>
                                )
                            }

                            {
                                check == true && this.getNumQuantity(listItem) > 0 ? (
                                    <div style={{ display: "flex", marginTop: "10px" }} >

                                        <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Số lượng hoàn:</div>

                                        {

                                            (<div class="quantity" style={{ display: "flex" }}>
                                                <span class="input-quantity input-number-decrement form-input-number " onClick={() => this.changeQuantity("DECREASE", listItem.id, this.getNumQuantity(listItem))}><span>–</span></span>
                                                <input style={{ height: "28px" }} class="input-number" name="txtQuantity" type="text" value={this.getCanQuantity(listItem)} onChange={(e) => this.onChangeInputQuantity(e, listItem.id, this.getNumQuantity(listItem))} />
                                                <span class="input-quantity input-number-increment form-input-number" onClick={() => this.changeQuantity("INCREASE", listItem.id, this.getNumQuantity(listItem))}><span>+</span></span></div>)

                                        }

                                    </div>
                                ) : <div style={{ display: "flex" }}>
                                    <div className='price-order' style={{ color: "gray", marginRight: "5px" }}>Số lượng:</div>
                                    <div className='name-order'>{listItem.quantity}</div>
                                </div>
                            }



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