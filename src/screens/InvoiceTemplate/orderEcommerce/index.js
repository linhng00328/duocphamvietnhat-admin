import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import PrintOrderEcommerceContent from "./PrintOrderEcommerceContent";
class PrintOrderEcommerce extends Component {
  render() {
    const { orders, type } = this.props;

    return (
      <div>
        {type == Types.TYPE_PRINT_ECOMMERCE_A4_A5 ? (
          <>
            {orders?.length > 0 &&
              orders?.map((order, index) => (
                <>
                  <PrintOrderEcommerceContent order={order} />
                  {index < orders?.length - 1 && (
                    <div className="page-break"></div>
                  )}
                </>
              ))}
          </>
        ) : type == Types.TYPE_PRINT_ECOMMERCE_TWO_VOLUME_A4 ? (
          <>
            {orders?.length > 0 &&
              orders?.map((order, index) => (
                <>
                  <PrintOrderEcommerceContent order={order} />
                  {index < orders?.length - 1 && (index + 1) % 2 === 0 && (
                    <div className="page-break"></div>
                  )}
                </>
              ))}
          </>
        ) : null}
      </div>
    );
  }
}

export default PrintOrderEcommerce;
