import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as OrderAction from '../../actions/add_order'
import { shallowEqual } from '../../ultis/shallowEqual'
import LineItem from './LineItem'

 class ListOrder extends Component {
     constructor(props){
         super(props)
         this.state ={
            arrOrders:[],
            quantityDefalt:"",
            modalDelete :{
                itemIds:"",
                productIds:""
            },
            modalAdd :{
                itemIds:"",
                productIds:"",
                quantity:"",
                distributesProduct:[]   
            },
            modalSub :{
                itemIds:"",
                productIds:"",
                quantity:"",
                distributesProduct:[]  
            }
         }
     }

     componentDidMount(){
        this.setState({arrOrders : this.props.listOrder.line_items})
      }
      componentWillReceiveProps(nextProps){
        if(!shallowEqual(this.props.listOrder , nextProps.listOrder)){
            this.setState({arrOrders : nextProps.listOrder.line_items})
          }
      }
      shouldComponentUpdate(nextProps, nextState) {
        var {store_code} = this.props
        if (!shallowEqual(nextState.modalDelete, this.state.modalDelete)) {
            var formData = {line_item_id:nextState.modalDelete.itemIds,product_id:nextState.modalDelete.productIds,quantity:0,distributes:[]}
            this.props.destroyOneProduct(store_code,formData)
        }
        if(!shallowEqual(nextState.modalAdd,this.state.modalAdd)){
            var formDataAdd = {line_item_id:nextState.modalAdd.itemIds, product_id:nextState.modalAdd.productIds,quantity:nextState.modalAdd.quantity,distributes:nextState.modalAdd.distributesProduct}
            this.props.updateQuantityLineItem(store_code,formDataAdd)
        }
        if(!shallowEqual(nextState.modalSub,this.state.modalSub)){
            var formDataSub = {line_item_id:nextState.modalSub.itemIds, product_id:nextState.modalSub.productIds,quantity:nextState.modalSub.quantity,distributes:nextState.modalSub.distributesProduct}
            this.props.subQuantityProduct(store_code,formDataSub)
        }
        return true
      }
      handleDelete =(itemId,productId) =>{
        this.setState({modalDelete:{itemIds:itemId,productIds:productId}})
    }
    addQuantity = (idItem,idProduct,quantity,distribute) =>{
        this.setState({modalAdd:{itemIds:idItem,productIds:idProduct,quantity:quantity,distributesProduct:distribute}})
    }
    subQuantity = (idItem,idProduct,quantity,distribute) =>{
        this.setState({modalAdd:{itemIds:idItem,productIds:idProduct,quantity:quantity,distributesProduct:distribute}})
    }
    render() {
        var {arrOrders} = this.state
        console.log("arrOrders",arrOrders)
        return (
            <div className='list-group' style={{marginTop:"10px"}}>
                {(arrOrders ?? []).map((item,index) =><LineItem item ={item} index ={item.id} subQuantity = {this.subQuantity} addQuantity = {this.addQuantity} handleDelete = {this.handleDelete}/>)}
            </div>
        )
    }
}

 const mapDispatchToProps =(dispatch,props) =>{
    return {
        destroyOneProduct: (store_code,data) =>{
            dispatch(OrderAction.destroyOneProduct(store_code,data))
        },
        updateQuantityLineItem:(store_code,data) =>{
            dispatch(OrderAction.updateQuantityLineItem(store_code,data))
        },
        subQuantityProduct: (store_code,data) =>{
            dispatch(OrderAction.subQuantityProduct(store_code,data))
        }
    }
 }
export default connect(null,mapDispatchToProps)(ListOrder);