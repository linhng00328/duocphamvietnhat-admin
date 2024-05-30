import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../../Loading";
import NotAccess from "../../../components/Partials/NotAccess";
import Edit from "./Edit"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }



    componentWillReceiveProps(nextProps) {
        if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
            var permissions = nextProps.permission

            var isShow = permissions.payment_list
            this.setState({ isLoading: true, isShow })
        }
    }

    render() {
        var { store_code, paymentId } = this.props.match.params;
        var { history, auth } = this.props;
        var { isShow } = this.state
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
                                        paymentId={paymentId}
                                            store_code={store_code}
                                            history={history}
                                        />

                                        : <NotAccess />}

                            </div>

                            <Footer />
                        </div>
                    </div>
                    : auth == false ? <Redirect to="/login" /> : <Loading />}

            </div>

        );
        // } else if (this.props.auth === false) {
        //     return <Redirect to="/login" />;
        // } else {
        //     return <Loading />;
        // }
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
