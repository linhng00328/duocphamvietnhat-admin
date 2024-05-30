import React, { Component } from "react";

import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";


class Seo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            google_tag_manager_id: null,
            code_google_analytics: null,
            google_site_verification_code:null,
            meta_pixel_code:null
        }
    }


    componentDidMount() {
        var theme = this.props.theme
        if (theme == null || theme == "" || typeof theme.store_id == "undefined") { }
        else {
            this.setState({
                google_tag_manager_id: theme.google_tag_manager_id,
                code_google_analytics: theme.code_google_analytics,
                google_site_verification_code:theme.google_site_verification_code,
                meta_pixel_code:theme.meta_pixel_code
            })
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.tabId != this.props.tabId)
        if (!shallowEqual(nextProps.theme, this.props.them) || (nextProps.tabId != this.props.tabId)) {
            var theme = nextProps.theme
            this.setState({
                google_tag_manager_id: theme.google_tag_manager_id,
                code_google_analytics: theme.code_google_analytics,
                google_site_verification_code:theme.google_site_verification_code,
                meta_pixel_code:theme.meta_pixel_code
            })
        }


    }

    onSave = (e) => {
        e.preventDefault();
        var { store_code } = this.props
        var theme = this.state
        var form = { ...this.props.theme }

        form.google_tag_manager_id = theme.google_tag_manager_id
        form.code_google_analytics = theme.code_google_analytics
        form.google_site_verification_code = theme.google_site_verification_code
        form.meta_pixel_code = theme.meta_pixel_code

        this.props.updateTheme(store_code, form);
    }
    render() {
        var
            { google_tag_manager_id,
                code_google_analytics,
                google_site_verification_code,
                meta_pixel_code
            } = this.state

        return (
            <div className="support">
                <form role="form" onSubmit={this.onSave} >

                    <div class="box-body">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}>




                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Mã Google Analytics</label>
                            <div class="form-group" style={{ display: "flex" }}>
                                <input style={{ maxWidth: "500px" }}  name="code_google_analytics" value={code_google_analytics} placeholder="Nhập Google Analytics ID (Ví dụ: UA-64282XXX-1)" onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />


                            </div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Google Tag Manager ID</label>
                            <div class="form-group" style={{ display: "flex" }}>
                                <input style={{ maxWidth: "500px" }}  name="google_tag_manager_id" value={google_tag_manager_id} placeholder="Nhập Google Tag Manager ID (Ví dụ: GTM-5FJXXX)" onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />


                            </div>

                        </div>
                      
                        <div className="form-group">
                            <label htmlFor="name">Mã Google Site Verification</label>
                            <div class="form-group" style={{ display: "flex" }}>
                                <input style={{ maxWidth: "500px" }}  name="google_site_verification_code" value={google_site_verification_code} placeholder="Nhập mã..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />


                            </div>

                        </div>


                        <div className="form-group">
                            <label htmlFor="name">Meta Pixel Code</label>
                            <div class="form-group" style={{ display: "flex" }}>
                                <input style={{ maxWidth: "500px" }}  name="meta_pixel_code" value={meta_pixel_code} placeholder="Nhập mã..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />


                            </div>

                        </div>
                      


                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-info  btn-sm">

                            <i class="fas fa-save"></i>

                            &nbsp;&nbsp;Lưu
                        </button>

                    </div>
                </form>


            </div>
        );

    }
}


const mapStateToProps = (state) => {
    return {



    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateTheme: (store_code, theme) => {
            dispatch(themeAction.updateTheme(store_code, theme));
        },


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Seo);