import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import * as Env from "../../ultis/default"
import { shallowEqual } from '../../ultis/shallowEqual'
import { findImportPrice, findImportPriceSub, findPrice, findTotalStock, stockOfProduct } from '../../ultis/productUltis'
import themeData from "../../ultis/theme_data";

class ModalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idElement: "",
            distributeName: "",
            distributeValue: "",
            element_distributes: "",
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            elementNameSelected: "",
            subElementNameDistributeSelected: "",
            afterPrice: "",
            priceBeforeDiscount: "",
            afterChoosePrice: "",
            elementObject: "",
            minPriceAfterDiscount: "",
            maxPriceAfterDiscount: "",
            stateDistribute: false,
            messageErr: "",
            quantityInStock: "",
            elementDistributeOj: "",
            totalStocks: 0,
        }
    }
    componentDidMount() {

    }


    handleNewPriceOrStock = (elementDistributeName, subElementDistribute) => {
        var product = this.props.modal.product
        var price = findPrice(product, elementDistributeName, subElementDistribute)
        var stock = stockOfProduct(product, elementDistributeName, subElementDistribute)


        if (price != null) {
            this.setState({
                afterChoosePrice: price,
                // priceBeforeDiscount: sub_elements.price,
                afterPrice: price,
                priceBeforeDiscount: price,

                quantityInStock: stock,
                // idElement: id,
                messageErr: ""
            })
        }
    }

    handleClick = (nameDistribute, nameObject, index, id, quatity) => {

        this.setState({
            distributeName: nameObject,
            distributeSelected: index,
            elementNameSelected: nameDistribute,
        })

        this.handleNewPriceOrStock(nameDistribute, this.state.subElementNameDistributeSelected)
    }

    handleClickSubElement = (nameElement, price, index, id) => {


        this.setState({

            subElementDistributeSelected: index,
            subElementNameDistributeSelected: nameElement
        })

        this.handleNewPriceOrStock(this.state.elementNameSelected, nameElement)

        // var { sub_element_distributes } = this.state.elementObject
        // var sub_element_distribute = this.state.elementDistributeOj.sub_element_distributes
        // var subImport = findImportPriceSub(sub_element_distribute, nameElement)
        // console.log("subImport", subImport)
        // if (this.props.modal.discountProduct) {
        //     var { value } = this.props.modal.discountProduct
        //     this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
        //     var indexDistribute = sub_element_distributes.map(e => e.name).indexOf(nameElement)
        //     var sub_element = sub_element_distributes[indexDistribute]
        //     this.setState({
        //         afterChoosePrice: sub_element.price - (sub_element.price * value / 100),
        //         priceBeforeDiscount: sub_element.price,
        //         quantityInStock: sub_element.stock, messageErr: "",
        //         idElement: id,
        //     })
        // } else {
        //     if (sub_element_distributes) {
        //         this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
        //         var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
        //         var sub_elements = sub_element_distributes[indexDistributes]
        //         this.setState({
        //             afterChoosePrice: subImport?.price ?? 0,
        //             priceBeforeDiscount: sub_elements.price,
        //             quantityInStock: sub_elements.stock,
        //             idElement: id,
        //             messageErr: ""
        //         })
        //     } else {
        //         this.setState({ afterChoosePrice: subImport.price, subElementDistributeSelected: index, idElement: id, element_distributes: nameElement })
        //     }

        // }

    }
    handleClose = () => {
        this.setState({
            afterChoosePrice: "",
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            messageErr: "",
            quantityInStock: 0
        })
    }
    handleCallback = () => {
        var info = this.props.modal
        var { distributeName,
            distributeValue,
            element_distributes,
            subElementNameDistributeSelected,
            elementNameSelected,
            quantityInStock,
            idElement,
            afterChoosePrice,
            afterPrice } = this.state
            quantityInStock = 1
        if (info.distributeProduct.length === 0) {
            window.$('.modal').modal('hide');


            this.props.handleCallbackPushProduct({
                nameProduct: this.props.modal.nameProduct,
                element_id: this.props.modal.idProduct,
                product_id: this.props.modal.idProduct,
                reality_exist: 0,
                nameDistribute: elementNameSelected,
                nameElement: elementNameSelected,
                nameSubDistribute: subElementNameDistributeSelected,
                priceProduct: afterPrice,
                stock: this.props.modal.inventoryProduct.main_stock
            })
            return
        }

        if (this.state.distributeSelected === -1) {
            this.setState({ messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].name}` })
            return
        }
        if (info.distributeProduct[0].element_distributes[0].sub_element_distributes.length === 0) {
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({
                nameProduct: this.props.modal.nameProduct,
                product_id: this.props.modal.idProduct,
                element_id: idElement,
                reality_exist: 0, nameDistribute: distributeName,
                nameElement: elementNameSelected,
                nameSubDistribute: subElementNameDistributeSelected,
                priceProduct: afterChoosePrice,
                stock: quantityInStock
            })
            this.setState({ distributeSelected: -1, messageErr: "", afterChoosePrice: "", element_distributes: "", distributeValue: "" })
            return
        }
        if (this.state.subElementDistributeSelected === -1) {
            this.setState({ messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].sub_element_distribute_name}` })
            return
        }

        window.$('.modal').modal('hide');

        this.props.handleCallbackPushProduct({
            nameProduct: this.props.modal.nameProduct,
            product_id: this.props.modal.idProduct,
            element_id: idElement,
            reality_exist: 0,
            nameDistribute: distributeName,
            nameElement: elementNameSelected,
            nameSubDistribute: subElementNameDistributeSelected,
            priceProduct: afterChoosePrice,
            stock: quantityInStock
        })
        this.setState({
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            messageErr: "",
            afterChoosePrice: "", element_distributes: "", distributeValue: ""
        })
    }
    componentWillReceiveProps(nextProps, nextState) {
        var { inventoryProduct } = nextProps.modal
        const totalStock = findTotalStock(inventoryProduct)

        this.setState({ quantityInStock: totalStock })
        if (!shallowEqual(nextProps.modal.inventoryProduct, this.props.modal.inventoryProduct)) {

            // this.setState({ quantityInStock: nextProps.modal.inventoryProduct.main_stock })
        }

        if (nextProps.modal.minPriceProduct !== this.state.minPriceProduct) {
            this.setState({ afterPrice: nextProps.modal.minPriceProduct })
        }
        var { minPriceProduct, maxPriceProduct, discountProduct } = nextProps.modal
        if (nextProps.modal.minPriceProduct !== this.props.modal.minPriceProduct) {
            if (discountProduct !== null) {
                var minPrice = minPriceProduct - (minPriceProduct * discountProduct.value / 100)
                var maxPrice = maxPriceProduct - (maxPriceProduct * discountProduct.value / 100)
                this.setState({ minPriceAfterDiscount: minPrice, maxPriceAfterDiscount: maxPrice })
            }

        }

    }




    render() {
        var { allow_semi_negative } = this.props

        var product = this.props.modal.product
        var allowBuy = product?.check_inventory == false || allow_semi_negative == true || this.state.quantityInStock > 0

        var inforProduct = this.props.modal

        var itemParent = inforProduct && inforProduct.inventoryProduct && inforProduct.inventoryProduct.distributes !== null &&
            inforProduct.inventoryProduct.distributes.length > 0 ? inforProduct.inventoryProduct.distributes[0] : []

        return (
            <div class="modal" id="modalDetail">
                <div class="modal-dialog">
                    <div class="modal-content" >
                        <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                            <p class="" style={{ margin: "0px", fontWeight: "500" }}>Chọn phân loại sản phẩm</p>
                            <button type="button" class="close" onClick={this.handleClose} data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" style={{ position: "relative", marginBottom: "20px" }}>

                            <div className='model-card row' style={{ margin: "5px", width: "80%" }}>
                                <div className='name-voucher col-4' style={{ width: "120px", height: "120px", padding: "8px" }}>
                                    <div style={{ justifyContent: "center", width: "100%", height: "100%", borderRadius: "0.25em", display: "flex", alignItems: "center" }}>
                                        <img src={inforProduct.imageProduct.length > 0 ? inforProduct.imageProduct[0].image_url : Env.IMG_NOT_FOUND} alt='' style={{ width: "100%" }}></img>
                                    </div>
                                </div>
                                <div className='info-voucher col-8' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <div>
                                        <div className='value' style={{ fontWeight: "bold", width: "220px", 
                                      
                                        textOverflow: "ellipsis" }}>{inforProduct.nameProduct}</div>


                                        <div className='code' style={{ color: "red" }}><span>{this.state.afterChoosePrice === '' ? inforProduct.discountProduct === null ?
                                            this.props.modal.minPriceProduct == this.props.modal.maxPriceProduct ?
                                                format(Number(this.props.modal.minPriceProduct))
                                                :
                                                `${format(Number(this.props.modal.minPriceProduct))}-${format(Number(this.props.modal.maxPriceProduct))}`
                                            : this.state.minPriceAfterDiscount === this.state.maxPriceAfterDiscount ? `${format(Number(this.state.minPriceAfterDiscount))}` : `${format(Number(this.state.minPriceAfterDiscount))} - ${format(Number(this.state.maxPriceAfterDiscount))}`
                                            : format(Number(this.state.afterChoosePrice))}</span></div>


                                        <div className='before-discout' style={{ display: "flex" }} >
                                            <span style={{ fontSize: "13px", textDecoration: "line-through" }}>{inforProduct.discountProduct !== null ?
                                                this.state.afterChoosePrice === "" ? inforProduct.minPriceProduct === inforProduct.maxPriceProduct ? format(Number(this.state.afterPrice)) : `${format(Number(inforProduct.minPriceProduct))} - ${format(Number(inforProduct.maxPriceProduct))}` : format(Number(this.state.priceBeforeDiscount)) : ""}</span>
                                            <div className='persen-discount' style={{ fontSize: "13px", marginLeft: "10px" }}>{inforProduct.discountProduct !== null ? `- ${inforProduct.discountProduct.value}%` : ""}</div>
                                        </div>

                                        {product?.check_inventory && <div className='quantity-product'
                                            style={{ fontSize: "13px", color: "grey" }}>
                                            Tồn kho hiện tại {this.state.quantityInStock} sản phẩm
                                        </div>
                                        }

                                    </div>


                                    {
                                        !allowBuy && <div style={{ paddingTop: 20, color: "red" }}>
                                            <i>{"Sản phẩm không cho phép bán âm"}</i>
                                        </div>

                                    }



                                </div>
                            </div>
                        </div>


                        <hr />
                        <div>
                            {this.state.messageErr && (
                                <div className='show-err' style={{ color: "red", paddingLeft: 30 }}><center>{this.state.messageErr}</center></div>
                            )}
                            <div className='distribute-pos'>

                                <div className='row'>
                                    <div className='col-3'>
                                        <div className='distribute-name-pos'>{itemParent.name}</div>
                                    </div>

                                    <div className='col-9'>
                                        <div className='group-name'>{itemParent.element_distributes && itemParent.element_distributes.map((itemChild, index) => {
                                            return <button
                                                className={index === this.state.distributeSelected ? "item-distribute-name distribute-active" : 'item-distribute-name'}
                                                onClick={() => this.handleClick(itemChild.name, itemParent.name, index, itemChild.id, itemChild.stock)}>{itemChild.name}</button>
                                        })}</div>
                                    </div>




                                </div>

                                <div className='row'>
                                    <div className='col-3'>
                                        <div className='distribute-name-pos'>{itemParent.sub_element_distribute_name}</div>
                                    </div>
                                    <div className='col-9'>
                                        <div className='element_distribute_name'>{itemParent.element_distributes && itemParent.element_distributes[0].sub_element_distributes.map((itemChild, index) => (
                                            <button className={index === this.state.subElementDistributeSelected ? "item-distribute-name distribute-active" : "item-distribute-name"}
                                                onClick={() => this.handleClickSubElement(itemChild.name, itemChild.price, index, itemChild.id)}>{itemChild.name}</button>
                                        ))}</div>
                                    </div>
                                </div>


                            </div>

                        </div>


                        <div onClick={allowBuy ? this.handleCallback : null} class="button-handle-choose-detail-ok" style={{
                            backgroundColor: allowBuy ? "#E56F25" : "grey",
                        }}>
                            <center style={{
                                paddingTop: 10,
                                backgroundColor: allowBuy ? "#E56F25" : "grey",
                            }}>Thêm vào hóa đơn</center> </div>


                    </div>
                </div>
            </div>


        )
    }
}
export default ModalDetail;