import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../constants/ActionType";
import { formatNumberV2 } from "../../ultis/helpers";
import styled from "styled-components";

const ModalRetailStepsStyles = styled.div`
  .product-combo {
    margin: 30px 0px;
    .product-combo-header {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      font-weight: 600;
      padding: 15px 0px;
      border-top: 1px solid rgb(226, 229, 236);
      border-bottom: 1px solid rgb(226, 229, 236);
    }
    .product-combo-data {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin: 10px 0px;
      padding: 5px 0px;
    }
  }
`;

class ModalRetailSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    this.props.resetProductRetailSteps();
  };

  render() {
    const { allProductRetailSteps } = this.props;

    return (
      <ModalRetailStepsStyles>
        <div class="modal" id="modalRetailSteps">
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
                  Danh sách khoảng giá
                </p>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                {allProductRetailSteps?.length > 0 ? (
                  <div class="product-combo">
                    <div class="product-combo-header">
                      <div>Mua từ</div>
                      <div>Đến</div>
                      <div>Đơn giá</div>
                    </div>
                    {allProductRetailSteps.map((product, index) => (
                      <div
                        class="product-combo-data"
                        key={index}
                        style={{
                          borderBottom:
                            index === allProductRetailSteps.length - 1
                              ? "1px solid transparent"
                              : "1px solid rgb(226, 229, 236)",
                        }}
                      >
                        <div>{product.from_quantity}</div>
                        <div>{product.to_quantity}</div>
                        <div>
                          {formatNumberV2(product.price)}đ/
                          <span class="product-cost-text">sản phẩm</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </ModalRetailStepsStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProductRetailSteps: state.productReducers.product.allProductRetailSteps,
  };
};

export default connect(mapStateToProps, null)(ModalRetailSteps);
