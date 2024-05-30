import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import ItemInvoiceTemplate from "./ItemInvoiceTemplate";
import { shallowEqual } from "../../ultis/shallowEqual";
import ComponentTemplate0ToPrint from "./orderTemplates/ComponentTemplate0ToPrint";
import { dataOrderExample } from "./orderTemplates/dataOrderExample";
import ComponentTemplate1ToPrint from "./orderTemplates/ComponentTemplate1ToPrint";
import * as dashboardAction from "../../actions/dashboard";
import { getInvoiceTemplate, setInvoiceTemplate } from "../../data/local/print";
import ComponentTemplate2ToPrint from "./orderTemplates/ComponentTemplate2ToPrint";
import ComponentTemplate3ToPrint from "./orderTemplates/ComponentTemplate3ToPrint";

const HomeScreenStyles = styled.div`
  .theme__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  @media screen and (max-width: 992px) {
    .theme__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 768px) {
    .theme__list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

class OrderInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice_type: getInvoiceTemplate() ?? 0,
    };
  }

  componentDidMount() {
    this.setState({
      invoice_type: getInvoiceTemplate() ?? 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.theme, this.props.theme) ||
      nextProps.tabId != this.props.tabId
    ) {
      var theme = nextProps.theme;
      this.setState({
        store_id: theme.store_id,
      });
    }

    const { stores } = nextProps;
    this.store = {};
    if (stores != null) {
      this.store = stores[0];
    }
    if (this.store == null) {
      this.store = {};
    }
  }

  chooseTheme = (theme) => {
    setInvoiceTemplate(theme.index);

    this.setState({
      invoice_type: theme.index,
    });
  };

  render() {
    var { invoice_type } = this.state;
    var { badges, currentBranch } = this.props;

    const { stores } = this.props;
    this.store = {};
    if (stores != null) {
      this.store = stores[0];
    }
    if (this.store == null) {
      this.store = {};
    }

    this.initTheme = [
      {
        index: 0,
        name: "Mẫu mặc định",
        image: "/images/invoice_templates/0.png",
        componentPrint: (
          <ComponentTemplate0ToPrint
            currentBranch={this.props.currentBranch}
            badges={this.props.badges}
            bill={dataOrderExample}
            store={this.store}
            ref={(el) => (this.initTheme[0].componentRef = el)}
          />
        ),
      },
      {
        index: 1,
        name: "Mẫu 1",
        image: "/images/invoice_templates/1.png",
        componentPrint: (
          <ComponentTemplate1ToPrint
            currentBranch={this.props.currentBranch}
            badges={this.props.badges}
            bill={dataOrderExample}
            store={this.store}
            ref={(el) => (this.initTheme[1].componentRef = el)}
          />
        ),
      },
      {
        index: 2,
        name: "Mẫu 2 (phiếu nhỏ)",
        image: "/images/invoice_templates/2.png",
        componentPrint: (
          <ComponentTemplate2ToPrint
            currentBranch={this.props.currentBranch}
            badges={this.props.badges}
            bill={dataOrderExample}
            store={this.store}
            ref={(el) => (this.initTheme[2].componentRef = el)}
          />
        ),
      },
      // {
      //   index: 3,
      //   name: "Mẫu 3 (Đại lý in cho khách lẻ)",
      //   image: "/images/invoice_templates/0.png",
      //   componentPrint: (
      //     <ComponentTemplate3ToPrint
      //       currentBranch={this.props.currentBranch}
      //       badges={this.props.badges}
      //       bill={dataOrderExample}
      //       store={this.store}
      //       ref={(el) => (this.initTheme[3].componentRef = el)}
      //     />
      //   ),
      // },
    ];

    return (
      <HomeScreenStyles className="overview">
        <form role="form">
          <div class="box-body">
            <div class="theme__list">
              {this.initTheme.map((v, i) => (
                <ItemInvoiceTemplate
                  key={i}
                  badges={badges}
                  currentBranch={currentBranch}
                  chooseTheme={this.chooseTheme}
                  invoice_type={invoice_type ?? 0}
                  v={v}
                  goBack={() => {
                    this.onChangeCustom();
                  }}
                  setShowModalDetailsTheme={this.setShowModalDetailsTheme}
                  setInfoDetailsTheme={this.setInfoDetailsTheme}
                />
              ))}
            </div>
          </div>
          <div class="box-footer"></div>
        </form>
      </HomeScreenStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
    theme: state.themeReducers.theme,
    currentBranch: state.branchReducers.branch.currentBranch,
    stores: state.storeReducers.store.allStore,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStore: () => {
      dispatch(dashboardAction.fetchAllStore());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderInvoice);
