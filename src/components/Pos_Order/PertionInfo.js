import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as OrderAction from '../../actions/add_order';

class PertionInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPersion: ""
        }
    }
    handleOnclicks = (namePertion, phone, id,debt_customer,id_customer) => {
        var { store_code } = this.props
        this.props.handleCallbackPertion({ name: namePertion, phone_number: phone,debt: debt_customer,id:id_customer })
        this.props.findAddress(store_code, id)
    }
    onChangeSearchPersion = (e) => {
        this.setState({ searchPersion: e.target.value })
    }
    handleSearchPersion = (e) => {
        e.preventDefault()
        var { store_code } = this.props
        var { searchPersion } = this.state
        var params = `search=${searchPersion}`
        this.props.fetchSearchPersion(store_code, params);
    };
    render() {
        var { listPertion } = this.props

        return (
            <div>
                <div class="modal" id="modalPertion">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Danh sách khách hàng</p>
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
                                            placeholder="Tìm khách hàng"
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
                                            {(listPertion.data ?? []).map((item, index) => (
                                                <tr>
                                                    <td className='index'>{index+1}</td>
                                                    <td  className='name-pertion'>{item.name}</td>
                                                    <td className='phone-pertion'>{item.phone_number}</td>
                                                    <td style={{textAlign:"center"}}>
                                                    <button class="btn btn-info" onClick={() => this.handleOnclicks(item.name, item.phone_number, item.id,item.debt,item.id)} data-dismiss="modal">Chọn</button>
                                                    </td>
                                                </tr>
                                            )
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Thoát
                                </button>
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
        fetchSearchPersion: (store_code, params) => {
            dispatch(OrderAction.fetchSearchPersion(store_code, params))
        },
        findAddress: (store_code, id) => {
            dispatch(OrderAction.findAddress(store_code, id))
        }
    }
}
export default connect(null, mapDispatchToProps)(PertionInfo);