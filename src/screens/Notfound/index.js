import React, { Component } from "react";
import Sidebar from '../../components/Home/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import Footer from '../../components/Partials/Footer'
import {Link} from "react-router-dom"

class Notfound extends Component {

  render() {
    return (
        <div id="wrapper">

        <Sidebar/>

        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

          <Topbar/>

          <div class="container-fluid">

<div class="text-center">
    <div class="error mx-auto" data-text="404">404</div>
    <p class="lead text-gray-800 mb-5">Không tìm thấy trang</p>
    <p class="text-gray-500 mb-0">Trang truy cập không tồn tại hoặc đang có lỗi xãy ra !!!</p>
    <Link to="/dashboard/duocphamnhatban">&larr; Trở về trang chủ</Link>
</div>

</div>

            </div>

            <Footer/>

        </div>

    </div>
    )
  }

}

export default Notfound;
