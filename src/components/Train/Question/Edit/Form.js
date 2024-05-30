import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import { connect } from "react-redux";
import * as trainAction from "../../../../actions/train";
import * as blogAction from "../../../../actions/blog";
import * as helper from "../../../../ultis/helpers";
import { compressed } from "../../../../ultis/helpers";

import { shallowEqual } from "../../../../ultis/shallowEqual";
import ModalUpload from "../ModalUpload";
import * as Env from "../../../../ultis/default";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import history from "../../../../history";
import themeData from "../../../../ultis/theme_data";

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
      question: "",
      answer_a: "",
      answer_b: "",
      answer_c: "",
      answer_d: "",
      right_answer: "",
      image: "",
      fileUpload: null,
      id: "",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    var _this = this;

    window
      .$("#file-quiz-question-update")
      .on("fileloaded", function (event, file) {
        _this.setState({ fileUpload: file });
      });
    window
      .$("#file-quiz-question-update")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-quiz-question-update");
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var {
        question,
        answer_a,
        answer_b,
        answer_c,
        answer_d,
        right_answer,
        question_image,
        id,
      } = nextProps.modal;
      this.setState({
        question,
        answer_a,
        answer_b,
        answer_c,
        id,
        answer_d,
        right_answer,
        image: question_image,
      });
    }
  }

  // componentWillReceiveProps(nextProps) {

  //   if (this.props.image !== nextProps.image) {
  //     this.setState({ image: nextProps.image });
  //   }
  // }

  // componentDidMount() {

  //   this.props.initialUpload();
  // }

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

  onSave = async (e) => {
    var { store_code, courseId, quizId } = this.props;
    e.preventDefault();
    var {
      question,
      answer_a,
      answer_b,
      answer_c,
      answer_d,
      right_answer,
      fileUpload,
      id,
    } = this.state;
    var image = null;
    var file = fileUpload;
    if (typeof file !== "undefined" && file != "" && file != null) {
      // window.$('#file-quiz-question-update').fileinput('clear');
      image = await compressed(file);
      console.log(image);
    }

    this.props.updateQuestion(
      id,
      {
        question,
        answer_a,
        answer_b,
        answer_c,
        answer_d,
        right_answer,
        image,
      },
      store_code,
      null,
      function () {
        window.$(".modal").modal("hide");
      },
      courseId,
      quizId
    );
  };

  //   this.props.createQuestion(store_code, {
  //     question,
  //     answer_a,
  //     answer_b,
  //     answer_c,
  //     answer_d,
  //     right_answer,
  //     image

  //   }, this, function () {
  //     window.$(".modal").modal("hide");

  //   }, courseId, quizId);
  // };

  goBack = () => {
    history.goBack();
  };

  render() {
    var {
      question,
      answer_a,
      answer_b,
      answer_c,
      answer_d,
      right_answer,
      image,
    } = this.state;

    var { store_code } = this.props;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;

    return (
      <React.Fragment>
        <div
          class="modal fade"
          tabindex="-1"
          role="dialog"
          id="updateQuestionModal"
          data-keyboard="false"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div
                class="modal-header"
                style={{ backgroundColor: themeData().backgroundColor }}
              >
                <h4 class="modal-title">Sửa câu hỏi</h4>

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
                <div
                  class="modal-body"
                  style={{ padding: " 0 10px", display: "flex" }}
                >
                  <div style={{ width: "60%", paddingRight: "10px" }}>
                    <div class="form-group">
                      <label for="product_name">Câu hỏi</label>

                      <textarea
                        value={question}
                        placeholder="Nhập câu hỏi"
                        autoComplete="off"
                        onChange={this.onChange}
                        name="question"
                        class="form-control"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="product_name">Câu trả lời A</label>
                      <input
                        type="text"
                        class="form-control"
                        id="answer_a"
                        value={answer_a}
                        placeholder="Nhập câu trả lời"
                        autoComplete="off"
                        onChange={this.onChange}
                        name="answer_a"
                      />
                    </div>
                    <div class="form-group">
                      <label for="product_name">Câu trả lời B</label>
                      <input
                        type="text"
                        class="form-control"
                        id="answer_b"
                        value={answer_b}
                        placeholder="Nhập câu trả lời"
                        autoComplete="off"
                        onChange={this.onChange}
                        name="answer_b"
                      />
                    </div>
                    <div class="form-group">
                      <label for="product_name">Câu trả lời C</label>
                      <input
                        type="text"
                        class="form-control"
                        id="answer_c"
                        value={answer_c}
                        placeholder="Nhập câu trả lời"
                        autoComplete="off"
                        onChange={this.onChange}
                        name="answer_c"
                      />
                    </div>
                    <div class="form-group">
                      <label for="product_name">Câu trả lời D</label>
                      <input
                        type="text"
                        class="form-control"
                        id="answer_d"
                        value={answer_d}
                        placeholder="Nhập câu trả lời"
                        autoComplete="off"
                        onChange={this.onChange}
                        name="answer_d"
                      />
                    </div>
                    <div class="form-group">
                      <label for="product_name">Câu trả lời đúng</label>

                      <select
                        name="right_answer"
                        value={right_answer}
                        id="input"
                        class="form-control"
                        onChange={this.onChange}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>

                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  </div>
                  <div
                    style={{
                      paddingLeft: "10px",

                      "border-left": "1px solid #dcd0d0",
                    }}
                  >
                    <div
                      class="form-group"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                      }}
                    >
                      <label>Ảnh: &nbsp; </label>
                      <img src={`${image}`} width="150" height="150" />
                    </div>
                    <div class="form-group">
                      <label for="product_name" style={{ margin: 0 }}>
                        Hình ảnh
                      </label>
                      <div className="file-loading">
                        <input
                          id="file-quiz-question-update"
                          type="file"
                          className="file"
                        />
                      </div>
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

        <ModalUpload store_code={store_code} />
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
    updateQuestion: (
      id,
      data,
      store_code,
      _this,
      resetModal,
      courseId,
      quizId
    ) => {
      dispatch(
        trainAction.updateQuestion(
          id,
          data,
          store_code,
          _this,
          resetModal,
          courseId,
          quizId
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
