import React, { Component } from "react";
import getChannel from "../../../ultis/channel";
import history from "../../../history";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  passPagination = (page) => {
    const { setPage, store_code } = this.props;
    setPage(page);
    history.push(`/game_spin_wheels/${store_code}?page=${page}`);
  };

  showData = (links) => {
    var result = null;
    if (typeof links == "undefined") {
      return result;
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active" : null;
        var label =
          data.label.includes("&laquo; ") || data.label.includes(" &raquo;")
            ? data.label
                .replace("&laquo; Previous", "Trước")
                .replace("Next &raquo;", "Sau")
            : data.label;
        if (data.url == null) {
          return (
            <li class={`page-item ${active} `}>
              <a class="page-link">{label}</a>
            </li>
          );
        } else {
          return (
            <li class={`page-item ${active} `}>
              <a
                onClick={() => this.passPagination(data.url.split("?page=")[1])}
                class="page-link"
              >
                {label}
              </a>
            </li>
          );
        }
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.listGameSpinWheels.links)}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
