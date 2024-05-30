import React, { Component } from "react";
import { connect } from "react-redux";
import * as shipmentAction from "../../actions/shipment";
import * as billAction from "../../actions/bill";

class ChooseShipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idShipper: -1,
      error: null,
    };
  }

  chooseShipper = () => {
    var { bill, order_code, store_code } = this.props;

    if (this.state.idShipper == -1) {
      this.setState({
        error: "Chưa chọn phương thức vận chuyển",
      });
      return;
    }
    this.props.updateOrder(
      {
        partner_shipper_id: this.state.idShipper,
      },
      store_code,
      order_code
    );
  };

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAllShipment(store_code);
  }

  onChangeShipper = (e) => {
    var { value } = e.target;
    this.setState({ idShipper: value });
  };

  render() {
    var { bill, shipment } = this.props;
    var shipper_name = bill.shipper_name;

    return (
      <div className="box box-warning cart_wrapper mb0">
        <div class="card-header py-3">
          <h6 class="m-0 title_content font-weight-bold text-primary">
            Giao vận
          </h6>
        </div>

        <div className="box-body table-responsive pt0">
          <div>
            <div className="m-3">
              <p className="sale_user_label bold">
                Đơn vị vận chuyển: <span id="total_before">{shipper_name}</span>
              </p>
            </div>

            <select
              name=""
              id="input"
              class="form-control"
              required=""
              onChange={this.onChangeShipper}
              value={this.state.idShipper}
            >
              <option value={-1}>---Chọn đơn vị vận chuyển---</option>

              {shipment
                .filter(
                  (ship) =>
                    ship.shipper_config != null &&
                    ship.shipper_config.token != null &&
                    ship.shipper_config.use == true
                )
                .map((ship) => (
                  <option value={ship.id}>{ship.name}</option>
                ))}
            </select>

            <div style={{ textAlign: "center" }}>
              <div class="m-3">
                <button
                  type="button"
                  onClick={() => this.chooseShipper()}
                  className="btn btn-primary  btn-sm"
                  style={{ marginRight: "10px" }}
                >
                  Chọn
                </button>
              </div>
            </div>
            {this.state.error != null ? (
              <p
                class="text-justify text-center"
                style={{
                  fontSize: 13,
                  color: "red",
                }}
              >
                {" "}
                {this.state.error}
              </p>
            ) : (
              <p
                class="text-justify text-center"
                style={{
                  fontSize: 13,
                }}
              >
                {" "}
                Chọn đơn vị vận chuyển để đăng đơn
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shipment: state.shipmentReducers.shipment.allShipment,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllShipment: (store_code) => {
      dispatch(shipmentAction.fetchAllShipment(store_code));
    },
    updateOrder: (data, store_code, order_code) => {
      dispatch(billAction.updateOrder(data, store_code, order_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChooseShipper);
