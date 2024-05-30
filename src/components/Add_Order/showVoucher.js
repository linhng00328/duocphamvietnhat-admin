import React, { Component } from 'react'

class ShowVoucher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codeVoucher: ""
        }
    }

    componentWillReceiveProps(nextProps, nextState) {

        if (nextProps.code_voucher !== this.state.codeVoucher) {
            this.setState({
                codeVoucher: nextProps.code_voucher,

            })
        }


    }

    handleChangeVoucher = e => {
        var name = e.target.name
        var value = e.target.value
        this.setState({ [name]: value })
    }
    handleOnclick = () => {
        this.props.handleInputVoucher({ code_voucher: this.state.codeVoucher })
    }
    handleOnclick1 = () =>{
        this.props.handleRemoveVoucher({code_voucher:""})
        this.setState({codeVoucher: ""})
    }
    render() {
        var { codeVoucher } = this.state
        var {code_voucher} = this.props
        return (
            <div className='voucher-wraper row' style={{ padding: "0 16px" }}>
                <input className='col-8' type='text' name="codeVoucher" onChange={this.handleChangeVoucher} value={codeVoucher} placeholder='Nhập voucher' style={{ border: "1px solid #dadada", borderRadius: "5px" }}></input>
                {code_voucher ?<button className='btn btn-danger col-4' onClick={this.handleOnclick1}>Hủy</button>:<button className='btn btn-danger col-4' onClick={this.handleOnclick}>Áp dụng</button>}
                
            </div>
        )
    }
}
export default ShowVoucher;
