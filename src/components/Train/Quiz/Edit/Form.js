import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as trainAction from "../../../../actions/train";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import ModalUpload from "../ModalUpload";
import Select from "react-select";
import * as Env from "../../../../ultis/default";
import { isEmpty } from "../../../../ultis/helpers";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { handleImageUploadBefore } from "../../../../ultis/sun_editor";
import getChannel, { IKITECH } from "../../../../ultis/channel";
import SeoOption from "./SeoOption";
import history from "../../../../history";
import * as userLocalApi from "../../../../data/local/user";
import themeData from "../../../../ultis/theme_data";
import {
  formatNumber,
  removeVietnameseTones,
  formatNoD,
} from "../../../../ultis/helpers";

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
import imageGallery from "../../../imageGallery";
import { getApiImageStore } from "../../../../constants/Config";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTitle: "",
      txtSumary: "",
      txtContent: "",
      txtMinute: "",
      auto_change_order_questions: false,
      auto_change_order_answer: false,
      id: "",
      show: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      nextProps.modal,
      this.props.modal,
      shallowEqual(nextProps.modal, this.props.modal)
    );

    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var quiz = nextProps.modal;
      this.setState({
        txtSumary: quiz.short_description,
        id: quiz.id,
        txtTitle: quiz.title,
        txtMinute: quiz.minute,
        auto_change_order_questions: quiz.auto_change_order_questions,
        auto_change_order_answer: quiz.auto_change_order_answer,
        show: quiz.show == true ? 1 : 0,
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (name == "txtMinute") {
      var _value = formatNumber(value);
      this.setState({
        [name]: _value,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
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
      txtTitle,
      txtSumary,
      txtMinute,
      auto_change_order_questions,
      auto_change_order_answer,
      id,
      show,
    } = this.state;
    if (txtTitle == null || !isEmpty(txtTitle)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên bài trắc nghiệm không được để trống",
        },
      });
      return;
    }

    if (
      txtMinute == null ||
      !isEmpty(txtMinute) ||
      parseInt(txtMinute ?? 0) <= 0
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Thời gian thi không được để trống",
        },
      });
      return;
    }

    this.props.updateQuiz(
      id,
      {
        title: txtTitle,
        short_description: txtSumary,
        minute: txtMinute,
        auto_change_order_questions,
        auto_change_order_answer,
        show: Number(show) == 1 ? true : false,
      },
      store_code,
      null,
      function () {
        window.$(".modal").modal("hide");
      },
      courseId
    );
  };

  goBack = () => {
    history.goBack();
  };

  render() {
    var {
      txtTitle,
      txtSumary,
      txtMinute,
      auto_change_order_questions,
      auto_change_order_answer,
      show,
    } = this.state;

    var { store_code } = this.props;
    console.log(this.state);
    return (
      <React.Fragment>
        <div
          class="modal fade"
          tabindex="-1"
          role="dialog"
          id="updateQuizModal"
          data-keyboard="false"
          data-backdrop="static"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div
                class="modal-header"
                style={{ backgroundColor: themeData().backgroundColor }}
              >
                <h4 class="modal-title">Sửa bài trắc nghiệm</h4>

                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={this.handleClear}
                >
                  &times;
                </button>
              </div>
              <form
                onSubmit={this.onSave}
                role="form"
                action="#"
                method="post"
                id="createForm"
              >
                <div class="modal-body" style={{ padding: " 0 10px" }}>
                  <div class="form-group">
                    <label for="product_name">Tên bài trắc nghiệm</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      value={txtTitle}
                      placeholder="Nhập tên bài trắc nghiệm"
                      autoComplete="off"
                      onChange={this.onChange}
                      name="txtTitle"
                    />
                  </div>
                  <div class="form-group">
                    <label for="product_name">Số phút thi</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtMinute"
                      value={formatNoD(txtMinute)}
                      placeholder="Nhập số phút"
                      autoComplete="off"
                      onChange={this.onChange}
                      name="txtMinute"
                    />
                  </div>
                  <div class="form-group">
                    <label for="product_name">Trạng thái</label>

                    <select
                      name="show"
                      value={show}
                      onChange={this.onChange}
                      id="input"
                      class="form-control"
                    >
                      <option value="1">Hiển thị</option>
                      <option value="0">Tạm ẩn</option>
                    </select>
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

                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        checked={auto_change_order_questions}
                        name="auto_change_order_questions"
                        onChange={() => {
                          this.setState({
                            auto_change_order_questions:
                              !auto_change_order_questions,
                          });
                        }}
                        type="checkbox"
                        id="gridCheck"
                      />
                      <label class="form-check-label" for="gridCheck">
                        cho phép tự động đổi vị trí câu hỏi
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        checked={auto_change_order_answer}
                        name="auto_change_order_answer"
                        onChange={() => {
                          this.setState({
                            auto_change_order_answer: !auto_change_order_answer,
                          });
                        }}
                        type="checkbox"
                        id="gridCheck1"
                      />
                      <label class="form-check-label" for="gridCheck1">
                        cho phép tự động đổi vị trí câu trả lời
                      </label>
                    </div>
                  </div>
                  {/* <div class="form-group">
                  <label for="product_name">Nội dung</label>
                  <div className="editor">
                    <SunEditor
                      onImageUploadBefore={handleImageUploadBefore}
                      showToolbar={true}
                      onChange={this.handleEditorChange}
                      setDefaultStyle="height: auto"

                      setOptions={{
                        requestHeaders: {
                          "X-Sample": "sample",
                          "token": userLocalApi.getToken()

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
                  </div>
                </div> */}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.handleClear}
                  >
                    Đóng
                  </button>
                  <button type="submit" class="btn btn-warning">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

    updateQuiz: (id, data, store_code, _this, resetModal, courseId) => {
      dispatch(
        trainAction.updateQuiz(
          id,
          data,
          store_code,
          _this,
          resetModal,
          courseId
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
