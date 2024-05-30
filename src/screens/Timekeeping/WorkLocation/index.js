import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";

import { Redirect, Link } from "react-router-dom";

import Loading from "../../Loading";

class WorkLocation extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    var { store_code } = this.props.match.params;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Địa điểm làm việc
                  </h4>{" "}
                </div>

                <br></br>
                <div className="card shadow " style={{ minHeight: "70vh" }}>
                  <div className="card-body">
                    <div class="text-center">
                      <h1
                        class="lead text-gray-800 mb-3"
                        style={{ fontSize: "1.5rem" }}
                      >
                        Vui lòng tải app để quản lý địa chỉ chấm công
                      </h1>

                      <Link to={`/dashboard/${store_code}`} style={{ fontSize: "1rem" }}>
                        &larr; Trở về trang chủ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default WorkLocation;
