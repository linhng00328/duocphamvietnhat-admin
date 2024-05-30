import moment from "moment";
import { PureComponent } from "react";
import * as Types from "../../constants/ActionType";
import Select from "react-select";
import { getBranchId } from "../../ultis/branchUtils";
import { connect } from "react-redux";
import * as staffAction from "../../actions/staff";

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentStaff: null,
    };
  }
  componentDidMount() {
    var params = `branch_id=${getBranchId()}`;

    this.props.fetchAllStaff(this.props.store_code, null, params, null);
  }

  setCurrentStaff = (staff) => {
    this.setState({
      currentStaff: staff,
    });
  };
  handleChangeHistoryOperationFunction = (e) => {
    const value = e.target.value;
    const { setParams } = this.props;
    setParams("function_type", value);
  };
  handleChangeHistoryOperationAction = (e) => {
    const value = e.target.value;
    const { setParams } = this.props;
    setParams("action_type", value);
  };
  functionsHistoryOperation = () => {
    const { params } = this.props;
    return (
      <select
        value={params.function_type || ""}
        name=""
        id="input"
        class="form-control"
        style={{
          width: "150px",
        }}
        onChange={this.handleChangeHistoryOperationFunction}
      >
        <option
          value=""
          style={{
            fontWeight: "600",
          }}
        >
          Chức năng
        </option>
        <option value={Types.FUNCTION_TYPE_PRODUCT}>Sản phẩm</option>
        <option value={Types.FUNCTION_TYPE_INVENTORY}>Kho</option>
        <option value={Types.FUNCTION_TYPE_CATEGORY_PRODUCT}>
          Danh mục sản phẩm
        </option>
        <option value={Types.FUNCTION_TYPE_CATEGORY_POST}>
          Danh mục tin tức
        </option>
        <option value={Types.FUNCTION_TYPE_ORDER}>Đơn hàng</option>
        <option value={Types.FUNCTION_POINT}>Cấu hình xu</option>
        <option value={Types.FUNCTION_TYPE_THEME}>Giao diện</option>
        <option value={Types.FUNCTION_TYPE_PROMOTION}>Khuyến mãi</option>
      </select>
    );
  };
  actionsHistoryOperation = () => {
    const { params } = this.props;
    return (
      <select
        value={params.action_type || ""}
        name=""
        id="input"
        class="form-control"
        style={{
          width: "130px",
        }}
        onChange={this.handleChangeHistoryOperationAction}
      >
        <option
          value=""
          style={{
            fontWeight: "600",
          }}
        >
          Thao tác
        </option>
        <option value={Types.OPERATION_ACTION_ADD}>Thêm</option>
        <option value={Types.OPERATION_ACTION_UPDATE}>Cập nhật</option>
        <option value={Types.OPERATION_ACTION_DELETE}>Xóa</option>
        <option value={Types.OPERATION_ACTION_CANCEL}>Hủy</option>
      </select>
    );
  };
  handleDisplayNameAction = (actionType) => {
    let name = "";
    switch (actionType) {
      case Types.OPERATION_ACTION_ADD:
        name = "Thêm";
        break;
      case Types.OPERATION_ACTION_UPDATE:
        name = "Cập nhật";
        break;
      case Types.OPERATION_ACTION_DELETE:
        name = "Xóa";
        break;
      case Types.OPERATION_ACTION_CANCEL:
        name = "Hủy";
        break;
      default:
        break;
    }
    return name;
  };

  handleChangeStaffSelect = (staffs) => {
    const options = staffs.reduce((dataStore, currentStaff) => {
      return [
        ...dataStore,
        {
          value: currentStaff.id,
          label: currentStaff.name,
        },
      ];
    }, []);
    return [
      {
        value: "",
        label: "Nhân viên",
      },
      ...options,
    ];
  };
  handleChangeStaff = (event) => {
    this.setCurrentStaff(event);
    const { setParams } = this.props;
    setParams("staff_id", event.value);
  };

  showData = (historiesOperation) => {
    const { per_page, current_page } = this.props;
    if (historiesOperation.length > 0) {
      return historiesOperation.map((history, index) => (
        <tr className="hover-product" key={history.id}>
          <td>{(current_page - 1) * per_page + index + 1}</td>
          <td>{history.staff_id ? history.staff_name : history.user_name}</td>
          <td>{history.function_type_name}</td>
          <td>{this.handleDisplayNameAction(history.action_type)}</td>
          <td>{moment(history.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>{history.ip}</td>
          <td>{history.content}</td>
        </tr>
      ));
    }
    return (
      <tr className="hover-product">
        <td
          colSpan={7}
          style={{
            textAlign: "center",
          }}
        >
          Không tìm thấy lịch sử thao tác!
        </td>
      </tr>
    );
  };

  render() {
    const histories =
      typeof this.props.histories === "undefined" ? [] : this.props.histories;
    const { currentStaff } = this.state;
    return (
      <div
        class="table-responsive"
        style={{
          overflow: "visible",
        }}
      >
        <table
          className="table table-border "
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th
                style={{
                  width: "180px",
                }}
              >
                <Select
                  options={this.handleChangeStaffSelect(this.props.staff)}
                  placeholder="Nhân viên"
                  className="select-staff"
                  onChange={this.handleChangeStaff}
                  value={currentStaff}
                  noOptionsMessage={() => "Không tìm thấy kết quả"}
                ></Select>
              </th>
              <th>{this.functionsHistoryOperation()}</th>
              <th>{this.actionsHistoryOperation()}</th>
              <th>Thời gian</th>
              <th>IP</th>
              <th>Nội dung</th>
            </tr>
          </thead>
          <tbody>{this.showData(histories)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.allStaff,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
