import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as productAction from "../../../actions/product";
 class AlertInfor extends Component {
     constructor(props){
         super(props)
         this.state ={

         }
     }
     handleEditStock = () =>{
        const {store_code,formData} = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.editStock(store_code,branch_id,formData)
     }
  render() {
    return (
        <div class="modal" id="ModalAlert">
        <div class="modal-dialog">
          <div class="modal-content">
            <h4 style={{textAlign:"center", padding:"10px"}}>Sửa tồn kho</h4>
            <div class="modal-body" >
              <div>
                {`Bạn đang sửa số lượng tồn kho thành ${this.props.formData.stock}`}
              </div>
              <div>
                Khi thực hiện thao tác này hệ thông sẽ tự động tạo 1 phiếu kiểm hàng.Bạn có chắc chắn không?
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Thoát</button>
              <button type="button" class="btn btn-primary" onClick={() =>this.handleEditStock()} data-dismiss="modal">Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch,props) =>{
    return{
        editStock: (store_code,branch_id ,data) => {
            dispatch(productAction.editStock(store_code,branch_id, data));
          },
    }
}
export default connect(null,mapDispatchToProps) (AlertInfor)
