import React, { Component } from "react";
import ModalUploadStore from "./StoreImage/ModalUpload";
import ModalUploadListP from "./StoreImage/ModalUploadList";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { connect } from "react-redux";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import * as Env from "../../../ultis/default";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
class StoreImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_product: "",
      listImgProduct: [],
      // percent: 0,
      // showBar: false,
      oldIndex: "",
      newIndex: "",
      ImgProduct: { index: 0 },
    };
  }
  getIdImg = (e, image) => {
    this.setState({ ImgProduct: image });
  };
  removeImgProduct = () => {
    this.setState({ avatar_product: "" });
  };
  removeListFromImg = (image) => {
    var listImgProduct = [...this.state.listImgProduct];
    console.log(image, listImgProduct);
    listImgProduct.forEach((img, index) => {
      if (img.index === image) {
        listImgProduct.splice(index, 1);
      }
    });
    this.setState({ listImgProduct: listImgProduct });
  };
  showListImg = (images) => {
    console.log(images);
    var result = null;
    if (images.length > 0) {
    return (
      // <SortableList
      //   onSortEnd={this.onSortEnd}
      //   className="list row sort-table-list-style"
      //   draggedItemClassName="dragged"
      // >
      <div class="list row">
        {images.map((data, index) => {
          console.log(data, images);
          var img = data.data;
          var status_img =
            img == "" || img == null || typeof img == "undefined"
              ? "hide"
              : "show";
          var status_btn =
            img == "" || img == null || typeof img == "undefined"
              ? "hide"
              : "show";
          console.log(img, data);
          return (
            // <SortableItem key={data}>
            <div
              style={{ cursor: "grab", marginBottom: "10px" }}
              className="item col-sm-4 col-md-4 col-lg-4 space-bottom"
            >
              <div className={`box ${status_img}`}>
                <div
                  className={`box-icon`}
                  style={{ width: "100%" }}
                  onClick={(e) => this.removeListFromImg(index)}
                >
                  <i class="fas cursor fa-times-circle"></i>
                </div>
                <img
                  draggable
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                  src={img ? img : Env.IMG_NOT_FOUND}
                  class="img-responsive"
                />
                <span
                  className={`label-group-img ${index == 0 ? "show" : "hide"}`}
                >
                  Ảnh đại diện
                </span>
              </div>
            </div>
            // {/* </SortableItem> */}
          );
        })}
      </div>
      // {/* </SortableList> */}
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.product_img != this.props.product_img) {
      this.setState((prevState, props) => {
        this.setState({ avatar_product: nextProps.product_img });
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.listImgProduct, this.props.listImgProduct)) {
      var imgs = [...nextState.listImgProduct];
      if (
        nextProps.listImgProduct != null &&
        typeof nextProps.listImgProduct != "undefined" &&
        nextProps.listImgProduct.length > 0
      ) {
        // if (nextState.showBar == true) {
        //   this.runProgressBar()

        // }
        nextProps.listImgProduct.forEach((img) => {
          imgs.push(img);
        });
      }
      this.setState({ listImgProduct: imgs });
    }
    if (
      !shallowEqual(nextState.listImgProduct, this.state.listImgProduct) ||
      // || nextState.showBar != this.state.showBar
      nextState.oldIndex != this.state.oldIndex ||
      nextState.newIndex != this.state.newIndex
    ) {
      this.props.handleDataFromProductImg(
        nextState.listImgProduct.map((e) => e.data)
      );
    }

    return true;
  }
  // showImg = (img) => {
  //   var image = img == "" || img == null ? Env.IMG_NOT_FOUND : img;
  //   var status = img == "" || img == null ? "hide" : "";
  //   return (
  //     <div className="box">
  //       <div className={`box-icon ${status}`} onClick={this.removeImgProduct}>
  //         <i class="fas cursor fa-times-circle"></i>
  //       </div>
  //       <img
  //         src={image}
  //         width="128"
  //         height="128"
  //         class="img-responsive"
  //         alt="Image"
  //       />
  //     </div>
  //   );
  // };
  // onSortEnd = (oldIndex, newIndex) => {
  //   this.setState({
  //     listImgProduct: arrayMove(this.state.listImgProduct, oldIndex, newIndex),
  //     oldIndex,
  //     newIndex,
  //   });
  // };
  render() {
    var { avatar_product, listImgProduct, showBar, percent } = this.state;
    console.log(this.props.listImgProduct);

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div class="row">
          <div>
            <label style={{ fontSize: "20px" }} for="product_name">
              Ảnh  sản phẩm : <i style={{ fontSize: "14px" }}></i>
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
        
        {this.showListImg(this.state.listImgProduct)}
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <button
            style={{
              marginTop: "20px",
              background: "rgb(229, 111, 37)",
            }}
            data-toggle="modal"
            data-target="#uploadModalListP"
            class={`btn btn-primary btn-sm`}
            // onClick={(e) => {
            //   this.getIdImg(e, { index });
            // }}
          >
            <i class="fa fa-plus"></i> Upload ảnh
          </button>
        </div>

        <ModalUploadListP
          listImgProduct={listImgProduct}
          imgs={this.props.listImgProduct}
          ImgProduct={this.state.ImgProduct}
        />
        {/* <ModalUploadListP listImgProduct={listImgProduct} startProgressBar={this.startProgressBar} imgs={this.props.listImgProduct} /> */}
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
