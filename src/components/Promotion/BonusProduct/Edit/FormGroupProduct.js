import React, { Component } from "react";
import { connect } from "react-redux";
import * as bonusProductAction from "../../../../actions/bonus_product";
import * as Types from "../../../../constants/ActionType";
import Table from "./Table";
import moment from "moment";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import ModalListProduct from "../Create/ListProduct";
import ModalListProductBonus from "../Create/ListProductBonus";
import TableBonus from "./TableBonus";
import history from "../../../../history";
import {
  formatNumber,
  getQueryParams,
  isEmpty,
} from "../../../../ultis/helpers";
import ModalUpload from "../ModalUpload";
import ModalDelete from "./ModalDelete";

class FormGroupProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProducts: [],
      saveListProducts: [],
      listProductsBonus: [],
      saveListProductsBonus: [],
      displayError: "hide",
      multiply_by_number: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.initialUpload();
  }

  onSaveProduct = (isBonus, isLadder, fromBonusLadder) => {
    if (isBonus) {
      this.setState({
        saveListProductsBonus: [...this.state.listProductsBonus],
      });
    } else if (isLadder) {
      this.setState({
        saveListProductsLadder: [...this.state.listProductsLadder],
      });
    } else if (fromBonusLadder) {
      this.setState({
        saveListProductsBonusLadder: [...this.state.listProductsBonusLadder],
      });
    } else this.setState({ saveListProducts: [...this.state.listProducts] });
  };
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.bonusProduct, this.props.bonusProduct)) {
      var { bonusProduct } = nextProps;
      var listProductsBonus = [];

      if (bonusProduct?.bonus_products?.length > 0) {
        listProductsBonus = bonusProduct?.bonus_products.map((item) => {
          return {
            id: item.product?.id,
            quantity: item.quantity,
            distribute_name:
              item.allows_choose_distribute === true
                ? null
                : item.distribute_name,
            element_distribute_name:
              item.allows_choose_distribute === true
                ? null
                : item.element_distribute_name,
            sub_element_distribute_name:
              item.allows_choose_distribute === true
                ? null
                : item.sub_element_distribute_name,
            sku: item.product?.sku,
            name: item.product?.name,
            allows_choose_distribute: item.allows_choose_distribute,
            product: {
              id: item.product?.id,
              quantity: item.quantity,
              distribute_name:
                item.allows_choose_distribute === true
                  ? null
                  : item.distribute_name,
              element_distribute_name:
                item.allows_choose_distribute === true
                  ? null
                  : item.element_distribute_name,
              sub_element_distribute_name:
                item.allows_choose_distribute === true
                  ? null
                  : item.sub_element_distribute_name,
              sku: item.product?.sku,
              name: item.product?.name,
              allows_choose_distribute: item.allows_choose_distribute,
            },
          };
        });
      }

      var listProducts = [];
      if (bonusProduct?.select_products?.length > 0) {
        listProducts = bonusProduct?.select_products.map((item) => {
          return {
            id: item.product?.id,
            quantity: item.quantity,
            distribute_name: item.distribute_name,
            element_distribute_name: item.element_distribute_name,
            sub_element_distribute_name: item.sub_element_distribute_name,
            sku: item.product?.sku,
            name: item.product?.name,
            allows_all_distribute: item.allows_all_distribute,
            product: {
              id: item.product?.id,
              quantity: item.quantity,
              distribute_name: item.distribute_name,
              element_distribute_name: item.element_distribute_name,
              sub_element_distribute_name: item.sub_element_distribute_name,
              sku: item.product?.sku,
              name: item.product?.name,
              allows_all_distribute: item.allows_all_distribute,
            },
          };
        });
      }

      this.setState({
        listProducts: listProducts || [],
        saveListProducts: listProducts || [],
        listProductsBonus: listProductsBonus || [],
        saveListProductsBonus: listProductsBonus || [],
        isLoading: true,
        loadCript: true,
        form: {},
      });
    }
  }

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const { group_customers } = this.state;
    const _value = formatNumber(value);
    if (name == "txtAmount" || name == "txtValueDiscount") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        if (name == "txtValueDiscount" && this.state.txtDiscoutType == "1") {
          if (value.length < 3) {
            if (value == 0) {
              this.setState({ [name]: "" });
            } else {
              this.setState({ [name]: value });
            }
          }
        } else {
          if (value == 0) {
            this.setState({ [name]: "" });
          } else {
            this.setState({ [name]: value });
          }
        }
      }
    } else if (name == `group_customer_${value}`) {
      const valueNumber = Number(value);
      let new_group_customers = [];

      if (group_customers.includes(valueNumber)) {
        new_group_customers = group_customers.filter(
          (group) => group !== valueNumber
        );
      } else {
        new_group_customers = [...group_customers, valueNumber];
      }

      this.setState({ group_customers: new_group_customers });
    } else {
      this.setState({ [name]: value });
    }
  };
  onChangeType = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value, txtValueDiscount: "" });
  };
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state;
    if (e != "" && txtEnd != "") {
      if (
        !moment(e, "DD-MM-YYYY HH:mm").isBefore(
          moment(txtEnd, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        console.log("hidddeee");
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtStart: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtStart } = this.state;

    if (txtStart != "" && e != "") {
      if (
        !moment(txtStart, "DD-MM-YYYY HH:mm").isBefore(
          moment(e, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtEnd: time,
    });
  };

  checkStatus = (start_time) => {
    var now = moment().valueOf();
    var start_time = moment(start_time, "YYYY-MM-DD HH:mm:ss").valueOf();
    if (now < start_time) {
      return "0";
    } else {
      return "2";
    }
  };
  checkProductSameQuantity = (ladder_reward = false, products) => {
    if (ladder_reward !== true) return true;
    if (ladder_reward == true && products?.length > 0) {
      console.log(ladder_reward, products);
      for (const [index, element] of products.entries()) {
        var filter = products.filter((v, i) => {
          if (parseInt(element.quantity) === parseInt(v.quantity)) {
            return true;
          }
        });
        if (filter?.length > 1) {
          return filter[0];
        }
      }
      return true;
    }
  };
  onSave = (e) => {
    e.preventDefault();
    console.log(this.state.saveListProducts, this.state.saveListProductsBonus);
    if (this.state.displayError == "show") {
      return;
    }
    var state = this.state;

    var { store_code, bonusProductId, isFormCreate, setTabSelected } =
      this.props;

    var listProducts = state.saveListProducts;
    var listProductsBonus = state.saveListProductsBonus;
    var productBonus = {};
    var select_products = [];

    listProducts.forEach((element, index) => {
      var data = { ...element };
      if (data.distribute_name == null) delete data.distribute_name;
      if (data.element_distribute_name == null)
        delete data.element_distribute_name;
      if (data.sub_element_distribute_name == null)
        delete data.sub_element_distribute_name;
      delete data.sku;
      delete data.name;
      delete data.product;
      data.product_id = data.id;
      delete data.id;

      select_products.push(data);
    });

    var bonus_products = [];
    listProductsBonus.forEach((element, index) => {
      var data = { ...element };
      if (data.distribute_name == null) delete data.distribute_name;
      if (data.element_distribute_name == null)
        delete data.element_distribute_name;
      if (data.sub_element_distribute_name == null)
        delete data.sub_element_distribute_name;
      delete data.sku;
      delete data.name;
      delete data.product;
      data.product_id = data.id;
      delete data.id;

      bonus_products.push(data);
    });
    if (isFormCreate) {
      const form = {
        bonus_products,
        select_products,
      };

      this.props.createBonusProductItem(
        store_code,
        bonusProductId,
        form,
        (tabIndexNew) => {
          setTabSelected(tabIndexNew);
        }
      );
    } else {
      const form = {
        group_product: this.props.bonusProduct.group_product_current,
        bonus_products,
        select_products,
      };

      this.props.updateBonusProductItem(store_code, bonusProductId, form);
    }
  };

  goBack = (e) => {
    var { store_code } = this.props;

    var type = getQueryParams("type");
    var page = getQueryParams("page");
    var search = getQueryParams("search");
    if (type) {
      if (Number(type) === 1) {
        history.replace(
          `/bonus_product/${store_code}?type=${type}${
            page ? `&page=${page}` : ""
          }`
        );
      } else {
        history.replace(
          `/bonus_product/${store_code}?type=${type}${
            search ? `&search=${search}` : ""
          }`
        );
      }
    } else {
      history.goBack();
    }
  };

  compareTwoProduct(item1, item2) {
    var product1 = { ...item1 };
    var product2 = { ...item2 };

    delete product1.quantity;
    delete product1.product;
    delete product2.quantity;
    delete product2.product;
    delete product2.bonus_quantity;
    delete product1.bonus_quantity;
    console.log("compact", product1, product2);

    if (shallowEqual(product1, product2)) {
      return true;
    }
    return false;
  }

  handleAddProduct = (
    product,
    id,
    type,
    onSave,
    isBonus,
    isLadder,
    fromBonusLadder,
    indexRemove
  ) => {
    if (isBonus) var products = [...this.state.listProductsBonus];
    else if (isLadder) var products = [...this.state.listProductsLadder];
    else if (fromBonusLadder)
      var products = [...this.state.listProductsBonusLadder];
    else var products = [...this.state.listProducts];

    if (product?.length > 0) {
      if (type == "remove") {
        if (products.length > 0) {
          products = products.filter((value, index) => {
            if (typeof indexRemove !== "undefined")
              return index !== indexRemove;
            else return value.product.id !== product[0].id;
          });
        }
      } else {
        var checkExsit = true;
        product.forEach((item, index) => {
          var check = false;
          var _index = 0;

          products.forEach((item1, index1) => {
            if (item.id == item1.id) {
              check = true;
              _index = index1;
            }
          });
          if (check == false || fromBonusLadder == true) {
            var product = {
              quantity: item.quantity > 1 ? product.quantity : 1,
              product: item,
              allows_all_distribute: item.allows_all_distribute,
              allows_choose_distribute: item.allows_choose_distribute,
              id: item.id,
              sku: item.sku,
              name: item.name,
              bonus_quantity: 1,
              distribute_name: item.distribute_name,
              element_distribute_name: item.element_distribute_name,
              sub_element_distribute_name: item.sub_element_distribute_name,
            };
            if (isBonus == false || typeof isBonus == "undefined")
              delete item.allows_choose_distribute;
            else delete item.allows_all_distribute;

            if (fromBonusLadder == true)
              delete product.allows_choose_distribute;

            products.push(product);
          } else {
            var product = {
              quantity: item.quantity > 1 ? product.quantity : 1,
              product: item,
              allows_all_distribute: item.allows_all_distribute,
              allows_choose_distribute: item.allows_choose_distribute,
              id: item.id,
              bonus_quantity: 1,

              sku: item.sku,
              name: item.name,
              distribute_name: item.distribute_name,
              element_distribute_name: item.element_distribute_name,
              sub_element_distribute_name: item.sub_element_distribute_name,
            };
            if (isBonus == false || typeof isBonus == "undefined")
              delete item.allows_choose_distribute;
            else delete item.allows_all_distribute;
            if (fromBonusLadder == true)
              delete product.allows_choose_distribute;
            products[_index] = product;
          }
        });
      }
    } else {
      if (type == "remove") {
        if (products.length > 0) {
          products = products.filter((item, index) => {
            if (fromBonusLadder) {
              var item = { ...item };
              delete item.allows_all_distribute;
            }
            if (typeof indexRemove !== "undefined")
              return index !== indexRemove;
            else return !this.compareTwoProduct(item, product);
          });
        }
      } else {
        var checkExsit = true;
        var _index = 0;

        products.forEach((item, index) => {
          if (item.id == product.id) {
            checkExsit = false;
            _index = index;
          }
        });
        if (checkExsit == true || fromBonusLadder == true) {
          var product = {
            quantity: product.quantity > 1 ? product.quantity : 1,
            product: product,
            allows_all_distribute: product.allows_all_distribute,
            allows_choose_distribute: product.allows_choose_distribute,
            id: product.id,
            sku: product.sku,
            bonus_quantity: 1,

            name: product.name,
            distribute_name: product.distribute_name,
            element_distribute_name: product.element_distribute_name,
            sub_element_distribute_name: product.sub_element_distribute_name,
          };
          if (isBonus == false || typeof isBonus == "undefined")
            delete product.allows_choose_distribute;
          else delete product.allows_all_distribute;
          if (fromBonusLadder == true) delete product.allows_choose_distribute;
          // products.push(product);
          if (isLadder === true) products = [{ ...product }];
          else products.push(product);
        } else {
          var product = {
            quantity: product.quantity > 1 ? product.quantity : 1,
            product: product,
            allows_all_distribute: product.allows_all_distribute,
            allows_choose_distribute: product.allows_choose_distribute,
            id: product.id,
            bonus_quantity: 1,

            sku: product.sku,
            name: product.name,
            distribute_name: product.distribute_name,
            element_distribute_name: product.element_distribute_name,
            sub_element_distribute_name: product.sub_element_distribute_name,
          };
          products[_index] = product;
          if (isBonus == false || typeof isBonus == "undefined")
            delete product.allows_choose_distribute;
          else delete product.allows_all_distribute;
          if (fromBonusLadder == true) delete product.allows_choose_distribute;
          products[_index] = product;
        }
      }
    }
    if (onSave == true) {
      if (isBonus)
        this.setState({
          listProductsBonus: products,
          saveListProductsBonus: products,
        });
      else if (isLadder)
        this.setState({
          listProductsLadder: products,
          saveListProductsLadder: products,
        });
      else if (fromBonusLadder) {
        console.log("from_bonus_ladder: ", products);
        this.setState({
          listProductsBonusLadder: products,
          saveListProductsBonusLadder: products,
        });
      } else
        this.setState({ listProducts: products, saveListProducts: products });
    } else {
      if (isBonus) this.setState({ listProductsBonus: products });
      else if (isLadder) this.setState({ listProductsLadder: products });
      else if (fromBonusLadder) {
        console.log("from_bonus_ladder: ", products);

        this.setState({ listProductsBonusLadder: products });
      } else this.setState({ listProducts: products });
    }
  };

  handleChangeQuantity = (
    data,
    quantity,
    setIncrement = null,
    set = true,
    isBonus,
    isBonusLadder,
    name,
    indexRemove
  ) => {
    if (isBonus) var products = [...this.state.listProductsBonus];
    else if (isBonusLadder)
      var products = [...this.state.listProductsBonusLadder];
    else var products = [...this.state.listProducts];

    console.log(isBonusLadder, name, products);
    products.forEach((product, index) => {
      if (isBonusLadder) {
        var product = { ...product };
        delete product.allows_all_distribute;
      }

      if (typeof indexRemove !== "undefined") {
        if (index == indexRemove) {
          if (setIncrement === 1) {
            if (isBonusLadder) products[index][name] = product[name] + 1;
            else products[index].quantity = parseInt(product.quantity) + 1;
          } else if (setIncrement === -1) {
            if (isBonusLadder) {
              if (product[name] == 1) {
              } else products[index][name] = parseInt(product[name]) - 1;
            } else {
              if (product.quantity == 1) {
              } else products[index].quantity = product.quantity - 1;
            }
          } else {
            if (isBonusLadder) {
              console.log(products[index][name], name, index);
              products[index][name] = quantity;
            } else products[index].quantity = quantity;
          }
        }
      } else {
        if (this.compareTwoProduct(product, data)) {
          if (setIncrement === 1) {
            if (isBonusLadder) products[index][name] = product[name] + 1;
            else products[index].quantity = parseInt(product.quantity) + 1;
          } else if (setIncrement === -1) {
            if (isBonusLadder) {
              if (product[name] == 1) {
              } else products[index][name] = parseInt(product[name]) - 1;
            } else {
              if (product.quantity == 1) {
              } else products[index].quantity = product.quantity - 1;
            }
          } else {
            if (isBonusLadder) {
              console.log(products[index][name], name, index);
              products[index][name] = quantity;
            } else products[index].quantity = quantity;
          }
        }
      }
    });

    console.log(products);
    if (isBonus)
      this.setState({
        listProductsBonus: products,
        saveListProductsBonus: products,
      });
    else if (isBonusLadder)
      this.setState({
        listProductsBonusLadder: products,
        saveListProductsBonusLadder: products,
      });
    else this.setState({ listProducts: products, saveListProducts: products });
  };

  convertOptions = (opts) => {
    if (opts?.length > 0) {
      const newOptions = opts.reduce(
        (prevOption, currentOption) => [
          ...prevOption,
          {
            value: currentOption.id,
            label: currentOption.name,
          },
        ],
        []
      );
      return newOptions;
    }
    return [];
  };

  handleChangeAgency = (agency) => {
    this.setState({ agency_types: [...agency] });
  };
  handleChangeGroupCustomer = (group) => {
    this.setState({ group_types: [...group] });
  };

  render() {
    var {
      listProducts,
      listProductsBonus,
      saveListProducts,
      saveListProductsBonus,
    } = this.state;
    console.log(
      "🚀 ~ file: FormGroupProduct.js:650 ~ FormGroupProduct ~ render ~ listProducts",
      listProducts,
      saveListProducts
    );

    var { products, store_code, combos, isFormCreate, bonusProduct } =
      this.props;

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div>
                <Table
                  handleChangeQuantity={this.handleChangeQuantity}
                  handleAddProduct={this.handleAddProduct}
                  products={saveListProducts}
                ></Table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div>
                <TableBonus
                  handleChangeQuantity={this.handleChangeQuantity}
                  handleAddProduct={this.handleAddProduct}
                  products={saveListProductsBonus}
                ></TableBonus>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div
                class="box-footer"
                style={{
                  display: "flex",
                  columnGap: "10px",
                }}
              >
                <button type="submit" class="btn btn-info   btn-sm">
                  {isFormCreate ? (
                    <>
                      <i class="fas fa-plus"></i> Thêm
                    </>
                  ) : (
                    <>
                      <i class="fas fa-save"></i> Lưu nhóm
                    </>
                  )}
                </button>

                {/* {!isFormCreate ? (
                  <button
                    type="button"
                    class="btn btn-danger btn-sm mx-2"
                    data-toggle="modal"
                    data-target="#removeBonusProductItemModal"
                  >
                    <i class="fa fa-trash"></i> Xóa
                  </button>
                ) : null} */}
                <button
                  type="button"
                  onClick={this.goBack}
                  class="btn btn-warning   btn-sm"
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <i class="fas fa-arrow-left"></i> Trở về
                </button>
              </div>
            </div>
          </div>
        </form>

        <ModalUpload />
        <ModalListProduct
          onSaveProduct={this.onSaveProduct}
          combos={combos}
          handleAddProduct={this.handleAddProduct}
          listProducts={listProducts}
          store_code={store_code}
          products={products}
        />
        <ModalListProductBonus
          onSaveProduct={this.onSaveProduct}
          combos={combos}
          handleAddProduct={this.handleAddProduct}
          listProducts={listProductsBonus}
          store_code={store_code}
          products={products}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    updateBonusProductItem: (store_code, id, form) => {
      dispatch(bonusProductAction.updateBonusProductItem(store_code, id, form));
    },
    createBonusProductItem: (store_code, id, form, onSuccess) => {
      dispatch(
        bonusProductAction.createBonusProductItem(
          store_code,
          id,
          form,
          onSuccess
        )
      );
    },
    initialUpload: () => {
      dispatch(bonusProductAction.initialUpload());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormGroupProduct);
