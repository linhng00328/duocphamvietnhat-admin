import React, { Component } from 'react'
import { format } from '../../ultis/helpers';

class InfoPrice extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        var {total_before_discount,total_after_discount,voucher_discount_amount,product_discount_amount,combo_discount_amount} = this.props.listOrder
        return (
            <div className='price-info' style={{margin:"10px 0px",fontSize:"15px"}}>
                <div className='row'>
                    <div className='title-price col-6'>Tạm Tính</div>
                    <span className='col-6' style={{textAlign:"end"}}>{format(Number(total_before_discount))}</span>
                </div>
                <div className='row'>
                    <div className='title-price col-6'>Giảm giá</div>
                    <span className='col-6' style={{textAlign:"end"}}>{format(Number(product_discount_amount))}</span>
                </div>
                <div className='row'>
                    <div className='title-price col-6'>Voucher</div>
                    <span className='col-6' style={{textAlign:"end"}}>{format(Number(voucher_discount_amount))}</span>
                </div>
                <div className='row'>
                    <div className='title-price col-6'>Combo</div>
                    <span className='col-6' style={{textAlign:"end"}}>{format(Number(combo_discount_amount))}</span>
                </div>
                <div className='row'>
                    <div className='title-price col-6' style={{color:"red"}}>Tổng cộng</div>
                    <span className='col-6' style={{textAlign:"end", color:"red"}}>{format(Number(total_after_discount))}</span>
                </div>
            </div>
        )
    }
}
export default InfoPrice;