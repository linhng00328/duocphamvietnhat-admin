import { data } from "jquery";
import React, { Component } from "react";
import { filter_var, filter_arr, format } from "../../ultis/helpers";

class OrderHistory extends Component {
    constructor(props) {
        super(props);
    }

    
  showHistory = (historys) => {
    var result = null;
    if (historys.length > 0) {
      result = historys.map((history, index) => {
     

        return (
          <tr>
            <td>{index + 1}</td>

            <td>
                {history.note}
            </td>

            <td>
                {history.updated_at}
            </td>
         
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

    render() {
     
        var {billHistoty} = this.props
        return (
            <div class="tab-pane " id="chicken" role="tabpanel" aria-labelledby="chicken-tab">

            <div class="table-responsive">
                <table class="table table-hover table-bordered  table-border">
                    <thead>
                        <tr>
                        <th>STT</th>

                            <th>Trạng thái</th>
                            <th>Thời gian</th>

                        </tr>
                    </thead>
                    <tbody>
                       {this.showHistory(billHistoty)}
                    </tbody>
                </table>
            </div>

        </div>
        );
    }
}

export default OrderHistory;
