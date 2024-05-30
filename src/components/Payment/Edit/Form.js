import React, { Component } from "react";
import { connect } from "react-redux";
import * as paymentAction from "../../../actions/payment";
import { shallowEqual } from "../../../ultis/shallowEqual";
import CKEditor from "ckeditor4-react";
import ModalCreate from "../ModalCreate";
import ModalUpdate from "../ModalUpdate";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      txtUse: "0",
      txtName: "",
      defind_field: [],
      field: {},
      editPayment: {},
    };
  }

  addPayment = (payment) => {
    console.log(this.state.field);
    var field = { ...this.state.field };
    var payments = [...field.payment_guide];
    payments.push(payment);
    field.payment_guide = payments;

    var { store_code, paymentId } = this.props;
    var { txtContent, txtUse } = this.state;
    var use = txtUse == "1" ? true : false;
    var form = {
      description: txtContent,
      use: use,
    };
    Object.entries(field).forEach(([name, value], index) => {
      form[name] = value;
    });
    this.props.updatePaymentMethod(store_code, paymentId, form);
  };
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.payments, this.props.payments)) {
      console.log(nextProps.payments);
      nextProps.payments.forEach((payment) => {
        if (payment.id == Number(nextProps.paymentId)) {
          var use = payment.use == true ? "1" : "0";
          var field = { ...this.state.field };
          var config = payment.config || {};
          if (payment.field.length > 0) {
            payment.field.forEach((element, index) => {
              if (element == "payment_guide" && config == null) {
                field[element] = [];
              } else if (
                (element == "token_key" ||
                  element == "security_code" ||
                  element == "payment_key") &&
                config == null
              ) {
                // var itemConfig = typeof config[element] === "undefined" || config[element] == "nothing" ? "" : config[element]
                field[element] = "";
              } else {
                // console.log(itemConfig , config , element)
                // if()
                var itemConfig =
                  typeof config[element] === "undefined" ||
                  config[element] == "nothing"
                    ? ""
                    : config[element];
                field[element] = itemConfig;
              }
            });
          }

          this.setState({
            txtName: payment.name,
            txtContent: payment.description,
            txtUse: use,
            field: field,
            defind_field: payment.define_field,
          });
        }
      });
    }
  }
  onChangeField = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    var newField = { ...this.state.field };
    newField[name] = value;
    this.setState({
      field: newField,
    });
  };
  editPayment = (index, data) => {
    this.setState({ editPayment: { index, data } });
  };
  handleCloseEditPayment = () => {
    this.setState({ editPayment: {} });
  };
  showPaymentGuide = (payments) => {
    var result = null;
    if (payments.length > 0) {
      result = payments.map((data, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{data.account_name}</td>
            <td>{data.account_number}</td>
            <td>{data.bank}</td>
            <td>{data.branch}</td>
            <td>
              <button
                onClick={() => this.editPayment(index, JSON.stringify(data))}
                type="button"
                data-toggle="modal"
                data-target="#updateModal"
                class="btn btn-warning btn-sm"
              >
                <i class="fa fa-edit"></i> Sửa
              </button>

              <button
                onClick={() => this.deletePayment(index)}
                type="button"
                style={{ marginLeft: "7px" }}
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  showField = (field, defind_field) => {
    console.log(field, defind_field);
    var result = [];
    Object.entries(field).forEach(([name, value], index) => {
      console.log(name, value);
      if (name == "payment_guide") {
        result.push(
          <div class="form-group">
            <label for="product_name">Danh sách tài khoản thanh toán</label>
            <div class="table-responsive table-border">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Số thứ tự</th>
                    <th>Tên tài khoản</th>
                    <th>Số tài khoản</th>
                    <th>Ngân hàng</th>
                    <th>Chi nhánh</th>
                    <th>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#createModal"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fa fa-plus"></i> Thêm tài khoản
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.showPaymentGuide(value)}</tbody>
              </table>
            </div>
          </div>
        );
      } else {
        result.push(
          <div class="form-group">
            <label for="product_name">{defind_field[index]}</label>
            <input
              type="text"
              class="form-control"
              value={value}
              placeholder={"Nhập " + defind_field[index]}
              autoComplete="off"
              onChange={this.onChangeField}
              name={name}
            />
          </div>
        );
      }
    });
    return result;
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onChangeDecription = (evt) => {
    const data = evt.editor.getData();
    this.setState({ txtContent: data });
  };

  onSave = (e) => {
    var { store_code, paymentId } = this.props;
    e.preventDefault();
    var { txtContent, txtUse, field } = this.state;
    var use = txtUse == "1" ? true : false;
    var form = {
      description: txtContent,
      use: use,
    };
    Object.entries(field).forEach(([name, value], index) => {
      form[name] = value;
    });
    this.props.updatePayment(store_code, paymentId, form);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  HandleEditPayment = (payment, index, funcModal) => {
    console.log(payment, index);

    var field = { ...this.state.field };
    var payments = [...field.payment_guide];
    payments.forEach((item, _index) => {
      if (index == _index) {
        console.log(index, _index);
        payments[index] = payment;
      }
    });
    field.payment_guide = payments;
    var { store_code, paymentId } = this.props;
    var { txtContent, txtUse } = this.state;
    var use = txtUse == "1" ? true : false;
    var form = {
      description: txtContent,
      use: use,
    };
    Object.entries(field).forEach(([name, value], index) => {
      form[name] = value;
    });
    console.log(form);

    this.props.updatePaymentMethod(store_code, paymentId, form, funcModal);
  };
  deletePayment = (index) => {
    var field = { ...this.state.field };
    var payments = [...field.payment_guide];
    payments.forEach((item, _index) => {
      if (index == _index) {
        payments.splice(index, 1);
      }
    });
    field.payment_guide = payments;

    var { store_code, paymentId } = this.props;
    var { txtContent, txtUse } = this.state;
    var use = txtUse == "1" ? true : false;
    var form = {
      description: txtContent,
      use: use,
    };
    Object.entries(field).forEach(([name, value], index) => {
      form[name] = value;
    });
    this.props.updatePaymentMethod(store_code, paymentId, form);
  };

  render() {
    var { txtName, txtContent, txtUse, field, defind_field, editPayment } =
      this.state;
    console.log("paymentId:: ", this.props.paymentId);
    return (
      <React.Fragment>
        <ModalCreate addPayment={this.addPayment} />
        <ModalUpdate
          payment={editPayment}
          HandleEditPayment={this.HandleEditPayment}
          handleCloseEditPayment={this.handleCloseEditPayment}
        />

        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="product_name">Tên phương thức</label>
              <input
                type="text"
                class="form-control"
                value={txtName}
                autoComplete="off"
                disabled
              />
            </div>

            <div class="form-group">
              <label for="product_name">Trạng thái</label>

              <select
                name="txtUse"
                id="inputisUse"
                class="form-control"
                value={txtUse}
                onChange={this.onChange}
              >
                <option value="1">Đang hoạt động</option>
                <option value="0">Tạm dừng hoạt động</option>
              </select>
            </div>
            {this.showField(field, defind_field)}
            {this.props.paymentId == 0 ? null : (
              <div class="form-group">
                <label for="product_name">Nội dung</label>
                <CKEditor
                  data={txtContent}
                  onChange={this.onChangeDecription}
                />
              </div>
            )}
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Lưu
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updatePayment: (store_code, paymentId, data) => {
      dispatch(paymentAction.updatePayment(store_code, paymentId, data));
    },
    updatePaymentMethod: (store_code, paymentId, data, funcModal) => {
      dispatch(
        paymentAction.updatePaymentMethod(
          store_code,
          paymentId,
          data,
          funcModal
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
