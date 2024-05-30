import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default"

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, store_code, name) => {
    this.props.handleDelCallBack({ table: "Banner quảng cáo", id: store_code, name: name });
    event.preventDefault();
  }

  showData = (banner_ads) => {
    var { store_code } = this.props
    var result = null;
    if (banner_ads.length > 0) {
      var { update, _delete } = this.props

      result = banner_ads.map((data, index) => {
        var image_url = data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url



        return (
          <tr>
            <td>{index + 1}</td>

            <td>

              <img src={image_url} className="img-responsive" alt="Image" width="100px" height="100px" />
            </td>

            <td>{data.title}</td>
            <td>
              <a
                style={{
                  display: "-webkit-box",
                  "-webkit-line-clamp": "2",

                  overflow: "hidden",
                  "-webkit-box-orient": "vertical",
                }}
                href={data.link_to}>{data.link_to}</a>
            </td>
            <td>{
            data.type == 0 ? "Dưới banner chính" : 
            data.type == 1 ? "Trên sản phẩm nổi bật" : 
            data.type == 2 ? "Trên sản phẩm mới" : 
            data.type == 3 ? "Trên sản phẩm khuyến mại" :
            data.type == 4 ? "Trên danh sách tin tức" : 
            data.type == 5 ? "Trên footer" : 
            data.type == 6 ? "Bên phải danh sách tin tức" : 
            data.type == 7 ? "Bên phải banner chính" : 


            "Trên Footer"}</td>


            <td>
              <Link
                to={`/banner_ads/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
                onClick={(e) => this.passDataModal(e, data.id, data.title)}
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
    return (
      <div class="table-responsive">
        <table class="table  " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>

              <th>Hình ảnh</th>
              <th>Tiêu đề</th>
              <th style={{ width: "200px" }}>URL trang đích</th>
              <th>Vị trí Banner</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
