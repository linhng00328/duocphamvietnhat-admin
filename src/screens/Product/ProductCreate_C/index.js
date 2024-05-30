import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../../Loading";
import NotAccess from "../../../components/Partials/NotAccess";
import Edit from "./Create_C"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
            var permissions = nextProps.permission

            var isShow = permissions.product_list
            var isShowAttr = permissions.product_list
            var isCreate = permissions.product_list
            var isRemove = permissions.product_list
            this.setState({ isLoading: true, isShow , isShowAttr , isCreate , isRemove })
        }
    }

    render() {
        var { store_code, productId, page } = this.props.match.params;
        var { history, auth } = this.props;
        var { isShow , isShowAttr , isCreate , isRemove  } = this.state
        return (
            <div id="wrapper">
                <Sidebar store_code={store_code} />
                {auth != "a" ?
                    <div className="col-10 col-10-wrapper">

                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <Topbar store_code={store_code} />
                                {typeof isShow == "undefined" ? <div style={{ height: "500px" }}></div> :
                                    isShow == true ?

                                        <Edit
                                            store_code={store_code}
                                            productId={productId}
                                            page={page}
                                            history={history}
                                            isShowAttr = {isShowAttr}  isCreate = {isCreate}  isRemove = {isRemove}

                                        />

                                        : <NotAccess />}

                            </div>

                            <Footer />
                        </div>
                    </div>
                    : auth == false ? <Redirect to="/login" /> : <Loading />}

            </div>

        );
 
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducers.login.authentication,
        alert: state.categoryBReducers.alert.alert_uid,
        permission: state.authReducers.permission.data,

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
