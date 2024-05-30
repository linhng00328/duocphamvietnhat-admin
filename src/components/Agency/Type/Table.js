import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import * as agencyAction from "../../../actions/agency";
import ModalRemove from "./ModalRemove";
import ModalUpdate from "./ModalUpdate";

import ModalUpdateCommission from "./Commission/ModalUpdateCommission";
import { formatNumberV2 } from "../../../ultis/helpers";
import SortableList, { SortableItem,SortableKnob } from "react-easy-sort";
import arrayMove from "array-move";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        name: "",
        id: "",
      },
      modalUpdate: {
        name: "",
        auto_set_value_import: 0,
        auto_set_value_share: 0,
        id: "",
      },
      listType: [],
    };
  }
  setModalUpdate = (modal) => {
    this.setState({
      modalUpdate: modal,
    });
  };

  handleRemove = (id, name) => {
    this.setState({ modal: { name: name, id: id } });
  };

  handleUpdate = (id, name, valueImport, valueShare) => {
    this.setState({
      modalUpdate: {
        name: name,
        auto_set_value_import: valueImport,
        auto_set_value_share: valueShare,
        id: id,
      },
    });
  };

  handleUpdateCommission = (ob) => {
    this.setState({ modalUpdateCommission: ob });
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { types } = this.props;
    if (!shallowEqual(types, nextProps.types)) {
      this.setState({
        listType: nextProps.types,
      });
    }
    return true;
  }

  onSortEnd = (oldIndex, newIndex) => {
    var listType = arrayMove(this.state.listType, oldIndex, newIndex);
    var listId = [];
    var listPosition = [];
    listType.forEach((element, index) => {
      listId.push(element.id);
      listPosition.push(index + 1);
    });
    this.props.sortAgencyType(this.props.store_code, {
      ids: listId,
      levels: listPosition,
    });
    this.setState({
      listType: listType,
    });
  };

  showData = (types) => {
    var { store_code, isAutoSetLevelAgency } = this.props;
    var result = null;
    if (types.length > 0) {
      result = types.map((data, index) => {
        return (
          <SortableItem key={data.id}>
            <tr className="hover-product">
              <td>
              <SortableKnob>
                <span>
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 10.75H5.99998C5.85218 10.751 5.70747 10.7077 5.58449 10.6257C5.46151 10.5437 5.3659 10.4268 5.30998 10.29C5.25231 10.1528 5.23673 10.0016 5.26523 9.85561C5.29372 9.70959 5.36499 9.57535 5.46998 9.46995L11.47 3.46995C11.6106 3.3295 11.8012 3.25061 12 3.25061C12.1987 3.25061 12.3894 3.3295 12.53 3.46995L18.53 9.46995C18.635 9.57535 18.7062 9.70959 18.7347 9.85561C18.7632 10.0016 18.7476 10.1528 18.69 10.29C18.6341 10.4268 18.5384 10.5437 18.4155 10.6257C18.2925 10.7077 18.1478 10.751 18 10.75ZM7.80998 9.24995H16.19L12 5.05995L7.80998 9.24995Z"
                      fill="#a6a4a4"
                    />
                    <path
                      d="M12 20.7499C11.9014 20.7504 11.8038 20.7311 11.7128 20.6934C11.6218 20.6556 11.5392 20.6 11.47 20.5299L5.46998 14.5299C5.36499 14.4245 5.29372 14.2903 5.26523 14.1442C5.23673 13.9982 5.25231 13.847 5.30998 13.7099C5.3659 13.5731 5.46151 13.4561 5.58449 13.3742C5.70747 13.2922 5.85218 13.2489 5.99998 13.2499H18C18.1478 13.2489 18.2925 13.2922 18.4155 13.3742C18.5384 13.4561 18.6341 13.5731 18.69 13.7099C18.7476 13.847 18.7632 13.9982 18.7347 14.1442C18.7062 14.2903 18.635 14.4245 18.53 14.5299L12.53 20.5299C12.4607 20.6 12.3782 20.6556 12.2872 20.6934C12.1962 20.7311 12.0985 20.7504 12 20.7499ZM7.80998 14.7499L12 18.9399L16.19 14.7499H7.80998Z"
                      fill="#a6a4a4"
                    />
                  </svg>

                </span>
                </SortableKnob>
                <span>{index + 1}</span>
              </td>
              <td>{data.name}</td>
              {isAutoSetLevelAgency && (
                <>
                  <td>
                    {data.auto_set_value_import
                      ? `${formatNumberV2(data.auto_set_value_import)} ₫`
                      : "0 ₫"}
                  </td>
                  <td>
                    {data.auto_set_value_import
                      ? `${formatNumberV2(data.auto_set_value_share)} ₫`
                      : "0 ₫"}
                  </td>
                </>
              )}

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    to={`/product-agency/index/${store_code}/${data.id}?tab-index=0`}
                    data-toggle="modal"
                    data-target="#updateType"
                    class={`btn btn-success btn-sm `}
                  >
                    <i class="fa fa-edit"></i> Cấu hình sản phẩm
                  </Link>
                  <button
                    onClick={() =>
                      this.handleUpdate(
                        data.id,
                        data.name,
                        data.auto_set_value_import,
                        data.auto_set_value_share
                      )
                    }
                    data-toggle="modal"
                    data-target="#updateType"
                    class={`btn btn-outline-warning btn-sm `}
                  >
                    <i class="fa fa-edit"></i> Sửa
                  </button>

                  <button
                    onClick={() => this.handleRemove(data.id, data.name)}
                    data-toggle="modal"
                    data-target="#removeType"
                    class={`btn btn-outline-danger btn-sm`}
                  >
                    <i class="fa fa-trash"></i> Xóa
                  </button>
                </div>
              </td>
            </tr>
          </SortableItem>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { modal, modalUpdate, modalUpdateCommission, listType } = this.state;
    const { isAutoSetLevelAgency } = this.props;
    return (
      <div class="table-responsive">
        <ModalRemove modal={modal} store_code={this.props.store_code} />
        <ModalUpdate
          modal={modalUpdate}
          setModalUpdate={this.setModalUpdate}
          store_code={this.props.store_code}
          isAutoSetLevelAgency={isAutoSetLevelAgency}
        />
        <ModalUpdateCommission
          modal={modalUpdateCommission}
          store_code={this.props.store_code}
        />

        <table class="table table-border">
          <thead>
            <tr>
              <th>Cấp bậc</th>
              <th>Tên cấp đại lý</th>
              {isAutoSetLevelAgency && (
                <>
                  <th>Doanh số nhập hàng</th>
                  <th>Doanh số hoa hồng</th>
                </>
              )}
              <th>Hành động</th>
            </tr>
          </thead>

          <SortableList
            onSortEnd={this.onSortEnd}
            className="resp-table-body"
            draggedItemClassName="dragged"
          >
            {this.showData(listType)}
          </SortableList>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgency: (store_code, id, data) => {
      dispatch(agencyAction.updateAgency(store_code, id, data));
    },
    sortAgencyType: (store_code, from) => {
      dispatch(agencyAction.sortAgencyType(store_code, from));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
