import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import { maxQuantityProduct } from '../../ultis/productUltis'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as Types from "../../constants/ActionType";
import * as OrderAction from '../../actions/add_order';
import { connect } from 'react-redux';
class LineItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuantity: 1,
            distribute:"",
            maxQuantityDistribute:""

        }
        this.nameElementDistribute = ""
        this.nameSubElementDistribute =""
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        if (!shallowEqual(this.props.item.quantity, nextProps.item.quantity)) {
            this.setState({ currentQuantity: nextProps.item.quantity })
        }
    }
    componentDidMount() {
        this.setState({ 
            currentQuantity: this.props.item.quantity,
            distribute: this.props.item.product.distributes,
        })
        if(this.props.item.distributes_selected){
            // this.nameElementDistribute = this.props.item.distributes_selected[0].value
            // this.nameSubElementDistribute =this.props.item.distributes_selected[0].sub_element_distributes

        }

    }

    subQuantity(id, productId, quantity, distribute) {
        const q = quantity - 1 < 1 ? 1 : quantity - 1
        this.setState({
            currentQuantity: q
        })
        this.props.subQuantity(id, productId, q, distribute)
    }

    addQuantity(id, productId, quantity, distribute,quantityInStock) {
        if(this.props.item.distributes_selected !== null&&this.props.item.distributes_selected.length >0){
           
            this.nameElementDistribute = this.props.item.distributes_selected[0].value 
            this.nameSubElementDistribute =this.props.item.distributes_selected[0].sub_element_distributes
            var maxQuantity = maxQuantityProduct(this.props.item.product,this.nameElementDistribute,this.nameSubElementDistribute)
            if(quantity < maxQuantity){
            
                const q = quantity + 1
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(id, productId, q, distribute) 
                return
            }
            if(quantity >=maxQuantity){
                this.props.showAlertMaxQuantity()
                return
            }
        }else{
            if(quantityInStock ===-1){
                const q = quantity + 1
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(id, productId, q, distribute) 
                return
            }
            
            if(quantity < quantityInStock){
                const q = quantity + 1
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(id, productId, q, distribute) 
                return
            }
            if(quantity >=quantityInStock){
                this.props.showAlertMaxQuantity()
                return
            }
        }
        


    }
    handleOnChange = (e) => {
        const quantity = e.target.value
        const quantityInStock = this.props.item.product.quantity_in_stock
        if(this.props.item.distributes_selected){
            this.nameElementDistribute = this.props.item.distributes_selected[0].value 
            this.nameSubElementDistribute =this.props.item.distributes_selected[0].sub_element_distributes
            var maxQuantity = maxQuantityProduct(this.props.item.product,this.nameElementDistribute,this.nameSubElementDistribute)
            if(quantity < maxQuantity){
            
                const q = quantity
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, q, this.props.item.distributes_selected) 
                return
            }
            if(quantity >maxQuantity){
                this.setState({
                    currentQuantity: maxQuantity
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, maxQuantity, this.props.item.distributes_selected)
                this.props.showAlertMaxQuantity()
                return
            }
        }else{
            if(quantityInStock ===-1){
                console.log("helllo 1")
                const q = quantity
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, q, this.props.item.distributes_selected) 
                return
            }
            if(quantity < quantityInStock){
                console.log("helllo 2")
                const q = quantity
                this.setState({
                    currentQuantity: q 
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, q, this.props.item.distributes_selected) 
                return
            }
            if(quantity >quantityInStock){
                this.setState({
                    currentQuantity: quantityInStock
                })
                this.props.addQuantity(this.props.item.id, this.props.item.product.id, quantityInStock, this.props.item.distributes_selected)
                this.props.showAlertMaxQuantity()
                return
            }
        }
        // if(quantityInStock ===-1|| quantity < quantityInStock){
        //     this.setState({ currentQuantity: quantity })
        //     this.props.addQuantity(this.props.item.id, this.props.item.product.id, quantity, this.props.item.distributes_selected)
        //     return
        // }
        // if(quantity >=quantityInStock){
        //     this.setState({ currentQuantity: quantityInStock })
        //     this.props.addQuantity(this.props.item.id, this.props.item.product.id, quantityInStock, this.props.item.distributes_selected)
        //     return

        // }


    }
    handleDelete = (id, productId) => {
        this.props.handleDelete(id, productId)
    }
    render() {
        const { item, index } = this.props
        const { currentQuantity } = this.state
        return (
            <div className='row list-group-item' key={index} style={{ padding: "5px 5px", position: "relative", width: "100%", margin: "0" }}>
                <div className='image col-8' style={{ display: "flex", padding: "0" }}>
                    <div className='img-container' style={{width:"40%"}}>
                        <img src={item.product.images.length > 0 ? item.product.images[0].image_url : ""} alt='' width="40px"></img>
                        <div className='wrap-distributes_selected' style={{fontSize:"12px",fontWeight:"bold"}}>
                            {(item.distributes_selected??[]).map((v, i) => (
                                <div>{`${v.name}:${v.value}`}</div>
                            ))}
                                      {item.distributes_selected &&
                                        item.distributes_selected.length > 0 &&
                                        item.distributes_selected[0] &&
                                        item.product.distributes[0].sub_element_distribute_name&&
                                        item.distributes_selected[0].sub_element_distributes && (
                                        <div>
                                            {`${item.product.distributes[0].sub_element_distribute_name}: 
                                            ${item.distributes_selected[0].sub_element_distributes}`}
                                        </div>
                                        )}

                        </div>
                    </div>
                    <div className='wrap-name' style={{ marginLeft: "10px",width:"60%"}} >
                        <div className='name-order'>{item.product.name}</div>
                        <div className='price-order' style={{ color: "red" }}>{format(Number(item.item_price))}</div>
                    </div>
                </div>
                <div className='col-4' style={{paddingLeft:"0"}}>
                    <div className="" style={{ float: "right", border: "1px solid #9c9898ba", borderRadius: "2px" }}>
                        <button className='btn-sub' onClick={() => this.subQuantity(item.id, item.product.id, currentQuantity, item.distributes_selected)} style={{ width: "20px", border: "none" }}>-</button>
                        <input className='input-quantity' onChange={this.handleOnChange} style={{ width: "40px", textAlign: "center" }} value={currentQuantity}></input>
                        <button className='btn-add' onClick={() => this.addQuantity(item.id, item.product.id, currentQuantity, item.distributes_selected,item.product.quantity_in_stock)} style={{ width: "20px", border: "none" }}>+</button>
                    </div>
                </div>
                <a
                    style={{ position: "absolute", right: "4px", top: "7px", color: "red" }}
                    onClick={() => this.handleDelete(item.id, item.product.id)}
                >
                    <i class="fas fa-close close-status "></i>
                </a>
            </div>
        )
    }
}
const mapDispatchToProps =(dispatch,props) =>{
    return {
        showAlertMaxQuantity: () =>{
            dispatch(OrderAction.showAlertMaxQuantity())
        }
    }
}
export default connect(null,mapDispatchToProps) (LineItem);
