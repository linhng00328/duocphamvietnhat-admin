import React, { Component } from 'react'
import { connect } from 'react-redux';

import themeData from '../../../ultis/theme_data';
class ModalDefaultReset extends Component {
    constructor(props) {
        super(props)
        this.setState = {

        }
    }

    onSave = (e) => {
        e.preventDefault();
        window.$('.modal').modal('hide');
        this.props.resetTheme(this.props.theme);
    };

    render() {
        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="modalDefaultReset"
                data-keyboard="false"
                data-backdrop="static"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style={{ background: themeData().modalNoti }}>
                            <h5 class="modal-title">Thông báo</h5>

                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={this.onSave}
                            role="form"
                            action="#"
                            method="post"
                            id="removeForm"
                        >
                            <div class="modal-body">
                                <input type="hidden" name="remove_id_store" />
                                <div class="alert-remove"></div>
                                Bạn muốn khôi phục giao diện này về ban đầu?
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button type="submit" class="btn btn-yes-pos">
                                    Đồng ý

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ModalDefaultReset)