import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";
import styled from "styled-components";
import * as gamificationAction from "../../../../actions/gamification";
import * as productAction from "../../../../actions/product";
import * as Types from "../../../../constants/ActionType";
import { getBranchId } from "../../../../ultis/branchUtils";
import { formatNumberV2, randomString } from "../../../../ultis/helpers";
import * as productApi from "../../../../data/remote/product";
import ModalDeleteGift from "../../../../components/Gamification/SpinWheel/ModalDeleteGift";
import AddGiftGameSpinWheel from "./AddGiftGameSpinWheel";

const EditGiftGameSpinWheelStyles = styled.div`
  .gifts {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    .gift__item {
      display: flex;
      column-gap: 30px;
      align-items: center;
      .gift__image {
        position: relative;
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 0;
        }
        .gift__background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 10;
          cursor: pointer;
          label {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }
      .gift__content {
      }
    }
  }
  .gift__item__title {
    display: flex;
    column-gap: 30px;
    align-items: center;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .gameSpinWheel__image {
    width: 70px;
    flex-shrink: 0;
  }
  .gameSpinWheel__name {
    width: 100%;
    flex-grow: 1;
    min-width: 150px;
  }
  .gameSpinWheel__amount {
    width: 130px;
    flex-shrink: 0;
  }
  .gameSpinWheel__percent {
    width: 130px;
    flex-shrink: 0;
  }
  .gameSpinWheel__type {
    width: 200px;
    flex-shrink: 0;
  }
  .gameSpinWheel__gift {
    width: 230px;
    flex-shrink: 0;
  }
  .gameSpinWheel__actions {
    width: 210px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
    .gameSpinWheel__actions__item {
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
  }
  .btn-disabled {
    background-color: #c6c6c3;
    border-color: #c6c6c3;
  }
  .editGiftGame {
    overflow-x: auto;
  }
`;

const newGiftDefault = {
  name: "",
  image_url: "",
  amount_gift: "",
  percent_received: "",
  type_gift: -1,
  text: "",
  amount_coin: "",
  value_gift: "",
};
class EditGiftGameSpinWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGift: [],
      selectValue: [],
      listGiftAdd: [],
      isScan: randomString(10),
      isChangeValue: "",
      idGiftGameSelected: null,
      openModalDelete: false,
    };
    this.refSearchProduct = React.createRef();

    this.afterEnter = false;
    this.search = "";
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      gameSpinWheels,
      store_code,
      fetchListGiftGameSpinWheels,
      listGiftGameSpinWheels,
      listImgProductV2,
      deletedGiftSuccessfully,
      deletedGiftSuccessfullyReturn,
    } = this.props;
    const { idGiftGameSelected, listGift } = this.state;
    if (!shallowEqual(gameSpinWheels, nextProps.gameSpinWheels)) {
      fetchListGiftGameSpinWheels(store_code, nextProps.gameSpinWheels.id);
    }
    if (
      !shallowEqual(listGiftGameSpinWheels, nextProps.listGiftGameSpinWheels)
    ) {
      const newListGift = nextProps.listGiftGameSpinWheels?.data.reduce(
        (prevData, currentData, index) => {
          const newData = {
            id: currentData.id,
            name: currentData.name,
            image_url: currentData.image_url,
            amount_gift: currentData.amount_gift
              ? formatNumberV2(currentData.amount_gift?.toString())
              : "",
            percent_received: currentData.percent_received
              ? formatNumberV2(currentData.percent_received?.toString())
              : 0,
            type_gift: currentData.type_gift,
          };
          if (newData.type_gift == 0) {
            newData.amount_coin = currentData.amount_coin
              ? formatNumberV2(currentData.amount_coin?.toString())
              : "";
          } else if (newData.type_gift == 1) {
            newData.value_gift = currentData.value_gift;
            const newDataSearch = this.state.selectValue;
            newDataSearch[index] = {
              value: currentData.value_gift,
              label: currentData.name,
            };
            this.setState({
              searchValue: newDataSearch,
            });
          } else if (newData.type_gift == 2) {
            newData.text = currentData.text;
          }
          return [...prevData, newData];
        },
        []
      );
      this.setListGift(newListGift);
    }
    if (
      !shallowEqual(listImgProductV2, nextProps.listImgProductV2) &&
      nextState.idGiftGameSelected !== null
    ) {
      const newListGift = listGift.reduce((prevData, currentData) => {
        const newData =
          idGiftGameSelected === currentData.id
            ? {
                ...currentData,
                image_url: nextProps.listImgProductV2[0],
              }
            : currentData;

        return [...prevData, newData];
      }, []);

      this.setState({ idGiftGameSelected: null });
      this.setListGift(newListGift);
    }
    if (
      !shallowEqual(
        deletedGiftSuccessfully,
        nextProps.deletedGiftSuccessfully
      ) &&
      nextProps.deletedGiftSuccessfully
    ) {
      this.setIdGiftGameSelected(null);
      this.setOpenModalDelete(false);
      deletedGiftSuccessfullyReturn();
      fetchListGiftGameSpinWheels(store_code, gameSpinWheels.id);
    }
    return true;
  }
  componentDidMount() {
    const { idGameSpinWheel, store_code, fetchListGiftGameSpinWheels } =
      this.props;
    if (idGameSpinWheel) {
      fetchListGiftGameSpinWheels(store_code, idGameSpinWheel);
    }
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  setIdGiftGameSelected = (idGift) => {
    this.setState({ idGiftGameSelected: idGift });
  };
  setOpenModalDelete = (open) => {
    this.setState({ openModalDelete: open });
  };
  setListGift = (listGift) => {
    this.setState({ listGift });
  };

  handleUploadImage = (e, id) => {
    const file = e.target.files[0];
    const { uploadListImgProductV2 } = this.props;
    if (file) {
      const updatedList = [file];
      this.setState({ idGiftGameSelected: id });
      uploadListImgProductV2(updatedList);
    }
  };
  onChange = (e, idGift, index) => {
    const { listGift, selectValue } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    if (name === "percent_received") {
      const _valuePercentReceived = formatNumberV2(value)
        ?.toString()
        ?.replace(/\./g, "");
      if (Number(_valuePercentReceived) > 10000) return;
    }
    if (name !== "type_gift") {
      const newListGift = listGift.reduce((prevData, currentData) => {
        const newData =
          idGift === currentData.id
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
      this.setListGift(newListGift);
    } else {
      const newListGift = listGift.reduce((prevData, currentData) => {
        const newData =
          idGift === currentData.id
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
      newSearchValue[index] = null;
      this.setState({
        searchValue: newSearchValue,
      });
      this.setListGift(newListGift);
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
  onChangeProduct = (selectValue, idGame, index) => {
    const { listGift } = this.state;
    const newDataSearch = this.state.selectValue;
    newDataSearch[index] = selectValue;
    const newListGift = listGift.reduce((prevData, currentData, index) => {
      const newData = newDataSearch[index]
        ? {
            ...currentData,
            value_gift: newDataSearch[index].value,
            name: newDataSearch[index].label,
          }
        : currentData;

      return [...prevData, newData];
    }, []);
    this.setListGift(newListGift);
    this.setState({
      selectValue: newDataSearch,
      idGiftGameSelected: idGame,
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

  updateGiftGameSpinWheel = (gift) => {
    const { updateGiftGameSpinWheels, store_code, idGameSpinWheel, showError } =
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
        value_gift: gift.value_gift,
        text: gift.text,
        percent_received: gift.percent_received
          ? gift.percent_received?.toString().replace(/\./g, "")
          : 0,
        amount_gift: gift.amount_gift
          ? gift.amount_gift?.toString().replace(/\./g, "")
          : null,
        amount_coin: gift.amount_coin
          ? gift.amount_coin?.toString().replace(/\./g, "")
          : 0,
      };
      updateGiftGameSpinWheels(store_code, idGameSpinWheel, gift.id, newGift);
    }
  };
  handleShowModalDelete = (gift) => {
    this.setState({
      openModalDelete: true,
      idGiftGameSelected: gift.id,
    });
  };

  //HandleAddGift
  handleAddGift = () => {
    const { listGiftAdd } = this.state;
    this.setState({ listGiftAdd: [...listGiftAdd, newGiftDefault] });
  };
  setListGiftAdd = (listGift) => {
    this.setState({ listGiftAdd: listGift });
  };

  render() {
    const {
      listGiftGameSpinWheels,
      idGameSpinWheel,
      store_code,
      uploadListImgProductV2,
      setListGift,
    } = this.props;

    const {
      listGift,
      listGiftAdd,
      selectValue,
      openModalDelete,
      idGiftGameSelected,
    } = this.state;

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
      <EditGiftGameSpinWheelStyles>
        <div className="card mb-4 editGiftGame">
          <div class="card-header title_content">Danh sách phần thưởng</div>
          <div className="card-body" style={{ padding: "0.8rem" }}>
            <div className="gift__item__title">
              <div className="gameSpinWheel__image">Hình ảnh</div>
              <div className="gameSpinWheel__name">Tên phần thưởng</div>
              <div className="gameSpinWheel__type">Loại thưởng</div>
              <div className="gameSpinWheel__gift">Quà thưởng</div>
              <div className="gameSpinWheel__amount">Số lượng</div>
              <div className="gameSpinWheel__percent">Tỉ lệ trúng</div>
              <div className="gameSpinWheel__actions">Hành động</div>
            </div>
            <div className="gifts">
              {Object.entries(listGiftGameSpinWheels).length > 0 &&
                listGift.map((gift, index) => (
                  <div key={gift.id} className="gift__item">
                    <div className="gift__image gameSpinWheel__image">
                      <img
                        src={
                          gift.image_url ? gift.image_url : "/images/no_img.png"
                        }
                        alt="image_gift"
                      />
                      <div className="gift__background">
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => this.handleUploadImage(e, gift.id)}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="gameSpinWheel__input gameSpinWheel__name">
                      <input
                        type="text"
                        placeholder="Tên phần thưởng"
                        value={listGift[index].name}
                        name="name"
                        onChange={(e) => this.onChange(e, listGift[index].id)}
                        className="form-control"
                      />
                    </div>
                    <div className="gameSpinWheel__input gameSpinWheel__type">
                      <select
                        className="form-control"
                        value={listGift[index].type_gift}
                        name="type_gift"
                        onChange={(e) =>
                          this.onChange(e, listGift[index].id, index)
                        }
                      >
                        <option value={-1}>---Chọn loại thưởng---</option>
                        <option value={Types.GIFT_IS_COIN}>Tặng xu</option>
                        <option value={Types.GIFT_IS_ITEM}>
                          Tặng sản phẩm
                        </option>
                        <option value={Types.GIFT_IS_LUCKY_AFTER}>
                          Chúc bạn may mắn
                        </option>
                        <option value={Types.GIFT_IS_LOST_TURN}>
                          Mất lượt
                        </option>
                        <option value={Types.GIFT_IS_TEXT}>Tùy chọn</option>
                      </select>
                    </div>
                    <div className="gameSpinWheel__input gameSpinWheel__gift">
                      {Number(gift.type_gift) === Types.GIFT_IS_COIN ? (
                        <div>
                          <input
                            type="text"
                            placeholder="Số xu"
                            value={listGift[index].amount_coin || ""}
                            className="form-control"
                            name="amount_coin"
                            onChange={(e) => this.onChange(e, gift.id, index)}
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
                            noOptionsMessage={() =>
                              "Không tìm thấy sản phẩm nào"
                            }
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
                            onChange={(e) =>
                              this.onChangeProduct(e, gift.id, index)
                            }
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
                            value={listGift[index].text || ""}
                            name="text"
                            onChange={(e) => this.onChange(e, gift.id, index)}
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
                        placeholder="Nhập số lượng phần thưởng"
                        value={listGift[index].amount_gift}
                        name="amount_gift"
                        onChange={(e) => this.onChange(e, listGift[index].id)}
                        className="form-control"
                      />
                    </div>
                    <div className="gameSpinWheel__input gameSpinWheel__percent">
                      <input
                        type="text"
                        placeholder="Tỉ lệ trúng"
                        value={listGift[index].percent_received}
                        name="percent_received"
                        onChange={(e) => this.onChange(e, listGift[index].id)}
                        className="form-control"
                      />
                    </div>
                    <div className="gameSpinWheel__actions">
                      <button
                        className={`gameSpinWheel__actions__item btn ${
                          gift.name ? "btn-warning" : "btn-disabled"
                        }`}
                        disabled={gift.name ? false : true}
                        onClick={() => this.updateGiftGameSpinWheel(gift)}
                      >
                        <span>
                          <i className="fa fa-edit"></i>
                        </span>
                        <span>Cập nhật</span>
                      </button>
                      <button
                        className="gameSpinWheel__actions__item btn btn-danger"
                        onClick={() => this.handleShowModalDelete(gift)}
                      >
                        <span>
                          <i className="fa fa-trash"></i>
                        </span>
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              <AddGiftGameSpinWheel
                store_code={store_code}
                idGameSpinWheel={idGameSpinWheel}
                listGiftAdd={listGiftAdd}
                setListGiftAdd={this.setListGiftAdd}
                listGiftGameSpinWheels={listGiftGameSpinWheels}
                uploadListImgProductV2={uploadListImgProductV2}
                setListGift={setListGift}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                className="btn btn-outline-primary"
                onClick={this.handleAddGift}
              >
                <i className="fa fa-plus"></i> Thêm
              </button>
            </div>
            <ModalDeleteGift
              store_code={store_code}
              setIdGift={this.setIdGiftGameSelected}
              idGift={idGiftGameSelected}
              setOpen={this.setOpenModalDelete}
              open={openModalDelete}
              idGame={idGameSpinWheel}
              listGift={listGift}
            />
          </div>
        </div>
      </EditGiftGameSpinWheelStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listGiftGameSpinWheels:
      state.gamificationReducers.spin_wheel.listGiftGameSpinWheels,
    listImgProductV2: state.UploadReducers.productImg.listImgProductV2,
    deletedGiftSuccessfully:
      state.gamificationReducers.spin_wheel.deletedGiftSuccessfully,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    uploadListImgProductV2: (file) => {
      dispatch(productAction.uploadListImgProductV2(file));
    },
    fetchListGiftGameSpinWheels: (store_code, idGame) => {
      dispatch(
        gamificationAction.fetchListGiftGameSpinWheels(store_code, idGame)
      );
    },
    updateGiftGameSpinWheels: (store_code, idGame, idGift, data) => {
      dispatch(
        gamificationAction.updateGiftGameSpinWheels(
          store_code,
          idGame,
          idGift,
          data
        )
      );
    },
    deletedGiftSuccessfullyReturn: () => {
      dispatch({ type: Types.DELETE_GAME_SPIN_WHEELS, data: false });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGiftGameSpinWheel);
