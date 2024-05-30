import React, { Component } from "react";
import { connect } from "react-redux";
import * as profileAtion from "../../actions/profile"
import { shallowEqual } from "../../ultis/shallowEqual";
import ModalUpload from "./ModalUpload"
import moment from "moment";
import Datetime from "react-datetime";
import * as Env from "../../ultis/default"
import * as Types from "../../constants/ActionType";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtPhone: "",
      txtEmail: "",
      txtName: "",
      txtDateOfBirth: "null",
      txtSex: "",
      txtNumStore: "",
      txtCreateStore: "",
      image: ""
    };
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };


  onChangeDate = (e) => {
    var time = moment(e, "DD-MM-YYYY").format("DD-MM-YYYY");
    this.setState({
      txtDateOfBirth: time,
    });
  };
  onChangeGender = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  }


  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.user, this.props.user) || this.state.id == "") {
      var { user } = nextProps
      var txtDateOfBirth = user.date_of_birth !== null ? moment(user.date_of_birth, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY") : ""

      this.setState({
        id: user.id,
        txtPhone: user.phone_number,
        txtEmail: user.email,
        txtName: user.name,
        txtDateOfBirth: txtDateOfBirth,
        image: user.avatar_image,
        txtSex: user.sex,
        txtNumStore: user.create_maximum_store,
        txtCreateStore: user.created_at
      })
    }

    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {

    return true
  }

  onSave = (e) => {
    e.preventDefault();

    if(moment(this.state.txtDateOfBirth, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss") == "Invalid date")
    {
      this.props.showErrors(
            {
              type: Types.ALERT_UID_STATUS,
              alert: {
                type: "danger",
                title: "Lỗi ",
                disable: "show",
                content: "Ngày sinh không đúng định dạng (DD-MM-YYYY)",
              },
            }
          )
          return;
    }
  

    var user = { ...this.state }
    var form = {
      name: user.txtName,
      avatar_image: user.image,
      date_of_birth: moment(user.txtDateOfBirth, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss"),
      sex: user.txtSex
    }
    console.log(this.state)
    this.props.updateUser(form);
  };

  render() {

    var {
      txtPhone,
      txtEmail,
      txtName,
      txtDateOfBirth,
      image,
      txtSex,
      txtNumStore,
      txtCreateStore,
    } = this.state

    console.log(this.state)
    var image = image == null || image == "" ? Env.IMG_NOT_FOUND : image
    var txtSex = txtSex === null || txtSex === "" ? "" : txtSex

    var txtCreateStore = moment(txtCreateStore, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY");

    var isMale = txtSex == "1" ? true : false
    var isFemail = txtSex == "2" ? true : false
    var isAnother = txtSex == "0" ? true : false


    console.log(txtSex)
    return (

      <React.Fragment>
        <form role="form" onSubmit={this.onSave} >

          <div class="box-body">





            <div className="box-body">
              <div class="form-group">
                <label>Ảnh: &nbsp; </label>
                <img src={`${image}`} width="150" height="150" />
              </div>
              <div class="form-group">

                <div class="kv-avatar">
                  <div >
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      data-toggle="modal"
                      data-target="#uploadModalProfile"
                    >
                      <i class="fa fa-plus"></i> Upload ảnh
                    </button>
                  </div>
                </div>

              </div>
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input type="text" className="form-control" onChange={this.onChange} value={txtName} id="txtName" name="txtName" autoComplete="off" />

              </div>
              <div className="form-group gender">
                <label htmlFor="gender">Giới tính</label>
                <div className="radio" onChange={this.onChangeGender}>
                  <label>
                    <input type="radio" name="txtSex" checked={isMale} className="male" id="male" value="1" />
                    Nam
                  </label>
                  <label>
                    <input type="radio" name="txtSex" checked={isFemail} className="male" id="female" value="2" />
                    Nữ
                  </label>
                  <label>
                    <input type="radio" name="txtSex" checked={isAnother} className="male" id="another" value="0" />
                    Khác
                  </label>
                </div>

              </div>
              <div className="form-group">
                <label htmlFor="fname">Ngày sinh</label>
                {txtDateOfBirth !== "null" && <Datetime
                  inputProps={{
                    placeholder: "Chưa cập nhật",
                  }}
                  initialValue={txtDateOfBirth}

                  onChange={this.onChangeDate}
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                />}
              </div>
              <div className="form-group">
                <label htmlFor="lname">Số điện thoại</label>
                <input disabled type="number" className="form-control" value={txtPhone} id="txtPhone" name="txtPhone" autoComplete="off" />

              </div>
              <div className="form-group">
                <label htmlFor="phone">Số cửa hàng tối đa được tạo</label>
                <input disabled type="number" className="form-control" value={txtNumStore} id="txtCreateStore" name="txtCreateStore" autoComplete="off" />

              </div>
              <div className="form-group">
                <label htmlFor="phone">Email</label>
                <input disabled type="text" className="form-control" value={txtEmail} id="txtEmail" name="txtEmail" autoComplete="off" />

              </div>
              <div className="form-group">
                <label htmlFor="phone">Ngày tạo</label>
                <input disabled type="text" value={txtCreateStore} className="form-control" id="txtCreateStore" name="txtCreateStore" autoComplete="off" />

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

        <ModalUpload></ModalUpload>
      </React.Fragment>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.userImg.user_img,

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {

    updateUser: (form) => {
      dispatch(profileAtion.updateUser(form))
    },
    showErrors: (alert) => {
      dispatch(alert)
    }

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
