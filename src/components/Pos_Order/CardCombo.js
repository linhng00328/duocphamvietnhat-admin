import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as OrderAction from '../../actions/add_order'
import * as Env from "../../ultis/default"
import { filter_arr, format } from '../../ultis/helpers'
import { findTotalStockPos } from '../../ultis/productUltis'
import ShowModalDetailCombo from "../../components/Pos_Order/ShowDetailCombo"
import Slider from "react-slick";

class CardProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_id: "",
            isToggle: false,
            modal : {},
            isShow : false
        }
    }

    changeModalDetail = (listCombo) =>{
        this.setState({listCombo})
    }

    handleInfoProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute, product) => {
        if (distributes.length > 0) {
            this.setState({ isToggle: true })
            this.props.handleCallbackProduct({
                inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
                priceProduct: price, distributeProduct: distributes,
                minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
                quantityProduct: quayntity,
                quantityProductWithDistribute: quantityDistribute,
                product: product
            })
        } else {
            this.setState({ isToggle: false })
            this.props.handleCallbackPushProduct({
                nameProduct: name,
                element_id: "",
                product_id: id,
                reality_exist: 0, nameDistribute: "",
                nameElement: "",
                nameSubDistribute: "",
                priceProduct: price,
                stock: quayntity,
                product: product
            })
        }

    }

    buildItemProduct = (product) => {
        var data = product
        var image = <img src={data.images.length > 0 ? data.images[0].image_url : Env.IMG_NOT_FOUND_2}
            className="img-responsive image-product" alt="Image" width="40px" height="40px"
            style={{
                marginRight: 10
            }}
        />
        var price = <p class="product-price-pos-search-top-bar">{
            data.min_price == data.max_price ? format(Number(data.min_price)) : `${format(Number(data.min_price))}- ${format(Number(data.max_price))}`}</p>


        return (
            <div >

                <div style={{
                    display: "flex",
                    height: "auto",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    {image}
                    <div style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}>
                        <div className='product-name-pos-search-top-bar'>{data.name}</div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",

                        }}>
                            <div>
                                {price}
                            </div>
                            {data.check_inventory && <div className='product-stock-pos-search-top-bar'>
                                Kho: {findTotalStockPos(data)}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    showProduct = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((data, index) => {
                return (
                    <div class="col-sm-2" style={{ marginBottom: "10px" }}>
                        <a data-toggle={this.state.isToggle ? "modal" : ""} data-target="#modalDetail"
                            onClick={() => this.handleInfoProduct(
                                data.inventory,
                                data.id,
                                data.name,
                                data.images,
                                data.price, data.distributes,
                                data.max_price, data.min_price,
                                data.product_discount,
                                data.quantity_in_stock,
                                data.quantity_in_stock_with_distribute,
                                data
                            )}>
                            <div class="card card-product-pos">

                                {data.check_inventory && <div class="inventory-tag">SL: {findTotalStockPos(data)}</div>}
                                {data.product_discount && <div class="discount-tag">{data.product_discount.value}%</div>}

                                <img src={data.images.length > 0 ? data.images[0].image_url : Env.IMG_NOT_FOUND_2} className="img-responsive image-product" alt="Image" width="100%" height="90px" />

                                <div class="card-body" style={{ padding: ' 0 5px' }}>
                                    <p class="card-title" style={{ margin: '0', overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis' }}>{data.name}</p>
                                    <p class="card-text price">{
                                        data.min_price == data.max_price ? format(Number(data.min_price)) : `${format(Number(data.min_price))}- ${format(Number(data.max_price))}`}</p>
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
    showProductCombo = (product, quantity) => {
        let { price, product_discount, images, id, name } = product;
        console.log(product)
        let avt = "/images/notfound.png";
        if (product_discount) {
            price = product_discount.discount_price;
        }
        if (images.length)
            avt = images[0].image_url;
        return (
            <div className="discount-product-card">
                <div className="image">
                    <div className="img-container">
                        <img style={{ width: "100%", height: "90px" }} src={avt} alt="" />
                    </div>
                    {quantity && <div class="inventory-tag"  style={{
                        top: "0px",
                        right: "5px"
                    }}>SL: {quantity}</div>}

                    {product.product_discount && <div class="discount-tag">{product.product_discount.value}%</div>}

                </div>

                <div className="name" >
                    {name}
                </div>
                <div className="price" >
                    {
                        product.min_price == product.max_price ? format(Number(product.min_price)) : `${format(Number(product.min_price))}- ${format(Number(product.max_price))}`}                </div>
               
            </div>
        )
    }
    showDetail = (modal) => {
        this.props.getDetailCombo(modal)
    }
    render() {     
        // var { products, isItemSearch } = this.props
        // var listProducts = filter_arr(products.data)

        // if (isItemSearch) {
        //     return this.buildItemProduct(this.props.product)
        // }
        const { name, value, type, products, end, set_limit_amount, id  , key} = this.props;
        console.log(this.props)
        return (
            <div className="combo-card" >
                <div className="top-pos">

                    <div className="info">
                        <div style={{ display: "flex" , justifyContent : "space-between"}}>
                                <div style={{ display: "flex"  }}>
                                <div className="value">
                                &nbsp;{name}
                            </div> &nbsp; -  &nbsp;
                            <div className="value">
                                Giảm&nbsp;{type === 1 ? value + "%" : "₫" + format(value)}
                            </div>
                                </div>
                            {
                                products?.length >= 3 && <a  className="view"  onClick={()=>this.showDetail({products , name , id})}    >
                                    Xem tất cả ({products?.length}/3)
                                </a>
                            }
                            {/* <div className="date">
                                HSD: {end.split(" ")[0]}
                            </div> */}


                        </div>

                    </div>
                </div>
                <div className="products" onClick={() => { this.props.addComboInCart({ combo_id: id }) }}>

                    {
                        products?.length > 0
                        && products?.map((v, i) =>
                            i < 3 && <div className="card-wraper col-4" key={i}>
                                {this.showProductCombo(v.product, v.quantity)}
                            </div>
                        )
                    }

                </div>
    

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // products: state.productReducers.product.allProduct,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        createOrder: (store_code, data) => {
            dispatch(OrderAction.createOrder(store_code, data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);