import { Component } from "react";

class PaginationHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  passPagination = (page) => {
    this.props.setPage(page);
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
            <li class={`page-item ${active} `} key={index}>
              <span class="page-link">{label}</span>
            </li>
          );
        } else {
          return (
            <li class={`page-item ${active} `} key={index}>
              <span
                onClick={() => this.passPagination(data.url.split("?page=")[1])}
                className="page-link"
              >
                {label}
              </span>
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
      <nav aria-label="Page navigation" className="float-pagination">
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.allHistoriesBalance.links)}
        </ul>
      </nav>
    );
  }
}

export default PaginationHistory;
