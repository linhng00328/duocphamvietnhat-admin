import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import FontPicker from "font-picker-react";
import ModalUpload from "../ModalUpload"
import * as Env from "../../../ultis/default"
import SketchPicker from "./ModalPickColor"
class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store_id: "",
            logo_url: null,
            favicon_url: null,
            image_share_web_url: null,
            home_title: "",
            domain: "",
            color_main_1: "",
            font_family: "",
            typeUpload: "",
            loadFont: false,
            home_description: ""
        };
    }




    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value,
        });
    }

    componentDidMount() {
        var theme = this.props.theme
        if (theme == null || theme == "" || typeof theme.store_id == "undefined") { }
        else {
            this.setState({
                store_id: theme.store_id,
                logo_url: theme.logo_url,
                favicon_url: theme.favicon_url,
                image_share_web_url: theme.image_share_web_url,
                home_title: theme.home_title,
                domain: theme.domain,
                color_main_1: theme.color_main_1,
                font_family: theme.font_family,
                home_description: theme.home_description
            })
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("receipt")
        if (!shallowEqual(nextProps.theme, this.props.theme) || (nextProps.tabId != this.props.tabId)) {
            var theme = nextProps.theme
            this.setState({
                store_id: theme.store_id,
                logo_url: theme.logo_url,
                favicon_url: theme.favicon_url,
                image_share_web_url: theme.image_share_web_url,
                home_title: theme.home_title,
                domain: theme.domain,
                color_main_1: theme.color_main_1,
                font_family: theme.font_family,
                home_description: theme.home_description
            })
        }
        if (nextProps.faceImg != this.props.faceImg)
            this.setState({ image_share_web_url: nextProps.faceImg })
        if (nextProps.logoImg != this.props.logoImg)
            this.setState({ logo_url: nextProps.logoImg })
        if (nextProps.faviconImg != this.props.faviconImg)
            this.setState({ favicon_url: nextProps.faviconImg })

    }

    handleChangeColor = (color) => {
        this.setState({ color_main_1: color });
    };
    onChangeUpload = (type) => {
        this.setState({
            typeUpload: type
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.store_id != "" && nextState.loadFont == false) {
            this.setState({ loadFont: true })
        }
        return true
    }
    onSave = (e) => {
        e.preventDefault();
        var { store_code } = this.props
        var theme = this.state
        var form = { ...this.props.theme }
        form.logo_url = theme.logo_url
        form.favicon_url = theme.favicon_url
        form.image_share_web_url = theme.image_share_web_url
        form.home_title = theme.home_title
        form.domain = theme.domain
        form.color_main_1 = theme.color_main_1
        form.font_family = theme.font_family
        form.home_description = theme.home_description
        this.props.updateTheme(store_code, form);
    }
    showFont = (font) => {
        if (this.state.loadFont == true) {
            return <FontPicker
                // apiKey = {Env.API_KEY_FONT}
                apiKey="AIzaSyDIAniO77CXyauCOf7YwBTRKICq9JMbP8E"
                activeFontFamily={font}
                onChange={(nextFont) =>
                    this.setState({
                        font_family: nextFont.family,
                    })
                }
            />
        }

    }
    render() {

        var { logo_url,
            favicon_url,
            image_share_web_url,
            home_title,
            domain,
            color_main_1,
            font_family,
            typeUpload,
            home_description
        } = this.state

        var logo_url = logo_url == null ? Env.IMG_NOT_FOUND : logo_url
        var favicon_url = favicon_url == null ? Env.IMG_NOT_FOUND : favicon_url
        var image_share_web_url = image_share_web_url == null ? Env.IMG_NOT_FOUND : image_share_web_url

        var _color_main_1 = color_main_1 == null || color_main_1 == "" ? "#fff" : color_main_1
        var _font_family = font_family == null || font_family == "" ? "Open Sans" : font_family
        console.log(_font_family)
        return (
            <div className="overview">
                <ModalUpload typeUpload={typeUpload} />
                <SketchPicker handleChangeColor={this.handleChangeColor} _color_main_1={_color_main_1} />
                <form role="form" onSubmit={this.onSave} >

                    <div class="box-body">
                        <div>



                            <div class="row" style={{ justifyContent: "space-between" }}>
                                <div class="form-group col-xs-4 col-lg-4 col-md-6 col-sm-6">
                                    <label>Logo: &nbsp; </label>

                                    <img style={{ display: "block" }} src={`${logo_url}`} width="150" height="150" />
                                    <br />
                                    <div class="kv-avatar">
                                        <div >

                                            <button
                                                                                            onClick={() => this.onChangeUpload("LOGO")}

                                                type="button"
                                                class="btn btn-primary-no-background btn-sm"

                                                // style={{ marginLeft: "10px" }}
                                                data-toggle="modal"
                                                data-target="#uploadModalTheme"
                                            >
                                                <i class="fas fa-plus" ></i>
                                                <span class="text">&nbsp; Upload Logo</span>
                                            </button>
                                            {/* <button
                                                onClick={() => this.onChangeUpload("LOGO")}
                                                type="button"
                                                class="btn btn-primary btn-sm"
                                                data-toggle="modal"
                                                data-target="#uploadModalTheme"
                                            >
                                                <i class="fa fa-plus"></i> Upload Logo
                                            </button> */}
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group col-xs-4 col-lg-4 col-md-6 col-sm-6">
                                    <label>Favicon: &nbsp; </label>
                                    <img style={{ display: "block" }} src={`${favicon_url}`} width="150" height="150" />
                                    <br />

                                    <div class="kv-avatar">
                                        <div >
                                        <button
                                                                                            onClick={() => this.onChangeUpload("FAVICON")}

                                                type="button"
                                                class="btn btn-primary-no-background btn-sm"

                                                // style={{ marginLeft: "10px" }}
                                                data-toggle="modal"
                                                data-target="#uploadModalTheme"
                                            >
                                                <i class="fas fa-plus" ></i>
                                                <span class="text">&nbsp;  Upload Favicon</span>
                                            </button>
                                            {/* <button
                                                onClick={() => this.onChangeUpload("FAVICON")}

                                                type="button"
                                                class="btn btn-primary btn-sm"
                                                data-toggle="modal"
                                                data-target="#uploadModalTheme"
                                            >
                                                <i class="fa fa-plus"></i> Upload Favicon
                                            </button> */}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group col-xs-4 col-lg-4 col-md-6 col-sm-6">
                                    <label htmlFor="name"> Ảnh khi chia sẻ trang web đến facebook hoặc MXH</label>

                                    <img style={{ display: "block" }} src={`${image_share_web_url}`} width="150" height="150" />
                                    <br />

                                    <div class="kv-avatar">
                                        <div >
                                        <button
                                                onClick={() => this.onChangeUpload("FACE")}

                                                type="button"
                                                class="btn btn-primary-no-background btn-sm"

                                                // style={{ marginLeft: "10px" }}
                                                data-toggle="modal"
                                                data-target="#uploadModalTheme"
                                            >
                                                <i class="fas fa-plus" ></i>
                                                <span class="text">&nbsp;   Upload Ảnh</span>
                                            </button>

                                            {/* <button
                                                onClick={() => this.onChangeUpload("FACE")}

                                                type="button"
                                                class="btn btn-primary btn-sm"
                                                data-toggle="modal"
                                                data-target="#uploadModalTheme"
                                            >
                                                <i class="fa fa-plus"></i> Upload Ảnh
                                            </button> */}

                                        </div>
                                    </div>
                                </div>

                            </div>





                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Title chính cho trang home</label>
                            <input type="text" name="home_title" value={home_title || ""} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Mô tả trang</label>
                            <input type="text" name="home_description" value={home_description || ""} placeholder="Nhập..." onChange={this.onChange} className="form-control" id="txtName" autoComplete="off" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tên miền</label>
                            <input type="text" className="form-control" placeholder="Tên miền của bạn" id="txtName" onChange={this.onChange} value={domain || ""} name="domain" autoComplete="off" />
                            <span>(Tên miền cần trỏ vào IP 116.118.50.101, sẽ được tự xác nhận sau 5 phút)</span>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="name">Kiểu chữ cho web</label>
                            {this.showFont(_font_family)}
                            <p className="apply-font">Kiểu chữ {_font_family}</p>
                        </div> */}
                        <div className="form-group" >


                            <label htmlFor="name">Màu chính cho web </label>


                            <div style={{ display: "flex" }}>

                            <button
                                                // onClick={() => this.onChangeUpload("FACE")}
                                                style = {{                                      width: "115px",
                                                    height: "34px"
                                            }}
                                                type="button"
                                                class="btn btn-primary-no-background btn-sm"
                                                data-toggle="modal"
                                                data-target="#chooseColor"
                                                // style={{ marginLeft: "10px" }}
                                           
                                            >
                                                <i class="fas fa-plus" ></i>
                                                <span class="text">&nbsp;Chọn màu</span>
                                            </button>
                                {/* <button style={{
                                    height: "30px",
                                    marginTop: "12px"
                                }} type="button"
                                    data-toggle="modal"
                                    data-target="#chooseColor"
                                >

                                    <i class="fa fa-plus"></i>

                                    Chọn màu</button> */}

                                <div
                                    style={{ background: _color_main_1 }}
                                    className="choose-color"
                                    data-toggle="modal"
                                    data-target="#chooseColor"
                                >
                                    <span style={{ color: "white", margin: "auto" }}>{_color_main_1}</span>
                                </div>
                            </div>

                        </div>







                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-info  btn-sm">

                            <i class="fas fa-save"></i>

                            Lưu
                        </button>

                    </div>
                </form>


            </div>
        );
    }
}







const mapStateToProps = (state) => {
    return {
        faceImg: state.UploadReducers.themeImg.face_img,
        logoImg: state.UploadReducers.themeImg.logo_img,
        faviconImg: state.UploadReducers.themeImg.favicon_img,


    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateTheme: (store_code, theme) => {
            dispatch(themeAction.updateTheme(store_code, theme));
        },


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);