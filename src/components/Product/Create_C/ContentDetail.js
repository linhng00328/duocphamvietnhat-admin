import React, { Component } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import getChannel, { IKITECH } from "../../../ultis/channel";
import { handleImageUploadBefore } from "../../../ultis/sun_editor";
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
import imageGallery from "./../../imageGallery";
import { getApiImageStore } from "../../../constants/Config";
import * as userLocalApi from "../../../data/local/user";
class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      isLoaded: true,
      txtContentC: "",
    };
  }

  onChange = (e) => {
    this.setState({ txtContentC: e.target.value });
  };
  handleEditorChange = (editorState) => {
    this.setState({
      txtContent: editorState.srcElement.innerHTML,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.txtContent !== this.state.txtContent ||
      nextState.txtContentC !== this.state.txtContentC
    ) {
      this.props.handleDataFromContent({
        txtContent: nextState.txtContent,
        txtContentC: nextState.txtContentC,
      });
    }
    if (
      nextProps.product.description !== this.props.product.description ||
      nextProps.product.content_for_collaborator !==
        this.props.product.content_for_collaborator ||
      nextState.isLoaded == true
    ) {
      this.setState({
        txtContent: nextProps.product.description,
        txtContentC: nextProps.product.content_for_collaborator ?? " ",
        isLoaded: false,
      });
    }
    return true;
  }

  render() {
    var { txtContent, txtContentC } = this.state;
    console.log(this.state);
    return (
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="form-group">
          <label for="product_name">&nbsp;&nbsp;Mô tả sản phẩm</label>
          <SunEditor
            onImageUploadBefore={handleImageUploadBefore}
            setContents={txtContent}
            showToolbar={true}
            onChange={this.handleEditorChange}
            setDefaultStyle="height: auto"
            setOptions={{
              requestHeaders: {
                "X-Sample": "sample",
                token: userLocalApi.getToken(),
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
                audio,
              ],

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
                  // "outdent",
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
                  // "codeView",
                  "removeFormat",
                ],
              ],
            }}
            onSave={(e, g) => {
              console.log("e", e);
              console.log("g", g);
              this.setState({
                txtContent: e,
              });
            }}
            onInput={this.handleEditorChange}
            onPaste={this.handleEditorChange}
            onFocus={(e) => {
              this.setState({
                txtContent: e.target.innerHTML,
              });
            }}
          />
        </div>

        {getChannel() == IKITECH && (
          <div class="form-group">
            <label for="product_name">Nội dung cho cộng tác viên</label>

            <textarea
              value={txtContentC}
              onChange={this.onChange}
              name="txtContentC"
              id="input"
              class="form-control"
              rows="7"
              required="required"
            ></textarea>
          </div>
        )}
      </div>
    );
  }
}

export default ContentDetail;
