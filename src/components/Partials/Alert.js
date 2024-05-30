import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../constants/ActionType"
import ReactHtmlParser from 'react-html-parser'; 

class Alert extends Component {
  constructor(props) {
    super(props);
  
  }
  closeAlert = () => {
    this.props.closeAlert({
      type: Types.ALERT_UID_STATUS,
      alert: {
        type: "danger",
        title: "Lỗi",
        disable: "hide",
      },
    })
  }
  componentWillReceiveProps(nextProps)
  {
    if(nextProps.alert.disable == "show")
    {
      setTimeout(() => {
          this.props.closeAlert({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "hide",
            },
          })
      }, 7000);
    }
  }
  render() {
    var { alert } = this.props;
    var disable = typeof alert.disable == "undefined" ? "hide" : alert.disable
    return (
      <div
      style = {{zIndex : "9999"}}
        className={`alert-css alert alert-${alert.type} alert-dismissible fade ${disable}`}
        role="alert"
      >
        {/* <strong>{alert.title}! </strong> */}
        { ReactHtmlParser(alert.content) }
        <button type="button" className="close" onClick={this.closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

    alert: state.errResposeReducers.alert_status,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    
    closeAlert: (form) => {
      dispatch(form);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);


