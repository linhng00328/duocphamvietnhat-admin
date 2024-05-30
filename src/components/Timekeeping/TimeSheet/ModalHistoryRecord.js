import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from "moment";

import themeData from "../../../ultis/theme_data";
import date from 'react-moment-input/dist/date';

class ModalHistoryRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }

    }

    toHHMMSS = (secs) => {
        var sec_num = parseFloat(secs, 10)
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
    
        return `${hours} giờ ${minutes} phút ${seconds} giây`

        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    showHistory = (recording_time) => {

        var { recording_time } = this.props
        console.log("recording_time", recording_time)

        var result = null
        result = recording_time.map((data, index) => {
            console.log("recording_time", data.total_in_time)

            return <div className='' style={{
                width: "100%",
                borderRadius: "0.5rem",
                marginBottom: "0.5rem",
            }}>

                <div
                    className='col-md-auto'
                >

                    <span style={{ color: "green", fontWeight: "bold" }}>
                        Vào: {data.time_check_in}
                    </span>
                    <span style={{ color: "orange", fontWeight: "bold", paddingLeft:20 }}>
                        Ra: {data.time_check_out}
                    </span>
                    <span style={{  paddingLeft:20 }}>
                        Ghi nhận: {data.total_in_time < 0 ?  "-" : ""}{this.toHHMMSS(data.total_in_time < 0 ? (data.total_in_time * -1) :data.total_in_time )}
                    </span>
                </div>

            </div>

            return (


                <React.Fragment>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            background: `${data.is_checkin == true ? "lightgreen" : "lightgoldenrodyellow"}`,
                            width: "fit-content",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            marginBottom: "0.5rem",
                            width: "100%"
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    background: "green",
                                    padding: "0.02rem 0.5rem",
                                    borderRadius: "50%",
                                    marginRight: "0.3rem",
                                    color: "green",
                                }}
                            ></span>
                            <span style={{ color: `${data.is_checkin == true ? "green" : "orange"}`, fontWeight: "bold" }}>
                                {data.is_checkin == true ? "Vào làm:" : "Tan làm:"}
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                                {moment(data?.time_check).format(
                                    "HH:mm:ss"
                                )}
                                &nbsp;({data.is_bonus == true ? <span style={{ color: "green" }}>
                                    Thêm công
                                </span> : <span style={{ color: "red" }}>
                                    Bớt công
                                </span>})
                            </span>
                        </div>

                        <div>
                            {data?.remote_timekeeping ? (
                                <span
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    (Từ xa){" "}
                                </span>
                            ) : (
                                <span></span>
                            )}

                            <span style={{ color: "gray" }}>
                                {data?.reason
                                    ? `Lý do: ${data?.reason}`
                                    : ""}
                            </span>

                        </div>
                    </div>


                </React.Fragment>
            )
        })
        return result
    }

    render() {
        var { recording_time } = this.props

        return (
            <>


                <div class="modal" id="modalHistoryRecord">
                    <div class="modal-dialog modal-lg" style = {{maxWidth : "620px"}}>
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", backgroundColor: themeData().backgroundColor }}>
                                <h4 style={{ color: "white", margin: "10px" }}>Chấm công ghi nhận</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <React.Fragment>
                                    {this.showHistory(recording_time)}
                                </React.Fragment>
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

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {

}

export default connect(null, mapDispatchToProps)(ModalHistoryRecord)