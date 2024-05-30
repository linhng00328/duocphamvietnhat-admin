import { Component } from "react";
import styled from "styled-components";
import { connect, shallowEqual } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import * as agencyApi from "../../../data/remote/agency";
import { formatNumberV2 } from "../../../ultis/helpers";
import moment from "moment";
import PaginationHistory from "./PaginationHistory";
import { AsyncPaginate } from "react-select-async-paginate";

const ModalHistoryChangeLevelAgencyStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .modal-dialog {
    animation: popup 1s ease-in-out 1;
  }
  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    50% {
      opacity: 1;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

class ModalHistoryChangeLevelAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchValue: "",
      listOptionsSelected: [],
      pageAgency: 1,
    };
  }

  componentDidMount() {
    const { page } = this.state;

    this.handleHistoriesLevelAgency(page);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { page } = this.state;
    if (page !== nextState.page) {
      this.handleHistoriesLevelAgency(nextState.page);
    }

    return true;
  }

  handleHistoriesLevelAgency = (page, listOptionsSelected) => {
    const { getHistoryChangeLevelAgency, store_code } = this.props;
    let queryString = `page=${page}`;
    if (listOptionsSelected?.length > 0) {
      const agencyIds = listOptionsSelected?.reduce(
        (prevAgency, currentAgency, index) => {
          return (
            prevAgency +
            `${
              index === listOptionsSelected.length - 1
                ? currentAgency.value
                : `${currentAgency.value},`
            }`
          );
        },
        "&agency_ids="
      );
      queryString += agencyIds;
    }
    getHistoryChangeLevelAgency(store_code, queryString);
  };

  handleCloseModalDelete = () => {
    this.props.setShowModalHistoryChangeLevel(false);
  };
  convertDate = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return newDate;
  };
  setPage = (page) => {
    this.setState({ page });
  };
  convertOptions = (opts) => {
    if (opts?.length > 0) {
      const newOptions = opts.reduce(
        (prevOption, currentOption) => [
          ...prevOption,
          {
            value: currentOption.id,
            label: currentOption.customer?.name
              ? currentOption.customer?.name
              : "",
          },
        ],
        []
      );
      return newOptions;
    }
    return [];
  };
  handleChangeOptions = (value) => {
    const { page } = this.state;

    this.handleHistoriesLevelAgency(page, value);
    this.setState({
      listOptionsSelected: value,
    });
  };
  loadOptions = async (search, loadedOptions, { page }) => {
    const { store_code } = this.props;
    const params = `&limit=6`;
    const res = await agencyApi.fetchAllAgency(store_code, page, params);
    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }
    const listShowChoose = res.data.data.data.map((item) => {
      return {
        value: item.id,
        label: item.customer?.name ? item.customer.name : "",
      };
    });
    return {
      options: listShowChoose,
      hasMore: res.data.data?.data.length === 6,
      additional: {
        page: page + 1,
      },
    };
  };
  render() {
    const { historyChangeLevelAgency } = this.props;
    const { listOptionsSelected } = this.state;
    const dataHistoriesLevel = historyChangeLevelAgency.data || [];
    return (
      <ModalHistoryChangeLevelAgencyStyles
        className="modal"
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                Lịch sử thay đổi cấp đại lý
              </h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModalDelete}
              >
                <span>&times;</span>
              </button>
            </div>
            <div
              style={{
                width: "320px",
                padding: "1rem 1rem 0 1rem",
              }}
            >
              {" "}
              <AsyncPaginate
                value={listOptionsSelected}
                loadOptions={this.loadOptions}
                additional={{
                  page: 1,
                }}
                isMulti
                placeholder="Tìm kiếm đại lý"
                loadingMessage={() => "Đang tìm đại lý..."}
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                debounceTimeout={500}
                closeMenuOnSelect={false}
                onChange={(e) => this.handleChangeOptions(e)}
              />
            </div>
            <div
              class="modal-body-content"
              style={{
                height: "75vh",
                overflow: "auto",
                padding: "1rem",
              }}
            >
              <table class="table table-border">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên đại lý</th>
                    <th>Cấp đại lý cũ</th>
                    <th>Cấp đại lý mới</th>
                    <th>Thời gian đối soát</th>
                    <th>Nhập hàng tối thiểu</th>
                    <th>Nhập hàng đã đạt</th>
                    <th>Hoa hồng tối thiểu</th>
                    <th>Hoa hồng đã đạt</th>
                    <th>Thời gian xử lý</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHistoriesLevel.length > 0 &&
                    dataHistoriesLevel.map((historyLevel, index) => (
                      <tr key={historyLevel.id}>
                        <td>
                          {(historyChangeLevelAgency.current_page - 1) *
                            historyChangeLevelAgency.per_page +
                            (index + 1)}
                        </td>
                        <td>{historyLevel.agency?.customer?.name}</td>
                        <td>{historyLevel.last_agency_type_name}</td>
                        <td>{historyLevel.new_agency_type_name}</td>
                        <td>
                          {historyLevel.date_from && historyLevel.date_to
                            ? `${historyLevel.date_from?.split(" ")[0]} đến ${
                                historyLevel.date_to?.split(" ")[0]
                              }`
                            : ""}
                        </td>
                        <td>
                          <span
                            style={{
                              color: "#2ecc71",
                            }}
                          >
                            {historyLevel.auto_set_value_import
                              ? `${formatNumberV2(
                                  historyLevel.auto_set_value_import
                                )} ₫`
                              : "0 ₫"}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              color: "#2ecc71",
                            }}
                          >
                            {historyLevel.current_total_after_discount_no_use_bonus
                              ? `${formatNumberV2(
                                  historyLevel.current_total_after_discount_no_use_bonus
                                )} ₫`
                              : "0 ₫"}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              color: "#e74c3c",
                            }}
                          >
                            {historyLevel.auto_set_value_share
                              ? `${formatNumberV2(
                                  historyLevel.auto_set_value_share
                                )} ₫`
                              : "0 ₫"}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              color: "#e74c3c",
                            }}
                          >
                            {historyLevel.current_share_agency
                              ? `${formatNumberV2(
                                  historyLevel.current_share_agency
                                )} ₫`
                              : "0 ₫"}
                          </span>
                        </td>

                        <td>{this.convertDate(historyLevel.created_at)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
              }}
            >
              <PaginationHistory
                historyChangeLevelAgency={historyChangeLevelAgency}
                setPage={this.setPage}
              ></PaginationHistory>
              <div
                className="btn btn-outline-danger"
                onClick={this.handleCloseModalDelete}
              >
                Hủy
              </div>
            </div>
          </div>
        </div>
      </ModalHistoryChangeLevelAgencyStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    historyChangeLevelAgency:
      state.agencyReducers.agency.historyChangeLevelAgency,
    agencys: state.agencyReducers.agency.allAgency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryChangeLevelAgency: (store_code, queryString) => {
      dispatch(
        agencyAction.getHistoryChangeLevelAgency(store_code, queryString)
      );
    },
    fetchAllAgency: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllAgency(store_code, page, params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalHistoryChangeLevelAgency);
