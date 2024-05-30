import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../constants/ActionType";
import * as customerAction from "../../actions/customer_sales";
import moment from "moment";

class ImportModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: {},
      allow_skip_same_name: false
    };
  }

  onChangeType = (e, index) => {
    var value = e.target.value
    var type = { ...this.state.type }
    type["type" + index] = value
    this.setState({
      type: type
    })
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.allow_skip_same_name != this.props.allow_skip_same_name) {
      this.setState({ allow_skip_same_name: false })
    }
  }


  showListUrl = (images) => {
    var result = null;
    if (typeof images == "undefined") {
      return result;
    }
    var listImg = images.split(",")
    if (listImg.length > 0) {

      result = listImg.map((image, index) => {
        return (

          <img src={image} class="img-responsive" alt="Image" style={{
            width: "120px",
            objectFit: "cover",
            height: "100px",
            margin: "7px"

          }} />

        )

      });
    } else {
      return result;
    }
    return result;
  }

  showItemObject = (item) => {
    {

      console.log(item)
      var object = []
      var data = ""
      Object.entries(item).forEach(([key, value], index) => {


        if (typeof value == "string" && value != null && value != "") {

          // if (!key.includes("STT")) {
            var name = ""
            if (key != null) {
              if (key.includes("tên") || key.includes("Tên")) {
                name = "class-name-product"
              }
            
            object.push(
              <td className={name} >
                <div style={{ maxHeight: "300px", overflow: "auto", maxWidth: "250px" }}>
                  {value}
                </div>
              </td>

            );
          }


        }
        else {
          if(!key.includes("STT"))
          object.push(
            <td>{value}</td>

          );
        }

      })
      return object
    }
  }

  showHeaderData = (data) => {
    var result = [];
    if (typeof data == "undefined") {
      return result;
    }
    if (data.length > 0) {

      Object.entries(data[0]).forEach(([key, value], index) => {
        // if (!key.includes("STT")) {
          result.push(
            <th>

              <select name="" id="input" class="form-control" required="required" onChange={(e) => { this.onChangeType(e, index) }}>
                <option value=""></option>
                <option value="name">Tên khách hàng</option>
                
                <option value="phone_number">Số điện thoại</option>
                <option value="date_of_birth">Ngày sinh</option>

                <option value="email">Email</option>

                <option value="address">Địa chỉ</option>
              </select>

            </th>

          );
        // }
      })
    } else {
      return result;
    }
    return result;
  }

  showData = (data) => {
    var result = null;
    if (typeof data == "undefined") {
      return result;
    }
    if (data.length > 0) {

      result = data.map((item, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            {this.showItemObject(item)}
          </tr>
        )

      });
    } else {
      return result;
    }
    return result;
  };

  checkExsit = (type) => {
    for (let [key, value] of Object.entries(type)) {
      var count = 0;
      for (let [_key, _value] of Object.entries(type)) {
        if (value == _value) {
          count = count + 1
        }
      }
      if (count == 2) {
        return false
      }
    }

    return true

  }

  onSave = () => {
    var { importData } = this.props
    var { type } = this.state
    var newArray = []

    if (importData.length > 0) {
      if (Object.keys(type).length > 0) {
        if (this.checkExsit(type) == true) {
          for (const item of importData) {
            var newItem = {}
            console.log(item)
            Object.entries(item).forEach(([key, value], index) => {
              console.log(key, value,index , type , newItem)
              if (type["type" + index] !== "" && typeof type["type" + index]  !== "undefined" &&  key) {
                if(type["type" + index] == "date_of_birth")
                newItem[type["type" + index]] = moment(value).format("YYYY-MM-DD")

                else
                newItem[type["type" + index]] = value

              }

            })
            newArray.push(newItem)
          }

          window.$("#importModal").modal("hide")

          this.props.createMultiCustomerSale(this.props.store_code, {
            allow_skip_phone_number: this.state.allow_skip_same_name,
            list: newArray
          })
        }
        else {
          this.props.showError({

            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: "Không được chọn trường dữ liệu giống nhau",
            },
          }
          )
          return
        }
      }
      else {
        this.props.showError({

          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Chọn ít nhất 1 trường dữ liệu",
          },
        }
        )
      }
    }

  }

  onChange = (e) => {
    var checked = e.target.checked
    this.setState({ allow_skip_same_name: checked })
  }

  render() {
    var { importData } = this.props
    var { allow_skip_same_name } = this.state
    console.log(importData)
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="importModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "white" }} >

              <div class="form-group">
                <div class="form-check" style={{ paddingLeft: "0px" }}>
                  <label class="form-check-label" for="gridCheck">

                    <i class="fas fa-arrow-alt-circle-right"></i>
                    &nbsp;Xem trước nhập liệu
                  </label>
                  {/* <input class="form-check-input" type="checkbox" id="gridCheck" style={{ marginLeft: "10px" }}
                    onChange={this.onChange}
                    name="allow_skip_same_name"
                    checked={allow_skip_same_name} /> */}

                </div>

              </div>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>

            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>

                <table class="table table-responsive table-border" style={{ fontSize: "13px" }}>
                  <thead>
                    <tr>
                      {this.showHeaderData(importData)}
                    </tr>

                  </thead>
                  <tbody>
                    {this.showData(importData)}
                  </tbody>
                </table>

              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="button"
                  onClick={this.onSave}
                  class="btn btn-info">
                  Thực hiện Import

                </button>
              </div>
            </form>
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
    createMultiCustomerSale: (store_code, data) => {
      dispatch(customerAction.createMultiCustomerSale(store_code, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ImportModal);
