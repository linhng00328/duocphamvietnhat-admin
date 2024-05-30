import React, { Component } from 'react'
import { format } from '../../ultis/helpers'

class ModalCombo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comboProduct:[]
        }
    }
    handleAddAll = (productsCombo) =>{
        this.setState({comboProduct:productsCombo})
        this.props.handleCallbackCombo({productsCombo,time:Date()})
        window.$('.modal').modal('hide');
    }
    showProduct = (items) => {
        console.log("item",items.products_combo)
        return (
            <div className='wrap-combo' style={{display:"flex",flexWrap:"wrap"}}>
                {items.products_combo.map((item,index) =>(
                    <div class="col-combo" key ={index} style={{ marginBottom: "10px", marginLeft:"10px" }}>
                    <div class="card" style={{width:"127px"}}>
                        <img src={item.product.images.length > 0 ? item.product.images[0].image_url : ""} className="img-responsive" alt="Image" width="100px" height="100px" />
                        <div class="card-body" style={{ padding: '0' }}>
                            <p class="card-title" style={{ margin: '0', overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis' }}>{item.product.name}</p>
                            <p class="card-text" style={{ color: "red" }}>{format(Number(item.product.price))}</p>     
                        </div>
                    </div>
                </div>
                ))}
            </div>
        )
    }
    render() {
        var { listCombo } = this.props
        return (
            <div>
                <div class="modal" id="modalCombo">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Danh sách combo</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                {(listCombo ?? []).map((item, index) => (
                                    <>
                                        <div className='model-card row' key={index} style={{ borderRadios: "0.25em", border: "dashed 2px red", position: "relative", margin: "5px" }}>
                                            <button className='btn btn-success' onClick={() => this.handleAddAll(item.products_combo)}  
                                            style={{ position: "absolute", right: "3px", top: "3px", zIndex: "100" }}>Mua ngay</button>
                                            <div className='name-voucher col-3' style={{ width: "120px", height: "120px", padding: "8px" }}>
                                                <div style={{ backgroundColor: "#cc3c4c", color: "white", justifyContent: "center", width: "100%", height: "100%", borderRadius: "0.25em", display: "flex", alignItems: "center" }}>New combo</div>
                                            </div>
                                            <div className='info-voucher col-9' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                                <div>
                                                    <div className='value' style={{ fontWeight: "bold" }}>{`Giảm ${item.value_discount}%`}</div>
                                                    <div className='code'><span>{`Tên combo: ${item.name}`}</span></div>
                                                    <div className='date-voucher'>{`HSD: ${item.end_time}`}</div>
                                                    <div className='apply'><span>{`Áp dụng khi mua combo sản phẩm bên dưới`}</span></div>
                                                </div>
                                            </div>
                                            {this.showProduct(item)}
                                        </div>

                                    </>
                                ))}
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModalCombo;