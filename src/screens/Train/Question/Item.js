import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Train/Course/Edit/Form";
import * as trainAction from "../../../actions/train";
import * as categoryBAction from "../../../actions/category_blog";
import * as Types from "../../../constants/ActionType";
import   "../../../components/Train/Chapter/style.css";

import Alert from "../../../components/Partials/Alert";
class CourseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    passDataModal = (event , data) => {
        var data = JSON.parse(data)
        this.props.handleDelCallBack({ table: "câu hỏi", ...data });
        event.preventDefault();
      }
      passEditFunc = (e, data) => {
        var data = JSON.parse(data)

        this.props.handleUpdateCallBack(
         data
        );
        e.preventDefault();
    };
    

    render() {
        var { data } = this.props;
        return (


            <div className="wrap-box-item hover-product" style = {{
                border: "1px solid #cac6c6",
"border-radius": "0.375rem"
            }}>
                <div className="" style = {{padding : "10px"}}   >
                    <div
                    style={{ width: "100%",
                        }}
                    > {data.question_image != "" && data.question_image != null &&  
                    <img style={{margin : "auto" ,  width: "160px",
                    height: "160px"}} src = {data.question_image}/>}</div>
                   

                    <div className="question">
                    {data.question}
                    </div>
                    <div className="answer">
                        <div className="item-result">
                            A. {data.answer_a}
                        </div>
                        <div className="item-result">
                        B. {data.answer_b}
                        </div>

                        <div className="item-result">
                        C. {data.answer_c}
                        </div>

                        <div className="item-result">
                        D. {data.answer_d}
                        </div>
                        <div className="item-result-correct">
                        Kết quả đúng {data.right_answer ?? "Không có kết quả"}
                        </div>
                    </div>
                </div>
                <div className="action-box">
                <button className="btn-not-background edit"
                          onClick={(e) =>
                            this.passEditFunc(
                              e,
                              JSON.stringify(data)
                                
                            )
                          }
                data-toggle="modal"
                data-target="#updateQuestionModal"
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button className="btn-not-background remove"
                        onClick={(e) => this.passDataModal(e, JSON.stringify(data)
                        )}
                        data-toggle="modal"
                        data-target="#removeQuestionModal"
                    >
                        <i class="fa fa-trash"></i>
                    </button>

                </div>
            </div>

        );

    }
}

const mapStateToProps = (state) => {
    return {
        course: state.trainReducers.train.courseID,


    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
