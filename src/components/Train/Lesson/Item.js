import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"

class Table extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpenLesson : false
        }
    }


    passEditFunc = (e, id, train_course_id, title, short_description) => {
        this.props.handleUpdateCallBack({
            id: id,
            train_course_id: train_course_id,
            title: title,
            short_description: short_description,
        });
        e.preventDefault();
    };

    passDataModal = (event, store_code, name, train_course_id) => {
        this.props.handleDelCallBack({ table: "Chương", id: store_code, name: name, train_course_id });
        event.preventDefault();
    }


    render() {

        var { data, index } = this.props
        var {isOpenLesson} = this.state
        return (
            <>
                <tr>
                    <td>
                    <i onClick = {()=>{
                        this.setState({isOpenLesson : !isOpenLesson})
                    }} class={`fas fa-angle-double-${isOpenLesson === true ? "down" : "right"}`}></i>
                                        </td>
                    <td>{data.title}</td>
                    <td>{data.short_description}</td>
                    <td>{moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>


                    <td style={{ display: "flex" }}>
                        <button
                            onClick={(e) =>
                                this.passEditFunc(
                                    e,
                                    data.id,
                                    data.train_course_id,
                                    data.title,

                                    data.short_description
                                )
                            }
                            data-toggle="modal"
                            data-target="#updateModal" class={`btn btn-warning btn-sm`}
                        >
                            <i class="fa fa-edit"></i> Sửa
                        </button>
                        <button
                            onClick={(e) => this.passDataModal(e, data.id, data.title, data.train_course_id
                            )}
                            style={{ marginLeft: "10px" }}
                            data-toggle="modal"
                            data-target="#removeModal"
                            class={`btn btn-danger btn-sm `}
                        >
                            <i class="fa fa-trash"></i> Xóa
                        </button>
                    </td>
                </tr>

              {
                isOpenLesson == true && (
                    <tr >
                    <td colSpan = {5}>
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                       
                        <button data-toggle="modal"
                          data-target="#createModal"
                          class={`btn btn-info btn-icon-split btn-sm `}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Thêm bài học</span>
                        </button>
                      </div>
                    <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>STT</th>
                                {/* <th>ID</th> */}

                                <th>Tên chương</th>
                                <th>Mô tả ngắn</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                        <th>STT</th>
                                {/* <th>ID</th> */}

                                <td>Tên chương</td>
                                <td>Mô tả ngắn</td>
                                <td>Ngày tạo</td>
                                <td>Hành động</td>
                        </tbody>
                    </table>
                    </td>
                </tr>
                )
              }

            </>
        );
    }
}

export default Table;
