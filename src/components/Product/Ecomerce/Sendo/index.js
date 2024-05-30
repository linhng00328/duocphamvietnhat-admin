import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual"
import { shallowEqualArrays } from "shallow-equal";
import Pagination from "./Pagination"
import * as productAction from "../../../../actions/product";
import { isEmpty } from "../../../../ultis/helpers"
import * as Types from "../../../../constants/ActionType";
import { format, randomString, filter_arr } from "../../../../ultis/helpers";
class Sendo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_id: "",
      shop_id_page: 1,
      selected: []

    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  fetchAllProductEcommerce = () => {

    var { store_code } = this.props
    var { shop_id } = this.state

    if (shop_id == null || !isEmpty(shop_id)) {
      this.props.showError({

        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập ShopId",
        },
      }
      )
      return;
    }
    this.setState({ shop_id_page: shop_id , selected : [] })
    this.props.fetchAllProductEcommerce(store_code, 1, { shop_id, provider: "sendo" })
  }

  fetchAllProductEcommercePage = (page) => {
    var { shop_id_page } = this.state
    var { store_code } = this.props

    this.props.fetchAllProductEcommerce(store_code, page, { shop_id: shop_id_page, provider: "sendo" })

  }



  shallowCompare = (objFrist, objSecond) => {
    try {
      if (objFrist.name == objSecond.name && objFrist.description == objSecond.description && objFrist.price == objSecond.price
        && shallowEqualArrays(objFrist.images, objSecond.images)
      ) {
        return true
      }
      return false
    } catch (error) {
      if (objFrist.name == objSecond.name && objFrist.description == objSecond.description && objFrist.price == objSecond.price
      ) {
        return true
      }
      return false
    }
  }

  onChangeSelectAll = (e) => {
    var checked = e.target.checked
    var { products } = this.props;
    var _selected = [...this.state.selected]

    var listProduct = filter_arr(products.list)

    if (listProduct.length > 0) {
      if (checked == false) {
        listProduct.forEach(product => {
          if (_selected.length > 0) {
            _selected.forEach((item, index) => {
              if (this.shallowCompare(item, product)) {
                _selected.splice(index, 1)
              }
            });
          }
        });
        this.setState({ selected: _selected })
      }

      else {
        listProduct.forEach(product => {
          var exsit = false
          if (_selected.length > 0) {
            _selected.forEach((item, index) => {
              if (this.shallowCompare(item, product)) {
                exsit = true
              }
            });
          }
          if (exsit == false) {
            _selected.push(product)
          }
        });
        this.setState({ selected: _selected })
      }

    }
  }

  onChangeSelected = (e, data) => {
    var _data = data != null ? JSON.parse(data) : {}
    var { checked } = e.target
    var selected = [...this.state.selected]
    if (checked == true) {
      selected.push(_data)
    }
    else {
      for (const [index, item] of selected.entries()) {
        if (this.shallowCompare(item, _data)) {
          selected.splice(index, 1)
        }
      }
    }
    this.setState({ selected })
  }

  checkSelected = (name) => {
    var selected = [...this.state.selected]
    if (selected.length > 0) {
      for (const item of selected) {
        if (item.name === name) {
          return true
        }
      }
      return false
    }
    else {
      return false
    }
  }

  showData = (products) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var image = ""
        if (data.images != null) {
          image = data.images.length > 0 ? data.images[0] : ""
        }
        else {
          image = null
        }
        var checked = this.checkSelected(data.name)

        return (
          <tr>
            <td>

              <div class="checkbox">
                <label>
                  <input type="checkbox"
                    checked={checked}
                    onChange={(e) => this.onChangeSelected(e, JSON.stringify(data))}
                    value={data.name}
                  />
                </label>
              </div>

            </td>

            <td>

              <img
                style={{
                  width: "120px",
                  objectFit: "cover",
                  height: "100px",
                  margin: "7px"

                }}
                className={`${image != null && image != "" ? "show" : "hide"} img-responsive`} src={image} alt="Image" />
              <td className={image == null || image == "" ? "show" : "hide"}></td>
            </td>

            <td>{data.name}</td>

            <td>{format(data.price)}</td>

          </tr>
        );
      });
    } else {
      return <tr><td colSpan="4">Không có dữ liệu</td></tr>;
    }
    return result;
  };

  checkIsAll = () => {
    var { selected } = this.state
    var products = typeof this.props.products.list != "undefined" ? this.props.products.list : []
    if (selected.length > 0 && products.length > 0) {
      var count = 0
      products.forEach(_item => {
        selected.forEach(item => {
          if (this.shallowCompare(item, _item)) {
            count = count + 1
          }
        });
      });
      if (count == products.length) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }


  postMultiProduct = () => {
    var { store_code } = this.props

    var { selected } = this.state
    if (selected.length == 0) {
      this.props.showError({

        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Không có sản phẩm nào để thực hiện đồng bộ",
        },
      }
      )
      return;
    }
    window.$("#showSendo").modal("hide")
    selected.forEach((item,index) => {
      selected[index].categories = []
    });
    this.props.postMultiProduct(store_code, { allow_skip_same_name: false, list: selected })

  }

  render() {
    var { products, store_code } = this.props
    var { shop_id, selected } = this.state
    var _selected = this.checkIsAll()


    console.log(_selected)
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showSendo"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>
              <h4 class="modal-title" style={{ color: "#0b1b66" }}>Lấy sản phẩm từ sàn TMĐT Sendo</h4>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <div class="modal-body">

              <div class="form-group">
                <div class="alert alert-info alert-dismissible" role="alert">
                  Các sản phẩm từ cửa hàng trên sàn TMĐT Sendo sẽ được tải về
                </div>

              </div>
              <div className="form-group">
                <label htmlFor="lname">Nhập mã cửa hàng Sendo</label>
                <div
                  class="input-group mb-6"
                >
                  <input
                    style={{ maxWidth: "400px", minWidth: "300px" }}
                    type="search"
                    name="shop_id"
                    value={shop_id}
                    onChange={this.onChange}
                    class="form-control"
                    placeholder="Nhập mã cửa hàng Sendo tại đây"
                  />
                  <div class="input-group-append">
                    <button
                      onClick={this.fetchAllProductEcommerce}
                      class="btn btn-primary"
                      type="button"

                    >
                      Lấy sản phẩm
                    </button>
                  </div>

                </div>
              </div>
              <p class="total-item" id="sale_user_name" style={{ padding: "0px" }}>
                <span className="num-total_item" >{products.total_count || 0}&nbsp;</span><span className="text-total_item" id="user_name">sản phẩm</span>
              </p>
              <div class="table-responsive">
                <table class="table  table-hover table-border" style={{ color: "black" }}>
                  <thead>
                    <tr>
                      <th>

                        <input type="checkbox" checked={_selected} onChange={this.onChangeSelectAll} />


                      </th>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>

                    </tr>
                  </thead>

                  <tbody>{this.showData(products.list || [])}</tbody>
                </table>
              </div>


            </div>
            <div class="modal-footer">
              <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <Pagination style="float-fix"
                  fetchAllProductEcommercePage={this.fetchAllProductEcommercePage}
                  store_code={store_code} products={products} />

                <button
                  onClick={this.postMultiProduct}
                  type="button"
                  class={`btn btn-success pagination-btn ${selected.length > 0 ? "show" : "hide"}`}
                  data-dismiss="modal"
                >
                  Đồng bộ ({selected.length})
                </button>
                <button
                  style  = {{marginRight : "5px"}}
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
      </div>
    );
  }
}




const mapStateToProps = (state) => {
  return {
    products: state.productReducers.product.allProductSendo,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error)
    },
    fetchAllProductEcommerce: (store_code, page, params) => {
      dispatch(productAction.fetchAllProductEcommerce(store_code, page, params));
    },

    postMultiProduct: (store_code, data) => {
      dispatch(productAction.postMultiProduct(store_code, data))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sendo);
