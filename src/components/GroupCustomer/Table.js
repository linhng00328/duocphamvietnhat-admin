import { PureComponent } from "react";
import styled from "styled-components";

const TableStyles = styled.div`
  .countCustomers {
    &:hover {
      text-decoration: underline;
    }
  }
`;

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleShowModalDeleteGroupCustomer = (id) => {
    this.props.setOpenModalDeleteGroupCustomer();
    this.props.setIdGroupCustomer(id);
  };
  handleShowModalUpdateGroupCustomer = (e, id) => {
    if (e.target.closest(".btn-delete") === null) {
      this.props.setOpenModalActionChangeGroupCustomer();
      this.props.setIdGroupCustomer(id);
    }
  };

  handleShowSidebar = (data) => {
    const { setGroupInfo, setShowCustomerByGroup } = this.props;
    setGroupInfo(data);
    setShowCustomerByGroup(true);
  };

  showData = (groupCustomer) => {
    if (groupCustomer.length > 0) {
      return groupCustomer.map((group, index) => (
        <tr className="hover-product" key={group.id}>
          <td>{index + 1}</td>
          <td>{group.name}</td>
          <td
            className="primary countCustomers"
            onClick={() => this.handleShowSidebar(group)}
          >
            {group.count_customers}
          </td>
          <td>{group.note}</td>
          <td>
            <div>
              <button
                className="btn btn-warning btn-sm"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={(e) =>
                  this.handleShowModalUpdateGroupCustomer(e, group.id)
                }
              >
                <i className="fa fa-edit"></i>Sửa
              </button>
              <button
                className="btn btn-danger btn-sm btn-delete"
                style={{ marginLeft: "10px", color: "white" }}
                onClick={() =>
                  this.handleShowModalDeleteGroupCustomer(group.id)
                }
              >
                <i className="fa fa-trash"></i> Xóa
              </button>
            </div>
          </td>
        </tr>
      ));
    }
    return [];
  };

  render() {
    const groupCustomer =
      typeof this.props.groupCustomer === "undefined"
        ? []
        : this.props.groupCustomer;
    return (
      <TableStyles class="table-responsive">
        <table
          className="table table-border "
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên nhóm</th>
              <th>Số lượng khách hàng</th>
              <th>Ghi chú</th>
              <th>Hành động</th>

              {/* {getChannel() == IKIPOS &&   <th>Hành động</th>} */}
            </tr>
          </thead>
          <tbody>{this.showData(groupCustomer)}</tbody>
        </table>
      </TableStyles>
    );
  }
}

export default Table;
