import React, { Component } from "react";
export default class Blanket extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return <div
            style={{
                bottom: 0,
                left: 0,
                top: 0,
                right: 0,
                position: 'fixed',
                zIndex: 1,
            }}
            {...this.props}
        />

    };

}