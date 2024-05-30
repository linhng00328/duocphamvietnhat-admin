import React, { Component } from "react";


class SeoOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSeoDescription: "",
            txtSeoTitle: "",
            isLoaded: true,
        };

    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.txtSeoDescription !== this.state.txtSeoDescription ||
            nextState.txtSeoTitle !== this.state.txtSeoTitle
        ) {
            this.props.handleDataFromContent({
                txtSeoDescription: nextState.txtSeoDescription,
                txtSeoTitle: nextState.txtSeoTitle,

            })
        }
        if (nextProps.txtSeoDescription !== this.props.txtSeoDescription
            ||
            nextProps.txtSeoTitle !== this.props.txtSeoTitle
            || nextState.isLoaded == true) {
            this.setState({
                txtSeoDescription: nextProps.txtSeoDescription,
                txtSeoTitle: nextProps.txtSeoTitle,
                isLoaded: false
            })
        }
        return true
    }



    render() {
        var { txtSeoDescription, txtSeoTitle } = this.state;
      
        return (
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                    <label for="product_name">Title</label>
                    <p> <i >Bỏ trống mặc định sẽ lấy tiêu đề bài viết</i></p>
                    <textarea value={txtSeoTitle} maxlength="100"
                        onChange={this.onChange}
                        name="txtSeoTitle" id="input" class="form-control" rows="1" ></textarea>


                </div> <div class="form-group">
                    <label for="product_name">Description</label>
                    <p> <i >Bỏ trống mặc định sẽ lấy một phần nội dung</i></p>
                    <textarea value={txtSeoDescription} maxlength="200"
                        onChange={this.onChange}
                        name="txtSeoDescription" id="input" class="form-control" rows="3" ></textarea>


                </div>

            </div>
        );
    }
}

export default SeoOption;
