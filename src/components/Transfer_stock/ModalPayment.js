import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from '../../ultis/helpers'
import * as ImportAction from "../../actions/import_stock"
import { getBranchId } from '../../ultis/branchUtils'

class ModalPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      money_amount: 0,
      method_payment: 0
    }
  }
  handleChangePayment = async () => {
    const { store_code, id } = this.props
    const branch_id = getBranchId()
    const formData = {
      amount_money: this.props.price,
      payment_method: this.state.method_payment
    }
    await this.props.chooseMethorPayment(store_code, branch_id, id, formData)
    const data = { status: 3 }
    this.props.changeStatus(store_code, branch_id, id, data)
  }
  onChange = (e) => {
    this.setState({ money_amount: e.target.value })
  }
  handleChange = (e) => {
    this.setState({ method_payment: e.target.value })
  }
  render() {
    return (
      <div class="modal" id="payment">
        <div class="modal-dialog">
          <div class="modal-content">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{ textAlign: "end" }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 style={{ textAlign: "center" }}>Thanh toán đơn hàng</h4>
            <div class="modal-body">
              <form action="/action_page.php">
                <div class="form-group">
                  <label for="email">Chọn phương thức thanh toán</label>
                  <select class="form-control" id="sel1" onChange={this.handleChange}>
                    <option value="0">Chuyển khoản</option>
                    <option value="1">Tiền mặt</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Tổng tiền cần trả</span>
                <div style={{ color: "red" }}>{format(Number(this.props.price))}</div>
              </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>Còn lại cần thanh toán</div>
                  <div>{format(Number(this.props.remaining_amount))}</div>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Đóng
              </button>
              <button type="submit" class="btn btn-info" onClick={this.handleChangePayment} data-dismiss="modal">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    chooseMethorPayment: (store_code, branch_id, id, data) => {
      dispatch(ImportAction.chooseMethorPayment(store_code, branch_id, id, data))
    },
    changeStatus: (store_code, branch_id, id, data) => {
      dispatch(ImportAction.changeStatus(store_code, branch_id, id, data))
    }
  }
}
export default connect(null, mapDispatchToProps)(ModalPayment)
