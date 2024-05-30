import React, { Component } from "react";
import ModalUploadStore from "./StoreImage/ModalUpload";
import ModalUploadListP from "./StoreImage/ModalUploadList";
import { shallowEqual } from "../../../ultis/shallowEqual";
import getChannel , {IKITECH , IKIPOS} from "../../../ultis/channel";

import { connect } from "react-redux";
import Alert from "../../Partials/Alert";
import * as Types from "../../../constants/ActionType";
import * as Env from "../../../ultis/default"
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
class StoreImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_product: "",
      listImgProduct: [],
      percent: 0,
      showBar: false,
      oldIndex : "",
      newIndex : "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var { product } = nextProps;

      var images = [...this.state.listImgProduct];
      if (product.images.length > 0) {
        product.images.forEach(image => {
          images.push(image.image_url)
        });
      }
      this.setState({ listImgProduct: images });
    }
  }


  startProgressBar = () => {
    this.setState({
      showBar: true,
      percent: 40
    })

  }


  runProgressBar = () => {
    console.log("runnnnnnnnnnn")
    if (this.state.percent < 100) {
      setTimeout(() => {
        var percent = this.state.percent + 20
        this.setState({ percent: percent });
        this.runProgressBar()
      }, 200);
    }
    else {
      this.setState({ showBar: false, percent: 0 })

    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.product_img != this.props.product_img) {

      this.setState({ avatar_product: nextProps.product_img });

    }
    if (!shallowEqual(nextProps.listImgProduct, this.props.listImgProduct)) {
      var imgs = [...nextState.listImgProduct]
      if (nextProps.listImgProduct != null && typeof nextProps.listImgProduct != "undefined" && nextProps.listImgProduct.length > 0) {
        if (nextState.showBar == true) {
          this.runProgressBar()

        }
        nextProps.listImgProduct.forEach(img => {
          console.log(img)
          imgs.push(img)
        });
      }
      this.setState({ listImgProduct: imgs });
    }
    if (
      
      !shallowEqual(nextState.listImgProduct, this.state.listImgProduct) 
      || nextState.showBar != this.state.showBar 
      || nextState.oldIndex != this.state.oldIndex 
      || nextState.newIndex != this.state.newIndex

    ) {
      this.props.handleDataFromProductImg(nextState);
    }



    return true;
  }

  removeImgProduct = () => {
    this.setState({ avatar_product: "" });
  };
  removeListFromImg = (image) => {
    var listImgProduct = [...this.state.listImgProduct];
    listImgProduct.forEach((img, index) => {
      if (img === image) {
        listImgProduct.splice(index, 1);
      }
    });
    this.setState({ listImgProduct: listImgProduct });
  };
  preventDragHandler = (e) => {
    e.preventDefault();
  }
  showListImg = (images) => {
    var result = null;
    if (images.length > 0) {
      return (
        <SortableList
          onSortEnd={this.onSortEnd}
          className="list row sort-table-list-style"
          draggedItemClassName="dragged"
        >
          {images.map((data, index) => (

<SortableItem key={data}>
              <div style={{ cursor: "grab", marginBottom: "10px" }} className="item col-sm-4 col-md-4 col-lg-4 space-bottom">
                <div className="box">
                  <div
                    style={{ width: "100%" }}

                    className={`box-icon`}
                    onClick={(e) => this.removeListFromImg(data)}
                  >
                    <i class="fas cursor fa-times-circle"></i>
                  </div>
                  <img
                    draggable
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover"
                    }}
                    src={data}

                    class="img-responsive"
                  />
                  <span className = {`label-group-img ${index == 0 ? "show" : "hide"}`}>
                    Ảnh đại diện
                  </span>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableList>

      );
    } else {
      result = (
        <div class=" col-sm-4 col-md-3 col-lg-3 space-bottom">
          <div className="box">
            <img
              src={Env.IMG_NOT_FOUND}
              width="128"
              height="128"
              class="img-responsive"
              alt="Image"
            />
          </div>
        </div>
      );
    }
    return result;
  };

  showImg = (img) => {
    var image = img == "" || img == null ? Env.IMG_NOT_FOUND : img;
    var status = img == "" || img == null ? "hide" : "";
    return (
      <div className="box">
        <div className={`box-icon ${status}`} onClick={this.removeImgProduct}>
          <i class="fas cursor fa-times-circle"></i>
        </div>
        <img
          src={image}
          width="128"
          height="128"
          class="img-responsive"
          alt="Image"
        />
      </div>
    );
  };
  onSortEnd = (oldIndex, newIndex) => {
    console.log(oldIndex , newIndex)
    this.setState({
      listImgProduct: arrayMove(this.state.listImgProduct, oldIndex, newIndex),
      oldIndex,
      newIndex
    })


  };
  render() {
    var { listImgProduct, showBar, percent, items } = this.state;

    return (
      <div class="container-fluid">

        <Alert
          type={Types.ALERT_UID_STATUS}
          alert={this.props.alert}
        />
        <div class="row">

          <div >
            <label style={{ fontSize: "20px" }} for="product_name">
            Ảnh sản phẩm {getChannel() == IKITECH && <span style = {{fontSize : "13px"}}> (Tối đa 13 ảnh) </span>}
            </label>

          </div>
          <div class={`w3-light-grey ${showBar == true ? "show" : "hide"}`} style={{
            height: "20px",
            width: "100%",
            border: "1px solid"
          }}>
            <div class="w3-blue" style={{
              width: percent + "%",
              color: "white",
              textAlign: "center",
              background: "green"
            }}>{percent + "%"}</div>
          </div>
        </div>
        {this.showListImg(listImgProduct)}

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <button
            style={{ marginTop: "20px" }}
            data-toggle="modal"
            data-target="#uploadModalListP"
            class="btn btn-primary btn-sm"
          >
            <i class="fa fa-plus"></i> Upload ảnh
          </button>
        </div>
        <ModalUploadListP listImgProduct={listImgProduct} startProgressBar={this.startProgressBar} imgs={this.props.listImgProduct} />
        <ModalUploadStore />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product_img: state.UploadReducers.productImg.product_img,
    listImgProduct: state.UploadReducers.productImg.listImgProduct,

    alert: state.UploadReducers.alert.alert_productStore,
  };
};

export default connect(mapStateToProps, null)(StoreImage);
