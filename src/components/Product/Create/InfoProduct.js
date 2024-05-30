import React, { Component } from "react";
import { connect } from "react-redux";
import * as CategoryPAction from "../../../actions/category_product";
import * as AttributeAction from "../../../actions/attribute_search";

import Select from "react-select";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as helper from "../../../ultis/helpers";
import {
  formatNumber,
  removeVietnameseTones,
  formatNoD,
} from "../../../ultis/helpers";
import getChannel, { IKITECH } from "../../../ultis/channel";
import * as Types from "../../../constants/ActionType";
import styled from "styled-components";

const InfoProductStyles = styled.div`
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    margin-bottom: 0;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
`;
class InfoProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      // txtBarcode: Math.random().toString().slice(2, 11),
      txtBarcode: "",
      txtWeight: "",
      txtPrice: "",
      txtImportPrice: "",
      sku: Math.random().toString().slice(2, 11),
      check_inventory: false,
      txtQuantityInStock: "",
      txtCostOfCapital: "",
      icon: true,
      txtPercentC: "",
      type_share_collaborator_number: Types.TYPE_SHARE_COLLABORATOR_PERCENT,
      money_amount_collaborator: "",
      txtPosition: "",
      txtStatus: 0,
      listCategory: [],
      category_parent: [],
      category_children_ids: [],
      listAttributeSearch: [],
      attribute_search_parent: [],
      attribute_search_children_ids: [],
      txtCategory: [],
      checkHasDistribute: false,
      disabledPrice: false,
      categorySearch: "",
      point_for_agency: null,
      icon_for_point: false,
      is_medicine: false,
    };
  }

  componentDidMount() {
    var option = [];
    this.setState({ category_parent: [], attribute_search_parent: [] });
    var categories_child = [];
    var attributes_search_child = [];
    var categories = [...this.props.category_product];
    var attribute_search = [...this.props.attribute_search];
    if (categories.length > 0) {
      option = categories.map((category, index) => {
        return {
          id: category.id,
          label: category.name,
          categories_child: category.category_children,
        };
      });
      this.setState({
        listCategory: option,
      });
    }
    if (attribute_search.length > 0) {
      option = attribute_search.map((attribute, index) => {
        return {
          id: attribute.id,
          label: attribute.name,
          attribute_search_child: attribute.product_attribute_search_children,
        };
      });
      this.setState({
        listAttributeSearch: option,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.total != this.props.total &&
      typeof nextProps.total != "undefined"
    ) {
      var value = nextProps.total;
      console.log(value);
      const _value = formatNumber(value);

      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
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
    if (
      !shallowEqual(nextProps.attribute_search, this.props.attribute_search)
    ) {
      let option = [];
      var attribute_search = [...nextProps.attribute_search];
      if (attribute_search.length > 0) {
        option = attribute_search.map((attribute, index) => {
          return {
            id: attribute.id,
            label: attribute.name,
            attribute_search_child: attribute.product_attribute_search_children,
          };
        });
        this.setState({ listAttributeSearch: option });
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState, this.state)) {
      this.props.handleDataFromInfo(nextState);
    }

    return true;
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value_text = e.target.value;
    var value = value_text;
    const _value = formatNumber(value);
    if (name == "txtPercentC") {
      if (value <= 100) {
        if (value == "") {
          this.setState({ [name]: "" });
        } else {
          this.setState({ [name]: value });
        }
      } else {
        this.setState({ [name]: 100 });
      }
    } else if (
      name == "txtPrice" ||
      name == "txtCostOfCapital" ||
      name == "txtImportPrice" ||
      name == "txtQuantityInStock" ||
      name == "point_for_agency" ||
      name == "txtWeight" ||
      name == "money_amount_collaborator"
    ) {
      if (!isNaN(Number(_value))) {
        value = formatNoD(_value);
        // value = value.toString().replace(/\./g, ",");

        if (value.length > 18) {
          return;
        }
        if (value == "") {
          this.setState({ [name]: "" });
        } else {
          this.setState({ [name]: value });
        }
      }
    } else if (name === "is_medicine") {
      const checked = e.target.checked;
      this.setState({ [name]: checked });
    } else {
      if (name == "txtBarcode" || name == "sku") {
        if (helper.containsSpecialChars(value)) {
          return;
        }
      }
      this.setState({ [name]: value });
    }
  };
  onChangeCheckInventory = (e) => {
    var { checked } = e.target;
    if (checked === true) {
      this.setState({
        check_inventory: checked,

        txtCostOfCapital: this.state.txtImportPrice,
      });
    } else {
      this.setState({ check_inventory: checked });
    }
    this.props.checkDistribute(
      this.state.checkHasDistribute,
      !this.state.check_inventory
    );
  };
  onChangeCheckHasDitribute = (e) => {
    this.setState({ checkHasDistribute: !this.state.checkHasDistribute });
    this.props.checkDistribute(
      !this.state.checkHasDistribute,
      this.state.check_inventory
    );
  };

  // Xử lý ds thể loại

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

  onChangeSelect = (selectValue) => {
    this.setState({ txtCategory: selectValue });
  };

  //Xử lý ds thuộc tính tìm kiếm

  handleChangeCheckParentAttribute(id) {
    return this.state.attribute_search_parent.map((e) => e.id).indexOf(id) > -1;
  }
  handleChangeCheckChildAttribute(id) {
    return (
      this.state.attribute_search_children_ids.map((e) => e.id).indexOf(id) > -1
    );
  }
  getNameSelectedAttribute() {
    var nam = "";
    var attributes = this.state.listAttributeSearch;

    if (this.state.attribute_search_parent !== null) {
      attributes.forEach((attribute) => {
        if (
          this.state.attribute_search_parent
            .map((e) => e.id)
            .indexOf(attribute.id) > -1
        ) {
          nam = nam + attribute.label + ", ";
        }
      });

      if (this.state.attribute_search_children_ids !== null) {
        attributes.forEach((attribute) => {
          attribute.attribute_search_child.forEach((attributeChild) => {
            if (
              this.state.attribute_search_children_ids
                .map((e) => e.id)
                .indexOf(attributeChild.id) > -1
            ) {
              nam = nam + attributeChild.name + ", ";
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

  handleChangeParentAttribute = (attribute) => {
    var indexHas = this.state.attribute_search_parent
      .map((e) => e.id)
      .indexOf(attribute.id);
    if (indexHas !== -1) {
      var newList = this.state.attribute_search_parent;
      newList.splice(indexHas, 1);
      this.setState({ attribute_search_parent: newList });
      this.state.listAttributeSearch.forEach((attribute2) => {
        if (attribute2.id === attribute.id) {
          attribute2.attribute_search_child.forEach((attributeChild1) => {
            const indexChild = this.state.attribute_search_children_ids
              .map((e) => e.id)
              .indexOf(attributeChild1.id);
            if (indexChild !== -1) {
              const newChild = this.state.attribute_search_children_ids.splice(
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
        attribute_search_parent: [
          ...this.state.attribute_search_parent,
          attribute,
        ],
      });
    }
    this.props.handleDataFromInfo(this.state);
  };

  handleChangeChildAttribute = (attributeChild) => {
    var attributeParentOb;
    this.state.listAttributeSearch.forEach((attribute) => {
      if (attribute.attribute_search_parent != null) {
        attribute.attribute_search_parent.forEach((attributechild2) => {
          if (attributechild2.id === attributeChild.id) {
            attributeParentOb = attribute;
          }
        });
      }
    });
    if (attributeParentOb != null) {
      var indexHas = this.state.attribute_search_parent
        .map((e) => e.id)
        .indexOf(attributeParentOb.id);
      if (indexHas !== -1) {
      } else {
        this.setState({
          attribute_search_parent: [
            ...this.state.attribute_search_parent,
            attributeParentOb,
          ],
        });
      }
    }

    /////
    var indexHasChild = this.state.attribute_search_children_ids
      .map((e) => e.id)
      .indexOf(attributeChild.id);
    if (indexHasChild !== -1) {
      var newListChild = this.state.attribute_search_children_ids;
      newListChild.splice(indexHasChild, 1);
      this.setState({ attribute_search_children_ids: newListChild });
    } else {
      this.setState({
        attribute_search_children_ids: [
          ...this.state.attribute_search_children_ids,
          attributeChild,
        ],
      });
    }
    this.props.handleDataFromInfo(this.state);
  };

  onChangePrice = (e) => {
    var { checked } = e.target;
    if (checked == true) {
      this.setState({ txtPrice: 0, disabledPrice: checked });
    } else {
      this.setState({ txtPrice: "", disabledPrice: checked });
    }
  };

  flipEven() {
    this.setState({ even: !this.state.even });
  }
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
    const { inputValue, menuIsOpen } = this.state;
    var {
      listCategory,
      listAttributeSearch,
      txtImportPrice,
      barcode,
      category_parent,
      category_children_ids,
      txtName,
      txtStatus,
      txtCategory,
      txtWeight,
      txtBarcode,
      txtPrice,
      txtQuantityInStock,
      txtPercentC,
      type_share_collaborator_number,
      money_amount_collaborator,
      disabledPrice,
      sku,
      check_inventory,
      txtCostOfCapital,
      checkHasDistribute,
      categorySearch,
      point_for_agency,
      txtPosition,
      is_medicine,
    } = this.state;
    console.log("ahihi: ", this.state.attribute_search_children_ids);
    console.log("ahihiParent: ", this.state.attribute_search_parent);
    return (
      <InfoProductStyles class="card-body" style={{ padding: "0.8rem" }}>
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
            placeholder="Nhập mã sản phẩm"
            autoComplete="off"
            value={sku}
            onChange={this.onChange}
            name="sku"
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
            onChange={this.onChange}
            name="txtBarcode"
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
                    disabled={disabledPrice}
                    style={{ maxWidth: "420px" }}
                    type="text"
                    class="form-control"
                    id="txtEmail"
                    placeholder="Nhập giá bán lẻ"
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
          </div>
        </div>
        {check_inventory && !checkHasDistribute && (
          <div class="form-group">
            <div className="row">
              <div className="col-6">
                <label for="product_name">
                  <b>Tồn kho ban đầu</b>
                </label>

                <input
                  type="text"
                  class="form-control"
                  id="txtAddress_detail"
                  placeholder="Nhập số lượng"
                  autoComplete="off"
                  value={txtQuantityInStock}
                  onChange={this.onChange}
                  name="txtQuantityInStock"
                />
              </div>

              <div className="col-6">
                <label for="product_name">
                  <b>Giá vốn</b>
                </label>

                <input
                  type="text"
                  class="form-control"
                  id="txtCostOfCapital"
                  placeholder="Nhập giá vốn"
                  autoComplete="off"
                  value={txtCostOfCapital}
                  onChange={this.onChange}
                  name="txtCostOfCapital"
                />
              </div>
            </div>
          </div>
        )}
        {check_inventory && (
          <div class="form-group">
            <label for="product_name">Vị trí kệ hàng</label>

            <input
              type="text"
              class="form-control"
              id="txtPosition"
              placeholder="Nhập vị trí kệ hàng để sản phẩm"
              autoComplete="off"
              value={txtPosition}
              onChange={this.onChange}
              name="txtPosition"
            />
          </div>
        )}

        <div className="form-group">
          <div className="row">
            <div className="col-6">
              {" "}
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
                  <div class="input-group">
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
            </div>
            <div className="col-6">
              {" "}
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
            </div>
          </div>
        </div>
        {getChannel() == IKITECH && (
          <div class="form-group">
            <label for="product_weight">Cân nặng (gram)</label>
            <i
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              Bỏ trống mặc định khi lên đơn sẽ lấy cân nặng 100 gram
            </i>
            <input
              type="text"
              class="form-control"
              id="product_weight"
              placeholder="Nhập gram"
              autoComplete="off"
              value={txtWeight}
              onChange={this.onChange}
              name="txtWeight"
            />
          </div>
        )}
        <div class="form-group">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="is_medicine"
              name="is_medicine"
              value={is_medicine}
              checked={is_medicine}
              onChange={this.onChange}
            />
            <label
              style={{ fontWeight: "750" }}
              class="form-check-label"
              for="is_medicine"
            >
              Sản phẩm chỉ được liên hệ
            </label>
          </div>
          <i
            style={{
              display: "block",
              marginBottom: "5px",
            }}
          >
            Sản phẩm này không thể đặt mua bình thường mà phải liên hệ tư vấn
          </i>
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
            <div id="accordion">
              <div
                className="wrap_category btn-accordion-collapse collapsed"
                style={{ display: "flex" }}
                onClick={this.onChangeIcon}
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded={"false"}
                aria-controls="collapseOne"
                id="headingOne"
              >
                <input
                  // disabled
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
                  class="btn btn-link  btn-collase-category"
                  id="headingOne"
                  style={{
                    position: "absolute",
                    right: "27px",
                  }}
                >
                  <i
                    class={
                      this.state.icon ? "fa fa-caret-down" : "fa fa-caret-down"
                    }
                    // style={{ fontSize: "0.2px", color: "#abacb4" }}
                  ></i>
                </button>
              </div>
              <div
                id="collapseOne"
                class={`collapse`}
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <ul
                  style={{ listStyle: "none", margin: "5px 0" }}
                  class="list-group"
                >
                  {listCategory?.length > 0 ? (
                    listCategory.map((category, index) => (
                      <li
                        class=""
                        style={{
                          cursor: "pointer",
                          paddingTop: "5px",
                          paddingLeft: "5px",
                        }}
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
                            (categoryChild, index) => (
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
        <div class="form-group">
          <label for="product_name">Thuộc tính tìm kiếm</label>
          <div className="Choose-category-product">
            <div id="accordionAttribute">
              <div
                className="wrap_category btn-collapse btn-accordion-collapse collapsed"
                style={{ display: "flex" }}
                onClick={this.onChangeIcon}
                data-toggle="collapse"
                data-target="#collapseOneAttribute"
                aria-expanded="false"
                aria-controls="collapseOneAttribute"
                id="headingOne"
              >
                <input
                  // disabled
                  type="text"
                  class="form-control"
                  placeholder="--Chọn thuộc tính--"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "55px",
                    position: "relative",
                  }}
                  value={this.getNameSelectedAttribute()}
                ></input>
                <button
                  class="btn btn-link"
                  id="headingOneAttribute"
                  style={{
                    position: "absolute",
                    right: "27px",
                  }}
                >
                  <i
                    class={
                      this.state.icon ? "fa fa-caret-down" : "fa fa-caret-down"
                    }
                    // style={{ fontSize: "0.2px", color: "#abacb4" }}
                  ></i>
                </button>
              </div>
              <div
                id="collapseOneAttribute"
                class="collapse"
                aria-labelledby="headingOneAttribute"
                data-parent="#accordionAttribute"
              >
                <ul
                  style={{
                    listStyle: "none",
                    margin: "5px 0",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                  class="list-group"
                >
                  {listAttributeSearch?.length > 0 ? (
                    listAttributeSearch.map((attribute, index) => (
                      <li
                        class=""
                        style={{
                          cursor: "pointer",
                          paddingTop: "5px",
                          paddingLeft: "5px",
                        }}
                      >
                        {/* <input
                          type="checkbox"
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "15px",
                          }}
                          checked={this.handleChangeCheckParentAttribute(
                            attribute.id
                          )}
                          onChange={() =>
                            this.handleChangeParentAttribute(attribute)
                          }
                        /> */}
                        <span
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          {attribute.label}
                        </span>
                        <ul
                          style={{
                            listStyle: "none",
                            margin: "5px 15px 0 15px",
                          }}
                        >
                          {(attribute?.attribute_search_child ?? []).map(
                            (attributeChild, index) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  style={{
                                    marginRight: "10px",
                                    width: "30px",
                                    height: "15px",
                                  }}
                                  checked={this.handleChangeCheckChildAttribute(
                                    attributeChild.id
                                  )}
                                  onChange={() =>
                                    this.handleChangeChildAttribute(
                                      attributeChild
                                    )
                                  }
                                />
                                {attributeChild.name}
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
        {/* <button
          onClick={()=>{this.setState({icon_for_point : !this.state.icon_for_point})}}
          id="headingOne"
          class="btn btn-link btn-collapse btn-accordion-collapse"
          type="button"
          style={{
            width: "100%",
            textAlign: "left",
            marginLeft: "0px",
            padding: "0rem 0rem",
            border: "none",
            paddingLeft: 0,
            background: "white",
            borderTop: "none",
            borderBottom: "none",
            paddingLeft: "0px",
          }}
        >
          <h6
            class="mb-0 f-flex"
            style={{ fontWeight: "bold", position: "relative" }}
          >
            <label style={{fontSize : "14px"}}>Cài đặt nâng cao</label>{" "}
            <i
              class={
                this.state.icon_for_point
                  ? "fa fa-caret-down"
                  : "fa fa-caret-up"
              }
            ></i>
          </h6>
        </button> */}
      </InfoProductStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategoryP: (store_code, params) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code, params));
    },
    fetchAllAttributeSearch: (store_code, params) => {
      dispatch(AttributeAction.fetchAllAttributeSearch(store_code, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoProduct);
