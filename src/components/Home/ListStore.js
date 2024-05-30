import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { setBranchId  , setStoreCode} from '../../ultis/branchUtils'
import * as Env from "../../ultis/default"
import { setStoreId } from '../../ultis/store'
class ListStore extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    passDataModal = (event, store_code, name) => {
        this.props.handleDelCallBack({ table: "Cửa hàng", id: store_code, name:name });
        event.preventDefault();
    }
    handleSetbranch = (store_id , store_code) => {
        setStoreId(store_id)
        setBranchId("");
        setStoreCode(store_code)
    }

    render() {
        var listStore = this.props.data
        if(listStore != null && listStore.data != null) {
            listStore =  listStore?.data
        } else {
            listStore = listStore
        }

        if(listStore.length == 0) {
          return  <div>Hãy thêm cửa hàng và bắt đầu kinh doanh!</div>
        }

        return (
            <div className='list-group'>
                {(listStore??[]).map((item, index) => {
                    const logo_url = item.logo_url == null ? Env.IMG_NOT_FOUND : item.logo_url
                    return (
                        <div class="card list-group-item list-group-item-action list-group-item-light" 
                        style={{ border: "1px solid #8e8a8a", margin: "10px 0" }} 
                        onClick={()=>this.handleSetbranch(item.id , item.store_code)}>
                            <a href={`/`}>
                                <div class="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px" }}>
                                    <div className='wrap-list' style={{ display: "flex", alignItems: "center" }}>
                                        <div className='img-list'>



                                            <img src={`${logo_url}`} width="80px" height="80px" class="img-responsive" alt="Image" />
                                        </div>
                                        <div style={{ marginLeft: "20px" }}>
                                            <div className='name-store' style={{ fontWeight: "bold" }}>{item.name}</div>
                                            <div className='address-store' style={{ color: "gray" }}>{item.store_code + ".myiki.vn"}</div>
                                        </div>
                                    </div>
                                    <div className='wrap-btn'>
                                        <Link
                                            to={`/store/edit/${item.store_code}`}
                                            class="btn btn-warning btn-sm"
                                        >
                                            <i class="fa fa-edit"></i> Sửa
                                        </Link>
                                        <button
                                            onClick={(e) => this.passDataModal(e, item.store_code, item.name)}
                                            style={{ marginLeft: "10px" }}
                                            data-toggle="modal"
                                            data-target="#removeModal"
                                            class="btn btn-danger btn-sm"
                                        >
                                            <i class="fa fa-trash"></i> Xóa
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}

            </div>
        )
    }
}
export default ListStore
