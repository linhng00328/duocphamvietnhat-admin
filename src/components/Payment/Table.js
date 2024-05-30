import React, { Component } from "react";
import * as paymentPAction from "../../actions/payment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Table extends Component {
  constructor(props) {
    super(props);
  }

  passEditFunc = (e, id , token) => {
    this.props.handleUpdateCallBack({id : id , token : token});
    e.preventDefault();
  };

  passDeleteFunc = (e, id) => {
    this.props.handleDelCallBack({title : "Danh mục" , id : id});
    e.preventDefault();
  };

  use = (e , id , token) => {
    this.props.updatePayment(this.props.store_code,id,{
      token : token,
      use : true,
    });
  };

  unUse = (e ,id , token) =>{
    this.props.updatePayment(this.props.store_code,id,{
      token : token,

      use : false,
    });
  }

  showData = (payments) => {
    var result = null;
    if (payments.length > 0) {
      var {update} = this.props

      result = payments.map((data, index) => {
        var use =  data.use == true ? "Đang hoạt động" : "Đã dừng"
        var status_use =  data.use== true ? "success" : "secondary" 
       


        return (
          <tr>
            <td>{index + 1}</td>
            <td>{data.name}</td>

            <td>
              <h5>
                <span class={`badge badge-${status_use}`}>
                  {" "}
                  {use}
                </span>{" "}
              </h5>
            </td>


            <td>
              <Link
              style = {{color:"white"}}
                to = {`/payment/edit/${this.props.store_code}/${data.id}`}
                class={`btn btn-primary btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i>&nbsp;Điều chỉnh
              </Link>
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
    console.log("this.props.payment", this.props.payment);
    return (
      <div class="table-responsive">
        <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên </th>
              <th>Trạng thái</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.payment)}</tbody>
        </table>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch, props) => {
  return {
    updatePayment: (store_code , id, data) => {
      dispatch(paymentPAction.updatePayment(store_code , id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);