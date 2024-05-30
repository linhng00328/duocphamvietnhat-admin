import React, { Component } from "react";
import Sidebar from '../../components/Partials/Sidebar'
import Topbar from '../../components/Partials/Topbar'
import Footer from '../../components/Partials/Footer'
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Route, Link } from "react-router-dom";

class Notification extends Component {
  componentDidMount() {
    $(document).ready(function () {
      $('#dataTable').DataTable();
  });}
  render() {
    return (
        <div id="wrapper">

        <Sidebar/>

        <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

          <Topbar/>

                <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Thông báo</h1>
                       
                    </div>

                 
                    <div class="box-body">
             <table
                      class="table "
                      id="dataTable"
                      width="100%"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Start date</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Tiger Nixon</td>
                          <td>System Architect</td>
                          <td>Edinburgh</td>
                          <td>61</td>
                          <td>2011/04/25</td>
                          <td>
                          <Link to="/cua-hang/1/chinh-sua" class="btn btn-warning btn-sm"><i class="fa fa-edit"></i> Sửa</Link>
                          <a style={{marginLeft:"10px"}}  data-toggle="modal" data-target="#removeModal"  class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Xóa</a>

                          </td>
                        </tr>

                    
                      </tbody>
                    </table>
            </div>

                   

                

                </div>

            </div>

            <Footer/>

        </div>

    </div>
    )
  }

}

export default Notification;
