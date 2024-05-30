import React, { Component } from "react";
import { connect } from "react-redux";

import themeData from "../../../ultis/theme_data";
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_video: null
    };
  }




  render() {
    var { id_video } = this.props;
    console.log(id_video)
    return (

      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="PlayModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Play video</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.handleClear}
              >
                &times;
              </button>
            </div>

            <div class="modal-body" style={{ padding: " 0 10px", }}>
              <iframe
                style={{
                  width: "100%",
                  height: "400px"
                }}
                //  width="420" height="315"
                src={`https://www.youtube.com/embed/${id_video}?autoplay=1&mute=1`}>
              </iframe>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={this.handleClear}
              >
                Đóng
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
