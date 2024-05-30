import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as dashboardAction from "../../actions/dashboard";

class ModalSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPersion: ""
        }
    }
    handleOnclicks = (namePertion, phone, id) => {
        this.props.handleCallbackSupplier({ name: namePertion, phone_number: phone, id_supplier: id })
    }
    onChangeSearchPersion = (e) => {
        this.setState({ searchPersion: e.target.value })
    }
    handleSearchPersion = (e) => {
        e.preventDefault()
        var { store_code } = this.props
        var { searchPersion } = this.state
        var params = `search=${searchPersion}`
        this.props.fetchAllSupplier(store_code,1,params);
    };
    render() {
        var { supplier } = this.props

        return (
            <div>
                <div class="modal" id="supplier">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Danh sách nhà cung cấp</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="input-group mb-6" style={{ marginTop: "10px", paddingLeft: "20px" }}>
                                <form onSubmit={this.handleSearchPersion}>
                                    <div
                                        class="input-group mb-6"
                                        style={{ marginTop: "10px" }}
                                    >
                                        <input

                                            type="search"
                                            name="txtSearch"
                                            value={this.state.searchPersion}
                                            onChange={this.onChangeSearchPersion}
                                            class="form-control"
                                            placeholder="Nhập tên nhà cung cấp"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="btn btn-primary"
                                                type="submit"

                                            >
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div class="modal-body">
                                <div class="table-responsive">
                                    <table class="table  " id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên</th>
                                                <th>SĐT</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {(supplier.data ?? []).map((item, index) => (
                                                <tr>
                                                    <td className='index'>{index+1}</td>
                                                    <td  className='name-pertion'>{item.name}</td>
                                                    <td className='phone-pertion'>{item.phone}</td>
                                                    <td style={{textAlign:"center"}}>
                                                    <button class="btn btn-info" onClick={() => this.handleOnclicks(item.name, item.phone, item.id)} data-dismiss="modal" >Chọn</button>
                                                    </td>
                                                </tr>
                                            )
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllSupplier: (store_code,page,params) => {
            dispatch(dashboardAction.fetchAllSupplier(store_code,page,params))
        }
    }
}
export default connect(null, mapDispatchToProps)(ModalSupplier);