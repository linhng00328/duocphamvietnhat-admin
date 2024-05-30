import React, { Component } from "react";
import { connect } from "react-redux";
import * as productAction from "../../../actions/product";
import * as Env from "../../../ultis/default"
import { format } from "../../../ultis/helpers"
class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: {},
      allow_skip_same_name: false
    };
  }









  showData = (products) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {

        var status_name = data.status == 0 ? "Còn hàng" : data.status == 1 ? "Đã ẩn" : data.status == 2 ? "Hết hàng" : null
        var status = data.status == 0 ? "success" : data.status == 1 ? "secondary" : data.status == 2 ? "danger" : null
        var img = ""
        try {
          img = data.images.length == 0 ? Env.IMG_NOT_FOUND : data.images[data.index_image_avatar].image_url

        } catch (error) {
          img = Env.IMG_NOT_FOUND
        }

        return (
          <tr >
            <td>
                {index+1}
       

            </td>

            <td>{data.id}</td>

            <td>{data.name}</td>

            <td>{format(data.price)}</td>
            <td> <h5>
              <span class={`badge badge-${status}`}>
                {status_name}
              </span>
            </h5></td>



            <td >
              <button
              type = "button"
                onClick = {()=>this.handleAddProduct(data.id , data.name , img , data.price)}
              
                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-plus"></i> Thêm sản phẩm
              </button>
            
 
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { products , store_code} = this.props
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListProduct"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style = {{maxHeight : "630px"}}>
          <div class="modal-header" style ={{background : "white"}}>
        
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <div class="table-responsive">
              <table class="table  table-hover table-border" style = {{color : "black"}}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>

                  </tr>
                </thead>

                <tbody>{this.showData(products.data)}</tbody>
              </table>
            </div>

            <div  class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">

<button

    type="button"
    class="btn btn-primary pagination-btn"
    data-dismiss="modal"
  >
    Đóng
  </button>
</div>

          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error)
    },
    postMultiProduct: (store_code, data) => {
      dispatch(productAction.postMultiProduct(store_code, data))
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
