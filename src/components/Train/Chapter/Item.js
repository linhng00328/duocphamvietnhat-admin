import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as trainAction from "../../../actions/train";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenLesson: false,
            listArr: []
        }
    }

    onSortEnd = (oldIndex, newIndex) => {
        var listArr = arrayMove(this.props.data?.lessons, oldIndex, newIndex);
        var listId = [];
        var listPosition = [];
        listArr.forEach((element, index) => {
            listId.push({ id: element.id, position: index + 1 });

        });
        var { courseId, store_code } = this.props

        this.props.sortLesson(store_code, { list_sort: listId, train_chapter_id: this.props.data.id }, courseId);
    };
    passEditFunc = (e, id, train_course_id, title, short_description) => {
        this.props.handleUpdateCallBack({
            id: id,
            train_course_id: train_course_id,
            title: title,
            short_description: short_description,
        });
        e.preventDefault();
    };
    passEditLessonFunc = (e, id, train_chapter_id, title, link_video_youtube, description, short_description) => {
        this.props.handleUpdateLessonCallBack({
            id,
            train_chapter_id,
            title,
            short_description,
            link_video_youtube, description
        });
        e.preventDefault();
    };

    passDataModal = (event, store_code, name, train_course_id) => {
        this.props.handleDelCallBack({ table: "chương", id: store_code, name: name, train_course_id });
        event.preventDefault();
    }

    passDelLessonDataModal = (event, store_code, name, train_chapter_id) => {
        this.props.handleDelLessonCallBack({ table: "bài học", id: store_code, name: name, train_chapter_id });
        event.preventDefault();
    }
    getId = (url) => {
        if (url === null) return;
        let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        return (regex.exec(url) !== null && typeof regex.exec(url) !== "undefined") ? regex.exec(url)[3] : null;
    }



    showData = (lessons) => {
        var result = null;
        if (lessons.length > 0) {
            var { update, _delete } = this.props

            result = lessons.map((data, index) => {
                var linkUrl = this.getId(data.link_video_youtube)
                var image_url = linkUrl == null || linkUrl == "" ? Env.IMG_NOT_FOUND : `https://i1.ytimg.com/vi/${linkUrl}/default.jpg`

                return (

                    <SortableItem key={data.id}>
                        <div className="wrap-box-item hover-product" >
                            <div className="box-content"  >
                                <div className="img-contain">
                                    <img width={120} height={90} src={image_url} />
                                </div>
                                <div className="content" style = {{maxWidth : "750px"}}>
                                    <div className="title">
                                        <span>{data.title}</span>
                                    </div>
                                    <div className="short-description">
                                        <span> {data.short_description}</span>
                                    </div>
                                    <div className="action">
                                        <button className={`btn-not-background ${linkUrl ? "play" : "play-disable"}`}
                                            title = "play video"
                                           onClick={(e) =>{
                                            linkUrl &&
                                            this.props.passUrlVideo(
                                           
                                                linkUrl,

                                            )
                                           }
                                        }
                                            data-toggle="modal"
                                            data-target="#PlayModal"
                                        >
                                            <i class="fa fa-play"></i>
                                        </button>
                                        <button className="btn-not-background edit"
                                                                                    title = "Chỉnh sửa"

                                           onClick={(e) =>
                                            this.passEditLessonFunc(
                                                e,
                                                data.id,
                                                data.train_chapter_id,
                                                data.title,
                                                data.link_video_youtube,
                                                data.description,
            
                                                data.short_description
                                            )
                                        }
                                            data-toggle="modal"
                                            data-target="#updateLessonModal"
                                        >
                                            <i class="fa fa-pencil"></i>
                                        </button>
                                        <button className="btn-not-background remove"
                                    onClick={(e) => this.passDelLessonDataModal(e, data.id, data.title, data.train_chapter_id
                                    )}
                                    data-toggle="modal"
                                    data-target="#removeLessonModal"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="action-box">
                                <button className="btn-not-background"
                                    onClick={(e) => this.passDelLessonDataModal(e, data.id, data.title, data.train_chapter_id
                                    )}
                                    data-toggle="modal"
                                    data-target="#removeLessonModal"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                              
                            </div> */}
                        </div>
                        {/* <div class="resp-table-row" style={{ width: "100%" }}>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                <img src = {`https://i1.ytimg.com/vi/${this.getId(data.link_video_youtube)}/default.jpg`}/>

                            </div>

                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {data.title}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {data.short_description}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                <a href={data.link_video_youtube}></a>{data.link_video_youtube}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                {moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}
                            </div>
                            <div class="table-body-cell" style={{ width: "15%" }}>
                                <div
                                    className="group-btn-table"
                                >
                                    <button
                                        onClick={(e) =>
                                            this.passEditLessonFunc(
                                                e,
                                                data.id,
                                                data.train_chapter_id,
                                                data.title,
                                                data.link_video_youtube,
                                                data.description,

                                                data.short_description
                                            )
                                        }
                                        data-toggle="modal"
                                        data-target="#updateLessonModal" class={`btn btn-warning btn-sm`}
                                    >
                                        <i class="fa fa-edit"></i> Sửa
                                    </button>
                                    <button
                                        onClick={(e) => this.passDelLessonDataModal(e, data.id, data.title, data.train_chapter_id
                                        )}
                                        style={{ marginLeft: "10px" }}
                                        data-toggle="modal"
                                        data-target="#removeLessonModal"
                                        class={`btn btn-danger btn-sm `}
                                    >
                                        <i class="fa fa-trash"></i> Xóa
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </SortableItem>

                    // <tr>
                    //     <td>
                    //         {index + 1}
                    //     </td>
                    //     <td>{data.title}</td>
                    //     <td>{data.short_description}</td>
                    //     <td><a href={data.link_video_youtube}></a>{data.link_video_youtube}</td>

                    //     <td>{moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>


                    //     <td style={{ display: "flex" }}>
                    //         <button
                    //             onClick={(e) =>
                    //                 this.passEditLessonFunc(
                    //                     e,
                    //                     data.id,
                    //                     data.train_chapter_id,
                    //                     data.title,
                    //                     data.link_video_youtube,
                    //                     data.description,

                    //                     data.short_description
                    //                 )
                    //             }
                    //             data-toggle="modal"
                    //             data-target="#updateLessonModal" class={`btn btn-warning btn-sm`}
                    //         >
                    //             <i class="fa fa-edit"></i> Sửa
                    //         </button>
                    //         <button
                    //             onClick={(e) => this.passDelLessonDataModal(e, data.id, data.title, data.train_chapter_id
                    //             )}
                    //             style={{ marginLeft: "10px" }}
                    //             data-toggle="modal"
                    //             data-target="#removeLessonModal"
                    //             class={`btn btn-danger btn-sm `}
                    //         >
                    //             <i class="fa fa-trash"></i> Xóa
                    //         </button>
                    //     </td>
                    // </tr>
                );
            });
        } else {
            return (<div class="resp-table-row" style={{ width: "100%" }}>
                <div style={{ textAlign: "center" }}>Không có bài học nào!</div>
            </div>
            );
        }
        return result;
    };
    render() {

        var { data, index } = this.props
        var { isOpenLesson } = this.state
        return (
            <>
                <SortableItem key={data.id} collection={data.id}>
                    <div class="resp-table-row hover-product" style={{ width: "100%" }}>
                        <div class="table-body-cell icon-show-detail " style={{ width: "1%" }} >
                            <button style={{ maxWidth: "30px" }} className="btn-not-background" onClick={() => {
                                this.setState({ isOpenLesson: !isOpenLesson })
                            }}>              <i class={`fas fa-angle-double-${isOpenLesson === true ? "down" : "right"}`}></i>
                            </button>
                        </div>

                        <div class="table-body-cell" style={{ width: "15%"  , color : "blue" }}>
                            {data.title}
                        </div>
                        <div class="table-body-cell" style={{ width: "20%" }}>
                        {data.short_description?.length > 120 ? data.short_description?.slice(0, 120) + "..." : data.short_description}                               
                             </div>

                        <div class="table-body-cell" style={{ width: "6%" }}>
                            <div
                                className="action-table"
                            >
                                <button
                                    onClick={(e) =>
                                        this.passEditFunc(
                                            e,
                                            data.id,
                                            data.train_course_id,
                                            data.title,

                                            data.short_description
                                        )
                                    }
                                    data-toggle="modal"
                                    data-target="#updateModal"
                                    className = "btn-not-background edit"
                                >
                                    <i class="fa fa-pencil"></i> 
                                </button>
                                <button
                                    onClick={(e) => this.passDataModal(e, data.id, data.title, data.train_course_id
                                    )}
                                    style={{ marginLeft: "10px" }}
                                    data-toggle="modal"
                                    data-target="#removeModal"
                                    className = "btn-not-background remove"
                                >
                                    <i class="fa fa-trash"></i> 
                                </button>
                            </div>
                        </div>
                    </div>
                </SortableItem>
                {/* <tr>
                    <td>
                    <i onClick = {()=>{
                        this.setState({isOpenLesson : !isOpenLesson})
                    }} class={`fas fa-angle-double-${isOpenLesson === true ? "down" : "right"}`}></i>
                                        </td>
                    <td>{data.title}</td>
                    <td>{data.short_description}</td>
                    <td>{moment(data.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>


                    <td style={{ display: "flex" }}>
                        <button
                            onClick={(e) =>
                                this.passEditFunc(
                                    e,
                                    data.id,
                                    data.train_course_id,
                                    data.title,

                                    data.short_description
                                )
                            }
                            data-toggle="modal"
                            data-target="#updateModal" class={`btn btn-warning btn-sm`}
                        >
                            <i class="fa fa-edit"></i> Sửa
                        </button>
                        <button
                            onClick={(e) => this.passDataModal(e, data.id, data.title, data.train_course_id
                            )}
                            style={{ marginLeft: "10px" }}
                            data-toggle="modal"
                            data-target="#removeModal"
                            class={`btn btn-danger btn-sm `}
                        >
                            <i class="fa fa-trash"></i> Xóa
                        </button>
                    </td>
                </tr> */}


                <tr className= {`collaspe-lesson ${isOpenLesson == true ? "" : "hide"}`} >
                    <td style = {{
                            background: "beige"
                    }}></td>
                    <td colSpan={3} style={{
                        border: "1px solid #dcd2d2",
                        padding: "4px",
                        marginTop: "5px",
                    }}>

                        {

                            <div className="container-lesson">


                                {
                                    data.lessons?.length > 0 && <SortableList
                                        onSortEnd={this.onSortEnd}
                                    className="container-item"
                                    // draggedItemClassName="dragged"
                                    >
                                        {this.showData(data.lessons)}
                                    </SortableList>
                                }

                            </div>





                        }
                        <div
                            style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
                        >


                            <button
                                data-toggle="modal"
                                data-target="#createLessonModal"

                                class={`btn btn-info btn-icon-split btn-sm `}
                                onClick={() => { this.props.passChapterId(data.id) }}
                            >
                                <span class="icon text-white-50">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span class="text">Thêm bài học</span>
                            </button>
                        </div>

                    </td>

                </tr>



            </>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        sortLesson: (store_code, data, train_course_id) => {
            dispatch(trainAction.sortLesson(store_code, data, train_course_id));
        },
    };
};
export default connect(null, mapDispatchToProps)(Table);