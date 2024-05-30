import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../Product/Pagination"
import * as Env from "../../ultis/default"
import { format } from "../../ultis/helpers"
class ListCProduct extends Component {
  constructor(props) {
    super(props);


  }

  handleAddCProduct = (id, name, img) => {
    window.$('.modal').modal('hide');

    this.props.handleAddCProduct({
      id,
      name,
      img,
    })  
  }



  showData = (categories) => {
    var result = null;
    if (typeof categories === "undefined") {
      return result;
    }
    if (categories.length > 0) {
      result = categories.map((data, index) => {

        var image_url =
          data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url
        return (
          <tr >


            <td>{index + 1}</td>

            <td>
              <img src={image_url} className="img-responsive" alt="Image" width="100px" height="100px" />

            </td>

            <td>{data.name}</td>


            <td >
              <button
              type = "button"
                onClick={() => this.handleAddCProduct(data.id ,data.name , image_url)}

                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-plus"></i> Chọn
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
    var { categories } = this.props
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListCProduct"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <div class="table-responsive">
              <table class="table  table-hover table-border" style={{ color: "black" }}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Tên danh mục</th>

                    <th>Hành động</th>

                  </tr>
                </thead>

                <tbody>{this.showData(categories)}</tbody>
              </table>
            </div>
            <div class="modal-footer">
            <button

type="button"
class="btn btn-default pagination-btn"
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

  };
};
export default connect(null, mapDispatchToProps)(ListCProduct);
