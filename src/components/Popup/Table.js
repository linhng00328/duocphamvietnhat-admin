import React, { Component } from "react";
import { connect } from "react-redux";
import * as popupAction from "../../actions/popup";
import * as Env from "../../ultis/default"
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, popupId) => {
    this.props.handleDelCallBack({ table: "Quảng cáo", id: popupId });
    event.preventDefault();
  }

  showData = (popup) => {
    var { store_code } = this.props
    var result = null;
    if (popup.length > 0) {
      var {update , _delete} = this.props

      result = popup.map((data, index) => {
        var img = data.link_image || Env.IMG_NOT_FOUND
        var type_popup = data.type_action == "LINK" ? "Website"
          : data.type_action == "CATEGORY_PRODUCT" ? "Danh mục sản phẩm"
            : data.type_action == "POST" ? "Bài viết"
              : data.type_action == "PRODUCT" ? "Sản phẩm"
                : "Danh mục bài viết"
        var is_show_once = data.show_once == true ? "check" : "close"
        return (
          <tr>
            <td>{index + 1}</td>
            <td>

              <img src={img} class="img-responsive"  width="90px" height="95px" alt="Image" />

            </td>
            <td>
              {type_popup}

            </td>


            <td style={{ textAlign: "center" }} className="status_check"><i class={`fas fa-${is_show_once} ${is_show_once + "-status"} `}></i></td>



            <td className="">

              <Link
                to={`/popup/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>

              <button
              onClick = {(e)=>{this.passDataModal(e,data.id,data.title)}}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"}`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
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
    console.log(this.props)
    return (
      <div class="table-responsive">
        <table class="table  table-border "  id="dataTable" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Loại Popup</th>
              <th style={{ textAlign: "center" }} >Hiển thị 1 lần</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {


    updatePopupStatus: (id, data, store_code) => {
      dispatch(popupAction.updatePopupStatus(id, data, store_code))
    }

  };
};
export default connect(null, mapDispatchToProps)(Table);