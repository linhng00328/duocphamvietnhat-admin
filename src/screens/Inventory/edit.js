import React, { Component } from 'react'
import { connect } from 'react-redux';
import Sidebar from '../../components/Partials/Sidebar';
import Topbar from '../../components/Partials/Topbar';
import { shallowEqual } from '../../ultis/shallowEqual';
import * as Types from "../../constants/ActionType";
import Alert from '../../components/Partials/Alert';
import Pagination from '../../components/ProductAgency/Pagination';
import * as productAction from "../../actions/product";
import CardProduct from '../../components/Inventory/CardProduct';
import ListInventorySheet from '../../components/Inventory/ListInventory'
import ModalDetail from '../../components/Inventory/ModalDetail';
import * as inventoryAction from "../../actions/inventory"
import history from '../../history';
import Paginations from '../../components/Inventory/Paginations';

class EditInventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listInventory: [],
            reality_exist_total: 0,
            existing_branch:0,
            deviant_total:0,
            note:"",
            change:false,
            infoProduct: {
                inventoryProduct: "",
                idProduct: "",
                nameProduct: "",
                imageProduct: "",
                priceProduct: "",
                distributeProduct: "",
                minPriceProduct: "",
                maxPriceProduct: "",
                discountProduct: "",
                quantityProduct: "",
                quantityProductWithDistribute: ""
            },
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        var exist_branch = 0
        var reality_total = 0
        if(nextState.change !== this.state.change){
            nextState.listInventory.forEach((item) =>{
                exist_branch = exist_branch + item.stock
                reality_total = parseInt(reality_total) + parseInt(item.reality_exist)
            })
            this.setState({existing_branch:exist_branch,deviant_total:nextState.reality_exist_total - exist_branch,reality_exist_total : reality_total})
        }
        if(!shallowEqual(nextState.listInventory,this.state.listInventory) || !shallowEqual(nextState.reality_exist_total,this.state.reality_exist_total)){
            nextState.listInventory.forEach((item) =>{
                exist_branch = exist_branch + item.stock
                reality_total = parseInt(reality_total) + parseInt(item.reality_exist)
            })
            this.setState({existing_branch:exist_branch,deviant_total:nextState.reality_exist_total - exist_branch,reality_exist_total : reality_total})
        }
        
        return true
    }
    componentWillReceiveProps(nextProps) {
        if(!shallowEqual(nextProps.itemInventory,this.props.itemInventory)){
            const newInventory = this.state.listInventory
            nextProps.itemInventory.tally_sheet_items.forEach(item =>{
                newInventory.push({
                    element_id:item.id,
                    nameDistribute:item.distribute_name,
                    nameElement:item.element_distribute_name,
                    nameProduct:item.product.name,
                    nameSubDistribute:item.sub_element_distribute_name,
                    product_id:item.product.id,
                    reality_exist:item.reality_exist,
                    stock:item.existing_branch})
            })
            this.setState({
                listInventory:newInventory,note:nextProps.itemInventory.note
                })  
        }
      }

    handleCallbackProduct = (modal) => {
        this.setState(
            {
                infoProduct: modal
            })
    }
    handleCallbackPushProduct = (modal) => {
        const index_element = this.state.listInventory.map(e => e.element_id).indexOf(modal.element_id)
        if(index_element <0){
            this.setState({ listInventory: [...this.state.listInventory, modal] })
        }
    }
    handleCallbackQuantity = (modal) =>{
        var reality_total = 0
        const newInventory = this.state.listInventory
        const index = newInventory.map(e => e.element_id).indexOf(modal.idElement)
        newInventory[index].reality_exist = modal.currentQuantity
        newInventory.forEach((item) =>{
            reality_total = parseInt(reality_total) + parseInt(item.reality_exist)
        })
        console.log("reality_total",modal.currentQuantity)
        this.setState({
            listInventory:newInventory,
            reality_exist_total:reality_total,
            })           
    }

    handleDelete = (modal) =>{ 
        this.setState({change:!this.state.change})
        const newInventory = this.state.listInventory
        const index = this.state.listInventory.map(e => e.element_id).indexOf(modal.idElement)
        newInventory.splice(index, 1)
        this.setState({listInventory:newInventory})
    }


    EditSheetInventory = () => {
        const {store_code,id} = this.props.match.params
        const branch_id = localStorage.getItem('branch_id')
        const formData = {
            note: this.state.note,
            tally_sheet_items:
                this.state.listInventory.map((item) => {
                    return {
                        product_id: item.product_id,
                        reality_exist: item.reality_exist,
                        distribute_name: item.nameDistribute,
                        element_distribute_name: item.nameElement,
                        sub_element_distribute_name: item.nameSubDistribute
                    }
                })
        }
        this.props.editInventorys(store_code,branch_id,id,formData)
        history.goBack()
    }
    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    onChange = (e) =>{
        this.setState({note:e.target.value})
    }
    handleOnChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        this.setState({ [name]: value })
    }

    searchData = (e) => {
        e.preventDefault()
        var { store_code } = this.props.match.params;
        var { searchValue } = this.state;
        var params = `&search=${searchValue}`;
        this.setState({ numPage: 20 })
        const branch_id = localStorage.getItem('branch_id')
        this.props.fetchAllProductV2(store_code, branch_id, 1, params);
    };
    passNumPage = (page) => {
        this.setState({ page: page })
    }
    handleCallbackPrice = (modal) => {
        this.setState({ change: !this.state.change })
        const newInventory = this.state.listInventory
        const index = newInventory.map(e => e.element_id).indexOf(modal.idElement)
        newInventory[index].import_price = modal.import_price
        this.setState({ listImportStock: newInventory })
    }

    componentDidMount() {
        const branch_id = localStorage.getItem('branch_id')
        const {store_code,id} = this.props.match.params
        const params = `&check_inventory=true`

        this.props.fetchAllProductV2(store_code, branch_id ,1, params);
        this.props.fetchDetailInventory(store_code, branch_id,id)
    }

    render() {
        var { products } = this.props;
        var { store_code } = this.props.match.params
        var { searchValue, numPage, listInventory,existing_branch,reality_exist_total } = this.state
        const bonusParam = "&check_inventory=true"

        return (
            <div id="wrapper">
                <Sidebar store_code={store_code} />
                <div className='col-10 col-10-wrapper'>
                    <div id="content-wrapper" className='d-flex flex-column'>
                        <div id='content'>
                            <Topbar store_code={store_code} />
                            <h4 className="h4 title_content mb-10 text-gray-800 " style={{paddingLeft:"30px"}}>
                                        Sửa phiếu kiểm hàng
                            </h4>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col-lg-4 col-xl-4 col-md-12 col-sm-12'>
                                        <div className='card shadow mb-4' style={{ height: "100%" }}>
                                            <div className='card-header py-3' style={{ padding: "0" }}>
                                                Phiếu kiểm hàng
                                            </div>

                                            <div className='card-bodys' style={{ width: "0 10px", height: "380px", overflowY: "auto" }}>
                                                <ListInventorySheet  store_code={store_code} listInventory={listInventory} handleCallbackQuantity={this.handleCallbackQuantity} handleCallbackPrice = {this.handleCallbackPrice} handleDelete = {this.handleDelete} />
                                            </div>
                                            <div className='voucher-input' style={{ margin: "10px 0px" }}>

                                            </div>
                                            <div class="card">
                                                <div class="card-body" style={{ padding: "0" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>SL tồn thực tế:</div>
                                                        <div>{reality_exist_total}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>SL tồn chi nhánh:</div>
                                                        <div>{existing_branch}</div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>SL chênh lệch:</div>
                                                        <div>{this.state.deviant_total}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="comment">Thêm ghi chú:</label>
                                                <textarea class="form-control" rows="5" id="comment" style={{height:"50px"}} value ={this.state.note} onChange={this.onChange}></textarea>
                                            </div>
                                            <button className='btn btn-warning' style={{ marginTop: "20px" }} onClick={() => this.EditSheetInventory()}>Lưu</button>
                                        </div>
                                    </div>

                                    <div className='col-lg-8 col-xl-8 col-md-12 col-sm-12'>
                                        <div className='card shadow mb-4' style={{ height: "100%" }}>
                                            <div className='card-header py-3' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <form onSubmit={this.searchData}>
                                                    <div
                                                        class="input-group mb-6"
                                                        style={{ marginTop: "10px" }}
                                                    >
                                                        <input
                                                            style={{ maxWidth: "400px" }}
                                                            type="search"
                                                            name="txtSearch"
                                                            value={searchValue}
                                                            onChange={this.onChangeSearch}
                                                            class="form-control"
                                                            placeholder="Tìm kiếm sản phẩm"
                                                        />
                                                        <div class="input-group-append">
                                                            <button
                                                                class="btn btn-warning"
                                                                type="submit"

                                                            >
                                                                <i class="fa fa-search"></i>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </form>
                                                <div className='wrap-pagination'>
                                                    <Paginations limit={numPage} bonusParam ={bonusParam}
                                                        passNumPage={this.passNumPage} store_code={store_code} products={products} />
                                                </div>
                                                <ModalDetail modal={this.state.infoProduct} handleCallbackPushProduct={this.handleCallbackPushProduct} />
                                            </div>
                                            <div className='card-body'>
                                                <CardProduct store_code={store_code} handleCallbackProduct={this.handleCallbackProduct} />
                                            </div>

                                            {/* <Pagination limit={numPage}
                                                    searchValue={searchValue}
                                                    passNumPage={this.passNumPage} store_code={store_code} products={products} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.productReducers.product.allProduct,
        sheetsInventory: state.inventoryReducers.inventory_reducer.sheetsInventory,
        itemInventory: state.inventoryReducers.inventory_reducer.itemInventory,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProductV2: (store_code, branch_id, page, params) => {
            dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));
        
        },
        editInventorys:(store_code,branch_id,id,data) =>{
            dispatch(inventoryAction.editInventorys(store_code,branch_id,id,data))
        },
        fetchDetailInventory: (store_code, branch_id, id) => {
            dispatch(inventoryAction.fetchDetailInventory(store_code, branch_id, id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditInventory);