import React, { Component } from "react";
import {connect} from "react-redux"

class Loading extends Component {

    
  render() {
    var {loading} = this.props
    return (
      <div id="loader-wrapper"className = {loading} >
        <div id="loader">

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      loading: state.loadingReducers.disable_lazy,
  
    };
  };
export default connect(mapStateToProps, null)(Loading);