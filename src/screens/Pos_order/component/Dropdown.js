import React, { Component } from "react";
import Blanket from "./Blanket";
import Menu from "./Menu";
export default class Dropdown extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        var { children,
            isOpen,
            target,
            onClose } = this.props
        return <div style={{ position: 'relative' }}>

            {isOpen ? <Menu>{children}</Menu> : null}
            {isOpen ? <Blanket onClick={onClose} /> : null}

            {target}
        </div>;
    }
}