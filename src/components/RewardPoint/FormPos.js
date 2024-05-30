import React, { Component } from "react";
import { connect } from "react-redux";
import * as rewardPointAtion from "../../actions/reward_point"
import { shallowEqual } from "../../ultis/shallowEqual";
import {isEmpty} from "../../ultis/helpers"
import * as Types from "../../constants/ActionType"


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allow_use_point_order: "",
      id: "",
      is_set_order_max_point: "",
      money_a_point: "",
      order_max_point: "",
      percent_refund: "",
      store_id: "",
      ex: 100000,
    };
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    const _value = value.replace(/,/g, '').replace(/\./g, "");
    if (!isNaN(Number(_value))) {
      value = new Intl.NumberFormat().format(_value);
      if (name == "percent_refund") {
        if (value.length < 3) {
          if (value == 0) {
            this.setState({ [name]: 0 });
          }
          else {
            this.setState({ [name]: value });

          }
        }
      } else if (name == "percent_use_max_point") {
        if (value.length < 3) {
          if (value == 0) {
            this.setState({ [name]: 0 });
          }
          else {
            this.setState({ [name]: value });

          }
        }
      }
      else {
        if (value == 0) {
          this.setState({ [name]: 0 });
        }
        else {
          this.setState({ [name]: value });

        }
      }
    }


  };

  onChangeCheckBox = (e) => {
    var { value, name, checked } = e.target
    this.setState({
      [name]: checked
    })
  }


  componentDidMount() {
    var { rewardPoints } = this.props
    this. setData(rewardPoints)
  
  }

  setData(rewardPoints) {
    this.setState({
      allow_use_point_order: rewardPoints.allow_use_point_order,
      id: rewardPoints.id,
      is_set_order_max_point: rewardPoints.is_set_order_max_point,
      money_a_point: rewardPoints.money_a_point == null ? null : new Intl.NumberFormat().format(rewardPoints.money_a_point.toString()),
      order_max_point: rewardPoints.order_max_point == null ? null : new Intl.NumberFormat().format(rewardPoints.order_max_point.toString()),
      percent_refund: rewardPoints.percent_refund == null ? null : new Intl.NumberFormat().format(rewardPoints.percent_refund.toString()),
      
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.rewardPoints, this.props.rewardPoints) || this.state.id == "") {
      var { rewardPoints } = nextProps

      this.setData(rewardPoints)

    }
  }


  onSave = (e) => {
    e.preventDefault();
    var { store_code } = this.props
    var { allow_use_point_order,
      is_set_order_max_point,
      money_a_point,
      order_max_point,
      percent_refund,
     } = this.state
    var form = {
      allow_use_point_order,
      is_set_order_max_point,
      money_a_point: money_a_point == null ? money_a_point : money_a_point.toString().replace(/,/g, '').replace(/\./g, ""),
      order_max_point: order_max_point == null ? order_max_point : order_max_point.toString().replace(/,/g, '').replace(/\./g, ""),
      percent_refund: percent_refund == null ? percent_refund : percent_refund.toString().replace(/,/g, '').replace(/\./g, ""),
    
    }

    if (is_set_order_max_point == false)
      form.order_max_point = null
    else
      form.order_max_point = order_max_point == null ? order_max_point : order_max_point.toString().replace(/,/g, '').replace(/\./g, "")


      if(form.allow_use_point_order == true)
      {
        if(isEmpty(form.money_a_point) == false || isEmpty(form.percent_refund) == false){
          this.props.showError({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: "Dữ liệu không được để trống",
            },
          });
          return;

        }
        if(form.is_set_order_max_point == true)
        {
          if(isEmpty(form.order_max_point) == false){
          this.props.showError({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: "Dữ liệu không được để trống",
            },
          });
          return;

        }
      }
    }

    this.props.updateRewardPoint(store_code, form);
  };

  render() {
    var { allow_use_point_order,
      is_set_order_max_point,
      money_a_point,
      order_max_point,
      percent_refund,
       ex } = this.state
    var checkedAllow = allow_use_point_order == true ? true : false
    var checkMaxPoint = is_set_order_max_point == true ? true : false
    var disableValueMaxPoint = is_set_order_max_point == true ? "show" : "hide"


    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} >
          <div class="box-body">
            <div className="box-body">
            <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" checked={checkedAllow} name="allow_use_point_order" onChange={this.onChangeCheckBox} id="gridCheck" />
                  <label class="form-check-label" for="gridCheck">
                    Cho phép sử dụng xu khi mua hàng
                  </label>
                </div>

              </div>
             {
               checkedAllow == true && (
                 <React.Fragment>
                        <div className="form-group">
                <label htmlFor="lname">Quy đổi xu thành VNĐ</label>
                <div className="group" style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <span style={{ margin: "auto", minWidth: "100px " }}>1 xu bằng: </span>

                  </div>
                  <div class="input-group" style={{ marginLeft: "20px", maxWidth: "100%" }}>

                    <input type="text" class="form-control" onChange={this.onChange} name="money_a_point" value={money_a_point} placeholder="Nhập số tiền..." />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phần trăm hoàn xu cho mỗi đơn hàng</label>
                <div className="group" style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <span style={{ margin: "auto", minWidth: "100px " }}>Phần trăm: </span>

                  </div>
                  <div class="input-group" style={{ marginLeft: "20px", maxWidth: "100%" }}>

                    <input type="text" class="form-control" value={percent_refund} onChange={this.onChange} name="percent_refund" placeholder="Nhập phần trăm..." />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">%</span>
                    </div>
                  </div>

                </div>
                <p
                  style={{ paddingTop: "10px" }}
                >
                  <i>
                    ( Ví dụ: {new Intl.NumberFormat().format(ex.toString())} VNĐ hoàn {percent_refund == null || percent_refund == "" ? 0 : percent_refund}%
                    =&nbsp;
                    {percent_refund == null ? 0 : new Intl.NumberFormat().format((ex * percent_refund / 100).toString())}&nbsp;VNĐ =&nbsp;
                    {percent_refund == null || money_a_point == null || percent_refund == "" || money_a_point == "" ? 0 : new Intl.NumberFormat().format(((ex * percent_refund / 100) / Number(money_a_point.toString().replace(/,/g, '').replace(/\./g, ""))).toString())} Xu )
                  </i>
                </p>
              </div>



        

              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" checked={checkMaxPoint} name="is_set_order_max_point" onChange={this.onChangeCheckBox} type="checkbox" id="gridCheck" />
                  <label class="form-check-label" for="gridCheck">
                    Xét giới hạn điểm nhận Được khi mua hàng
                  </label>
                </div>

              </div>

             

           
       

              <div className={`form-group ${disableValueMaxPoint}`}>
                <label htmlFor="phone">Số xu nhận được tối đa khi mua hàng</label>
                <div className="group" style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <span style={{ margin: "auto", minWidth: "100px " }}>Số xu: </span>

                  </div>
                  <div class="input-group" style={{ marginLeft: "20px", maxWidth: "100%" }}>

                    <input type="text" class="form-control" onChange={this.onChange} value={order_max_point} name="order_max_point" placeholder="Nhập số xu..." />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">xu</span>
                    </div>
                  </div>
                </div>
              </div>
                 </React.Fragment>
               )
             }


           


            </div>

          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info  btn-sm">

              <i class="fas fa-save"></i>

              Lưu
            </button>
            <button type="button"
              data-toggle="modal"
              data-target="#resetModal"
              class="btn btn-primary  btn-sm"
              style={{ marginLeft: "10px" }}>

              <i class="fas fa-reset"></i>

              Khôi phục
            </button>
          </div>
        </form>

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

    updateRewardPoint: (store_code, form) => {
      dispatch(rewardPointAtion.updateRewardPoint(store_code, form))
    },
    showError: (error) => {
      dispatch(error);
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
