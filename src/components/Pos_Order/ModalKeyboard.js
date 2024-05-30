import React, { Component } from "react";

class ModalKeyboard extends Component {
  render() {
    return (
      <div>
        <div
          class="modal"
          id="modalKeyboard"
          style={{
            fontSize: "13px",
          }}
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 15px",
                }}
              >
                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>
                  Chú thích phím tắt
                </p>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div
                  className="wrap-note"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 37px",
                  }}
                >
                  <div className="note-col1">
                    <div
                      className="item-note"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="button-note ">
                        <p>F9</p>
                      </div>
                      <div
                        className="content-note"
                        style={{ marginLeft: "20px" }}
                      >
                        Thanh toán đơn hàng
                      </div>
                    </div>
                    <div
                      className="item-note"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="button-note">
                        <p>F4</p>
                      </div>
                      <div
                        className="content-note"
                        style={{ marginLeft: "20px" }}
                      >
                        Tìm kiếm SĐT khách hàng
                      </div>
                    </div>
                    <div
                      className="item-note"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="button-note">
                        <p>F3</p>
                      </div>
                      <div
                        className="content-note"
                        style={{ marginLeft: "20px" }}
                      >
                        Tìm kiếm sản phẩm
                      </div>
                    </div>
                  </div>

                  <div className="note-col2">
                    <div
                      className="item-note"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="button-note">
                        <p>F6</p>
                      </div>
                      <div
                        className="content-note"
                        style={{ marginLeft: "20px" }}
                      >
                        Nhập chiết khấu đơn hàng
                      </div>
                    </div>

                    <div
                      className="item-note"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="button-note">
                        <p>F8</p>
                      </div>
                      <div
                        className="content-note"
                        style={{ marginLeft: "20px" }}
                      >
                        Nhập tiền khách đưa
                      </div>
                    </div>
                  </div>
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
    );
  }
}

export default ModalKeyboard;
