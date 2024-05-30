import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../components/Partials/Alert";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as Types from "../../constants/ActionType";
import * as StoreAAction from "../../actions/store_address";
import NotAccess from "../../components/Partials/NotAccess";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import Select from "react-select";
import { formatNoDWithEmpty, formatNumber } from "../../ultis/helpers";
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_calculate_ship: true,
      use_fee_from_partnership: false,
      fee_urban: 0,
      fee_suburban: 0,
      urban_list_id_province: [],
      provices: [],
      proviceOptions: [],
    };
  }
  handChangeCheckbox2 = (e) => {
    this.setState({ checked_switch2: !this.state.checked_switch2 });
  };
  handChangeCheckbox3 = (e) => {
    this.setState({ checked_switch3: !this.state.checked_switch3 });
  };
  onChange = (e) => {
    var { name } = e.target;
    var { value } = e.target;
    const _value = formatNumber(value);

    if (!isNaN(Number(_value))) {
      this.setState({ [name]: _value });
    }
  };
  onChangeChecked = (e) => {
    var { name } = e.target;
    this.setState({ [name]: !this.state[name] });
  };

  handleUpdate = () => {
    const { store_code } = this.props.match.params;
    var {
      is_calculate_ship,
      use_fee_from_partnership,
      fee_urban,
      fee_suburban,
      provices,
      proviceOptions,
    } = this.state;
    var urban_list_id_province = [];
    if (proviceOptions?.length > 0) {
      for (const item of proviceOptions) {
        urban_list_id_province.push(item.value);
      }
    }

    const formData = {
      is_calculate_ship,
      use_fee_from_partnership,
      fee_urban,
      fee_suburban,
      urban_list_id_province,
    };
    this.props.updateShipConfig(store_code, formData);
  };

  componentWillReceiveProps = (nextProps) => {
    if (!shallowEqual(nextProps.shipConfig, this.props.shipConfig)) {
      var { shipConfig } = nextProps;
      var { urban_list_name_province } = shipConfig;
      this.setState({
        is_calculate_ship: shipConfig.is_calculate_ship,
        use_fee_from_partnership: shipConfig.use_fee_from_partnership,
        fee_urban: shipConfig.fee_urban,
        fee_suburban: shipConfig.fee_suburban,
        proviceOptions: shipConfig.urban_list_id_province?.map(
          (data, index) => {
            return {
              value: data,
              label: urban_list_name_province[index],
            };
          }
        ),
      });
    }

    if (!shallowEqual(nextProps.province, this.props.province)) {
      var provices = nextProps.province;
      var options = null;
      options = provices.map((provice, index) => {
        return { value: provice.id, label: provice.name };
      });
      this.setState({ provices: options });
      // var province = {};
      // var provices = [...nextProps.provice];
      // if (provices.length > 0) {
      //     province = { value: province[0].id, label: province[0].title }

      // }
    }
  };
  onChangeSelect = (selectValue) => {
    this.setState({ proviceOptions: selectValue });
  };

  componentDidMount() {
    const { store_code } = this.props.match.params;
    this.props.fetchShipConfig(store_code);
    this.props.fetchPlaceProvince();
  }

  render() {
    const { store_code } = this.props.match.params;
    var { shipConfig } = this.props;
    var {
      is_calculate_ship,
      use_fee_from_partnership,
      fee_urban,
      fee_suburban,
      provices,
      proviceOptions,
    } = this.state;
    // var {isShow} = this.state
    var isShow = true;
    console.log(proviceOptions, provices);
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Cấu hình phí Ship
                    </h4>{" "}
                  </div>

                  <br></br>
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <div className="wrap-card">
                        <div
                          className="wrap-setting"
                          style={{
                            maxWidth: "430px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Cho phép tính ship khi mua hàng</div>

                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="switch2"
                              name="is_calculate_ship"
                              checked={is_calculate_ship}
                              onChange={this.onChangeChecked}
                            />
                            <label
                              class="custom-control-label"
                              for="switch2"
                            ></label>
                          </div>
                        </div>
                        {is_calculate_ship && (
                          <div
                            className="wrap-setting"
                            style={{
                              maxWidth: "430px",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "8px 0px",
                            }}
                          >
                            <div>
                              Sử dụng phí vận chuyển từ đơn vị vận chuyển
                            </div>
                            <form action="/action_page.php">
                              <div class="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="switch3"
                                  name="use_fee_from_partnership"
                                  checked={use_fee_from_partnership}
                                  onChange={this.onChangeChecked}
                                />
                                <label
                                  class="custom-control-label"
                                  for="switch3"
                                ></label>
                              </div>
                            </form>
                          </div>
                        )}
                        {use_fee_from_partnership === false &&
                          is_calculate_ship && (
                            <React.Fragment>
                              <div class="form-group">
                                <label for="product_name">
                                  Danh sách các tỉnh áp dụng phí cố định
                                </label>
                                <Select
                                  placeholder="-- Danh sách các tỉnh --"
                                  value={proviceOptions}
                                  isClearable
                                  isSearchable
                                  isMulti
                                  options={provices}
                                  name="txtCategory"
                                  onChange={this.onChangeSelect}
                                />
                              </div>
                              <div class="form-group">
                                <label for="product_name">
                                  Phí cố định nội thành
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="txtTitle"
                                  value={formatNoDWithEmpty(fee_urban)}
                                  name="fee_urban"
                                  placeholder="Nhập phí..."
                                  autoComplete="off"
                                  onChange={this.onChange}
                                />
                              </div>

                              <div class="form-group">
                                <label for="product_name">
                                  Phí cố định ngoại thành
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="txtTitle"
                                  value={formatNoDWithEmpty(fee_suburban)}
                                  name="fee_suburban"
                                  placeholder="Nhập phí..."
                                  autoComplete="off"
                                  onChange={this.onChange}
                                />
                              </div>
                            </React.Fragment>
                          )}
                      </div>
                      <button
                        class="btn btn-primary btn-sm"
                        onClick={this.handleUpdate}
                      >
                        <i class="fa fa-save"></i> Lưu
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    permission: state.authReducers.permission.data,
    shipConfig: state.storeAReducers.storeAddress.shipConfig,
    province: state.placeReducers.province,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchShipConfig: (id) => {
      dispatch(StoreAAction.fetchShipConfig(id));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    updateShipConfig: (store_code, data) => {
      dispatch(StoreAAction.updateShipConfig(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
