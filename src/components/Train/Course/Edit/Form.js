import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as trainAction from "../../../../actions/train";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import ModalUpload from "../ModalUpload";
import Select from "react-select";
import * as Env from "../../../../ultis/default";
import * as blogAction from "../../../../actions/blog";

import { isEmpty } from "../../../../ultis/helpers";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { handleImageUploadBefore } from "../../../../ultis/sun_editor";
import getChannel, { IKITECH } from "../../../../ultis/channel";
import * as userLocalApi from "../../../../data/local/user";

import {
  image as imagePlugin,
  font,
  fontSize,
  formatBlock,
  paragraphStyle,
  blockquote,
  fontColor,
  textStyle,
  list,
  lineHeight,
  table as tablePlugin,
  link as linkPlugin,
  video,
  audio,
} from "suneditor/src/plugins";
import imageGallery from "./../../../imageGallery";
import { getApiImageStore } from "../../../../constants/Config";
import SeoOption from "./SeoOption";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      txtTitle: "",
      txtSumary: "",
      image: "",
    };
  }

  componentDidMount() {
    var { course } = this.props;
    this.setState({
      txtContent: course.description,
      txtTitle: course.title,
      image: course.image_url,

      txtSumary: course.short_description,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.course, this.props.course)) {
      this.setState({
        txtContent: nextProps.course.description,
        txtTitle: nextProps.course.title,
        image: nextProps.course.image_url,

        txtSumary: nextProps.course.short_description,
      });
    }

    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleEditorChange = (editorState) => {
    this.setState({
      txtContent: editorState,
    });
  };

  onSave = (e) => {
    var { store_code, courseId } = this.props;
    e.preventDefault();
    var {
      txtContent,
      txtTitle,
      txtSeoDescription,
      txtSeoTitle,
      image,
      txtSumary,
      txtPublished,
      txtCategories,
    } = this.state;
    if (txtTitle == null || !isEmpty(txtTitle)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên khóa học không được để trống",
        },
      });
      return;
    }

    this.props.updateCourse(
      courseId,
      {
        description: txtContent,
        title: txtTitle,
        image_url: image,

        short_description: txtSumary,
      },
      store_code
    );
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };

  render() {
    var {
      txtTitle,
      txtContent,
      image,
      listCategory,
      txtSumary,
      txtPublished,
      txtSeoDescription,
      txtSeoTitle,
      txtCategories,
    } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;
    var { store_code } = this.props;
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>Ảnh: &nbsp; </label>
                  <img src={`${image}`} width="150" height="150" />
                </div>
                <div class="form-group">
                  <div class="kv-avatar">
                    <div>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#uploadModalBlog"
                      >
                        <i class="fa fa-plus"></i> Upload ảnh
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="product_name">Tên khóa học</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtTitle"
                    value={txtTitle}
                    placeholder="Nhập tên khóa học"
                    autoComplete="off"
                    onChange={this.onChange}
                    name="txtTitle"
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Mô tả ngắn</label>

                  <textarea
                    name="txtSumary"
                    onChange={this.onChange}
                    value={txtSumary}
                    id="input"
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>

                {/* <div class="form-group">
              <label for="product_name">Nội dung</label>
              <SunEditor
                onImageUploadBefore={handleImageUploadBefore}
                setContents={txtContent}
                showToolbar={true}
                onChange={this.handleEditorChange}
                setDefaultStyle="height: auto"
                setOptions={{
                  requestHeaders: {
                    "X-Sample": "sample",
                    "token" : userLocalApi.getToken()

                  },
                  imageGalleryLoadURL: getApiImageStore(store_code),
                  plugins: [
                    imagePlugin,
                    imageGallery,
                    font,
                    fontSize,
                    formatBlock,
                    paragraphStyle,
                    blockquote,
                    fontColor,
                    textStyle,
                    list,
                    lineHeight,
                    tablePlugin,
                    linkPlugin,
                    video,
                    audio],

                  buttonList: [
                    [
                      "undo",
                      "redo",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                      "bold",
                      "underline",
                      "italic",
                      "fontColor",
                      "textStyle",
                      "outdent",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",
                      "imageGallery",
                      "fullScreen",
                      "preview",
                    ],
                  ],
                }}

              />
            </div> */}
              </div>
            </div>
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
        <ModalUpload store_code={this.props.store_code} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.blogImg.blog_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    initialUpload: () => {
      dispatch(blogAction.initialUpload());
    },
    updateCourse: (id, data, store_code) => {
      dispatch(trainAction.updateCourse(id, data, store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
