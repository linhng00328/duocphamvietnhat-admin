import React, { Component } from 'react'
import ItemImportStock from './ItemImportStock'




 class ListImportStock extends Component {
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
        var {listImportStock} = this.props
        
        return (
            <div className='list-group' style={{marginTop:"10px"}}>
                {listImportStock.map((item,index) =>{
                    return(
                        <ItemImportStock item = 
                        {item} 
                        index ={index} 
                        handleCallbackQuantity ={this.handleCallbackQuantity} 
                        handleDelete ={this.handleDelete} 
                        handleCallbackPrice = {this.handleCallbackPrice} />
                    )
                })}
            </div>
        )
    }
}

export default ListImportStock;