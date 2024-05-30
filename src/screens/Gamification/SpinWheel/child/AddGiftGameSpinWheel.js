import React, { Component } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import * as Types from "../../../../constants/ActionType";
import { getBranchId } from "../../../../ultis/branchUtils";
import { formatNumberV2, randomString } from "../../../../ultis/helpers";
import * as productApi from "../../../../data/remote/product";
import * as gamificationAction from "../../../../actions/gamification";
import { connect, shallowEqual } from "react-redux";
class MoreListGiftGameSpinWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScan: randomString(10),
      isChangeValue: "",
      selectValue: [],
      indexSelectedAdd: null,
    };
    this.refSearchProduct = React.createRef();

    this.afterEnter = false;
    this.search = "";
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {
      saveSuccessfully,
      setListGiftAdd,
      listGiftAdd,
      saveMessageReturn,
      listImgProductV2,
      setListGift,
    } = this.props;
    const { indexSelectedAdd } = this.state;

    if (
      !shallowEqual(saveSuccessfully, nextProps.saveSuccessfully) &&
      nextProps.saveSuccessfully
    ) {
      const newListGiftAdd = listGiftAdd.filter(
        (gift, index) => index !== indexSelectedAdd
      );
      setListGiftAdd(newListGiftAdd);
      saveMessageReturn(false);
    }

    if (
      !shallowEqual(listImgProductV2, nextProps.listImgProductV2) &&
      nextState.indexSelectedAdd !== null
    ) {
      const newListGiftAdd = listGiftAdd.reduce(
        (prevData, currentData, index) => {
          const newData =
            indexSelectedAdd === index
              ? {
                  ...currentData,
                  image_url: nextProps.listImgProductV2[0],
                }
              : currentData;

          return [...prevData, newData];
        },
        []
      );
      this.setState({ indexSelectedAdd: null });
      setListGiftAdd(newListGiftAdd);
    }

    if (!shallowEqual(listGiftAdd, nextProps.listGiftAdd)) {
      const newListGift = nextProps.listGiftAdd.reduce((prevData, nextData) => {
        const newGift = {
          name: nextData.name,
          image_url: nextData.image_url,
          type_gift: nextData.type_gift,
          value_gift: nextData.value_gift,
          text: nextData.text,
          percent_received: nextData.percent_received
            ? nextData.percent_received.toString().replace(/\./g, "")
            : null,
          amount_gift: nextData.amount_gift
            ? nextData.amount_gift.toString().replace(/\./g, "")
            : null,
          amount_coin: nextData.amount_coin
            ? nextData.amount_coin.toString().replace(/\./g, "")
            : 0,
        };
        return [...prevData, newGift];
      }, []);

      setListGift(newListGift);
    }

    return true;
  }

  onChangeAdd = (e, indexAdd) => {
    const { listGiftAdd, setListGiftAdd } = this.props;
    const { selectValue } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    if (name === "percent_received") {
      const _valuePercentReceived = formatNumberV2(value)
        ?.toString()
        ?.replace(/\./g, "");
      if (Number(_valuePercentReceived) > 10000) return;
    }
    if (name !== "type_gift") {
      const newListGift = listGiftAdd.reduce((prevData, currentData, index) => {
        const newData =
          indexAdd === index
            ? {
                ...currentData,
                [name]:
                  name === "amount_gift" ||
                  name === "amount_coin" ||
                  name === "percent_received"
                    ? formatNumberV2(value)
                    : value,
              }
            : currentData;
        return [...prevData, newData];
      }, []);
      setListGiftAdd(newListGift);
    } else {
      const newListGift = listGiftAdd.reduce((prevData, currentData, index) => {
        const newData =
          indexAdd === index
            ? {
                ...currentData,
                [name]: Number(value),
                amount_coin: null,
                value_gift: null,
                text: "",
              }
            : currentData;
        return [...prevData, newData];
      }, []);
      const newSearchValue = selectValue;
      newSearchValue[indexAdd] = null;
      this.setState({ searchValue: newSearchValue });
      setListGiftAdd(newListGift);
    }
  };
  // Handle Search Async
  _recordInput = (name, event) => {
    if (event.keyCode == 13) {
      this.setState({ isScan: randomString(10) });
    }
  };
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  onChangeProduct = (selectValue, index) => {
    const { listGiftAdd, setListGiftAdd } = this.props;
    const newDataSearch = this.state.selectValue;
    newDataSearch[index] = selectValue;
    const newListGift = listGiftAdd.reduce((prevData, currentData, index) => {
      const newData = newDataSearch[index]
        ? {
            ...currentData,
            value_gift: newDataSearch[index].value,
            name: newDataSearch[index].label,
          }
        : currentData;

      return [...prevData, newData];
    }, []);
    setListGiftAdd(newListGift);
    this.setState({
      selectValue: newDataSearch,
      isChangeValue: randomString(10),
    });
    this.sleep(100).then(() => {
      if (this.refSearchProduct != null) {
        this.refSearchProduct.focus();
      }
    });
  };
  loadProducts = async (search, loadedOptions, { page }) => {
    var { startAsync } = this.state;
    var { products } = this.props;

    this.search = search;

    if (startAsync === true) {
      this.setState({ startAsync: false });
      return {
        options: products.data.map((i) => {
          return {
            value: i.id,
            label: `${i.name}`,
          };
        }),

        hasMore: products.data.length == 6,
        additional: {
          page: page + 1,
        },
      };
    }

    var { store_code } = this.props;
    var branch_id = getBranchId();

    const params = `&search=${search}&limit=6`;
    const res = await productApi.fetchAllProductV2(
      store_code,
      branch_id,
      page,
      params
    );

    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }

    const listShowChoose = res.data.data.data.map((i) => {
      return {
        value: i.id,
        label: `${i.name}`,
      };
    });

    if (this.refSearchProduct != null) {
      if (
        listShowChoose.length == 1 &&
        !isNaN(this.search) &&
        this.search.length > 8
      ) {
        this.setState({ selectValue: listShowChoose[0] });
        //  isNaN('123')
        this.sleep(100).then(() => {
          if (this.refSearchProduct != null) {
            this.refSearchProduct.setValue("");
          }
        });

        this.afterEnter = false;
        return {
          options: listShowChoose,

          hasMore: res.data.data.data.length == 6,
          additional: {
            page: page + 1,
          },
        };
      }
    }

    return {
      options: listShowChoose,

      hasMore: res.data.data.data.length == 6,
      additional: {
        page: page + 1,
      },
    };
  };

  //Add Gift Game
  saveGiftGame = (gift, index) => {
    const { saveGiftGameSpinWheel, store_code, idGameSpinWheel, showError } =
      this.props;

    const isErrorNameGifts = gift.name !== "";
    const isErrorAmountGifts =
      gift.amount_gift !== "" && gift.amount_gift !== null;
    const isErrorPercentGifts = gift.percent_received !== "";
    const isErrorTypeGifts = gift.type_gift != -1;
    if (isErrorNameGifts === false) {
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
      const newGift = {
        name: gift.name,
        image_url: gift.image_url,
        type_gift: gift.type_gift,
        percent_received: gift.percent_received,
        value_gift: gift.value_gift,
        text: gift.text,
        amount_gift: gift.amount_gift
          ? gift.amount_gift.toString().replace(/\./g, "")
          : null,
        amount_coin: gift.amount_coin
          ? gift.amount_coin.toString().replace(/\./g, "")
          : 0,
      };
      this.setState({ indexSelectedAdd: index });
      saveGiftGameSpinWheel(store_code, idGameSpinWheel, newGift);
    }
  };

  //Delete Gift Game
  handleDeleteGiftGame = (indexDeleted) => {
    const { listGiftAdd, setListGiftAdd } = this.props;
    const newListGiftAdd = listGiftAdd.filter(
      (gift, index) => index !== indexDeleted
    );
    setListGiftAdd(newListGiftAdd);
  };

  //Hanlle Upload Image
  handleUploadImageAdd = (e, index) => {
    const file = e.target.files[0];
    const { uploadListImgProductV2 } = this.props;
    if (file) {
      const updatedList = [file];
      this.setState({ indexSelectedAdd: index });
      uploadListImgProductV2(updatedList);
    }
  };
  render() {
    const { listGiftAdd, idGameSpinWheel } = this.props;
    const { selectValue } = this.state;

    const formatOptionLabel = ({ value, label, product }) => {
      return <span>{label}</span>;
    };
    const customStyles = {
      menu: (styles) => ({
        ...styles,
        width: "350px",
      }),
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        fontWeight: 200,
        padding: 20,
        color: "black",
      }),
    };
    return (
      <>
        {listGiftAdd.length > 0 &&
          listGiftAdd.map((gift, index) => (
            <div key={gift.index} className="gift__item">
              <div className="gift__image gameSpinWheel__image">
                <img
                  src={gift.image_url ? gift.image_url : "/images/no_img.png"}
                  alt="image_gift"
                />
                <div className="gift__background">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => this.handleUploadImageAdd(e, index)}
                    />
                  </label>
                </div>
              </div>
              <div className="gameSpinWheel__input gameSpinWheel__name">
                <input
                  type="text"
                  placeholder="Tên phần thưởng"
                  value={gift.name}
                  name="name"
                  onChange={(e) => this.onChangeAdd(e, index)}
                  className="form-control"
                />
              </div>
              <div className="gameSpinWheel__input gameSpinWheel__type">
                <select
                  className="form-control"
                  value={gift.type_gift}
                  name="type_gift"
                  onChange={(e) => this.onChangeAdd(e, index)}
                >
                  <option value={-1}>---Chọn loại thưởng---</option>
                  <option value={Types.GIFT_IS_COIN}>Tặng xu</option>
                  <option value={Types.GIFT_IS_ITEM}>Tặng sản phẩm</option>
                  <option value={Types.GIFT_IS_LUCKY_AFTER}>
                    Chúc bạn may mắn
                  </option>
                  <option value={Types.GIFT_IS_LOST_TURN}>Mất lượt</option>
                  <option value={Types.GIFT_IS_TEXT}>Tùy chọn</option>
                </select>
              </div>
              <div className="gameSpinWheel__input gameSpinWheel__gift">
                {Number(gift.type_gift) === Types.GIFT_IS_COIN ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Số xu"
                      value={gift.amount_coin || ""}
                      className="form-control"
                      name="amount_coin"
                      onChange={(e) => this.onChangeAdd(e, index)}
                    />
                  </div>
                ) : Number(gift.type_gift) === Types.GIFT_IS_ITEM ? (
                  <div>
                    <AsyncPaginate
                      onKeyUp={(event) => {
                        this._recordInput("onKeyUp", event);
                      }}
                      onKeyDown={(event) => {
                        this._recordInput("onKeyUp", event);
                      }}
                      selectRef={(ref) => {
                        this.refSearchProduct = ref;
                      }}
                      noOptionsMessage={() => "Không tìm thấy sản phẩm nào"}
                      loadingMessage={() => "Đang tìm..."} //minor type-O here
                      placeholder="Tìm kiếm sản phẩm"
                      value={
                        selectValue && selectValue.length > 0
                          ? selectValue[index]
                          : null
                      }
                      loadOptions={this.loadProducts}
                      formatOptionLabel={formatOptionLabel}
                      id="recipientReferences1"
                      onChange={(e) => this.onChangeProduct(e, index)}
                      additional={{
                        page: 1,
                      }}
                      styles={customStyles}
                      debounceTimeout={500}
                      isClearable
                      isSearchable
                    />
                  </div>
                ) : gift.type_gift === Types.GIFT_IS_TEXT ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Nhập tùy chọn"
                      className="form-control"
                      value={gift.text || ""}
                      name="text"
                      onChange={(e) => this.onChangeAdd(e, index)}
                    />
                  </div>
                ) : gift.type_gift === Types.GIFT_IS_LUCKY_AFTER ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Chúc bạn may mắn"
                      className="form-control"
                      value=""
                      disabled
                    />
                  </div>
                ) : gift.type_gift === Types.GIFT_IS_LOST_TURN ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Mất lượt"
                      className="form-control"
                      value=""
                      disabled
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Chưa chọn loại thưởng"
                      className="form-control"
                      value=""
                      disabled
                    />
                  </div>
                )}
              </div>
              <div className="gameSpinWheel__input gameSpinWheel__amount">
                <input
                  type="text"
                  placeholder="Số lượng"
                  value={gift.amount_gift}
                  name="amount_gift"
                  onChange={(e) => this.onChangeAdd(e, index)}
                  className="form-control"
                />
              </div>
              <div className="gameSpinWheel__input gameSpinWheel__percent">
                <input
                  type="text"
                  placeholder="Tỉ lệ trúng"
                  value={gift.percent_received}
                  name="percent_received"
                  onChange={(e) => this.onChangeAdd(e, index)}
                  className="form-control"
                />
              </div>
              <div className="gameSpinWheel__actions">
                {idGameSpinWheel && (
                  <button
                    className={`gameSpinWheel__actions__item btn ${
                      gift.name ? "btn-warning" : "btn-disabled"
                    }`}
                    disabled={gift.name ? false : true}
                    onClick={() => this.saveGiftGame(gift, index)}
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span>
                      <i className="fa fa-save"></i>
                    </span>
                    <span>Lưu</span>
                  </button>
                )}

                <button
                  className="gameSpinWheel__actions__item btn btn-danger"
                  onClick={() => this.handleDeleteGiftGame(index)}
                >
                  <span>
                    <i className="fa fa-trash"></i>
                  </span>
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saveSuccessfully: state.gamificationReducers.spin_wheel.saveSuccessfully,
    listImgProductV2: state.UploadReducers.productImg.listImgProductV2,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    saveGiftGameSpinWheel: (store_code, idGame, data) => {
      dispatch(
        gamificationAction.saveGiftGameSpinWheel(store_code, idGame, data)
      );
    },
    saveMessageReturn: (data) => {
      dispatch({
        type: Types.SAVE_GIFT_GAME_SPIN_WHEELS_MESSAGE,
        data: data,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoreListGiftGameSpinWheel);
