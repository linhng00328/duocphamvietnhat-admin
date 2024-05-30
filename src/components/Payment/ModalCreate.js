import React, { Component } from "react";
import * as CategoryPAction from "../../actions/category_product";
import { connect, shallowEqual } from "react-redux";
import * as helper from "../../ultis/helpers";
import styled from "styled-components";
import themeData from "../../ultis/theme_data";
import * as productAction from "../../actions/product";

const DivImageStyles = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 0;
  }
  .gift__background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: pointer;
    label {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_name: "",
      account_number: "",
      bank: "",
      branch: "",
      qr_code_image_url: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { listImgProductV2 } = this.props;
    if (!shallowEqual(listImgProductV2, nextProps.listImgProductV2)) {
      this.setState({ qr_code_image_url: nextProps.listImgProductV2[0] });
    }
    return true;
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleUploadImage = (e) => {
    const file = e.target.files[0];
    const { uploadListImgProductV2 } = this.props;
    if (file) {
      const updatedList = [file];
      uploadListImgProductV2(updatedList);
    }
  };

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");

    var payment = this.state;
    this.props.addPayment({
      account_name: payment.account_name,
      account_number: payment.account_number,
      bank: payment.bank,
      branch: payment.branch,
      qr_code_image_url: payment.qr_code_image_url,
    });

    this.setState({
      account_name: "",
      account_number: "",
      bank: "",
      branch: "",
      qr_code_image_url: "",
    });
  };
  render() {
    var { account_name, account_number, bank, branch, qr_code_image_url } =
      this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm tài khoản</h4>

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
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Tên chủ tài khoản</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập tên chủ tài khoản"
                    autoComplete="off"
                    value={account_name}
                    onChange={this.onChange}
                    name="account_name"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Số tài khoản</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập số tài khoản"
                    autoComplete="off"
                    value={account_number}
                    onChange={this.onChange}
                    name="account_number"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Ngân hàng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập ngân hàng"
                    autoComplete="off"
                    value={bank}
                    onChange={this.onChange}
                    name="bank"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Chi nhánh</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập chi nhánh"
                    autoComplete="off"
                    value={branch}
                    onChange={this.onChange}
                    name="branch"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Hình ảnh chuyển khoản QRCode</label>
                  <DivImageStyles
                    className="gift__image"
                    style={{
                      border: `1px solid ${themeData().backgroundColor}`,
                    }}
                  >
                    <img
                      src={
                        qr_code_image_url
                          ? qr_code_image_url
                          : "/images/no_img.png"
                      }
                      alt="image_gift"
                    />
                    <div className="gift__background">
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={this.handleUploadImage}
                        />
                      </label>
                    </div>
                  </DivImageStyles>
                </div>
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
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listImgProductV2: state.UploadReducers.productImg.listImgProductV2,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    createCategoryP: (id, form) => {
      dispatch(CategoryPAction.createCategoryP(id, form));
    },
    uploadListImgProductV2: (file) => {
      dispatch(productAction.uploadListImgProductV2(file));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);
