import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../Product/Pagination"
import * as Env from "../../ultis/default"
import { format } from "../../ultis/helpers"
class ListCBlog extends Component {
    constructor(props) {
        super(props);


    }

    handleAddCBlog = (id, name, img) => {
        window.$('.modal').modal('hide');

        this.props.handleAddCBlog({
            id,
            name,
            img,
        })
    }



    showData = (category_blog) => {
        var result = null;
        if (typeof category_blog === "undefined") {
            return result;
        }
        if (category_blog.length > 0) {
            result = category_blog.map((data, index) => {

                var image_url = data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url
                return (
                    <tr >

                        <td>{index + 1}</td>
                      

                        <td>

                            <img src={image_url} className="img-responsive" alt="Image" width="100px" height="100px" />
                        </td>

                        <td>{data.title}</td>



                        <td >
                            <button
                                type="button"
                                onClick={() => this.handleAddCBlog(data.id, data.title, image_url)}

                                class="btn btn-primary btn-sm"
                            >
                                <i class="fa fa-plus"></i> Chọn
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
        var { category_blog } = this.props
        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="showListCBlog"
                data-keyboard="false"
                data-backdrop="static"
            >
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content" style={{ maxHeight: "630px" }}>
                        <div class="modal-header" style={{ background: "white" }}>

                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                        </div>
                        <div class="table-responsive">
                            <table class="table  table-hover table-border" style={{ color: "black" }}>
                                <thead>
                                    <tr>
                                        <th>STT</th>

                                        <th>Hình ảnh</th>
                                        <th>Tiêu đề</th>

                                        <th>Hành động</th>
                                    </tr>
                                </thead>

                                <tbody>{this.showData(category_blog)}</tbody>
                            </table>
                        </div>

                        <div class="modal-footer">
            <button

type="button"
class="btn btn-default pagination-btn"
data-dismiss="modal"
>
Đóng
</button>
            
              </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};
export default connect(null, mapDispatchToProps)(ListCBlog);
