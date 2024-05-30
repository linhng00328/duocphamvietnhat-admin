import React, { Component } from "react";

class ModalImg extends Component {
    

  render() {
    var img = this.props.img 
     
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="ImgModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content modal-lg">
            <div class="modal-header" style={{ background: "white" }}>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          
              <div style = {{textAlign : "center" , maxHeight : "620px"}} class="modal-body">
                
                <img src={img} width="400px"  class="img-responsive" alt="Image"/>
                
              </div>
           
          </div>
        </div>
      </div>
    );
  }
}


export default ModalImg;
