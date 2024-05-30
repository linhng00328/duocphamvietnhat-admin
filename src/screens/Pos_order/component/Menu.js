import React, { Component } from "react";
export default class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        var { shadow } = this.props
        return (
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: 4,
                    boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                    marginTop: 8,
                    position: 'absolute',
                    zIndex: 3,
                    width : "100%"
                }}
                {...this.props}
            />
        );
    };

}