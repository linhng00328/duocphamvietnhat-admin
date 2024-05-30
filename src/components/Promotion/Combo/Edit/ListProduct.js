import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../../../components/Product/Pagination"
import { filter_arr , format } from "../../../../ultis/helpers";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      page: 1,
      numPage: 20,
    };
  }

  onChange = (e) => {
    var { value, checked } = e.target
    console.log(checked)
    var data = JSON.parse(value);
    if (checked == true)
      this.props.handleAddProduct(data, null, "add")
    else
      this.props.handleAddProduct(null, data.id, "remove")

  }
  
  passNumPage = (page) => {
    this.setState({ page: page })
  }

  checkExsit = (list, id) => {
    console.log(list)
    if (list.length > 0) {
      for (const element of list) {
        if (element.product.id == id) {
          return true
        }
      }
    }
    return false
  }

  checkDisable = (combos, id) => {
    if (combos.length > 0) {
      for (const element of combos) {
        for (const item of element.products_combo) {
          if (item.product.id == id) {
            var products_combo = filter_arr(this.props.combo.products_combo)
            if(products_combo.length > 0)
            {
              for (const _item of products_combo) {
                if (_item.product.id == id) {
                  return false
                }
              }
            }
      
            return true
          }

        }

      }
    }
    return false
  }

  showData = (products, list, combos) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {

        var status_name = data.status == 0 ? "Còn hàng" : data.status == 1 ? "Đã ẩn" : data.status == 2 ? "Hết hàng" : null
        var status = data.status == 0 ? "success" : data.status == 1 ? "secondary" : data.status == 2 ? "danger" : null
        var checked = this.checkExsit(list, data.id)
        var disaled = this.checkDisable(combos, data.id, list);
        var background_disable = disaled == true ? "#55b8c3" : "white"
        return (
          <tr className={disaled == true ? "" : "hover-product"} style = {{background : background_disable}}>
            <td>

              <div class="checkbox">
                <label>
                  <input type="checkbox"
                    disabled={disaled}
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)} />
                </label>
              </div>

            </td>

            <td>{data.id}</td>

            <td>{data.name}</td>

            <td>{format(data.price)}</td>
      


            <td>{data.has_in_combo}</td>


          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { products, store_code, listProducts, combos } = this.props
    console.log(products, store_code, listProducts, combos);
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
          <div class="modal-content" style={{ maxHeight: "630px" }}>
          <div class="modal-header" style ={{background : "white"}}>
              <i style = {{color : "red"}}> Những sản phẩm được tô đậm là những sản phẩm đang nằm trong các chương trình khuyến mại khác! Vui lòng xóa nếu muốn thêm vào chương trình này</i>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>

            <div class="table-responsive">
              <table class="table table-hover table-border">
                <thead>
                  <tr>
                    <th></th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Giảm giá</th>
                  </tr>
                </thead>

                <tbody>{this.showData(products.data, listProducts, combos)}</tbody>
              </table>
            </div>

            <div  class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">

<Pagination style = "float-fix" store_code={store_code} products={products} passNumPage={this.passNumPage} limit={this.state.numPage} />
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

  };
};
export default connect(null, mapDispatchToProps)(ListProduct);
