import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as dashboardAction from "../../actions/dashboard";
import themeData from '../../ultis/theme_data';
class ModalChangeBranch extends Component {
    constructor(props) {
        super(props)
        this.setState = {

        }
    }

    onSave = (e) => {
        e.preventDefault();
        window.$('.modal').modal('hide');
        var id = this.props.branch_id;
        
        this.props.changeBranch(id);
    };

    render() {
        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="modalChangeBranch"
                data-keyboard="false"
                data-backdrop="static"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style={{ background: themeData().backgroundColor }}>
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
                                Bạn muốn chuyển đơn này sang: <b>{this.props.nameBranch}</b>
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
const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteBranchStore: (store_code, id) => {
            dispatch(dashboardAction.deleteBranchStore(store_code, id))
        }
    };
};
export default connect(null, mapDispatchToProps)(ModalChangeBranch)