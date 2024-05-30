import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import { findTotalStockPos } from '../../ultis/productUltis'
import { filter_arr, format } from '../../ultis/helpers'

class Modal extends Component {


    showProduct = (products) => {
        console.log(products)
        var result = null
        if (products?.length > 0) {
            result = products.map((value, index) => {
                var item = {...value.product}
                return (
                    <div class="card card-item-pos" style={{ marginBottom: "10px" }} key={index}>
                        <div class="card-body" style={{ padding: "0", position: "relative" }}>
                            <div className='wrap-item' style={{ display: "flex", fontSize: "1rem", justifyContent: 'space-between', alignItems: "center" }}>
                                <div className='index'>{index + 1}</div>

                                <img
                                    src={item.images?.length > 0 ? item.images[0].image_url : "/images/notfound.png"}

                                    className="img-responsive image-product" alt="Image" width="50px" height="50px"
                                />
          <div className='info-product' style={{ width: "30%", fontWeight: "400", display: "flex", flexDirection: "column" }}>
                            <div className='name-product' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.name}</div>
                    
                        </div>

                                <div className='quantity' style={{ paddingLeft: "0" }}>
                                SL: {value.quantity}

                                    
                                </div>

                                <div className='cost' style={{ width: "20%", fontWeight: "400" }}>
                                {item.min_price == item.max_price ? format(Number(item.min_price)) : `${format(Number(item.min_price))}- ${format(Number(item.max_price))}`}
                                </div>




                            </div>

                        </div>
                    </div>
                )
            })
        }
        return result
    }


    render() {
        var { products , name } = this.props.modal;
        var index = 1
        return (
            <React.Fragment>
                            <div className="value">
          <p>Tên Combo: {name}</p>
        </div>
            <div className='col-list-order'>
                <div className='' style={{ padding: "8px" }}>
                    <div className='list-group'>
                        {products?.length > 0 && this.showProduct(products)}

                    </div>
                </div>

            </div>
                </React.Fragment>


        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};
export default connect(null, mapDispatchToProps)(Modal);
