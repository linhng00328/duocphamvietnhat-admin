import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKITECH } from "../../ultis/channel";
import { filter_arr, format } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import ShowData from "./ShowData";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            modalElement: {
                element: "",
                idProduct: "",
            },
            modalSub: {
                SubElement: "",
                idProduct: "",
                NameElement: "",
                NameDistribute: "",
            },
            formData: "",
        };
    }

    passDataModal = (event, store_code, id, name) => {
        this.props.handleDelCallBack({
            table: "sản phẩm",
            id: id,
            store_code: store_code,
            name: name,
        });
        event.preventDefault();
    };

    handleCallBackElement = (modalElement) => {
        this.setState({ modalElement: modalElement });
    };
    handleCallBackSubElement = (modalSub) => {
        console.log("modalSub", modalSub);
        this.setState({ modalSub: modalSub });
    };

    checkSelected = (id) => {
        var selected = [...this.state.selected];
        if (selected.length > 0) {
            for (const item of selected) {
                if (item == id) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };
    componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps.products.data, this.props.products.data)) {
            this.setState({ selected: [] });
        }
    }
    onChangeSelected = (e, id) => {
        var { checked } = e.target;
        var selected = [...this.state.selected];
        if (checked == true) {
            selected.push(id);
        } else {
            for (const [index, item] of selected.entries()) {
                if (item == id) {
                    selected.splice(index, 1);
                }
            }
        }
        this.setState({ selected });
    };
    handleMultiDelCallBack = (e, data) => {
        var { store_code } = this.props;
        this.props.handleMultiDelCallBack({
            table: "sản phẩm",
            data: data,
            store_code: store_code,
        });
        e.preventDefault();
    };
    showData = (products, per_page, current_page) => {
        var result = null;
        var { store_code, page } = this.props;
        if (typeof products === "undefined") {
            return result;
        }
        if (products.length > 0) {
            var { _delete, update, insert } = this.props;
            result = products.map((data, index) => {
                var status_name = data.status == 0 ? "Hiển thị" : "Đã ẩn";
                var status_stock =
                    data.quantity_in_stock_with_distribute == 0
                        ? -2
                        : data.quantity_in_stock_with_distribute == -1
                            ? -1
                            : data.quantity_in_stock_with_distribute;

                if (status_stock == null) {
                    status_stock = -1;
                }

                var status =
                    data.status == 0
                        ? "success"
                        : data.status == -1
                            ? "secondary"
                            : data.status == 2
                                ? "danger"
                                : null;
                var discount =
                    typeof data.product_discount == "undefined" ||
                        data.product_discount == null
                        ? 0
                        : data.product_discount.discount_price;
                var checked = this.checkSelected(data.id);

                var min_price = data.min_price;
                var max_price = data.max_price;
                var product_discount = data.product_discount;
                var distributes = data.distributes
                return (
                    <ShowData
                        _delete={_delete}
                        passDataModal={this.passDataModal}
                        min_price={min_price}
                        max_price={max_price}
                        product_discount={product_discount}
                        update={update}
                        insert={insert}
                        checked={checked}
                        onChangeSelected={this.onChangeSelected}
                        page={page}
                        status={status}
                        status_name={status_name}
                        status_stock={status_stock}
                        data={data}
                        per_page={per_page}
                        current_page={current_page}
                        index={index}
                        store_code={store_code}
                        discount={discount}
                        distributes={distributes}
                        handleCallBackElement={this.handleCallBackElement}
                        handleCallBackSubElement={this.handleCallBackSubElement}
                        onChangeQuantity={this.props.onChangeQuantity}
                        removeProduct={this.props.removeProduct}
                    />
                );
            });
        } else {
            return result;
        }
        return result;
    };
    onChangeSelectAll = (e) => {
        var checked = e.target.checked;
        var { products } = this.props;
        var _selected = [...this.state.selected];

        var listProduct = filter_arr(products.data);

        if (listProduct.length > 0) {
            if (checked == false) {
                this.setState({ selected: [] });
            } else {
                _selected = [];
                listProduct.forEach((product) => {
                    _selected.push(product.id);
                });
                this.setState({ selected: _selected });
            }
        }
    };
    render() {
        var { products, store_code } = this.props;
        var { selected, modalSub, modalElement, formData } = this.state;
        var per_page = products.per_page;
        var current_page = products.current_page;

        var listProduct = filter_arr(products);
        var _selected =
            selected.length > 0 && selected.length == listProduct.length
                ? true
                : false;
        var multiDelete = selected.length > 0 ? "show" : "hide";
        var { _delete, update, insert } = this.props;
        console.log(products);
        return (
            <div>
              
                <table
                    class="table table-border "
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                >
                    <thead>
                        <tr>

                            <th>Mã barcode</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá bán lẻ</th>
                            <th style={{ }}>Số lượng </th>
                            <th>Xóa</th>

                        </tr>
                    </thead>
                    <tbody>{this.showData(listProduct, per_page, current_page)}</tbody>
                </table>


            </div>
        );
    }
}

export default Table;
