import React, { Component } from "react";
import Select from "react-select";

class SeoOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSeoDescription: "",
      txtSeoTitle: "",
      isLoaded: true,
      meta_robots_index: "noindex",
      meta_robots_follow: "nofollow",
      canonical_url: "",
      post_url: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.txtSeoDescription !== this.state.txtSeoDescription ||
      nextState.txtSeoTitle !== this.state.txtSeoTitle ||
      nextState.meta_robots_index !== this.state.meta_robots_index ||
      nextState.meta_robots_follow !== this.state.meta_robots_follow ||
      nextState.canonical_url !== this.state.canonical_url ||
      nextState.post_url !== this.state.post_url
    ) {
      this.props.handleDataFromContent({
        txtSeoDescription: nextState.txtSeoDescription,
        txtSeoTitle: nextState.txtSeoTitle,
        meta_robots_index: nextState.meta_robots_index?.value,
        meta_robots_follow: nextState.meta_robots_follow?.value,
        canonical_url: nextState.canonical_url,
        post_url: nextState.post_url,
      });
    }
    if (
      nextProps.txtSeoDescription !== this.props.txtSeoDescription ||
      nextProps.meta_robots_index !== this.props.meta_robots_index ||
      nextProps.meta_robots_follow !== this.props.meta_robots_follow ||
      nextProps.canonical_url !== this.props.canonical_url ||
      nextProps.post_url !== this.props.post_url ||
      nextProps.txtSeoTitle !== this.props.txtSeoTitle ||
      nextState.isLoaded == true
    ) {
      this.setState({
        txtSeoDescription: nextProps.txtSeoDescription,
        txtSeoTitle: nextProps.txtSeoTitle,
        canonical_url: nextProps.canonical_url,
        post_url: nextProps.post_url,
        meta_robots_index: {
          label: nextProps.meta_robots_index == "index" ? "Index" : "NoIndex",
          value: nextProps.meta_robots_index,
        },
        meta_robots_follow: {
          label:
            nextProps.meta_robots_follow == "follow" ? "Follow" : "NoFollow",
          value: nextProps.meta_robots_follow,
        },
        isLoaded: false,
      });
    }
    return true;
  }

  render() {
    var { txtSeoDescription, txtSeoTitle } = this.state;

    return (
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="form-group">
          <label for="product_name">Title</label>
          <p>
            {" "}
            <i>Bỏ trống mặc định sẽ lấy tiêu đề bài viết</i>
          </p>
          <textarea
            value={txtSeoTitle}
            maxlength="100"
            onChange={this.onChange}
            name="txtSeoTitle"
            id="input"
            class="form-control"
            rows="1"
          ></textarea>
        </div>{" "}
        <div class="form-group">
          <label for="product_name">Description</label>
          <p>
            {" "}
            <i>Bỏ trống mặc định sẽ lấy một phần nội dung</i>
          </p>
          <textarea
            value={txtSeoDescription}
            maxlength="200"
            onChange={this.onChange}
            name="txtSeoDescription"
            id="input"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Đường dẫn</label>
          <div
            style={{
              border: "1px solid #d1d3e2",
              borderRadius: "0.35rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                paddingLeft: "8px",
                color: "gray",
              }}
            >
              https://duocphamnhatban.ikitech.vn/
            </span>
            <input
              type="text"
              name="post_url"
              onChange={this.onChange}
              value={this.state.post_url}
              style={{
                minWidth: "200px",
                outline: "none",
                border: "none",
                paddingLeft: "8px",
                height: "calc(1.5em + 0.75rem + 2px)",
                borderRadius: "0.35rem",
                flex: 1,
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Canonical Url</label>
          <div
            style={{
              border: "1px solid #d1d3e2",
              borderRadius: "0.35rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                paddingLeft: "8px",
                color: "gray",
              }}
            >
              https://duocphamnhatban.ikitech.vn/
            </span>
            <input
              type="text"
              name="canonical_url"
              onChange={this.onChange}
              value={this.state.canonical_url}
              style={{
                minWidth: "200px",
                outline: "none",
                border: "none",
                paddingLeft: "8px",
                height: "calc(1.5em + 0.75rem + 2px)",
                borderRadius: "0.35rem",
              }}
            />
          </div>
          <div
            className="form-group"
            style={{
              marginTop: "8px",
            }}
          >
            <label>Meta Robots Index</label>

            <div
              style={{
                width: "150px",
              }}
            >
              <Select
                value={this.state.meta_robots_index}
                onChange={(value) => {
                  this.setState({ meta_robots_index: value });
                }}
                options={[
                  { value: "noindex", label: "NoIndex" },
                  { value: "index", label: "Index" },
                ]}
                placeholder="Chọn meta"
                name="meta_robots_index"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Meta Robots Follow</label>

            <div
              style={{
                width: "150px",
              }}
            >
              <Select
                value={this.state.meta_robots_follow}
                onChange={(value) => {
                  this.setState({ meta_robots_follow: value });
                }}
                options={[
                  { value: "nofollow", label: "NoFollow" },
                  { value: "follow", label: "Follow" },
                ]}
                placeholder="Chọn meta"
                name="meta_robots_follow"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SeoOption;
