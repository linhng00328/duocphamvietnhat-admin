import React, { Component } from "react";
import * as helper from "../../../ultis/helpers"
import { connect } from "react-redux";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUpload: null
        };
    }



    showHeader = (data) => {
        var result = null
        if (typeof data == "undefined") {
            return result
        }
        if (data.length > 0) {
            result = data.map((item, index) => {
                return (
                    <th>{item}</th>
                );
            });
        }
        else {

        }
        return result
    }



    onChange = (e,item) =>{
        var {checked} = e.target
        this.props.handleChangeValue(checked,item)
    }


    showBody = (data) => {
        var result = null
        if (typeof data == "undefined") {
            return result
        }
        if (data.length > 0) {
            var {state} = this.props
            result = data.map((item, index) => {
                return (
                    <td>
                        {" "}
                        <input
                        checked = {state[item]}
                            type="checkbox"
                            onChange = {(e) => this.onChange(e,item)}
                        />
                    </td>
                );
            });
        }
        else {

        }
        return result
    }

    render() {
        var { name, header, body } = this.props
        console.log(header)
        return (
            <div class="form-group">
                <div className="div-label-permission">
                    {" "}
                    <label className="text-label-permission" for="group_name">
                        {name}
                    </label>
                </div>
                <table class="table table-border permission">
                    {" "}
                    <thead>
                        <tr>
                            {this.showHeader(header)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            {this.showBody(body)}

                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}



export default List
