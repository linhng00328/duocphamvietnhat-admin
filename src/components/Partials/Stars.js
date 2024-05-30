import React, { Component } from "react";
import Loading from "./Loading";
class Stars extends Component {


    showStars = (num)=>{
        var result = []
        
        for (let index = 1; index < 6; index++) {
            var checked = index <= num ? "checked-star" : "not-checked-star"
              result.push(
                <span class={`fa fa-star ${checked}`}></span>
              )        
        }
        return result
    }
    render() {

        var {num} = this.props

        return (
            <React.Fragment>
                
              {this.showStars(num)}
            </React.Fragment>
        );
    }
}

export default Stars;
