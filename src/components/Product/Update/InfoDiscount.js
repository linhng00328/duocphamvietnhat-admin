import React, { Component } from "react";
import { product } from "../../../reducers/product/product";
import { shallowEqual } from "../../../ultis/shallowEqual";
import ModalCreate from "./InfoDiscount/ModalCreate";
import ModalEdit from "./InfoDiscount/ModalEdit";

class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_promotion: [],
      openModal : false,
      item : {},
      index : null
    };

  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.product, this.props.product)) {
      this.setState({ list_promotion: nextProps.product.list_promotion })
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(this.state.list_promotion, nextState.list_promotion) || !shallowEqual(this.state.item, nextState.item) || !shallowEqual(nextProps.product, this.props.product) ) {
      console.log("vaooooo")
      this.props.handleDataFromDiscount(nextState.list_promotion)
    }
    return true
  }
  passItem = (data,index) =>
  {
    this.setState({item : data , index : index})
  }
  showData = (list_promotion) => {
    var { store_code } = this.props
    var result = null;
    if(typeof list_promotion == "undefined" || list_promotion == null)
    return result
    if (list_promotion.length > 0) {

      result = list_promotion.map((data, index) => {

        return (
          <tr>
            <td>{index + 1}</td>
            <td>
              {data.content}

            </td>



            <td>{data.post_name}</td>


            <td>
              <a
              
              data-toggle="modal"
              data-target="#editPromotion"
              onClick = {()=>this.passItem({content : data.content , post_id : data.post_id , post_name : data.post_name} , index)}
                class={`btn btn-warning btn-sm `}
              >
                <i class="fa fa-edit"></i> Sửa
              </a>
              <button
                style={{ marginLeft: "10px" }}
                onClick = {() => this.removeItem(index)}
                class={`btn btn-warning btn-sm`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  createPromiton = (data) =>{
    var list_promotion = [...this.state.list_promotion]
    list_promotion.push(data)
    this.setState({list_promotion : list_promotion})
  }
  editPromiton = (data,_index) =>{
    var list_promotion = [...this.state.list_promotion]
    list_promotion.forEach((element,index) => {
      if(index == _index )
      {
        list_promotion[index] = data
      }
    });
    this.setState({list_promotion : list_promotion})

  }
  removeItem = (_index) =>{
    var list_promotion = [...this.state.list_promotion]
    list_promotion.forEach((element,index) => {
      if(index == _index )
      {
        list_promotion.splice(index, 1);
      }
    });
    this.setState({list_promotion : list_promotion})

  }
  render() {
    var { list_promotion  , openModal , item , index} = this.state
    var {blogs} = this.props
    return (
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {blogs.length > 0 ? <ModalCreate createPromiton = {this.createPromiton} blogs = {blogs}/>  : <ModalCreate createPromiton = {this.createPromiton} blogs = {[]}/>}
        <ModalEdit editPromiton = {this.editPromiton} item = {item} index = {index} blogs = {blogs}/> 
        <a
          onClick = {this.openModal}
         data-toggle="modal"
         data-target="#addPromotion"
          style={{ float: "right", margin: "5px", color: "white" }}
          class={`btn btn-success btn-sm `}
        >
          <i class="fa fa-plus"></i> Thêm
        </a>
        <div class="table-responsive">
          <table class="table table-border  " width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>STT</th>
                <th>Nội dung</th>

                <th>Bài viết</th>


                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>{this.showData(list_promotion)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ContentDetail;
