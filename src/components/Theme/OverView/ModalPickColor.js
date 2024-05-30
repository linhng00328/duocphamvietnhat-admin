import React, { Component } from "react";
import { SketchPicker } from 'react-color'

class PickColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",

        };
    }


    componentWillReceiveProps(nextProps) {
        if (this.props._color_main_1 != nextProps._color_main_1) {
            this.setState({ color: nextProps._color_main_1 })
        }
    }

    saveColor = () => {
        window.$('.modal').modal('hide');

        this.props.handleChangeColor(this.state.color)
    }
    onChangeColor = (color) => {
        this.setState({ color: color.hex })
    }
    render() {
        var { color } = this.state

        return (
            <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                id="chooseColor"
                data-keyboard="false"
                data-backdrop="static"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h4 class="modal-title">Chọn màu</h4>

                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                        </div>
                        <form
                            role="form"
                            action="#"
                            method="post"
                            id="chooseColor"
                        >


                            <div class="modal-body">
                                <SketchPicker
                                    color={color}
                                    onChangeComplete={this.onChangeColor}
                                />
                            </div>

                            <div class="modal-footer">
                                <button
                                    onClick={this.saveColor}
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                Hủy
                                </button>
                                <button
                                    onClick={this.saveColor}

                                    type="button"
                                    class="btn btn-info">
                                    Lưu
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}




export default PickColor
