import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as OrderAction from '../../actions/add_order'
import * as Env from "../../ultis/default"
import { filter_arr, format } from '../../ultis/helpers'
import { findMaxImportPrice, findMinImportPrice } from '../../ultis/productUltis'

class CardProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_id: ""
        }
    }
    handleInfoProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute, product) => {
        this.props.handleCallbackProduct({
            inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
            priceProduct: price, distributeProduct: distributes,
            minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
            quantityProduct: quayntity,
            quantityProductWithDistribute: quantityDistribute
        }, product)
    }
    showProduct = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((data, index) => {
                var maxPrice = findMaxImportPrice(data)
                var minPrice = findMinImportPrice(data)

                return (
                    <div class="col-sm-3" style={{ marginBottom: "10px" }} key={index}>
                        <a data-toggle="modal" data-target="#modalDetails" onClick={() => this.handleInfoProduct(data.inventory, data.id, data.name, data.images, data.price, data.distributes,maxPrice,minPrice, data.product_discount, data.quantity_in_stock, data.quantity_in_stock_with_distribute, data)}>
                            <div class="card">
                                <img src={data.images.length > 0 ? data.images[0].image_url : Env.IMG_NOT_FOUND} className="img-responsive" alt="Image" width="100%" height="100px" />
                                <div class="card-body" style={{ padding: '0' , minHeight : "70px" }}>
                                    <p class="card-title" style={{ margin: '0', overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis' }}>{data.name}</p>

                                    <>
                                        <p class="card-text" style={{ color: "red", fontSize: '13px' }}>
                                         Giá nhập:    {maxPrice === minPrice ?
                                                format(Number(minPrice)) :
                                                `${format(Number(minPrice))} - ${format(Number(maxPrice))}`}</p>
                                        <p class="card-text" style={{ fontSize: "13px", textDecoration: "line-through" }}></p>
                                    </>


                                </div>
                            </div>
                        </a>
                    </div>
                )
            })
        } else {
            return result;
        }
        return result;
    }
    render() {
        var { products } = this.props
        var listProducts = filter_arr(products.data)
        return (
            <div className='show-product' style={{ height: "686px", overflow: "hidden", overflowY: "auto" }}>
                <div className='row'>
                    {this.showProduct(listProducts)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducers.product.allProduct,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);