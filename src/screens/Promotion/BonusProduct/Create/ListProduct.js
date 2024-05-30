import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../../../components/Product/Pagination"
import themeData from "../../../../ultis/theme_data";
import * as productAction from "../../../../actions/product";
import * as Env from "../../../../ultis/default";
import { format, formatNumber, contactOrNumber } from "../../../../ultis/helpers";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      page: 1,
      numPage: 20,
      searchValue: "",

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
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  passNumPage = (page) => {
    this.setState({ page: page })
  }
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };

  checkExsit = (list, id) => {
    if (list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true
        }
      }
    }
    return false
  }

  checkDisable = (discounts, id) => {
    if (discounts.length > 0) {
      for (const element of discounts) {
        for (const item of element.products) {
          if (item.id == id) {
            return true
          }
        }

      }
    }
    return false
  }

  onSaveProduct = () => {
    this.props.onSaveProduct()
    window.$(".modal").modal("hide");
  }

  showDistribute = (listDistribute, data) => {
    var result = []
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
        return result
    }
    if (listDistribute.element_distributes) {
        listDistribute.element_distributes.map((element, _index) => {
            if (typeof element.sub_element_distributes != "undefined") {
                if (listDistribute.element_distributes[0].sub_element_distributes.length > 0) {
                    listDistribute.element_distributes[0].sub_element_distributes.map((sub_element, index) => {
                        const cost_of_capital = listDistribute.element_distributes[_index].sub_element_distributes[index]?.cost_of_capital
                        const stock = listDistribute.element_distributes[_index].sub_element_distributes[index]?.stock
                        result.push(
                            <tr className='wrap-item hover-product' >
                                <td></td>
                                <td className='item' >
                                    <img src={element.image_url != null ? element.image_url : Env.IMG_NOT_FOUND} alt='' width="60px" height="60px"  ></img>
                                </td>
                                <td className='item' style = {{display : "flex"}}>
                                    <label style = {{color:"#ff8100"}}>&nbsp;Phân loại: </label>
                                    <div className='name-distribute' >{element.name},{sub_element.name}</div>
                                </td>
                                <td className='item' >
                                    {format(Number(cost_of_capital))}
                                </td>
                                <td className='item' >
                                    {stock}
                                </td>
                                {data.check_inventory === true ?
                                    <td className='item' >
                                        <a className='btn btn-warning btn-sm show' data-toggle="modal" style={{ paddingLeft: "10px", color: "white" }} data-target="#myModal" onClick={() => this.handleEditSubElement(listDistribute.element_distributes[_index].sub_element_distributes[index], element.name, listDistribute.name)}><i className='fa fa-edit'></i> Sửa kho</a>
                                        <a className='btn btn-primary btn-sm show' data-toggle="modal" style={{ marginLeft: "10px", color: "white" }}
                                            data-target="#historyStock"
                                            onClick={() => this.historyInventorys(
                                                listDistribute.element_distributes[_index].sub_element_distributes[index],
                                                element.name,
                                                listDistribute.name)}><i className='fa fa-history'></i> Lịch sử kho</a>
                                    </td> : <td className='item' ></td>
                                }

                            </tr>
                        )

                    })
                }
                else {
                    result.push(
                        <tr className='wrap-item hover-product' >
                            <td></td>

                            <td className='item' >
                                <img src={element.image_url != null ? element.image_url : Env.IMG_NOT_FOUND} alt='' width="60px" height="60px" ></img>
                            </td>
                            <td className='item'  style = {{display : "flex"}}>
                                <label style={{ color: "#ff8100" }}>&nbsp;Phân loại: </label>
                                <div className='name-distribute' >{element.name}</div>
                            </td>
                            <td className='item' >
                                <div className='price-distribute' >{format(Number(element.cost_of_capital))}</div>
                            </td>
                            <td className='item' >
                                <div className='quantity-distribute' >{element.stock}</div>
                            </td>
                            {data.check_inventory === true ?
                                <td className='item'>
                                    <a className='btn btn-warning btn-sm show' data-toggle="modal" data-target="#myModal" style={{ color: "white" }} onClick={() => this.handleEditStockElement(element, listDistribute.name)}><i className='fa fa-edit'></i> Sửa kho</a>
                                    <a className='btn btn-primary btn-sm show' data-toggle="modal" style={{ marginLeft: "10px", color: "white" }} data-target="#historyStock" onClick={() => this.historyInventory(element, listDistribute.name)}><i className='fa fa-history'></i> Lịch sử kho</a>
                                </td> : <td className='item' ></td>
                            }

                        </tr>
                    )
                }
            }
        })
    }
    return result
}


  showData = (products, list, discounts) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {

        var status_name = data.status == 0 ? "Còn hàng" : data.status == 1 ? "Đã ẩn" : data.status == 2 ? "Hết hàng" : null
        var status = data.status == 0 ? "success" : data.status == 1 ? "secondary" : data.status == 2 ? "danger" : null
        var checked = this.checkExsit(list, data.id);
        var disaled = this.checkDisable(discounts, data.id);
        var background_disable = disaled == true ? "#55b8c3" : "white"
        const {
          product_discount,
          min_price,
          max_price,
          _delete,
          update,
          insert,
          per_page,
          current_page,
          store_code,
          page,
          status_stock,
          discount,
          historyInventory,
          distributes
        } = data;
        
        const listDistribute = data.inventory?.distributes !== null && data.inventory?.distributes.length > 0 ? data.inventory?.distributes[0] : []

        let discount_percent = null;

        if (product_discount) {
          discount_percent = product_discount.value;
        }
        return (
          <tr className={disaled == true ? "" : "hover-product"} style={{ background: background_disable }}>
    
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
            <td>
            <img
              src={
                data.images.length > 0
                  ? data.images[0].image_url
                  : Env.IMG_NOT_FOUND
              }
              className="img-responsive"
              alt="Image"
              style={{ width: "100%", height: "59px", width:"59px", background: "#0000000d" }}
            />
          </td>
            <td>{data.sku}</td>

            <td>{data.name}</td>

            <td>                {this.showDistribute(listDistribute, data)}
</td>

            <td>
        { product_discount == null &&
          <div className="eea"
          >
            {min_price === max_price ? (
              contactOrNumber(format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                )
              )
              )) : distributes && distributes.length == 0 ? contactOrNumber(format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                ))) : (
              <div className="ae"
              >
                {format(
                  Number(
                    discount_percent == null
                      ? min_price
                      : min_price - min_price * discount_percent * 0.01
                  )
                )}
                {" - "}
                {format(
                  Number(
                    discount_percent == null
                      ? max_price
                      : max_price - max_price * discount_percent * 0.01
                  )
                )}
              </div>
            )}
          </div>
          }

          {product_discount && (
            <div
              className="a"
              style={{
                float: "left",
              }}
            >
              {min_price === max_price ? (
                contactOrNumber(format(Number(min_price)))
              ) : (
                <div className="row e">
                  <div
                    style={{
                      // textDecoration: "line-through",
                    }}
                  >
                    {format(Number(min_price))}
                    {" - "}
                    {format(Number(max_price))}
                  </div>

                  {/* <div className="discount e">&emsp; -{discount_percent}%</div> */}
                </div>
              )}
            </div>
          )}
        </td>

            {/* <td> <h5>
              <span class={`badge badge-${status}`}>
                {status_name}
              </span>
            </h5></td> */}




          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { products, store_code, listProducts, discounts } = this.props
    var { searchValue } = this.state
    console.log(discounts);
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
            <div class="modal-header" style={{ background: "white" }}>
              <div>
                <h4 style={{ color: "black", display: "block" }}>Chọn sản phẩm</h4>

                <i style={{ color: "red" }}> Những sản phẩm được tô đậm là những sản phẩm đang nằm trong các chương trình khuyến mại khác! Vui lòng xóa nếu muốn thêm vào chương trình này</i>

              </div>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>

            <form style={{marginTop : "10px"}} onSubmit={this.searchData}>
              <div
                class="input-group mb-6"
                style={{ padding: "0 20px" }}
              >
                <input
                  style={{ maxWidth: "280px", minWidth: "150px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
        
            </form>



            <div class="table-responsive">
              <table class="table  table-hover table-border" style={{ color: "black" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th style = {{width : "13%"}}>Hình ảnh</th>

                    <th>Mã SKU</th>
                    <th>Tên sản phẩm</th>
                    <th>Thuộc tính</th>

                    <th>Giá</th>
                  </tr>
                </thead>

                <tbody>{this.showData(products.data, listProducts, discounts)}</tbody>
              </table>
            </div>

            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: "flex", justifyContent: "space-between" }}>

              <Pagination style="float-fix" store_code={store_code} products={products} passNumPage={this.passNumPage} limit={this.state.numPage} />
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    border: "1px solid",
                    marginRight: "10px"
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
                <button style={{ backgroundColor: themeData().backgroundColor }} onClick={this.onSaveProduct} class="btn btn-info">
                  Xác nhận
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ListProduct);
