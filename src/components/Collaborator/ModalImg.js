import React, { Component } from "react";


class Modal extends Component {


  render() {
    var { modal } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalImg"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">

          <div class="modal-content">
            {/* <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4 style={{ color: "white" }}>Thông báo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <form
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>

                {
                     <img
                     style = {{
                        margin: "auto",
                        display: "flex",
                        "max-width": "500px",
                        "max-height": "550px",
                        "object-fit": "contain",    
                        "border-radius": "0%"
                     }}
                    //  width="120"
                    //  height="125px"
                     src={this.props.img}
                     class="img-responsive"
                     alt="Image"
                   />
                }

              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
     
              </div>
            </form>
          </div>



        
          </div>
        </div>
      </div>
    );
  }
}


export default Modal;
