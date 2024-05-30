import React, { Component } from "react";
import Sidebar from "../../components/Home/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Link } from "react-router-dom";

class Notfound extends Component {
  render() {
    return (
      <div class="container-fluid" style={{ marginBottom: "500px" }}>
        <div class="text-center">
          <p class="lead text-gray-800 ">Bạn chưa được cấp quyền</p>
          <p class="text-gray-500 mb-0">
            Vui lòng cấp quyền để thực hiện chức năng này
          </p>
        </div>
      </div>
    );
  }
}

export default Notfound;
