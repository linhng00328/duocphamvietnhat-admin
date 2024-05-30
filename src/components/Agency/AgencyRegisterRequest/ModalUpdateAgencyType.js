import { Component } from "react";
import themeData from "../../../ultis/theme_data";
import styled from "styled-components";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import { formatNumberV2 } from "../../../ultis/helpers";
import moment from "moment";

const ModalUpdateAgencyTypeStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .formBalance {
    h5 {
      margin-bottom: 20px;
    }
    .item-balance {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      &:first-of-type {
        margin-bottom: 15px;
      }
      label {
        margin-bottom: 0;
      }
      input {
        border: 1px solid #e3e6f0;
        padding: 8px 15px;
        border-radius: 4px;
      }
    }
  }
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

class ModalUpdateAgencyType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPrice: "",
      agency_type_id: null,
    };
  }

  handleCloseModal = () => {
    this.props.setAgencySelected({});
  };

  handleApproveRequestAgency = (e) => {
    const { agency_type_id } = this.state;
    const { store_code, handleAgencyRegisterRequest, agencySelected } =
      this.props;
    e.preventDefault();
    if (!agency_type_id) {
      this.setState({ errorPrice: "Vui lòng chọn cấp đại lý!" });
      return;
    }
    handleAgencyRegisterRequest(
      store_code,
      agencySelected.id,
      {
        status: 2,
        agency_type_id: agency_type_id ? Number(agency_type_id) : null,
      },
      () => {
        this.handleCloseModal();
        this.setState({ errorPrice: "", agency_type_id: null });
      }
    );
  };

  render() {
    const { agencySelected, types } = this.props;
    const { agency_type_id } = this.state;

    return (
      <ModalUpdateAgencyTypeStyles
        className="modal "
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "400px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <h4
                style={{
                  marginBottom: "0px",
                }}
              >
                Chọn cấp đại lý{" "}
                {agencySelected?.agency?.customer
                  ? `cho KH: ${agencySelected?.agency?.customer?.name}`
                  : ""}
              </h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModal}
              >
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={this.handleApproveRequestAgency}
                className="formBalance"
              >
                <div className="item-balance">
                  <label htmlFor="money">Cấp đại lý</label>
                  <select
                    style={{ width: "100%" }}
                    name="agency_type_id"
                    id="input"
                    value={agency_type_id === null ? "0" : agency_type_id}
                    required="required"
                    onChange={(e) =>
                      this.setState({
                        agency_type_id: e.target.value,
                        errorPrice: "",
                      })
                    }
                    className="form-control"
                  >
                    {<option value="0">--Chưa chọn--</option>}
                    {types.map((data, index) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                {this.state.errorPrice !== "" ? (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#e74c3c",
                    }}
                  >
                    {this.state.errorPrice}
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    columnGap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <button type="submit" className="btn btn-outline-primary">
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={this.handleCloseModal}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ModalUpdateAgencyTypeStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.agencyReducers.agency.allAgencyType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePriceBalance: (store_code, idAgency, data) => {
      dispatch(agencyAction.changePriceBalance(store_code, idAgency, data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateAgencyType);
