import { connect } from 'react-redux';

import * as staffAction from '../../../actions/staff';
import { Component } from 'react';
import { formatNumber } from '../../../ultis/helpers.js';
import SidebarShowSalerVisitHistory from './SidebarShowSalerVisitHistory.js';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowHistory: false,
      selectedId: '',
      staffName: '',
    };
  }

  setOpenHistorySidebar = (state, value, name) => {
    this.setState({
      isShowHistory: state,
      selectedId: value,
      staffName: name,
    });
  };

  showData = (staff) => {
    var result = null;
    if (staff.length > 0) {
      result = staff.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>{index + 1}</td>
            <td colSpan={2}>
              <span className="primary name_customers">{data.staff_name}</span>
            </td>
            <td colSpan={2}>{data?.total_staff_visit}</td>
            <td colSpan={2}>{formatNumber(data?.balance)}</td>
            <td colSpan={2}>{Math.ceil(data?.total_time_visit / 60)}</td>
            <td colSpan={2}>
              <span className="total_customers primary" onClick={() => this.setOpenHistorySidebar(true, data.id, data.staff_name)}>
                Xem LS
              </span>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <table
          class="table"
          id="dataTable"
          width="100%"
          cellspacing="0"
          style={{ textAlign: 'center', borderRadius: '10px' }}
        >
          <thead>
            <tr>
              <th
                style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }}
                rowSpan={3}
                colSpan={1}
              >
                STT
              </th>
              <th
                style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }}
                rowSpan={3}
                colSpan={2}
              >
                Họ và tên
              </th>
              <th style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }} colSpan={2}>
                Viếng thăm
              </th>
              <th style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }} colSpan={2}>
                Doanh số
              </th>
              <th style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }} colSpan={2}>
                Cập nhật
              </th>
              <th
                style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }}
                colSpan={2}
                rowSpan={2}
              >
                Chức năng
              </th>
            </tr>

            <tr>
              <th
                style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }}
                rowSpan={2}
                colSpan={2}
              >
                Số lần
              </th>
              <th
                style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }}
                rowSpan={2}
                colSpan={2}
              >
                DS/ngày
              </th>
              <th
                style={{ border: '1px solid #c4c4c4', color: 'grey', verticalAlign: 'middle' }}
                rowSpan={2}
                colSpan={2}
              >
                TG(p)
              </th>
            </tr>
          </thead>

          <tbody>{this.showData(data)}</tbody>
        </table>

        <div>
          {this.state.isShowHistory && (
            <SidebarShowSalerVisitHistory
              setOpenHistorySidebar={this.setOpenHistorySidebar}
              data={this.state.selectedId}
              store_code={this.props.store_code}
              staff_name={this.state.staffName}
              createMap={this.props.createMap}
              dateQuery={this.props.date_query}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.historySalerToDistributor,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHistoryToDistributor: (store_code, date_from, date_to) => {
      dispatch(staffAction.fetchHistoryToDistributorByStaffId(store_code, date_from, date_to));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
