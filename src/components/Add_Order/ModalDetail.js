import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import * as Env from "../../ultis/default"

 class ModalDetail extends Component {
     constructor(props){
         super(props)
         this.state={
             distributeName:"",
             distributeValue:"",
             element_distributes:"",
             distributeSelected: -1,
             subElementDistributeSelected:-1,
             afterPrice:"",
             priceBeforeDiscount:"",
             afterChoosePrice:"",
             elementObject:"",
             minPriceAfterDiscount:"",
             maxPriceAfterDiscount:"",
             stateDistribute:false,
             messageErr:"",
             quantityInStock:""
         }
     }
     handleClick  = (nameDistribute,nameObject,index,id,quatity) =>{
         var {distributeProduct} = this.props.modal
         this.setState({distributeSelected:index})
         this.setState({distributeValue:nameDistribute,distributeName:nameObject})
         if(distributeProduct.length > 0) {
            var itemParent = distributeProduct[0];
            if(this.props.modal.discountProduct){
                var {value} = this.props.modal.discountProduct
                var indexElement = itemParent.element_distributes.map(e =>e.id).indexOf(id)
                if(indexElement !== -1){
                   var elment = itemParent.element_distributes[indexElement]
                   if(elment)
                    this.setState({
                        elementObject:elment,
                        afterChoosePrice:elment.price - (elment.price * value/100),
                        priceBeforeDiscount:elment.price,
                        quantityInStock:quatity,
                        messageErr:""
                    })
                }
            }else{
                var indexElements = itemParent.element_distributes.map(e =>e.id).indexOf(id)
                if(indexElements !== -1){
                   var elments = itemParent.element_distributes[indexElements]
                   if(elments)
                    this.setState({
                        elementObject:elments,
                        afterChoosePrice:elments.price,
                        quantityInStock:quatity,
                        messageErr:""
                    })
                }
            }

        
         }
        
     }

     handleClickElement = (nameElement,price,index) =>{
         var {sub_element_distributes} = this.state.elementObject
         if(this.props.modal.discountProduct){
            var {value} = this.props.modal.discountProduct
            this.setState({subElementDistributeSelected:index,element_distributes:nameElement})
            var indexDistribute = sub_element_distributes.map(e => e.name).indexOf(nameElement)
            var sub_element = sub_element_distributes[indexDistribute]
            this.setState({
                afterChoosePrice: sub_element.price - (sub_element.price * value/100),
                priceBeforeDiscount:sub_element.price,
                quantityInStock:sub_element.quantity_in_stock,messageErr:""
            })
         }else{
            this.setState({subElementDistributeSelected:index,element_distributes:nameElement})
            var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
            var sub_elements = sub_element_distributes[indexDistributes]
            console.log("sub_elements",sub_elements)
            this.setState({
                afterChoosePrice: sub_elements.price,
                priceBeforeDiscount:sub_elements.price,
                quantityInStock:sub_elements.quantity_in_stock,
                messageErr:""
            })
         }

     }
     handleClose =() =>{
         this.setState({
            afterChoosePrice:"",
            distributeSelected:-1,
            subElementDistributeSelected:-1,
            messageErr:"",
         })
     }
     handleCallback = () =>{
        var info = this.props.modal

        if(info.distributeProduct.length === 0){
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({product_id: this.props.modal.idProduct,name:"",value:"",sub_element_distributes:"",time:Date(),stock:this.state.quantityInStock})
            return
        }

        if(this.state.distributeSelected===-1){
            this.setState({messageErr:`Chưa chọn ${this.props.modal.distributeProduct[0].name}`})
            return
        }
        if(info.distributeProduct[0].element_distributes[0].sub_element_distributes.length ===0){
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({product_id: this.props.modal.idProduct,name:this.state.distributeName,value:this.state.distributeValue,sub_element_distributes:this.state.element_distributes,time:Date(),stock:this.state.quantityInStock})
            this.setState({distributeSelected:-1,messageErr:"",afterChoosePrice:""})
            return
        }
        if(this.state.subElementDistributeSelected===-1){
            this.setState({messageErr:`Chưa chọn ${this.props.modal.distributeProduct[0].sub_element_distribute_name}`})
            return
        }

        
        window.$('.modal').modal('hide');

        this.props.handleCallbackPushProduct({product_id: this.props.modal.idProduct,name:this.state.distributeName,value:this.state.distributeValue,sub_element_distributes:this.state.element_distributes,time:Date(),stock:this.state.quantityInStock})
        this.setState({distributeSelected:-1,subElementDistributeSelected:-1,messageErr:"",afterChoosePrice:""})
     }
     componentDidMount(){
        
     }

     componentWillReceiveProps(nextProps, nextState) {
        this.setState({quantityInStock:nextProps.modal.quantityProductWithDistribute})
        if(nextProps.modal.priceProduct!== this.state.afterPrice){
            this.setState({afterPrice:nextProps.modal.priceProduct})
        }
        var {minPriceProduct,maxPriceProduct,discountProduct} = nextProps.modal
        if (nextProps.modal.minPriceProduct !== this.props.modal.minPriceProduct) {
            if(discountProduct !== null){
                var minPrice =minPriceProduct - (minPriceProduct * discountProduct.value/100)
                var maxPrice =maxPriceProduct - (maxPriceProduct * discountProduct.value/100)
                this.setState({minPriceAfterDiscount:minPrice,maxPriceAfterDiscount:maxPrice})
            }

        }

    }
    render() {
        var inforProduct = this.props.modal
        return (
            <div class="modal" id="modalDetail">
            <div class="modal-dialog">
                <div class="modal-content">
                <div className='model-header-modal' style={{display:'flex',justifyContent:"space-between", margin:"10px 15px"}}>
                            <p class="" style={{margin:"0px",fontWeight:"bold"}}>Chi tiết sản phẩm</p>
                            <button type="button" class="close" onClick={this.handleClose} data-dismiss="modal">&times;</button>
                        </div>
                <div class="modal-body" style={{position:"relative"}}>
                            {inforProduct.quantityProduct==0?<button class="btn btn-secondary"  style={{position:"absolute", right:"15px", top:"20px",zIndex:"100"}}>Hết hàng</button>:
                            <button class="btn btn-info"  onClick={this.handleCallback}  style={{backgroundColor:"green",position:"absolute", right:"15px", top:"20px",zIndex:"100"}}>Thêm</button>
                            }
                    <div className='model-card row' style={{margin:"5px",width:"80%"}}>
                            <div className='name-voucher col-4' style={{width:"120px",height:"120px",padding:"8px"}}>
                                <div style={{justifyContent:"center",width:"100%",height:"100%",borderRadius:"0.25em",display:"flex",alignItems:"center"}}>
                                    <img src={inforProduct.imageProduct.length>0?inforProduct.imageProduct[0].image_url:Env.IMG_NOT_FOUND} alt='' style={{width:"100%"}}></img>
                                </div>
                            </div>
                            <div className='info-voucher col-8' style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                                    <div>
                                        <div className='value' style={{fontWeight:"bold"}}>{inforProduct.nameProduct}</div>
                                        <div className='code' style={{color:"red"}}><span>{this.state.afterChoosePrice === '' || this.state.afterChoosePrice===0?inforProduct.discountProduct ===null? format(Number(this.state.afterPrice)) :this.state.minPriceAfterDiscount === this.state.maxPriceAfterDiscount?`${format(Number(this.state.minPriceAfterDiscount))}`:`${format(Number(this.state.minPriceAfterDiscount))} - ${format(Number(this.state.maxPriceAfterDiscount))}`
                                        :format(Number(this.state.afterChoosePrice))}</span></div>
                                        <div className='before-discout' style={{display:"flex"}} >
                                            <span style={{fontSize:"13px",textDecoration:"line-through"}}>{inforProduct.discountProduct !==null? 
                                            this.state.afterChoosePrice ===""?inforProduct.minPriceProduct===inforProduct.maxPriceProduct?format(Number(this.state.afterPrice)):`${format(Number(inforProduct.minPriceProduct))} - ${format(Number(inforProduct.maxPriceProduct))}`:format(Number(this.state.priceBeforeDiscount)):""}</span>
                                            <div className='persen-discount' style={{fontSize:"13px", marginLeft:"10px"}}>{inforProduct.discountProduct !==null? `- ${inforProduct.discountProduct.value}%`:""}</div>
                                        </div>     
                                        <div className='quantity-product' style={{fontWeight:"bold",fontSize:"13px"}}>
                                               {this.state.quantityInStock===-1?"Còn hàng":`Còn lại ${this.state.quantityInStock} sản phẩm`}
                                        </div>                                   
                                    </div>
                                    <div>
                                        {inforProduct.distributeProduct.length>0 && inforProduct.distributeProduct.map((itemParent,index) =>(
                                            <div className='distribute'>
                                            {this.state.messageErr &&(
                                                <div className='show-err' style={{color:"red"}}>{this.state.messageErr}</div>
                                            )}
                                                <div className='wrap-distribute'>
                                                        <div className='' style={{display:"flex"}}>
                                                        <div className='distribute-name'>{itemParent.name}</div>
                                                    </div>
                                                    <div className='group-name'>{itemParent.element_distributes.map((itemChild,index) =>(
                                                        <button className={index === this.state.distributeSelected?"active":''} style={{border:"1px solid #e4e4e4",borderRadius:"4px",marginRight:'10px',padding:"5px"}} onClick={() =>this.handleClick(itemChild.name,itemParent.name,index,itemChild.id,itemChild.quantity_in_stock)}>{itemChild.name}</button>
                                                    ))}</div>
                                                </div>
                                           
                                            <div className='distribute-name'>{itemParent.sub_element_distribute_name}</div>
                                            <div className='element_distribute_name'>{itemParent.element_distributes[0].sub_element_distributes.map((itemChild,index) =>(
                                                <button className={index === this.state.subElementDistributeSelected?"actives":""} style={{border:"1px solid #e4e4e4",borderRadius:"4px",marginRight:'10px',padding:"5px"}} onClick={() =>this.handleClickElement(itemChild.name,itemChild.price, index)}>{itemChild.name}</button>
                                            ))}</div>
                                            </div>                                           
                                        ))}

                                    </div>
                            </div>
                            </div>   
                </div>
                </div>
            </div>
            </div>


        )
    }
}
export default ModalDetail;