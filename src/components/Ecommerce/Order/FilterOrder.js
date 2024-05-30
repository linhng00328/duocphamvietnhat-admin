import React, { Component } from "react";
import { ecommerceStatus } from "../../../ultis/ecommerce";
import Select from "react-select";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import styled from "styled-components";

const FilterOrderStyles = styled.div`
  .created_from_date {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right-width: 0 !important;
    width: 150px;
  }
  .created_to_date {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    width: 150px;
  }
`;
class FilterOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleShowStatus = (listStatus) => {
    const {
      listStore,
      listStoreSelected,
      listStatusSelected,
      searchValue,
      created_to_date,
      created_from_date,
      onChangeStore,
      onChangeStatus,
      onchangeDateFrom,
      onchangeDateTo,
      onChangeSearch,
      handleFilterOrder,
    } = this.props;
    return (
      <div
        className="card-header"
        style={{
          borderBottom: "none",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            class="row"
            style={{
              width: "100%",
              marginRight: "15px",
              marginLeft: "15px",
              gap: "20px",
            }}
          >
            <form onSubmit={this.searchData}>
              <div class="input-group mb-6">
                <input
                  style={{ width: "250px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={onChangeSearch}
                  class="form-control"
                  placeholder="Tìm mã đơn"
                />
              </div>
            </form>
            <div
              style={{
                maxWidth: "500px",
                minWidth: "300px",
              }}
            >
              <Select
                closeMenuOnSelect={false}
                options={listStore}
                placeholder={"Chọn cửa hàng"}
                value={listStoreSelected}
                onChange={onChangeStore}
                isMulti={true}
                noOptionsMessage={() => "Không tìm thấy kết quả"}
              ></Select>
            </div>
            <div
              style={{
                maxWidth: "500px",
                minWidth: "300px",
              }}
            >
              <Select
                closeMenuOnSelect={false}
                options={listStatus}
                placeholder={"Trạng thái đơn hàng"}
                value={listStatusSelected}
                onChange={onChangeStatus}
                isMulti={true}
                noOptionsMessage={() => "Không tìm thấy kết quả"}
              ></Select>
            </div>
            <div>
              <button className="btn btn-info" onClick={handleFilterOrder}>
                <i className="fa fa-filter"></i>
                Lọc
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginLeft: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginRight: "5px",
              }}
            >
              Ngày tạo:{" "}
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Flatpickr
                data-enable-time
                value={new Date(moment(created_from_date, "DD-MM-YYYY"))}
                className="created_from_date"
                placeholder="Chọn ngày bắt đầu..."
                options={{
                  altInput: true,
                  dateFormat: "DD-MM-YYYY",
                  altFormat: "DD-MM-YYYY",
                  allowInput: true,
                  enableTime: false,
                  maxDate: created_to_date,
                  parseDate: (datestr, format) => {
                    return moment(datestr, format, true).toDate();
                  },
                  formatDate: (date, format, locale) => {
                    // locale can also be used
                    return moment(date).format(format);
                  },
                }}
                onChange={([date]) => onchangeDateFrom(date)}
              />
              <Flatpickr
                data-enable-time
                value={new Date(moment(created_to_date, "DD-MM-YYYY"))}
                className="created_to_date"
                placeholder="Chọn ngày kết thúc..."
                options={{
                  altInput: true,
                  dateFormat: "DD-MM-YYYY",
                  altFormat: "DD-MM-YYYY",
                  allowInput: true,
                  enableTime: false,
                  minDate: created_from_date,
                  parseDate: (datestr, format) => {
                    return moment(datestr, format, true).toDate();
                  },
                  formatDate: (date, format, locale) => {
                    // locale can also be used
                    return moment(date).format(format);
                  },
                }}
                onChange={([date]) => onchangeDateTo(date)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  showAllStatus = (listStatus) => {
    const allStatusChild = listStatus.reduce(
      (prevListStatus, currentListStatus) => {
        return [...prevListStatus, ...currentListStatus?.data_children];
      },
      []
    );
    return allStatusChild?.length > 0
      ? allStatusChild.map((statusChild) => ({
          value: statusChild.status,
          label: statusChild.name,
        }))
      : [];
  };

  handleSelectedFilter = () => {
    const { onChangeStatus, setSearch } = this.props;
    onChangeStatus([]);
    setSearch("");
  };

  render() {
    const ecommerceStatusFilter = ecommerceStatus.filter(
      (ecommerceS) =>
        ecommerceS?.name?.toLowerCase() == this.props.isCheckedEcommerce()
    );

    return (
      <FilterOrderStyles>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              class="nav-item nav-link active"
              id="nav-filter-tab"
              data-toggle="tab"
              href="#nav-filter"
              role="tab"
              aria-controls="nav-filter"
              aria-selected="true"
              onClick={() => this.handleSelectedFilter()}
            >
              Bộ lọc
            </a>
            {ecommerceStatusFilter?.length > 0 &&
              ecommerceStatusFilter[0].data.map((status) => (
                <a
                  key={status.key}
                  className="nav-item nav-link"
                  id={`nav-${status.key}-tab`}
                  data-toggle="tab"
                  href={`#nav-${status.key}`}
                  role="tab"
                  aria-controls={`nav-${status.key}`}
                  aria-selected="false"
                  onClick={() => this.handleSelectedFilter()}
                >
                  {status.name}
                </a>
              ))}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id={`nav-filter`}
            role="tabpanel"
            aria-labelledby={`nav-filter-tab`}
          >
            {ecommerceStatusFilter?.length > 0 &&
              this.handleShowStatus(
                this.showAllStatus(ecommerceStatusFilter[0].data)
              )}
          </div>
          {ecommerceStatusFilter?.length > 0 &&
            ecommerceStatusFilter[0].data.map((status) => (
              <div
                key={status.key}
                className="tab-pane fade"
                id={`nav-${status.key}`}
                role="tabpanel"
                aria-labelledby={`nav-${status.key}-tab`}
              >
                {this.handleShowStatus(
                  status.data_children?.map((item) => ({
                    value: item.status,
                    label: item.name,
                  }))
                )}
              </div>
            ))}
        </div>
      </FilterOrderStyles>
    );
  }
}

export default FilterOrder;
