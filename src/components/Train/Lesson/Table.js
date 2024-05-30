import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"
import Item from "./Item"
class Table extends Component {
  constructor(props) {
    super(props);
  }


  // passEditFunc = (e, id,train_course_id, title, short_description) => {
  //   this.props.handleUpdateCallBack({
  //     id: id,
  //     train_course_id : train_course_id,
  //     title: title,
  //     short_description: short_description,
  //   });
  //   e.preventDefault();
  // };

  // passDataModal = (event, store_code, name , train_course_id) => {
  //   this.props.handleDelCallBack({ table: "Chương", id: store_code, name: name , train_course_id });
  //   event.preventDefault();
  // }

  showData = (lessons) => {
    var { store_code } = this.props
    var result = null;
    if (lessons.length > 0) {
      var { update, _delete } = this.props

      result = lessons.map((data, index) => {

        return (
       <Item index = {index+1} data = {data} handleDelCallBack = {this.props.handleDelCallBack} handleUpdateCallBack = {this.props.handleUpdateCallBack} ></Item>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { lessons } = this.props



    return (
      <div class="table-responsive">
        <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th></th>
              {/* <th>ID</th> */}

              <th>Tên chương</th>
              <th>Mô tả ngắn</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(lessons)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
