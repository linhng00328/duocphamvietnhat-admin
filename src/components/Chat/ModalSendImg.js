import React, { Component } from "react";
import * as helper from "../../ultis/helpers"
import { connect } from "react-redux";
import * as billAction from "../../actions/bill"

class ModalSendImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: "",
            files: [],
            files_copy: [],
        };
    }


    onSave = (e) => {

        e.preventDefault();
        window.$('.modal').modal('hide');
        const fd = new FormData()

        if (this.state.files.length > 0) {
            window.$('#file-chat').fileinput('clear');
            this.setState({
                files: [],
                files_copy: [],
            })

            var { customerId, store_code } = this.props
            this.props.uploadImgChat(store_code, customerId, this.state.files)

        }


    }

    componentDidMount() {
        var _this = this

        window.$('#file-chat').on('fileloaded', function (event, file, previewId, fileId, index, reader) {
            var files = [..._this.state.files]
            var files_copy = [..._this.state.files_copy]
            files.push(file)
            files_copy.push(previewId)
            _this.setState({ files, files_copy })
        });

        window.$('#file-chat').on('fileremoved', function (event, id, index) {
            var { files, files_copy } = _this.state
            var _files_copy = [...files_copy]
            if (files_copy.length > 0) {
                files_copy.forEach((item, _index) => {
                    if (item == id) {
                        files.splice(_index, 1);
                        _files_copy.splice(_index, 1);
                        _this.setState({ files: files, files_copy: _files_copy })
                        return;
                    }
                });
            }
        });
        helper.loadFileInput("file-chat");
    }

    showDialog = () => {
        window.$('#file-chat').trigger('click');
    }
    render() {
        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="modalSendingImg"
                data-keyboard="false"
                data-backdrop="static"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Upload ảnh</h4>

                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                            >
                                &times;
                            </button>
                        </div>
                        <form
                            onSubmit={this.onSave}
                            role="form"
                            action="#"
                            method="post"
                            id="removeForm"
                        >
                            <div className="modal-body">
                                <form enctype="multipart/form-data">
                                    <div className="form-group ">
                                        <div className="file-loading">
                                            <input
                                                multiple
                                                id="file-chat"
                                                type="file"
                                                className="file"
                                                data-overwrite-initial="false"
                                                data-min-file-count="1"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button type="submit" class="btn btn-warning">
                                    {/* <i class="fa fa-upload"></i> */}

                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        uploadImgChat: (store_code, customerId, file) => {
            dispatch(billAction.uploadImgChat(store_code, customerId, file));
        },
    };
};
export default connect(null, mapDispatchToProps)(ModalSendImg);
