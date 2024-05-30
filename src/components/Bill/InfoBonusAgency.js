import React, { Component } from "react";
import { filter_arr, format } from "../../ultis/helpers";
import * as Env from "../../ultis/default";
import { Link } from "react-router-dom";

class InfoBonusAgency extends Component {
  constructor(props) {
    super(props);
  }

  showAgencyDetail = (agencyDetail) => {
    return (
      <li className="row" style={{ display: "flex", marginBottom: "10px" }}>
        <li className="cart_item cart_item_change col-lg-3 col-md-12 col-sm-12 ">
          <div className="panel panel-default mb0" style={{}}>
            <div className="panel-body pd0">
              <img
                data-toggle="tooltip"
                title={agencyDetail.reward_name}
                className="cart_item_img"
                style={{ width: "120px", maxHeight: "120px" }}
                src={agencyDetail.reward_image_url}
              />
            </div>
          </div>
        </li>

        <li className="cart_item cart_item_change col-lg-8 col-md-12 col-sm-12">
          <div class="col-xs-12 pl0" id="user_cart_info">
            <div class="box box-warning cart_wrapper mb0">
              <div class="box-body  pt0">
                <div>
                  <p
                    class="bold_name sale_user_label"
                    style={{ fontWeight: "500" }}
                  >
                    Tên phần thưởng:
                    <span>&nbsp;{agencyDetail.reward_name}</span>
                  </p>
                </div>

                <div>
                  <p class=" bold sale_user_label">
                    Trị giá:
                    <span class="cart_payment_method">
                      {format(agencyDetail.reward_value)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </li>
    );
  };
  render() {
    var { bill } = this.props;
    var { bonus_agency_history } = bill;
    if (bonus_agency_history == null) return "";

    return (
      <div
        className="card box box-warning cart_wrapper mb0"
        style={{ marginTop: 10 }}
      >
        <div className="box-header">
          <span className="box-title ">Thưởng cho đại lý</span>
        </div>
        <br></br>
        <ul
          id="sale_cart_container"
          className="box-body  no-padding cart_items"
        >
          {this.showAgencyDetail(bonus_agency_history)}
        </ul>
      </div>
    );
  }
}

export default InfoBonusAgency;
