import React, { Component } from "react";
import { Link } from "react-router-dom";
import { filter_var } from "../../ultis/helpers";
import moment from "moment";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPassword: "",
      txtOTP: "",
    };
  }

  render() {
    var {
      store,
      store_code,
      collaborators,
      numDiscount,
      agencys,
      badges,
      customers,
    } = this.props;
    var total_collaborators =
      typeof collaborators != "undefined" ? collaborators.total : 0;
    var total_agencys = typeof agencys != "undefined" ? agencys.total : 0;
    var total_customers = typeof customers != "undefined" ? customers.total : 0;

    var total_orders = filter_var(store.total_orders);
    var total_products = filter_var(store.total_products);
    var total_posts = filter_var(store.total_posts);
    console.log(collaborators);
    return (
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body set-padding ">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className=" font-weight-bold text-primary text-uppercase mb-1">
                    <Link
                      to={`/order/${store_code}?from=${moment().format(
                        "DD-MM-YYYY"
                      )}&to=${moment().format("DD-MM-YYYY")}`}
                    >
                      Đơn hàng hôm nay
                    </Link>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {badges.total_orders_in_day}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body set-padding">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div>
                    <Link
                      className=" font-weight-bold text-success text-uppercase mb-1"
                      to={`/product/index/${store_code}`}
                    >
                      Sản phẩm
                    </Link>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {total_products}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-boxes fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-secondary shadow h-100 py-2">
            <div className="card-body set-padding">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div>
                    <Link
                      className=" font-weight-bold text-secondary text-uppercase mb-1"
                      to={`/posts/index/${store_code}`}
                    >
                      Bài viết
                    </Link>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {total_posts}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-newspaper fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body set-padding">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div>
                    <Link
                      className=" font-weight-bold text-danger text-uppercase mb-1"
                      to={`/collaborator/${store_code}?tab-index=1`}
                    >
                      Cộng tác viên
                    </Link>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {total_collaborators}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body set-padding">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div>
                    <Link
                      className=" font-weight-bold text-info text-uppercase mb-1"
                      to={`/agency/${store_code}?tab-index=1`}
                    >
                      Đại lý
                    </Link>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {total_agencys ?? 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body set-padding ">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div>
                    <Link
                      className=" font-weight-bold text-warning text-uppercase mb-1"
                      to={`/customer/${store_code}`}
                    >
                      {" "}
                      Khách hàng
                    </Link>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {total_customers}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-secondary text-uppercase mb-1" to={`/discount/${store_code}`}>Khuyến mại
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{numDiscount}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-percent fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    );
  }
}

export default General;
