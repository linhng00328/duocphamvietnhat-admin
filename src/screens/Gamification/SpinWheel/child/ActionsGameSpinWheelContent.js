import moment from "moment";
import React, { Component } from "react";
import MomentInput from "react-moment-input";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import Upload from "../../../../components/Upload";
import * as Types from "../../../../constants/ActionType";
import { formatNumberV2, getQueryParams } from "../../../../ultis/helpers";
import * as gamificationAction from "../../../../actions/gamification";
import EditGiftGameSpinWheel from "./EditGiftGameSpinWheel";
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

const backgroundImages = [
  {
    url: "/images/background_spin_wheel.png",
    value: "assets/image_default/background_spin_wheel.png",
  },
  {
    url: "/images/background_doapp.png",
    value: "assets/image_default/background_doapp.png",
  },
  {
    url: "/images/background_image_game.png",
    value: "assets/image_default/background_image_game.png",
  },
  {
    url: "/images/background_game_image2.png",
    value: "assets/image_default/background_game_image2.png",
  },
];

const ActionsGameSpinWheelContentStyles = styled.div`
  .gameSpinWheel__main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
  .gameSpinWheel__imageContent {
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
`;

class ActionsGameSpinWheelContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtTurnInDay: "",
      txtMaxAmountCoin: "",
      txtMaxGift: "",
      txtNumberLimit: "",
      txtStart: "",
      txtEnd: "",
      txtDescription: "",
      images: [],
      isShake: false,
      typeBackgroundImage: Types.TYPE_IMAGE_DEFAULT,
      backgroundDefaultImage: backgroundImages[0],
      backgroundSelfPostedImage: "",
      displayError: "hide",
      group_customer: 0,
      agency_type_id: null,
      group_type_id: null,
      isLoading: false,
      listGift: [],
    };
  }
  componentDidMount() {
    const { idGameSpinWheel, store_code, fetchGameSpinWheelsById } = this.props;
    if (idGameSpinWheel) {
      fetchGameSpinWheelsById(store_code, idGameSpinWheel);
    }
  }
  componentWillUnmount() {
    const { resetGameSpinWheels } = this.props;
    resetGameSpinWheels();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { gameSpinWheels } = this.props;
    if (!shallowEqual(gameSpinWheels, nextProps.gameSpinWheels)) {
      const startTime =
        nextProps.gameSpinWheels.time_start == null ||
        nextProps.gameSpinWheels.time_start == ""
          ? ""
          : moment(nextProps.gameSpinWheels.time_start).format(
              "DD-MM-YYYY HH:mm"
            );
      const endTime =
        nextProps.gameSpinWheels.time_end == null ||
        nextProps.gameSpinWheels.time_end == ""
          ? ""
          : moment(nextProps.gameSpinWheels.time_end).format(
              "DD-MM-YYYY HH:mm"
            );
      const newBackgroundDefaultImage = backgroundImages.filter(
        (item) => item.value === nextProps.gameSpinWheels?.background_image_url
      );
      this.setState({
        txtName: nextProps.gameSpinWheels.name,
        txtTurnInDay: nextProps.gameSpinWheels.turn_in_day,
        txtMaxAmountCoin: nextProps.gameSpinWheels.max_amount_coin_per_player,
        txtMaxGift: nextProps.gameSpinWheels.max_amount_gift_per_player,
        txtNumberLimit: nextProps.gameSpinWheels.number_limit_people,
        txtDescription: nextProps.gameSpinWheels.description,
        group_customer: nextProps.gameSpinWheels.apply_for,
        agency_type_id: nextProps.gameSpinWheels.agency_type_id
          ? Number(nextProps.gameSpinWheels.agency_type_id)
          : nextProps.gameSpinWheels.agency_type_id,
        group_type_id: nextProps.gameSpinWheels.group_customer_id
          ? Number(nextProps.gameSpinWheels.group_customer_id)
          : nextProps.gameSpinWheels.group_customer_id,
        txtStart: startTime,
        txtEnd: endTime,
        isShake: nextProps.gameSpinWheels.is_shake,
        isLoading: true,
        typeBackgroundImage: nextProps.gameSpinWheels.type_background_image,
        backgroundDefaultImage:
          nextProps.gameSpinWheels.type_background_image ==
          Types.TYPE_IMAGE_DEFAULT
            ? newBackgroundDefaultImage[0]
            : backgroundImages[0],
        backgroundSelfPostedImage:
          nextProps.gameSpinWheels.type_background_image ==
          Types.TYPE_IMAGE_SELF_POSTED
            ? nextProps.gameSpinWheels.background_image_url
            : "",
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
      name === "txtMaxAmountCoin" ||
      name === "txtMaxGift" ||
      name === "txtNumberLimit"
    ) {
      const valueNumber = formatNumberV2(value);
      this.setState({ [name]: valueNumber });
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
      if (name === "isShake") {
        this.setState({
          [name]: value === true || value === "true" ? true : false,
        });
        return;
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
  createGameSpinWheel = () => {
    const {
      txtName,
      txtTurnInDay,
      txtMaxAmountCoin,
      txtMaxGift,
      txtNumberLimit,
      txtStart,
      txtEnd,
      agency_type_id,
      group_type_id,
      group_customer,
      isShake,
      images,
      listGift,
      txtDescription,
      typeBackgroundImage,
      backgroundDefaultImage,
      backgroundSelfPostedImage,
    } = this.state;
    const { addGameSpinWheels, store_code, showError } = this.props;

    const isErrorNameGifts =
      listGift.length > 0 && listGift.every((gift) => gift.name !== "");
    const isErrorAmountGifts =
      listGift.length > 0 &&
      listGift.every(
        (gift) => gift.amount_gift !== "" && gift.amount_gift !== null
      );
    const isErrorPercentGifts =
      listGift.length > 0 &&
      listGift.every((gift) => gift.percent_received !== "");
    const isErrorTypeGifts =
      listGift.length > 0 && listGift.every((gift) => gift.type_gift != -1);
    const turnInDay = txtTurnInDay?.toString().replace(/\./g, "")
      ? Number(txtTurnInDay?.toString().replace(/\./g, ""))
      : txtTurnInDay?.toString().replace(/\./g, "");
    // const numberLimitPeople = txtNumberLimit?.toString().replace(/\./g, "")
    //   ? Number(txtNumberLimit?.toString().replace(/\./g, ""))
    //   : txtNumberLimit?.toString().replace(/\./g, "");
    // const maxAmountGiftPerPlayer = txtMaxGift?.toString().replace(/\./g, "")
    //   ? Number(txtMaxGift?.toString().replace(/\./g, ""))
    //   : txtMaxGift?.toString().replace(/\./g, "");
    // const maxAmountCoinPerPlayer = txtMaxAmountCoin
    //   ?.toString()
    //   .replace(/\./g, "")
    //   ? Number(txtMaxAmountCoin?.toString().replace(/\./g, ""))
    //   : txtMaxAmountCoin?.toString().replace(/\./g, "");
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
          content: "Vui lòng nhập số lần quay thưởng trong một ngày",
        },
      });
    } else if (
      typeBackgroundImage == Types.TYPE_IMAGE_SELF_POSTED &&
      !backgroundSelfPostedImage
    ) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn hình nền",
        },
      });
    } else if (listGift.length === 0) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn phần thưởng",
        },
      });
    } else if (listGift.length < 2) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn từ 2 phần thưởng",
        },
      });
    } else if (isErrorNameGifts === false) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ tên phần thưởng",
        },
      });
    } else if (isErrorAmountGifts === false) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ số lượng phần thưởng",
        },
      });
    } else if (isErrorPercentGifts === false) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ phần trăm phần thưởng",
        },
      });
    } else if (isErrorTypeGifts === false) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ loại phần thưởng",
        },
      });
    } else {
      const gameSpinWheel = {
        name: txtName,
        turn_in_day: turnInDay,
        max_amount_coin_per_player: 0,
        max_amount_gift_per_player: 0,
        number_limit_people: 0,
        agency_type_id: agency_type_id
          ? Number(agency_type_id)
          : agency_type_id,
        group_customer_id: group_type_id
          ? Number(group_type_id)
          : group_type_id,
        apply_for: group_customer ? Number(group_customer) : group_customer,
        is_shake: isShake,
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
        list_gift_spin_wheel: listGift,
        description: txtDescription,
        type_background_image: typeBackgroundImage,
        background_image_url:
          typeBackgroundImage == Types.TYPE_IMAGE_DEFAULT
            ? backgroundDefaultImage.value
            : backgroundSelfPostedImage,
      };

      addGameSpinWheels(store_code, gameSpinWheel);
    }
  };
  updateGameSpinWheel = () => {
    const {
      txtName,
      txtTurnInDay,
      txtMaxAmountCoin,
      txtMaxGift,
      txtNumberLimit,
      txtStart,
      txtEnd,
      agency_type_id,
      group_type_id,
      group_customer,
      isShake,
      images,
      txtDescription,
      typeBackgroundImage,
      backgroundDefaultImage,
      backgroundSelfPostedImage,
      listGift,
    } = this.state;

    const { updateGameSpinWheels, store_code, idGameSpinWheel, showError } =
      this.props;

    const turnInDay = txtTurnInDay?.toString().replace(/\./g, "")
      ? Number(txtTurnInDay?.toString().replace(/\./g, ""))
      : txtTurnInDay?.toString().replace(/\./g, "");
    // const numberLimitPeople = txtNumberLimit?.toString().replace(/\./g, "")
    //   ? Number(txtNumberLimit?.toString().replace(/\./g, ""))
    //   : txtNumberLimit?.toString().replace(/\./g, "");
    // const maxAmountGiftPerPlayer = txtMaxGift?.toString().replace(/\./g, "")
    //   ? Number(txtMaxGift?.toString().replace(/\./g, ""))
    //   : txtMaxGift?.toString().replace(/\./g, "");
    // const maxAmountCoinPerPlayer = txtMaxAmountCoin
    //   ?.toString()
    //   .replace(/\./g, "")
    //   ? Number(txtMaxAmountCoin?.toString().replace(/\./g, ""))
    //   : txtMaxAmountCoin?.toString().replace(/\./g, "");

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
          content: "Vui lòng nhập số lần quay thưởng trong một ngày",
        },
      });
    } else if (
      typeBackgroundImage == Types.TYPE_IMAGE_SELF_POSTED &&
      !backgroundSelfPostedImage
    ) {
      showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn hình nền",
        },
      });
    } else {
      const gameSpinWheel = {
        name: txtName,
        turn_in_day: turnInDay,
        max_amount_coin_per_player: 0,
        max_amount_gift_per_player: 0,
        number_limit_people: 0,
        agency_type_id: agency_type_id
          ? Number(agency_type_id)
          : agency_type_id,
        group_customer_id: group_type_id
          ? Number(group_type_id)
          : group_type_id,
        apply_for: group_customer ? Number(group_customer) : group_customer,
        is_shake: isShake,
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
        type_background_image: typeBackgroundImage,
        background_image_url:
          typeBackgroundImage == Types.TYPE_IMAGE_DEFAULT
            ? backgroundDefaultImage.value
            : backgroundSelfPostedImage,
      };
      const page = getQueryParams("page") || 1;
      updateGameSpinWheels(store_code, idGameSpinWheel, gameSpinWheel, page);
    }
  };

  goBack = () => {
    const { store_code } = this.props;
    const page = getQueryParams("page") || 1;
    history.push(`/game_spin_wheels/${store_code}?page=${page}`);
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

  render() {
    const {
      types,
      groupCustomer,
      gameSpinWheels,
      store_code,
      idGameSpinWheel,
    } = this.props;

    const {
      txtName,
      txtStart,
      txtEnd,
      txtTurnInDay,
      txtMaxAmountCoin,
      txtMaxGift,
      txtNumberLimit,
      txtDescription,
      group_customer,
      agency_type_id,
      group_type_id,
      displayError,
      isShake,
      images,
      typeBackgroundImage,
      isLoading,
      backgroundDefaultImage,
      backgroundSelfPostedImage,
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
            {idGameSpinWheel ? "Cập nhật " : "Thêm "} trò chơi quay thưởng
          </h4>
        </div>
        <br></br>
        <div class="card mb-4">
          <div class="card-header title_content">Nhập thông tin trò chơi</div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <ActionsGameSpinWheelContentStyles className="gameSpinWheel__content">
              <div className="gameSpinWheel__form">
                <div className="gameSpinWheel__main">
                  <div className="form-group gameSpinWheel__item">
                    <label for="txtName">Tên vòng quay</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="txtName"
                      name="txtName"
                      placeholder="Nhập tên vòng quay"
                      autoComplete="off"
                      value={txtName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group gameSpinWheel__item">
                    <label for="txtTurnInDay">
                      Số lượt quay được thưởng trong ngày
                    </label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="txtTurnInDay"
                      name="txtTurnInDay"
                      placeholder="Nhập số lượt quay được thưởng trong ngày..."
                      autoComplete="off"
                      value={txtTurnInDay}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group gameSpinWheel__item">
                    <div
                      className="row"
                      style={{ marginBottom: "0px!important" }}
                    >
                      <div className="form-group gameSpinWheel__item col-6">
                        <label for="product_name">Ngày bắt đầu</label>
                        {isLoading == true && idGameSpinWheel ? (
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
                        {idGameSpinWheel ? null : (
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
                      <div className="form-group gameSpinWheel__item col-6">
                        <label for="product_name">Ngày kết thúc</label>
                        {isLoading == true && idGameSpinWheel ? (
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
                        {idGameSpinWheel ? null : (
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
                  {/* <div className="form-group gameSpinWheel__item">
                    <label for="txtMaxAmountCoin">Số xu tối đa</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="txtMaxAmountCoin"
                      name="txtMaxAmountCoin"
                      placeholder="Nhập số xu tối đa..."
                      autoComplete="off"
                      value={txtMaxAmountCoin}
                      onChange={this.onChange}
                    />
                  </div> */}
                  {/* <div className="form-group gameSpinWheel__item">
                    <label for="txtMaxGift">Số phần thưởng tối đa</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="txtMaxGift"
                      name="txtMaxGift"
                      placeholder="Nhập số lượng phần thưởng tối đa..."
                      autoComplete="off"
                      value={txtMaxGift}
                      onChange={this.onChange}
                    />
                  </div> */}
                  {/* <div className="form-group gameSpinWheel__item">
                    <label for="txtNumberLimit">
                      Giới hạn số người tham gia
                    </label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="txtNumberLimit"
                      name="txtNumberLimit"
                      placeholder="Nhập giới hạn số người tham gia..."
                      autoComplete="off"
                      value={txtNumberLimit}
                      onChange={this.onChange}
                    />
                  </div> */}
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
                    {group_customer == Types.GROUP_CUSTOMER_BY_CONDITION && (
                      <select
                        onChange={this.onChange}
                        value={group_type_id}
                        name="group_type_id"
                        class="form-control"
                      >
                        <option value={-1}>--- Chọn nhóm khách hàng ---</option>
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
                  <div className="form-group type__game__background">
                    <label
                      htmlFor="group_customer"
                      style={{
                        fontWeight: "750",
                      }}
                    >
                      Hình nền
                    </label>
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
                          name="typeBackgroundImage"
                          checked={
                            typeBackgroundImage == Types.TYPE_IMAGE_DEFAULT
                          }
                          className="typeBackgroundImage"
                          value={Types.TYPE_IMAGE_DEFAULT}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Ảnh mặc định
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
                          name="typeBackgroundImage"
                          checked={
                            typeBackgroundImage == Types.TYPE_IMAGE_SELF_POSTED
                          }
                          className="typeBackgroundImage"
                          value={Types.TYPE_IMAGE_SELF_POSTED}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Ảnh tự đăng
                        </span>
                      </label>
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      {typeBackgroundImage == Types.TYPE_IMAGE_DEFAULT ? (
                        <div className="bgImage">
                          {backgroundImages.map((element, index) => (
                            <div
                              key={index}
                              className="bgImage__item"
                              style={{
                                borderColor:
                                  backgroundDefaultImage?.value ===
                                  element?.value
                                    ? themeData().backgroundColor
                                    : "transparent",
                              }}
                              onClick={() =>
                                this.handleSelectedBackground(element)
                              }
                            >
                              <img src={element.url} alt="bg_spin_wheel" />
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div
                        style={{
                          display:
                            typeBackgroundImage == Types.TYPE_IMAGE_SELF_POSTED
                              ? "inline-block"
                              : "none",
                        }}
                      >
                        <Upload
                          setFile={this.setBackgroundSelfPostedImage}
                          file={backgroundSelfPostedImage}
                          image={gameSpinWheels.background_image_url}
                          forbiddenLinks={[
                            "assets/image_default/background_spin_wheel.png",
                            "assets/image_default/background_doapp.png",
                            "assets/image_default/background_image_game.png",
                            "assets/image_default/background_game_image2.png",
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group gameSpinWheel__image ">
                    <label
                      for="txtName"
                      style={{
                        fontWeight: "750",
                      }}
                    >
                      Hình ảnh mô tả (Tối đa 10 ảnh)
                    </label>
                    <div className="gameSpinWheel__imageContent">
                      <Upload
                        multiple
                        setFiles={this.setImages}
                        files={images}
                        images={gameSpinWheels.images}
                        limit={10}
                      />
                    </div>
                  </div>
                  <div className="form-group type__game">
                    <label htmlFor="group_customer">Cách chơi</label>
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
                          name="isShake"
                          checked={isShake === false}
                          className="isShake"
                          value={false}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Quay
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
                          name="isShake"
                          checked={isShake === true}
                          className="isShake"
                          value={true}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          Lắc
                        </span>
                      </label>
                    </div>
                  </div>
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
                    rows="3"
                  />
                </div>
              </div>
            </ActionsGameSpinWheelContentStyles>
          </div>
        </div>
        {idGameSpinWheel && (
          <div className="card mb-4">
            <div className="card-body" style={{ padding: "0.8rem" }}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.updateGameSpinWheel}
                  >
                    <i className="fa fa-edit"></i> Cập nhật
                  </button>
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
        )}

        <EditGiftGameSpinWheel
          gameSpinWheels={gameSpinWheels}
          store_code={store_code}
          idGameSpinWheel={idGameSpinWheel}
          setListGift={this.setListGift}
        />
        {!idGameSpinWheel && (
          <div className="card mb-4">
            <div className="card-body" style={{ padding: "0.8rem" }}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.createGameSpinWheel}
                  >
                    <i className="fa fa-plus"></i> Tạo
                  </button>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.agencyReducers.agency.allAgencyType,
    groupCustomer:
      state.groupCustomerReducers.group_customer.groupCustomer.data,
    gameSpinWheels: state.gamificationReducers.spin_wheel.gameSpinWheels,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    addGameSpinWheels: (store_code, form) => {
      dispatch(gamificationAction.addGameSpinWheels(store_code, form));
    },
    updateGameSpinWheels: (store_code, idGame, form, page) => {
      dispatch(
        gamificationAction.updateGameSpinWheels(store_code, idGame, form, page)
      );
    },
    fetchListGiftGameSpinWheels: (store_code, idGame) => {
      dispatch(
        gamificationAction.fetchListGiftGameSpinWheels(store_code, idGame)
      );
    },
    fetchGameSpinWheelsById: (store_code, idGame) => {
      dispatch(gamificationAction.fetchGameSpinWheelsById(store_code, idGame));
    },
    resetGameSpinWheels: () => {
      dispatch({ type: Types.GAME_SPIN_WHEELS, data: {} });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsGameSpinWheelContent);
