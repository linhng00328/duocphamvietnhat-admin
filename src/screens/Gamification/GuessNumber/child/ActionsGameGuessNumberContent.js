import moment from "moment";
import React, { Component } from "react";
import MomentInput from "react-moment-input";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import Upload from "../../../../components/Upload";
import * as Types from "../../../../constants/ActionType";
import { formatNumberV2, getQueryParams } from "../../../../ultis/helpers";
import * as gamificationAction from "../../../../actions/gamification";
import history from "../../../../history";
import themeData from "../../../../ultis/theme_data";
const groups = [
  {
    id: 0,
    name: "group_customer",
    type: "radio",
    label: "Tất cả",
    value: Types.GROUP_CUSTOMER_ALL,
  },
  {
    id: 1,
    name: "group_customer",
    type: "radio",
    label: "Đại lý",
    value: Types.GROUP_CUSTOMER_AGENCY,
  },
  {
    id: 2,
    name: "group_customer",
    type: "radio",
    label: "Cộng tác viên",
    value: Types.GROUP_CUSTOMER_CTV,
  },
  {
    id: 3,
    name: "group_customer",
    type: "radio",
    label: "Nhóm khách hàng",
    value: Types.GROUP_CUSTOMER_BY_CONDITION,
  },
];
const resultDefault = [
  {
    is_correct: false,
    text_result: "",
  },
];
const ActionsGameGuessNumberContentStyles = styled.div`
  .gameGuessNumber__main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
  .gameGuessNumber__imageContent {
    padding-top: 20px;
  }
  .bgImage {
    display: flex;
    column-gap: 15px;
    row-gap: 15px;
    .bgImage__item {
      width: 140px;
      height: 130px;
      border: 2px solid transparent;
      border-radius: 6px;
      padding: 5px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
  }
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    margin-bottom: 0;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
  .gameGuessNumber__isGuessNumber {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
  }
  .gameGuessNumber_answerMain {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    .gameGuessNumber__answerItem {
      display: flex;
      align-items: center;
      column-gap: 20px;
      .gameGuessNumber__answerRight {
        width: 150px;
        display: flex;
        align-items: center;
        column-gap: 8px;
      }
      .gameGuessNumber__answer {
        display: flex;
        align-items: center;
        column-gap: 8px;
        span {
          white-space: nowrap;
        }
      }
      .gameGuessNumber__answerIcon {
        svg {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }
  }
  .winner__image {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100rem;
    }
  }
  .winner__info {
    display: flex;
    span {
      &:first-child {
        width: 150px;
      }
      &:last-child {
        color: rgb(193, 32, 38);
      }
    }
  }
`;

class ActionsGameGuessNumberContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtTurnInDay: "",
      txtStart: "",
      txtEnd: "",
      txtDescription: "",
      images: [],
      displayError: "hide",
      group_customer: 0,
      agency_type_id: null,
      group_type_id: null,
      isLoading: false,
      listGift: [],
      isShowed: true,
      rangeNumber: "",
      textResult: "",
      valueGift: "",
      isGuessNumber: true,
      listResult: [],
      is_show_all_prizer: false,
    };
  }
  componentDidMount() {
    const { idGameGuessNumber, store_code, fetchGameGuessNumbersById } =
      this.props;
    if (idGameGuessNumber) {
      fetchGameGuessNumbersById(store_code, idGameGuessNumber);
    }
  }
  componentWillUnmount() {
    const { resetGuessNumbers } = this.props;
    resetGuessNumbers();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { gameGuessNumbers } = this.props;
    if (!shallowEqual(gameGuessNumbers, nextProps.gameGuessNumbers)) {
      const startTime =
        nextProps.gameGuessNumbers.time_start == null ||
        nextProps.gameGuessNumbers.time_start == ""
          ? ""
          : moment(nextProps.gameGuessNumbers.time_start).format(
              "DD-MM-YYYY HH:mm"
            );
      const endTime =
        nextProps.gameGuessNumbers.time_end == null ||
        nextProps.gameGuessNumbers.time_end == ""
          ? ""
          : moment(nextProps.gameGuessNumbers.time_end).format(
              "DD-MM-YYYY HH:mm"
            );
      this.setState({
        txtName: nextProps.gameGuessNumbers.name,
        txtTurnInDay: nextProps.gameGuessNumbers.turn_in_day,
        txtDescription: nextProps.gameGuessNumbers.description,
        group_customer: nextProps.gameGuessNumbers.apply_for,
        agency_type_id: nextProps.gameGuessNumbers.agency_type_id
          ? Number(nextProps.gameGuessNumbers.agency_type_id)
          : nextProps.gameGuessNumbers.agency_type_id,
        group_type_id: nextProps.gameGuessNumbers.group_customer_id
          ? Number(nextProps.gameGuessNumbers.group_customer_id)
          : nextProps.gameGuessNumbers.group_customer_id,
        txtStart: startTime,
        txtEnd: endTime,
        isShake: nextProps.gameGuessNumbers.is_shake,
        isLoading: true,
        isShowed: nextProps.gameGuessNumbers.is_show_game,
        is_show_all_prizer: nextProps.gameGuessNumbers.is_show_all_prizer,
        isGuessNumber: nextProps.gameGuessNumbers.is_guess_number,
        rangeNumber: nextProps.gameGuessNumbers.is_guess_number
          ? nextProps.gameGuessNumbers.range_number
          : null,
        textResult: nextProps.gameGuessNumbers.is_guess_number
          ? Number(
              nextProps.gameGuessNumbers.text_result
                ?.toString()
                .replace(/\./g, "")
            )
          : null,
        valueGift: nextProps.gameGuessNumbers.is_guess_number
          ? nextProps.gameGuessNumbers.value_gift
          : null,
        listResult: !nextProps.gameGuessNumbers.is_guess_number
          ? nextProps.gameGuessNumbers.list_result
          : [],
      });
    }

    return true;
  }

  setListGift = (gifts) => {
    this.setState({
      listGift: gifts,
    });
  };
  setImages = (images) => {
    this.setState({ images });
  };
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (
      name === "txtTurnInDay" ||
      name === "rangeNumber" ||
      name === "textResult"
    ) {
      const valueNumber = formatNumberV2(value);
      if (name === "textResult") {
        const numberTextResult = valueNumber
          ?.toString()
          .replace(/\./g, "")
          .split("").length;
        if (numberTextResult > Number(this.state.rangeNumber)) return;
      }
      if (name === "rangeNumber") {
        if (Number(value) > 10) return;
        this.setState({ textResult: "" });
      }
      this.setState({ [name]: valueNumber });
    } else if (name === "isShowed" || name === "is_show_all_prizer") {
      const checked = e.target.checked;
      this.setState({ [name]: checked ? true : false });
    } else if (name === "isGuessNumber") {
      this.setState({ [name]: value === "true" ? true : false });
    } else {
      if (name === "group_customer") {
        if (value == "2") {
          this.setState({ group_type_id: null });
        } else if (value == "4") {
          this.setState({ agency_type_id: null });
        } else {
          this.setState({ group_type_id: null, agency_type_id: null });
        }
      }
      this.setState({ [name]: value });
    }
  };
  onChangeStart = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtEnd } = this.state;
    if (e != "" && txtEnd != "") {
      if (
        !moment(e, "DD-MM-YYYY HH:mm").isBefore(
          moment(txtEnd, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtStart: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm");
    var { txtStart } = this.state;

    if (txtStart != "" && e != "") {
      if (
        !moment(txtStart, "DD-MM-YYYY HH:mm").isBefore(
          moment(e, "DD-MM-YYYY HH:mm")
        )
      ) {
        this.setState({ displayError: "show" });
      } else {
        this.setState({ displayError: "hide" });
      }
    }
    this.setState({
      txtEnd: time,
    });
  };
  createGameGuessNumber = () => {
    const {
      txtName,
      txtTurnInDay,
      txtStart,
      txtEnd,
      agency_type_id,
      group_type_id,
      group_customer,
      images,
      txtDescription,
      isShowed,
      rangeNumber,
      textResult,
      valueGift,
      isGuessNumber,
      listResult,
      is_show_all_prizer,
    } = this.state;

    const { addGameGuessNumbers, store_code, showError } = this.props;

    var isErrorListResult = false;
    listResult.forEach((element) => {
      if (!element.text_result) {
        isErrorListResult = true;
      }
    });
    const turnInDay = txtTurnInDay?.toString().replace(/\./g, "")
      ? Number(txtTurnInDay?.toString().replace(/\./g, ""))
      : txtTurnInDay?.toString().replace(/\./g, "");
    if (txtName === "" || txtName === null) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập tên trò chơi",
        },
      });
    } else if (turnInDay === "" || turnInDay === null) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập số lần đoán số trong một ngày",
        },
      });
    } else if (!txtStart || !txtEnd) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn đầy đủ thời gian",
        },
      });
    } else if (images.length === 0) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập hình ảnh mô tả",
        },
      });
    } else if (
      (isGuessNumber && rangeNumber === "") ||
      (isGuessNumber && rangeNumber === null)
    ) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập số lượng chữ số của đáp án",
        },
      });
    } else if (
      (isGuessNumber && valueGift === "") ||
      (isGuessNumber && valueGift === null)
    ) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập phần thưởng",
        },
      });
    } else if (!isGuessNumber && isErrorListResult) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập đầy đủ đáp án",
        },
      });
    } else {
      const gameGuessNumber = {
        name: txtName,
        turn_in_day: turnInDay,
        agency_type_id: agency_type_id
          ? Number(agency_type_id)
          : agency_type_id,
        group_customer_id: group_type_id
          ? Number(group_type_id)
          : group_type_id,
        apply_for: group_customer ? Number(group_customer) : group_customer,
        images: images,
        time_start: txtStart
          ? `${txtStart.split(" ")[0].split("-")[2]}-${
              txtStart.split(" ")[0].split("-")[1]
            }-${txtStart.split(" ")[0].split("-")[0]} ${txtStart.split(" ")[1]}`
          : "",
        time_end: txtEnd
          ? `${txtEnd.split(" ")[0].split("-")[2]}-${
              txtEnd.split(" ")[0].split("-")[1]
            }-${txtEnd.split(" ")[0].split("-")[0]} ${txtEnd.split(" ")[1]}`
          : "",
        description: txtDescription,
        is_show_game: isShowed,
        is_show_all_prizer: is_show_all_prizer,
        is_guess_number: isGuessNumber,
        range_number: isGuessNumber ? rangeNumber : null,
        text_result: isGuessNumber
          ? Number(textResult?.toString().replace(/\./g, ""))
          : null,
        value_gift: isGuessNumber ? valueGift : null,
        list_result: !isGuessNumber ? listResult : [],
      };

      addGameGuessNumbers(store_code, gameGuessNumber);
    }
  };
  updateGameGuessNumber = () => {
    const {
      txtName,
      txtTurnInDay,
      txtStart,
      txtEnd,
      agency_type_id,
      group_type_id,
      group_customer,
      images,
      txtDescription,
      isShowed,
      rangeNumber,
      textResult,
      valueGift,
      isGuessNumber,
      listResult,
      is_show_all_prizer,
    } = this.state;

    const { store_code, showError, updateGameGuessNumbers, idGameGuessNumber } =
      this.props;

    var isErrorListResult = false;
    listResult.forEach((element) => {
      if (!element.text_result) {
        isErrorListResult = true;
      }
    });
    const turnInDay = txtTurnInDay?.toString().replace(/\./g, "")
      ? Number(txtTurnInDay?.toString().replace(/\./g, ""))
      : txtTurnInDay?.toString().replace(/\./g, "");
    if (txtName === "" || txtName === null) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập tên trò chơi",
        },
      });
    } else if (turnInDay === "" || turnInDay === null) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập số lần đoán số trong một ngày",
        },
      });
    } else if (!txtStart || !txtEnd) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn đầy đủ thời gian",
        },
      });
    } else if (images.length === 0) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập hình ảnh mô tả",
        },
      });
    } else if (
      (isGuessNumber && rangeNumber === "") ||
      (isGuessNumber && rangeNumber === null)
    ) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập số lượng chữ số của đáp án",
        },
      });
    } else if (
      (isGuessNumber && valueGift === "") ||
      (isGuessNumber && valueGift === null)
    ) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập phần thưởng",
        },
      });
    } else if (!isGuessNumber && isErrorListResult) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Nhập đầy đủ đáp án",
        },
      });
    } else {
      const gameGuessNumber = {
        name: txtName,
        turn_in_day: turnInDay,
        agency_type_id: agency_type_id
          ? Number(agency_type_id)
          : agency_type_id,
        group_customer_id: group_type_id
          ? Number(group_type_id)
          : group_type_id,
        apply_for: group_customer ? Number(group_customer) : group_customer,
        images: images,
        time_start: txtStart
          ? `${txtStart.split(" ")[0].split("-")[2]}-${
              txtStart.split(" ")[0].split("-")[1]
            }-${txtStart.split(" ")[0].split("-")[0]} ${txtStart.split(" ")[1]}`
          : "",
        time_end: txtEnd
          ? `${txtEnd.split(" ")[0].split("-")[2]}-${
              txtEnd.split(" ")[0].split("-")[1]
            }-${txtEnd.split(" ")[0].split("-")[0]} ${txtEnd.split(" ")[1]}`
          : "",
        description: txtDescription,
        is_show_game: isShowed,
        is_show_all_prizer: is_show_all_prizer,
        is_guess_number: isGuessNumber,
        range_number: isGuessNumber ? rangeNumber : null,
        text_result: isGuessNumber
          ? Number(textResult?.toString().replace(/\./g, ""))
          : null,
        value_gift: isGuessNumber ? valueGift : null,
        list_result: !isGuessNumber ? listResult : [],
      };

      const page = getQueryParams("page") || 1;
      updateGameGuessNumbers(
        store_code,
        idGameGuessNumber,
        gameGuessNumber,
        page
      );
    }
  };

  goBack = () => {
    const { store_code } = this.props;
    const page = getQueryParams("page") || 1;
    history.push(`/game_guess_numbers/${store_code}?page=${page}`);
  };

  handleSelectedBackground = (element) => {
    this.setState({
      backgroundDefaultImage: element,
    });
  };
  setBackgroundSelfPostedImage = (image) => {
    this.setState({
      backgroundSelfPostedImage: image,
    });
  };
  handleAddAnswer = () => {
    const { listResult } = this.state;
    this.setState({
      listResult: [...listResult, ...resultDefault],
    });
  };

  handleChangeResult = (e, indexChange) => {
    const value = e.target.value;
    const name = e.target.name;
    const checked = e.target.checked;
    const { listResult } = this.state;

    const newListResult = listResult.reduce(
      (prevResult, currentResult, index) => {
        const newCurrentResult =
          index === indexChange
            ? {
                ...currentResult,
                [name]: name === "is_correct" ? checked : value,
              }
            : currentResult;
        return [...prevResult, newCurrentResult];
      },
      []
    );
    this.setState({ listResult: newListResult });
  };
  handleDeleteResult = (indexDelete) => {
    const { listResult } = this.state;
    const newListResult = listResult.filter(
      (result, index) => index !== indexDelete
    );
    this.setState({
      listResult: newListResult,
    });
  };
  handleShowInformationWinner = () => {
    const { gameGuessNumbers } = this.props;
    const isCheckedFinalResultAnnounced =
      gameGuessNumbers.final_result_announced ? true : false;
    const timeEnd = moment(gameGuessNumbers.time_end).diff(moment());
    const isCheckedTimeEnd = timeEnd > 0 ? false : true;

    return isCheckedFinalResultAnnounced === true && isCheckedTimeEnd === true
      ? true
      : false;
  };

  render() {
    const { types, groupCustomer, gameGuessNumbers, idGameGuessNumber } =
      this.props;
    const {
      txtName,
      txtStart,
      txtEnd,
      txtTurnInDay,
      txtDescription,
      group_customer,
      agency_type_id,
      group_type_id,
      displayError,
      images,
      isLoading,
      isShowed,
      isGuessNumber,
      rangeNumber,
      textResult,
      valueGift,
      listResult,
      is_show_all_prizer,
    } = this.state;

    return (
      <div class="container-fluid">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h4 className="h4 title_content mb-0 text-gray-800">
            {idGameGuessNumber ? "Cập nhật " : "Thêm "} trò chơi đoán số
          </h4>
        </div>
        <br></br>
        <ActionsGameGuessNumberContentStyles>
          <div class="card mb-4">
            <div class="card-header title_content">Nhập thông tin trò chơi</div>
            <div class="card-body" style={{ padding: "0.8rem" }}>
              <div className="gameSpinWheel__content">
                <div className="gameSpinWheel__form">
                  <div className="gameGuessNumber__main">
                    <div className="form-group gameGuessNumber__item">
                      <label for="txtName">Tên trò chơi</label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="txtName"
                        name="txtName"
                        placeholder="Nhập tên trò chơi"
                        autoComplete="off"
                        value={txtName}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group gameGuessNumber__item">
                      <label for="txtTurnInDay">
                        Số lượt chơi được thưởng trong ngày
                      </label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        id="txtTurnInDay"
                        name="txtTurnInDay"
                        placeholder="Nhập số lượt chơi được thưởng trong ngày..."
                        autoComplete="off"
                        value={txtTurnInDay}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group gameGuessNumber__item">
                      <div
                        className="row"
                        style={{ marginBottom: "0px!important" }}
                      >
                        <div className="form-group gameGuessNumber__item col-6">
                          <label for="product_name">Ngày bắt đầu</label>
                          {isLoading == true && idGameGuessNumber ? (
                            <MomentInput
                              min={moment()}
                              value={
                                txtStart == "" || txtStart == null
                                  ? undefined
                                  : moment(txtStart, "DD-MM-YYYY HH:mm")
                              }
                              format="DD-MM-YYYY HH:mm"
                              options={true}
                              enableInputClick={true}
                              monthSelect={true}
                              readOnly={true}
                              translations={{
                                DATE: "Ngày",
                                TIME: "Giờ",
                                SAVE: "Đóng",
                                HOURS: "Giờ",
                                MINUTES: "Phút",
                              }}
                              onSave={() => {}}
                              onChange={this.onChangeStart}
                            />
                          ) : null}
                          {idGameGuessNumber ? null : (
                            <MomentInput
                              min={moment()}
                              format="DD-MM-YYYY HH:mm"
                              options={true}
                              enableInputClick={true}
                              monthSelect={true}
                              readOnly={true}
                              translations={{
                                DATE: "Ngày",
                                TIME: "Giờ",
                                SAVE: "Đóng",
                                HOURS: "Giờ",
                                MINUTES: "Phút",
                              }}
                              onSave={() => {}}
                              onChange={this.onChangeStart}
                            />
                          )}
                        </div>
                        <div className="form-group gameGuessNumber__item col-6">
                          <label for="product_name">Ngày kết thúc</label>
                          {isLoading == true && idGameGuessNumber ? (
                            <MomentInput
                              min={moment()}
                              value={
                                txtEnd == "" || txtEnd == null
                                  ? ""
                                  : moment(txtEnd, "DD-MM-YYYY HH:mm")
                              }
                              format="DD-MM-YYYY HH:mm"
                              options={true}
                              enableInputClick={true}
                              monthSelect={true}
                              readOnly={true}
                              translations={{
                                DATE: "Ngày",
                                TIME: "Giờ",
                                SAVE: "Đóng",
                                HOURS: "Giờ",
                                MINUTES: "Phút",
                              }}
                              onSave={() => {}}
                              onChange={this.onChangeEnd}
                            />
                          ) : null}
                          {idGameGuessNumber ? null : (
                            <MomentInput
                              min={moment()}
                              format="DD-MM-YYYY HH:mm"
                              options={true}
                              enableInputClick={true}
                              monthSelect={true}
                              readOnly={true}
                              translations={{
                                DATE: "Ngày",
                                TIME: "Giờ",
                                SAVE: "Đóng",
                                HOURS: "Giờ",
                                MINUTES: "Phút",
                              }}
                              onSave={() => {}}
                              onChange={this.onChangeEnd}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`alert alert-danger ${displayError}`}
                        role="alert"
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        Thời gian kết thúc phải sau thời gian bắt đầu
                      </div>
                    </div>
                    <div className="form-group gameGuessNumber__item">
                      <label for="txtMaxAmountCoin">Trạng thái hoạt động</label>
                      <label className="status-product on-off">
                        <input
                          type="checkbox"
                          hidden
                          class="checkbox"
                          name="isShowed"
                          value={isShowed}
                          checked={isShowed}
                          onChange={this.onChange}
                        />
                        <div></div>
                      </label>
                    </div>
                    <div>
                      <div className="form-group">
                        <label for="is_show_all_prizer">
                          Hiển thị danh sách người đoán đúng
                        </label>
                        <label className="status-product on-off">
                          <input
                            type="checkbox"
                            hidden
                            class="checkbox"
                            name="is_show_all_prizer"
                            value={is_show_all_prizer}
                            checked={is_show_all_prizer}
                            onChange={this.onChange}
                          />
                          <div></div>
                        </label>
                      </div>
                      <div className="form-group">
                        <label for="txtDescription">Mô tả</label>
                        <textarea
                          type="text"
                          className="form-control input-sm"
                          id="txtDescription"
                          name="txtDescription"
                          placeholder="Nhập mô tả trò chơi..."
                          autoComplete="off"
                          value={txtDescription}
                          onChange={this.onChange}
                          rows="9"
                        />
                      </div>
                    </div>
                    <div className="gameGuessNumber__item">
                      <div className="form-group discount-for">
                        <label htmlFor="group_customer">Áp dụng cho</label>
                        <div
                          style={{
                            display: "flex",
                            columnGap: "10px",
                          }}
                          className="radio discount-for"
                          onChange={this.onChange}
                        >
                          {groups.map((group) => (
                            <label key={group.id}>
                              <input
                                type={group.type}
                                name={group.name}
                                checked={
                                  group_customer == group.value ? true : false
                                }
                                className={group.name}
                                value={group.value}
                              />
                              <span
                                style={{
                                  marginLeft: "5px",
                                }}
                              >
                                {group.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {group_customer == Types.GROUP_CUSTOMER_AGENCY && (
                          <select
                            onChange={this.onChange}
                            value={agency_type_id}
                            name="agency_type_id"
                            class="form-control"
                          >
                            <option value={-1}>--- Chọn cấp đại lý ---</option>
                            {/* <option value={0}>Tất cả</option> */}
                            {types.map((v) => {
                              return (
                                <option value={v.id} key={v.id}>
                                  {v.name}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        {group_customer ==
                          Types.GROUP_CUSTOMER_BY_CONDITION && (
                          <select
                            onChange={this.onChange}
                            value={group_type_id}
                            name="group_type_id"
                            class="form-control"
                          >
                            <option value={-1}>
                              --- Chọn nhóm khách hàng ---
                            </option>
                            {groupCustomer.length > 0 &&
                              groupCustomer.map((group) => {
                                return (
                                  <option value={group.id} key={group.id}>
                                    {group.name}
                                  </option>
                                );
                              })}
                          </select>
                        )}
                      </div>
                      <div className="form-group gameGuessNumber__image ">
                        <label
                          for="txtName"
                          style={{
                            fontWeight: "750",
                          }}
                        >
                          Hình ảnh mô tả (Tối đa 10 ảnh)
                        </label>
                        <div className="gameGuessNumber__imageContent">
                          <Upload
                            multiple
                            setFiles={this.setImages}
                            files={images}
                            images={gameGuessNumbers?.images}
                            limit={10}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group type__game">
                    <label htmlFor="group_customer">Loại kết quả</label>
                    <div
                      style={{
                        display: "flex",
                        columnGap: "10px",
                      }}
                      className="radio"
                      onChange={this.onChange}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="isGuessNumber"
                          checked={isGuessNumber == true}
                          className="isGuessNumber"
                          value={true}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Theo dãy số
                        </span>
                      </label>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="isGuessNumber"
                          checked={isGuessNumber == false}
                          className="isGuessNumber"
                          value={false}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Nhập danh sách đáp án
                        </span>
                      </label>
                    </div>
                  </div>
                  <>
                    {isGuessNumber ? (
                      <div className="gameGuessNumber__isGuessNumber">
                        <div>
                          <div className="gameGuessNumber__item form-group">
                            <label for="rangeNumber">Số lượng chữ số</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              id="rangeNumber"
                              name="rangeNumber"
                              placeholder="Nhập số lượng chữ số của đáp án..."
                              autoComplete="off"
                              value={rangeNumber}
                              onChange={this.onChange}
                            />
                          </div>
                          {Number(rangeNumber) > 0 && (
                            <div
                              className="gameGuessNumber__item form-group"
                              style={{
                                color: themeData().backgroundColor,
                              }}
                            >
                              *Khách hàng cần nhập số từ{" "}
                              {Number(rangeNumber) > 0 &&
                                Array(Number(rangeNumber))
                                  .fill("0")
                                  .join("")}{" "}
                              đến{" "}
                              {Number(rangeNumber) > 0 &&
                                Array(Number(rangeNumber)).fill("9").join("")}
                            </div>
                          )}
                        </div>
                        <div className="gameGuessNumber__item form-group">
                          <label for="valueGift">Phần thưởng</label>
                          <input
                            type="text"
                            className="form-control input-sm"
                            id="valueGift"
                            name="valueGift"
                            placeholder="Nhập phần thưởng..."
                            autoComplete="off"
                            value={valueGift}
                            onChange={this.onChange}
                          />
                        </div>
                        {rangeNumber !== "" && (
                          <div>
                            <div className="gameGuessNumber__item form-group">
                              <label for="textResult">Kết quả</label>
                              <input
                                type="text"
                                className="form-control input-sm"
                                id="textResult"
                                name="textResult"
                                placeholder={`Nhập đáp án có ${rangeNumber} chữ số...`}
                                autoComplete="off"
                                value={textResult}
                                onChange={this.onChange}
                              />
                            </div>
                            <div
                              className="gameGuessNumber__item form-group"
                              style={{
                                color: themeData().backgroundColor,
                              }}
                            >
                              *Có thể bỏ trống, khi có kết quả vào lại chương
                              trình cập nhật sau để công bố!
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="form-group">
                        <label for="txtDescription">Danh sách đáp án</label>
                        <div
                          className="gameGuessNumber__item form-group"
                          style={{
                            color: themeData().backgroundColor,
                          }}
                        >
                          *Có thể bỏ trống đáp án đúng, khi có kết quả vào lại
                          chương trình cập nhật sau để công bố!
                        </div>
                        <div className="mb-4">
                          <div className="gameGuessNumber_answerMain">
                            {listResult.length > 0 &&
                              listResult.map((result, index) => (
                                <div
                                  className="gameGuessNumber__answerItem"
                                  key={index}
                                >
                                  <div className="gameGuessNumber__answerRight">
                                    <span>Đáp án đúng</span>
                                    <input
                                      type="checkbox"
                                      name="is_correct"
                                      value={result.is_correct}
                                      checked={result.is_correct}
                                      onChange={(e) =>
                                        this.handleChangeResult(e, index)
                                      }
                                    />
                                  </div>
                                  <div className="gameGuessNumber__answer">
                                    <span>Đáp án</span>
                                    <input
                                      type="text"
                                      placeholder="Nhập đáp án tại đây"
                                      className="form-control"
                                      name="text_result"
                                      value={result.text_result}
                                      checked={result.text_result}
                                      onChange={(e) =>
                                        this.handleChangeResult(e, index)
                                      }
                                    />
                                  </div>
                                  {result.is_correct && (
                                    <div className="gameGuessNumber__answer">
                                      <span>Phần quà</span>
                                      <input
                                        type="text"
                                        placeholder="Nhập đáp án tại đây"
                                        className="form-control"
                                        name="value_gift"
                                        value={result.value_gift}
                                        checked={result.value_gift}
                                        onChange={(e) =>
                                          this.handleChangeResult(e, index)
                                        }
                                      />
                                    </div>
                                  )}

                                  <div className="gameGuessNumber__answerIcon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      onClick={() =>
                                        this.handleDeleteResult(index)
                                      }
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      ></path>
                                    </svg>
                                  </div>
                                </div>
                              ))}
                            <div style={{ marginTop: "10px" }}>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={this.handleAddAnswer}
                              >
                                <i className="fa fa-plus"></i> Thêm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
          {/* {this.handleShowInformationWinner() && (
            <div className="card mb-4">
              <div className="card-body" style={{ padding: "0.8rem" }}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2,1fr)",
                        columnGap: "20px",
                      }}
                    >
                      <div className="form-group">
                        <label for="txtDescription">
                          Thông tin người trúng thưởng
                        </label>
                        <div>
                          {gameGuessNumbers.final_result_announced?.customer_win
                            ?.length === 0 ? (
                            <div
                              style={{
                                color: "rgb(193, 32, 38)",
                              }}
                            >
                              Không có người nào trúng thưởng !
                            </div>
                          ) : (
                            <>
                              <div className="winner__image">
                                {gameGuessNumbers.final_result_announced
                                  ?.customer_win[0]?.avatar_image ? (
                                  <img
                                    src={
                                      gameGuessNumbers.final_result_announced
                                        ?.customer_win[0]?.avatar_image
                                    }
                                    alt={
                                      gameGuessNumbers.final_result_announced
                                        ?.customer_win[0]?.name
                                    }
                                  />
                                ) : (
                                  <img
                                    src="../../../images/people.png"
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="winner__info">
                                <span>Tên người trúng giải: </span>
                                <span>
                                  {
                                    gameGuessNumbers.final_result_announced
                                      ?.customer_win[0]?.name
                                  }
                                </span>
                              </div>
                              <div className="winner__info">
                                <span>Số điện thoại: </span>
                                <span>
                                  {" "}
                                  {
                                    gameGuessNumbers.final_result_announced
                                      ?.customer_win[0]?.phone_number
                                  }
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {gameGuessNumbers.final_result_announced?.customer_win
                        ?.length > 0 && (
                        <div className="form-group">
                          <label for="txtDescription">
                            Danh sách người dự đoán kết quả đúng
                          </label>
                          <div>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">STT</th>
                                  <th scope="col">Tên</th>
                                  <th scope="col">Số điện thoại</th>
                                  <th scope="col">Thời gian dự đoán</th>
                                </tr>
                              </thead>
                              <tbody>
                                {gameGuessNumbers.final_result_announced?.customer_win.map(
                                  (customer, index) => (
                                    <tr
                                      style={{
                                        background:
                                          index === 0
                                            ? "#ff00004a"
                                            : "transparent",
                                      }}
                                    >
                                      <td>{index + 1}</td>
                                      <td>{customer.name}</td>
                                      <td>{customer.phone_number}</td>
                                      <td>{customer.created_at}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
          <div className="card mb-4">
            <div className="card-body" style={{ padding: "0.8rem" }}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {this.handleShowInformationWinner() === false ? (
                    <>
                      {idGameGuessNumber ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={this.updateGameGuessNumber}
                        >
                          <i className="fa fa-plus"></i> Cập nhật
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={this.createGameGuessNumber}
                        >
                          <i className="fa fa-plus"></i> Tạo
                        </button>
                      )}
                    </>
                  ) : null}

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={this.goBack}
                    className={`btn btn-warning btn-sm color-white `}
                  >
                    <i className="fa fa-arrow-left"></i> Trở về
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ActionsGameGuessNumberContentStyles>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.agencyReducers.agency.allAgencyType,
    groupCustomer:
      state.groupCustomerReducers.group_customer.groupCustomer.data,
    gameGuessNumbers: state.gamificationReducers.guess_numbers.gameGuessNumbers,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    addGameGuessNumbers: (store_code, form) => {
      dispatch(gamificationAction.addGameGuessNumbers(store_code, form));
    },
    updateGameGuessNumbers: (store_code, idGame, form, page) => {
      dispatch(
        gamificationAction.updateGameGuessNumbers(
          store_code,
          idGame,
          form,
          page
        )
      );
    },
    fetchGameGuessNumbersById: (store_code, idGame) => {
      dispatch(
        gamificationAction.fetchGameGuessNumbersById(store_code, idGame)
      );
    },
    resetGuessNumbers: () => {
      dispatch({ type: Types.GAME_GUESS_NUMBERS, data: {} });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsGameGuessNumberContent);
