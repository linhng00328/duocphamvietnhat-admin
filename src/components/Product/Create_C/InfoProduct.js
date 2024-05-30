import React, { Component } from "react";
import Select from "react-select";
import * as helper from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as CategoryPAction from "../../../actions/category_product";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber, formatNoD } from "../../../ultis/helpers";
import getChannel, { IKITECH } from "../../../ultis/channel";
import * as Types from "../../../constants/ActionType";
class InfoProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPrice: "",
      txtBarcode: "",
      txtStatus: "",
      category_parent: [],
      category_children_ids: [],
      txtCategory: [],
      listCategory: [],
      txtQuantityInStock: "",
      txtPercentC: "",
      type_share_collaborator_number: Types.TYPE_SHARE_COLLABORATOR_PERCENT,
      money_amount_collaborator: "",
      disabledPrice: false,
      icon: true,
      checkHasDistribute: false,
      isLoadDistribute: false,
      sku: "",
      isChecked: true,
      txtImportPrice: "",
      check_inventory: false,
      txtCostOfCapital: "",
      categorySearch: "",
      point_for_agency: 0,
    };
  }
  handleChangeCheckParent(id) {
    return this.state.category_parent.map((e) => e.id).indexOf(id) > -1;
  }
  handleChangeCheckChild(id) {
    return this.state.category_children_ids.map((e) => e.id).indexOf(id) > -1;
  }
  getNameSelected() {
    var nam = "";
    var categories = this.state.listCategory;
    if (this.state.category_parent !== null) {
      categories.forEach((category) => {
        if (
          this.state.category_parent.map((e) => e.id).indexOf(category.id) > -1
        ) {
          nam = nam + category.label + ", ";
        }
      });

      if (this.state.category_children_ids !== null) {
        categories.forEach((category) => {
          category.categories_child.forEach((categoryChild) => {
            if (
              this.state.category_children_ids
                .map((e) => e.id)
                .indexOf(categoryChild.id) > -1
            ) {
              nam = nam + categoryChild.name + ", ";
            }
          });
        });
      }
    }
    if (nam.length > 0) {
      nam = nam.substring(0, nam.length - 2);
    }
    return nam;
  }

  onChangeCheckHasDitribute = (e) => {
    this.setState({ checkHasDistribute: !this.state.checkHasDistribute });
    this.props.checkDistribute(
      !this.state.checkHasDistribute,
      this.state.check_inventory
    );
    // this.props.checkDistribute(!this.state.checkHasDistribute)
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value_text = target.value;
    var value = value_text;
    const _value = formatNumber(value);

    if (
      name == "txtPrice" ||
      name == "txtImportPrice" ||
      name == "txtPercentC" ||
      name == "txtQuantityInStock" ||
      name == "point_for_agency"
    ) {
      if (!isNaN(Number(_value))) {
        value = formatNoD(_value);
        if (name == "txtPercentC") {
          if (value.length < 3) {
            if (value == "") {
              this.setState({ [name]: "" });
            } else {
              this.setState({ [name]: value });
            }
          }
        } else {
          if (value.length > 18) {
            return;
          }
          if (value == "") {
            this.setState({ [name]: "" });
          } else {
            this.setState({ [name]: value });
          }
        }
      }
    } else {
      if (name == "txtBarcode" || name == "sku") {
        if (helper.containsSpecialChars(value)) {
          return;
        }
      }
      this.setState({ [name]: value });
    }
  };
  onChangeSelect = (selectValue) => {
    this.setState({ txtCategory: selectValue });
  };
  handleChangeParent = (category) => {
    var indexHas = this.state.category_parent
      .map((e) => e.id)
      .indexOf(category.id);
    if (indexHas !== -1) {
      var newList = this.state.category_parent;
      newList.splice(indexHas, 1);
      this.setState({ category_parent: newList });
      this.state.listCategory.forEach((category1) => {
        if (category1.id === category.id) {
          category1.categories_child.forEach((categoryChild1) => {
            const indexChild = this.state.category_children_ids
              .map((e) => e.id)
              .indexOf(categoryChild1.id);
            if (indexChild !== -1) {
              const newChild = this.state.category_children_ids.splice(
                indexChild,
                1
              );
              console.log("newChild", newChild);
            }
          });
        }
      });
    } else {
      this.setState({
        category_parent: [...this.state.category_parent, category],
      });
    }
    this.props.handleDataFromInfo(this.state);
  };

  handleChangeChild = (categoryChild) => {
    var categoryParentOb;
    this.state.listCategory.forEach((category) => {
      if (category.categories_child != null) {
        category.categories_child.forEach((categorychild2) => {
          if (categorychild2.id === categoryChild.id) {
            categoryParentOb = category;
          }
        });
      }
    });
    if (categoryParentOb != null) {
      var indexHas = this.state.category_parent
        .map((e) => e.id)
        .indexOf(categoryParentOb.id);
      if (indexHas !== -1) {
      } else {
        this.setState({
          category_parent: [...this.state.category_parent, categoryParentOb],
        });
      }
    }

    /////
    var indexHasChild = this.state.category_children_ids
      .map((e) => e.id)
      .indexOf(categoryChild.id);
    if (indexHasChild !== -1) {
      var newListChild = this.state.category_children_ids;
      newListChild.splice(indexHasChild, 1);
      this.setState({ category_children_ids: newListChild });
    } else {
      this.setState({
        category_children_ids: [
          ...this.state.category_children_ids,
          categoryChild,
        ],
      });
    }
    this.props.handleDataFromInfo(this.state);
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.total != this.props.total &&
      typeof nextProps.total != "undefined"
    ) {
      var value = nextProps.total;
      const _value = formatNumber(value);

      if (!isNaN(Number(_value))) {
        value = formatNoD(_value);
        this.setState({ txtQuantityInStock: value });
      }
    }

    if (
      !shallowEqual(nextProps.category_product, this.props.category_product)
    ) {
      var option = [];
      var categories = [...nextProps.category_product];
      if (categories.length > 0) {
        option = categories.map((category, index) => {
          return {
            id: category.id,
            label: category.name,
            categories_child: category.category_children,
          };
        });
        this.setState({ listCategory: option });
      }
    }
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var { product } = { ...nextProps };
      var { isCopy } = nextProps;
      var categories = [];
      var listcategorynew = [];
      categories = product.categories.map((category, index) => {
        if (listcategorynew.map((e) => e.id).indexOf(category.id) === -1) {
          listcategorynew.push(category);
        }

        return { id: category.id, label: category.name };
      });
      console.log("eeeee");
      const price = formatNumber(product.price ?? 0);
      var _price = formatNoD(price);

      const import_price = formatNumber(product.import_price ?? 0);
      var _import_price = formatNoD(import_price);

      const quantity_stock =
        product.quantity_in_stock < 0
          ? ""
          : formatNumber(product.quantity_in_stock);

      var _quantity_stock =
        quantity_stock == "" ? "" : formatNoD(quantity_stock);
      var checkHasDistribute = false;
      if (product.distributes != null && product.distributes.length > 0) {
        checkHasDistribute = true;
      }

      this.setState({
        txtName: product.name,
        txtPrice: _price,
        point_for_agency: product.point_for_agency,

        txtImportPrice: _import_price,
        disabledPrice: _price == 0 ? true : false,
        txtPercentC: product.percent_collaborator,
        // txtBarcode: isCopy ? Math.random().toString().slice(2, 11) :  product.barcode || Math.random().toString().slice(2, 11),
        txtBarcode: product.barcode,

        txtStatus: product.status,
        category_parent: listcategorynew,
        category_children_ids: product.category_children,
        txtQuantityInStock: _quantity_stock,
        sku: product.sku,
        checkHasDistribute,
        check_inventory: product.check_inventory,
        txtCostOfCapital: product.main_cost_of_capital,
      });

      this.props.checkDistribute(checkHasDistribute, product.check_inventory);
    }
  }
  onChangeCheckInventory = (e) => {
    var { checked } = e.target;
    this.setState({
      check_inventory: checked,
    });
    this.props.checkDistribute(
      this.state.checkHasDistribute,
      !this.state.check_inventory
    );
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState, this.state)) {
      this.props.handleDataFromInfo(nextState);
    }
    return true;
  }

  onChangePrice = (e) => {
    var { checked } = e.target;
    if (checked == true) {
      this.setState({ txtPrice: 0, disabledPrice: checked });
    } else {
      this.setState({ txtPrice: "", disabledPrice: checked });
    }
  };

  onChangeIcon = () => {
    this.setState({ icon: !this.state.icon });
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { categorySearch, item1 } = this.state;
    var resultSearch = [];
    if (this.props.category_product?.length > 0) {
      for (const category of this.props.category_product) {
        if (category.name?.includes(categorySearch)) {
          resultSearch.push({
            id: category.id,
            label: category.name,
            categories_child: category.category_children,
          });
        }
      }
    }

    this.setState({ listCategory: resultSearch });
    //   return {
    //     id: category.id,
    //     label: category.name,
    //     categories_child: category.category_children,
    //   };
    // });
    // this.setState({ listCategory: option });
  };
  handleChangeTypeShareCollab = (type) => {
    this.setState({
      type_share_collaborator_number:
        type === "%"
          ? Types.TYPE_SHARE_COLLABORATOR_PERCENT
          : Types.TYPE_SHARE_COLLABORATOR_NUMBER,
    });
  };
  render() {
    var {
      listCategory,
      txtName,
      txtStatus,
      txtPrice,
      category_parent,
      category_children_ids,
      txtCategory,
      txtQuantityInStock,
      txtPercentC,
      type_share_collaborator_number,
      money_amount_collaborator,
      disabledPrice,
      sku,
      txtBarcode,
      txtImportPrice,
      check_inventory,
      txtCostOfCapital,
      checkHasDistribute,
      categorySearch,
      point_for_agency,
    } = this.state;
    console.log(checkHasDistribute);
    var txtQuantityInStock = txtQuantityInStock == -1 ? "" : txtQuantityInStock;
    var { isCopy } = this.props;
    return (
      <div class="card-body" style={{ padding: "0.8rem" }}>
        <div class="form-group">
          <label for="product_name">Tên sản phẩm</label>
          <input
            type="text"
            class="form-control input-sm"
            id="txtName"
            placeholder="Nhập tên sản phẩm"
            autoComplete="off"
            value={txtName}
            onChange={this.onChange}
            name="txtName"
          />
        </div>
        <div class="form-group">
          <label for="product_name">Mã SKU</label>
          <input
            type="text"
            class="form-control input-sm"
            id="sku"
            placeholder="Nhập mã SKU"
            autoComplete="off"
            value={sku}
            name="sku"
            onChange={this.onChange}
          />
        </div>
        <div class="form-group">
          <label for="product_name">Barcode</label>
          <input
            type="text"
            class="form-control input-sm"
            id="txtBarcode"
            placeholder="Nhập barcode"
            autoComplete="off"
            value={txtBarcode}
            name="txtBarcode"
            onChange={this.onChange}
          />
        </div>

        <div class="form-group">
          <div class="form-check form-switch">
            <input
              onChange={this.onChangeCheckHasDitribute}
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={checkHasDistribute}
            />
            <label
              style={{ fontWeight: "750" }}
              class="form-check-label"
              for="flexSwitchCheckDefault"
            >
              Có phân loại
            </label>
          </div>
        </div>
        {!checkHasDistribute && (
          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <label htmlFor="name">
                  <b>Giá bán lẻ</b>
                </label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    style={{ maxWidth: "420px" }}
                    type="text"
                    class="form-control"
                    id="txtEmail"
                    placeholder="Nhập giá bán lẻ"
                    autoComplete="off"
                    value={txtPrice}
                    onChange={this.onChange}
                    name="txtPrice"
                  />
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="name">
                  <b>Giá nhập</b>
                </label>

                <div class="form-group" style={{ display: "flex" }}>
                  <input
                    style={{ maxWidth: "420px" }}
                    type="text"
                    class="form-control"
                    id="txtEmail"
                    placeholder="Nhập giá nhập"
                    autoComplete="off"
                    value={txtImportPrice}
                    onChange={this.onChange}
                    name="txtImportPrice"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div class="form-group">
          <div class="form-check form-switch">
            <input
              onChange={this.onChangeCheckInventory}
              class="form-check-input"
              type="checkbox"
              id="checkSwitchInventory"
              checked={check_inventory}
            />
            <label
              style={{ fontWeight: "750" }}
              class="form-check-label"
              for="checkSwitchInventory"
            >
              Theo dõi hàng trong kho
            </label>
            {check_inventory && (
              <span style={{ display: "block" }}>
                Vui lòng vào kho hàng để cập nhật số lượng tồn kho và giá vốn
              </span>
            )}
          </div>
        </div>

        {getChannel() == IKITECH && (
          <div class="form-group">
            <label for="product_percent_ctv">Hoa hồng CTV</label>
            <i
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              Bỏ trống khi sản phẩm không có hoa hồng
            </i>
            <div className="input-group">
              <input
                type="text"
                class="form-control"
                id="product_percent_ctv"
                placeholder={`Nhập ${
                  type_share_collaborator_number ==
                  Types.TYPE_SHARE_COLLABORATOR_PERCENT
                    ? "%"
                    : "VND"
                }`}
                autoComplete="off"
                value={
                  type_share_collaborator_number ==
                  Types.TYPE_SHARE_COLLABORATOR_PERCENT
                    ? txtPercentC
                    : money_amount_collaborator
                }
                onChange={this.onChange}
                name={
                  type_share_collaborator_number ==
                  Types.TYPE_SHARE_COLLABORATOR_PERCENT
                    ? "txtPercentC"
                    : "money_amount_collaborator"
                }
              />
              <div
                class="input-group-append"
                onClick={() => this.handleChangeTypeShareCollab("%")}
              >
                <span
                  class="input-group-text"
                  style={{
                    backgroundColor:
                      type_share_collaborator_number ==
                      Types.TYPE_SHARE_COLLABORATOR_PERCENT
                        ? "#f3ab0063"
                        : "#eaecf4",
                    width: "61px",
                    justifyContent: "center",
                    cursor:
                      type_share_collaborator_number ==
                      Types.TYPE_SHARE_COLLABORATOR_PERCENT
                        ? "initial"
                        : "pointer",
                  }}
                >
                  %
                </span>
              </div>
              <div
                class="input-group-append"
                onClick={() => this.handleChangeTypeShareCollab("VNG")}
              >
                <span
                  class="input-group-text"
                  style={{
                    backgroundColor:
                      type_share_collaborator_number ==
                      Types.TYPE_SHARE_COLLABORATOR_NUMBER
                        ? "#f3ab0063"
                        : "#eaecf4",
                    width: "61px",
                    cursor:
                      type_share_collaborator_number ==
                      Types.TYPE_SHARE_COLLABORATOR_NUMBER
                        ? "initial"
                        : "pointer",
                  }}
                >
                  VND
                </span>
              </div>
            </div>
          </div>
        )}
        <div class="form-group">
          <label for="product_name">Xu cho đại lý</label>
          <i
            style={{
              display: "block",
              marginBottom: "5px",
            }}
          >
            Bỏ trống khi không xét xu cho đại lý
          </i>
          <input
            type="text"
            class="form-control"
            id="txtCostOfCapital"
            placeholder="Nhập xu"
            autoComplete="off"
            value={point_for_agency}
            onChange={this.onChange}
            name="point_for_agency"
          />
        </div>
        {getChannel() == IKITECH && (
          <div class="form-group">
            <label for="product_name">Trạng thái</label>

            <select
              id="input"
              class="form-control"
              value={txtStatus}
              onChange={this.onChange}
              name="txtStatus"
            >
              <option value="0">Hiển thị</option>
              <option value="-1">Tạm ẩn</option>
            </select>
          </div>
        )}

        <div class="form-group">
          <label for="product_name">Danh mục</label>
          <div className="Choose-category-product">
            <div className="wrap_category" style={{ display: "flex" }}>
              <input
                disabled
                type="text"
                class="form-control"
                placeholder="--Chọn danh mục--"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  paddingRight: "55px",
                  position: "relative",
                }}
                value={this.getNameSelected()}
              ></input>
              <button
                onClick={this.onChangeIcon}
                data-toggle="collapse"
                data-target="#demo2"
                class="btn"
                style={{ position: "absolute", right: "27px" }}
              >
                <i
                  class={
                    this.state.icon ? "fa fa-caret-down" : "fa fa-caret-down"
                  }
                ></i>
              </button>
            </div>
            <div id="demo2" class="collapse">
              {/* <form onSubmit={this.searchData}>

                <div
                  class="input-group mb-6"
                  style={{
                    paddingTop: "10px",
                  }}
                >
                  <input
                    style={{ maxWidth: "200px", minWidth: "200px" }}
                    type="search"
                    name="categorySearch"
                    value={categorySearch}
                    onChange={this.onChange}
                    class="form-control"
                    placeholder="Tìm kiếm danh mục"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button" onClick={this.searchData}>
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form> */}
              <ul
                style={{ listStyle: "none", margin: "5px 0" }}
                class="list-group"
              >
                {listCategory?.length > 0 ? (
                  listCategory.map((category) => (
                    <li
                      class=""
                      style={{ cursor: "pointer", paddingLeft: "5px" }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          marginRight: "10px",
                          width: "30px",
                          height: "15px",
                        }}
                        checked={this.handleChangeCheckParent(category.id)}
                        onChange={() => this.handleChangeParent(category)}
                      />
                      {category.label}
                      <ul style={{ listStyle: "none", margin: "0px 45px" }}>
                        {(category?.categories_child ?? []).map(
                          (categoryChild) => (
                            <li style={{ cursor: "pointer" }}>
                              <input
                                type="checkbox"
                                style={{
                                  marginRight: "10px",
                                  width: "30px",
                                  height: "15px",
                                  marginTop: "3px",
                                }}
                                checked={this.handleChangeCheckChild(
                                  categoryChild.id
                                )}
                                onChange={() =>
                                  this.handleChangeChild(categoryChild)
                                }
                              />
                              {categoryChild.name}
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ))
                ) : (
                  <div>Không có kết quả</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategoryP: (store_code, params) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(InfoProduct);
