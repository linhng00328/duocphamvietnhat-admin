import React, { Component } from "react";


class Form extends Component {
    constructor(props) {
        super(props);

    }




    render() {
        return (

            <form action="" method="POST" role="form">

                {/* <div class="form-group">
                <label for="">label</label>
                <input type="text" class="form-control" id="" placeholder="Input field"/>
            </div> */}

                <div className="prime">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Hôm nay : 20-11-2021 đến 20-11-2021
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Hôm qua : 20-11-2021 đến đến 20-11-2021
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" />
                        <label class="form-check-label" for="gridCheck">
                            So sánh với
                        </label>
                    </div>
                </div>
                <div className="compare">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Ngày trước đó : 20-11-2021 đến đến 20-11-2021
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Ngày này tuần trước : 20-11-2021 đến đến 20-11-2021
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="allow_payment_request" onChange={this.onChangeSelect} id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Ngày này năm trước : 20-11-2021 đến đến 20-11-2021
                            </label>
                        </div>
                    </div>
                </div>
           
            </form>

        );
    }
}



export default Form;
