import React, { Component } from "react";
class LoadMess extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div style ={{textAlign : "center"}}>
                <img
                    class={`img-profile rounded-circle `}
                    width="100px"
                    src="https://icon-library.com/images/facebook-loading-icon/facebook-loading-icon-8.jpg"
                ></img>
            </div>
        );
    }
}

export default LoadMess;
