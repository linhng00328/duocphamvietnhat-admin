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
        if (nextProps.product.seo_description !== this.props.product.seo_description
            ||
            nextProps.product.seo_title !== this.props.product.seo_title
            || nextState.isLoaded == true) {
            this.setState({
                txtSeoDescription: nextProps.product.seo_description,
                txtSeoTitle: nextProps.product.seo_title,
                isLoaded: false
            })
        }
        return true
    }



    render() {
        var { txtSeoDescription, txtSeoTitle } = this.state;
        console.log(this.state)
        return (
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                    <label for="product_name">Title</label>
                    <p> <i >Bỏ trống mặc định sẽ lấy tên sản phẩm</i></p>
                    <textarea value={txtSeoTitle} maxlength="100"
                        onChange={this.onChange}
                        name="txtSeoTitle" id="input" class="form-control" rows="1" required="required"></textarea>


                </div> <div class="form-group">
                    <label for="product_name">Description</label>
                    <p> <i >Bỏ trống mặc định sẽ lấy nội dung chi tiết</i></p>
                    <textarea value={txtSeoDescription} maxlength="200"
                        onChange={this.onChange}
                        name="txtSeoDescription" id="input" class="form-control" rows="3" required="required"></textarea>


                </div>

            </div>
        );
    }
}

export default SeoOption;
