import React, { Component } from "react";
import ComponentToPrint from "./ComponentToPrint";
import ComponentTemplate0ToPrint from "../InvoiceTemplate/orderTemplates/ComponentTemplate0ToPrint";
import ComponentTemplate1ToPrint from "../InvoiceTemplate/orderTemplates/ComponentTemplate1ToPrint";
import { getInvoiceTemplate } from "../../data/local/print";
import ComponentTemplate2ToPrint from "../InvoiceTemplate/orderTemplates/ComponentTemplate2ToPrint";
import ComponentTemplate3ToPrint from "../InvoiceTemplate/orderTemplates/ComponentTemplate3ToPrint";

export default class ListComponentToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentPrint = (badges, bill, store_code, store, currentBranch) => {
    var typeInvoice = getInvoiceTemplate();

    if (typeInvoice == 1) {
      return (
        <ComponentTemplate1ToPrint
          currentBranch={currentBranch}
          badges={badges}
          bill={bill}
          store={store}
          ref={(el) => (this.componentRef = el)}
        />
      );
    }

    if (typeInvoice == 2) {
      return (
        <ComponentTemplate2ToPrint
          currentBranch={currentBranch}
          heightPage={3 + bill.line_items_at_time?.length * 0.4}
          badges={badges}
          bill={bill}
          store={store}
          ref={(el) => (this.componentRef = el)}
        />
      );
    }

    if (typeInvoice == 3) {
      return (
        <ComponentTemplate3ToPrint
          currentBranch={currentBranch}
          badges={badges}
          bill={bill}
          store={store}
          ref={(el) => (this.componentRef = el)}
        />
      );
    }

    return (
      <ComponentTemplate0ToPrint
        currentBranch={currentBranch}
        badges={badges}
        bill={bill}
        store={store}
        ref={(el) => (this.componentRef = el)}
      />
    );
  };

  render() {
    var { badges, bills, store_code, stores, currentBranch } = this.props;
    return (
      <div>
        {bills.length > 0 &&
          bills.map((bill, index) => {
            bill.store_code = badges?.store_code;
            bill.store_name = badges?.store_name;

            this.store = {};
            if (stores != null) {
              this.store = stores[0];
            }
            if (this.store == null) {
              this.store = {};
            }

            return (
              <React.Fragment>
                {this.componentPrint(
                  badges,
                  bill,
                  store_code,
                  this.store,
                  currentBranch
                )}
                {index < bills.length - 1 && <div className="page-break"></div>}
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}
