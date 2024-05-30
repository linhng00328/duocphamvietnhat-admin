import React, { Component } from 'react'
import ItemInventory from './ItemInventory'



 class ListInventorySheet extends Component {
     constructor(props){
         super(props)
         this.state ={

         }
     }

     handleCallbackQuantity =(modal) =>{
         this.props.handleCallbackQuantity(modal)
     }
     handleDelete = (modal) =>{
         this.props.handleDelete(modal)
     }
     handleCallbackPrice = (modal) =>{
        this.props.handleCallbackPrice(modal)
    }
    render() {
        var {listInventory} = this.props
        
        return (
            <div className='list-group' style={{marginTop:"10px"}}>
                {listInventory.map((item,index) =>{
                    return(
                        <ItemInventory handleCallbackPrice = {this.handleCallbackPrice} item = {item} handleCallbackQuantity ={this.handleCallbackQuantity} handleDelete ={this.handleDelete} />
                    )
                })}
            </div>
        )
    }
}

export default ListInventorySheet;